import { expect, test, type Locator, type Page } from '@playwright/test'

type ActionExample = {
    route: string
    selector: string
    action: string
    verify: (page: Page, preview: Locator) => Promise<void>
}

const examples: ActionExample[] = [
    {
        route: 'errormessage', selector: '.error-stack', action: 'Show dynamic error',
        verify: async (_, preview) => { await expect(preview.getByRole('alert')).toHaveText('We could not complete the request. Try again.') },
    },
    {
        route: 'image', selector: '.lifecycle-example', action: 'Load missing image',
        verify: async (_, preview) => { await expect(preview.locator('output')).toContainText('Native event: error') },
    },
    {
        route: 'label', selector: '.label-stack', action: 'Closed',
        verify: async (page, preview) => {
            await expect(preview.getByRole('textbox', { name: 'Email address' })).toBeVisible()
            if (page.viewportSize()!.width < 720) await preview.getByRole('button', { name: 'Actions', exact: true }).click()
            const group = page.getByRole('group', { name: 'Status filters' })
            await expect(group).toBeVisible()
            await expect(group.getByRole('button', { name: 'Closed', exact: true })).toHaveAttribute('aria-pressed', 'true')
        },
    },
    {
        route: 'message', selector: '.announcement-example', action: 'Show status',
        verify: async (_, preview) => { await expect(preview.getByRole('status')).toHaveText('Changes were saved successfully.') },
    },
    {
        route: 'infinitescroll', selector: '.viewport-example', action: 'Pause observation',
        verify: async (page, preview) => {
            if (page.viewportSize()!.width < 720) await preview.getByRole('button', { name: 'Actions', exact: true }).click()
            await expect(page.getByRole('button', { name: 'Resume observation', exact: true })).toBeVisible()
            await expect(preview.locator('.viewport-items')).toBeVisible()
        },
    },
    {
        route: 'skeleton', selector: '.loading-example', action: 'Show content',
        verify: async (_, preview) => {
            await expect(preview.locator('.content-skeleton')).toHaveCount(0)
            await expect(preview.locator('.content-region')).toContainText('Release summary')
        },
    },
    {
        route: 'textshimmer', selector: '.text-shimmer-basic-example', action: 'Preview High',
        verify: async (_, preview) => { await expect(preview.locator('.text-shimmer-quality')).toHaveText('Effective motion: high') },
    },
    {
        route: 'searchfield', selector: '.stack:has(output)', action: 'Set query',
        verify: async (page, preview) => {
            await expect(preview.getByRole('searchbox', { name: 'Command search' })).toHaveValue('accessibility')
            if (page.viewportSize()!.width < 720) await preview.getByRole('button', { name: 'Actions', exact: true }).click()
            await page.getByRole('button', { name: 'Focus', exact: true }).click()
            await expect(preview.getByRole('searchbox', { name: 'Command search' })).toBeFocused()
        },
    },
    {
        route: 'scrollarea', selector: '.documentation-preview__content:has([aria-label="Release history"])', action: 'Scroll down',
        verify: async (_, preview) => { await expect(preview.locator('output')).toHaveText('Reached the end') },
    },
    {
        route: 'dropdown', selector: '.dropdown-custom-example', action: 'Toggle profile',
        verify: async (page) => {
            const profile = page.getByRole('dialog', { name: 'Edit profile' })
            await expect(profile).toBeVisible()
            await expect(profile.getByRole('textbox', { name: 'Display name' })).toBeFocused()
            await profile.getByRole('textbox', { name: 'Display name' }).fill('Sam')
            await profile.getByRole('button', { name: 'Save profile' }).click()
            await expect(profile).toBeHidden()
            await expect(page.getByText('Saved: Sam', { exact: true })).toBeVisible()
        },
    },
]

for (const width of [1280, 390]) {
    for (const example of examples) {
        test(`${example.route}: actions work at ${width}px`, async ({ page }) => {
            await page.setViewportSize({ width, height: 900 })
            await page.emulateMedia({ reducedMotion: 'no-preference' })
            await page.goto(`/components/${example.route}`)
            const preview = page.locator('.documentation-preview').filter({ has: page.locator(example.selector) })
            await expect(preview).toHaveCount(1)
            await preview.scrollIntoViewIfNeeded()
            const content = preview.locator('.documentation-preview__content')
            await expect(content.getByRole('button', { name: example.action, exact: true })).toHaveCount(0)
            let actions: Locator
            if (width < 720) {
                await preview.getByRole('button', { name: 'Actions', exact: true }).click()
                actions = page.getByRole('dialog', { name: 'Preview actions' })
            } else {
                actions = preview.getByRole('complementary', { name: 'Preview actions' })
            }
            await actions.getByRole('button', { name: example.action, exact: true }).click()
            if (width < 720) await expect(actions).toBeHidden()
            await example.verify(page, preview)
        })
    }
}
