import { test, expect, type Page } from '@playwright/test'

test.setTimeout(60000)
const editor = (page: Page, file = 'App.vue') =>
    page.getByRole('textbox', { name: `Source code for ${file}` })
const preview = (page: Page) => page.frameLocator('iframe[title="H0N UI component preview"]')
async function open(page: Page) {
    await page.goto('/editor')
    await expect(preview(page).getByText('You clicked 0 times.')).toBeVisible()
}

test('runs without randomUUID and exposes exactly two files with persistent CSS', async ({
    page,
}) => {
    await page.addInitScript(() =>
        Object.defineProperty(window.crypto, 'randomUUID', {
            value: undefined,
            configurable: true,
        }),
    )
    await open(page)
    await expect(page.getByRole('button', { name: 'Add file', exact: true })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Delete file' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'App.vue', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'style.css', exact: true }).click()
    await editor(page, 'style.css').fill('.demo { border: 7px solid rgb(255, 0, 0); }')
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('.demo')).toHaveCSS('border-top-width', '7px')
    await expect
        .poll(() => page.evaluate(() => localStorage.getItem('h0n-documentation-editor:v2')))
        .toContain('7px')
    await page.reload()
    await expect(page.locator('iframe')).toHaveCount(0)
    await expect(editor(page, 'style.css')).toBeVisible()
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('.demo')).toHaveCSS('border-top-width', '7px')
    await preview(page).getByRole('button', { name: 'Add one' }).click()
    await expect(preview(page).getByText('You clicked 1 times.')).toBeVisible()
    await page.getByRole('button', { name: 'App.vue', exact: true }).click()
    await editor(page).fill(
        '<script setup>import x from "lodash"</script><template>{{x}}</template>',
    )
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(page.getByRole('alert')).toContainText('unavailable')
    await expect(preview(page).getByText('You clicked 1 times.')).toBeVisible()
})

test('isolates source and styles, blocks network and uses H0Select preview controls', async ({
    page,
}) => {
    await open(page)
    let leakedRequests = 0
    page.on('request', (request) => {
        if (request.url().includes('editor-forbidden.example')) leakedRequests++
    })
    await editor(page).fill(`<script setup lang="ts">
try { console.log(parent.document.title) } catch { console.log('parent blocked') }
try { console.log(localStorage.length) } catch { console.log('storage blocked') }
fetch('https://editor-forbidden.example/test').catch(() => console.log('network blocked'))
</script><template><p>Sandbox</p><button @click="() => { throw new Error('runtime boom') }">Fail</button></template><style>body { color: rgb(255, 0, 0) }</style>`)
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).getByText('Sandbox')).toBeVisible()
    await expect(page.locator('.editor-console')).toContainText('parent blocked')
    await expect(page.locator('.editor-console')).toContainText('storage blocked')
    await expect(page.locator('.editor-console')).toContainText('network blocked')
    expect(leakedRequests).toBe(0)
    await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts')
    expect(await page.locator('body').evaluate((node) => getComputedStyle(node).color)).not.toBe(
        'rgb(255, 0, 0)',
    )
    await preview(page).getByRole('button', { name: 'Fail' }).click()
    await expect(page.locator('.editor-console')).toContainText('runtime boom')
    await page.locator('.theme-select').getByRole('combobox').click()
    await page.getByRole('option', { name: 'Dark', exact: true }).click()
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('html')).toHaveAttribute('data-h0n-theme', 'dark')
    await page.locator('.width-select').getByRole('combobox').click()
    await page.getByRole('option', { name: '375 px', exact: true }).click()
    await expect(page.locator('iframe')).toHaveCSS('width', '375px')
    await page.setViewportSize({ width: 390, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('reports live TS, template and component prop errors, with clickable source locations', async ({
    page,
}) => {
    await open(page)
    await expect(page.locator('.check-status')).toHaveText('TypeScript checked')
    await editor(page).fill(
        '<script setup lang="ts">import { H0Button } from "@h0nio/ui"; const count: number = "wrong"</script><template><H0Button size="gigantic">{{ count.noSuchMember }}</H0Button></template>',
    )
    await expect(page.locator('.editor-diagnostics')).toContainText('TS2322')
    await expect(page.locator('.editor-diagnostics')).toContainText('gigantic')
    await expect(page.locator('.editor-diagnostics')).toContainText('noSuchMember')
    await expect(page.locator('.cm-lintRange-error').first()).toBeVisible()
    await page.locator('.editor-diagnostics').getByRole('button').first().click()
    await expect(editor(page)).toBeFocused()
    await editor(page).fill(
        '<script setup lang="ts">const count: number = 1</script><template>{{ count }}</template>',
    )
    await expect(page.locator('.check-status')).toHaveText('TypeScript checked')
    await expect(page.locator('.editor-diagnostics summary')).toHaveText(
        'TypeScript & Vue · 0 issues',
    )
})

test('provides syntax colors and TS, component prop and CSS completions', async ({ page }) => {
    await open(page)
    await expect(page.locator('.check-status')).toHaveText('TypeScript checked')
    await expect(page.locator('.cm-content span').first()).toBeVisible()
    await editor(page).fill(
        '<script setup lang="ts">\nimport { ref } from "vue"; const count = ref(1);\ncount.value.\n</script><template>Hello</template>',
    )
    await page.keyboard.press('Control+Home')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('End')
    await page.keyboard.press('Control+Space')
    await expect(page.locator('.cm-tooltip-autocomplete')).toContainText('toFixed')
    await page.keyboard.press('Escape')
    await editor(page).fill('<template>\n<H0Button si\n</template>')
    await page.keyboard.press('Control+Home')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('End')
    await page.keyboard.press('Control+Space')
    await expect(page.locator('.cm-tooltip-autocomplete')).toContainText('size')
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'style.css', exact: true }).click()
    await editor(page, 'style.css').fill('.demo {\n  col\n}')
    await page.keyboard.press('Control+Home')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('End')
    await page.keyboard.press('Control+Space')
    await expect(page.locator('.cm-tooltip-autocomplete')).toContainText('color')
})

test('exports two-file projects, rejects extra files and preserves earlier drafts', async ({
    page,
}) => {
    const legacy = JSON.stringify({
        version: 1,
        files: { 'App.vue': 'old code', 'helpers.ts': 'old helper' },
    })
    await page.addInitScript(
        (value) => localStorage.setItem('h0n-documentation-editor:v1', value),
        legacy,
    )
    await open(page)
    await page.getByRole('button', { name: 'Project', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Export previous draft' })).toBeVisible()
    expect(await page.evaluate(() => localStorage.getItem('h0n-documentation-editor:v1'))).toBe(
        legacy,
    )
    const downloaded = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Export', exact: true }).click()
    expect((await downloaded).suggestedFilename()).toBe('h0n-editor-project.json')
    await expect(page.getByRole('button', { name: 'Export', exact: true })).not.toBeVisible()
    await page.getByRole('button', { name: 'Project', exact: true }).click()
    const choosingFile = page.waitForEvent('filechooser')
    await page.getByRole('button', { name: 'Import JSON', exact: true }).click()
    await choosingFile
    await expect(page.getByRole('button', { name: 'Import JSON', exact: true })).not.toBeVisible()
    await page.getByLabel('Import project JSON').setInputFiles({
        name: 'project.json',
        mimeType: 'application/json',
        buffer: Buffer.from(
            JSON.stringify({
                version: 2,
                files: {
                    'App.vue': '<template>Imported</template>',
                    'style.css': '',
                    'extra.ts': '',
                },
            }),
        ),
    })
    await expect(page.getByRole('alert')).toContainText('exactly')
    await page.getByLabel('Import project JSON').setInputFiles({
        name: 'project.json',
        mimeType: 'application/json',
        buffer: Buffer.from(
            JSON.stringify({
                version: 2,
                files: {
                    'App.vue': '<template><h2>Imported project</h2></template>',
                    'style.css': '',
                },
            }),
        ),
    })
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).getByText('Imported project')).toBeVisible()
    await page.getByRole('button', { name: 'Reset', exact: true }).click()
    await expect(editor(page)).toContainText('Imported project')
    await page.getByRole('button', { name: 'Confirm reset', exact: true }).click()
    await expect(preview(page).getByText('You clicked 0 times.')).toBeVisible()
    await expect(page.locator('.check-status')).toHaveText('TypeScript checked')
    await page.screenshot({ path: 'test-results/editor-desktop.png', fullPage: true })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.locator('iframe').scrollIntoViewIfNeeded()
    await expect(preview(page).getByText('You clicked 0 times.')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: 'test-results/editor-mobile.png', fullPage: true })
})

test('shows navigation, responsive output panels and themed preview canvas', async ({ page }) => {
    await open(page)
    await expect(page.locator('.site-header__primary')).toBeVisible()
    await expect(page.locator('.theme-select .h-select__label')).toHaveCount(0)
    await expect(page.locator('.width-select .h-select__label')).toHaveCount(0)
    const panels = async () => {
        const diagnostics = await page.locator('.editor-diagnostics').boundingBox()
        const console = await page.locator('.editor-console').boundingBox()
        return { diagnostics: diagnostics!, console: console! }
    }
    await page.setViewportSize({ width: 1440, height: 1000 })
    let positions = await panels()
    expect(positions.console.y).toBe(positions.diagnostics.y)
    expect(positions.console.x).toBeGreaterThan(positions.diagnostics.x)
    for (const width of [768, 390]) {
        await page.setViewportSize({ width, height: 1000 })
        positions = await panels()
        expect(positions.console.y).toBeGreaterThan(positions.diagnostics.y)
        expect(positions.console.x).toBe(positions.diagnostics.x)
    }
    await page.setViewportSize({ width: 1440, height: 1000 })
    const background = () =>
        preview(page)
            .locator('body')
            .evaluate((node) => getComputedStyle(node).backgroundColor)
    const light = await background()
    await page.locator('.theme-select').getByRole('combobox').click()
    await page.getByRole('option', { name: 'Dark', exact: true }).click()
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('html')).toHaveAttribute('data-h0n-theme', 'dark')
    expect(await background()).not.toBe(light)
    expect(await background()).not.toBe('rgba(0, 0, 0, 0)')
    await page.getByRole('button', { name: 'style.css', exact: true }).click()
    await editor(page, 'style.css').fill('body { background: rgb(20, 40, 60); padding: 1rem; }')
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('body')).toHaveCSS('background-color', 'rgb(20, 40, 60)')
    await expect(preview(page).locator('body')).toHaveCSS('padding-top', '16px')
})

test('loads a component example with confirmation and adapts code colors to theme', async ({
    page,
}) => {
    await open(page)
    await page.locator('.sample-select').getByRole('combobox').click()
    await page.getByRole('option', { name: 'button / BasicExample', exact: true }).click()
    await page.getByRole('button', { name: 'Load example', exact: true }).click()
    await expect(editor(page)).toContainText('const count = ref(0)')
    await page.getByRole('button', { name: 'Replace App.vue', exact: true }).click()
    await expect(editor(page)).toContainText('Create project')
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).getByRole('button', { name: 'Create project' })).toBeVisible()
    await expect(page.locator('.check-status')).toHaveText('TypeScript checked')
    await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-h0n-theme', 'dark')
    await page.locator('.theme-select').getByRole('combobox').click()
    await page.getByRole('option', { name: 'Dark', exact: true }).click()
    await page.getByRole('button', { name: 'Run', exact: true }).click()
    await expect(preview(page).locator('html')).toHaveAttribute('data-h0n-theme', 'dark')
    await page.screenshot({ path: 'test-results/editor-dark.png', fullPage: true })
})
