import { expect, test } from '@playwright/test'

for (const accent of ['default', 'telegram', 'uber'] as const) {
    for (const mode of ['light', 'dark'] as const) {
        test(`${accent} ${mode} palette and primary contrast`, async ({ page }) => {
            await page.addInitScript(({ accent, mode }) => {
                localStorage.setItem('documentation-theme', mode)
                localStorage.setItem('documentation-theme:accent', accent)
            }, { accent, mode })
            await page.goto('/components/button')
            await expect(page.locator('html')).toHaveAttribute('data-h0n-accent', accent)
            await expect(page.locator('html')).toHaveAttribute('data-h0n-theme', mode)
            const primary = page.locator('.h-button--primary').first()
            await expect(primary).toBeVisible()
            await primary.scrollIntoViewIfNeeded()
            const foundations = await primary.evaluate(() => {
                const style = getComputedStyle(document.documentElement)
                return { accent: style.getPropertyValue('--h0n-accent').trim(), background: style.getPropertyValue('--h0n-background').trim() }
            })
            if (accent === 'telegram') expect(foundations).toEqual(mode === 'light'
                ? { accent: '#087caf', background: '#eef3f7' }
                : { accent: '#6ab3f3', background: '#0e1621' })
            if (accent === 'uber') expect(foundations).toEqual(mode === 'light'
                ? { accent: '#000000', background: '#f4f4f4' }
                : { accent: '#f6f6f6', background: '#080808' })
            const colors = await primary.evaluate((button) => {
                const canvas = document.createElement('canvas')
                canvas.width = canvas.height = 1
                const context = canvas.getContext('2d')!
                function rgb(color: string) {
                    context.clearRect(0, 0, 1, 1)
                    context.fillStyle = color
                    context.fillRect(0, 0, 1, 1)
                    return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3)
                }
                const style = getComputedStyle(button)
                return { background: rgb(style.backgroundColor), foreground: rgb(style.color) }
            })
            function luminance(rgb: number[]) {
                return rgb.map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
                    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index]!, 0)
            }
            const a = luminance(colors.background), b = luminance(colors.foreground)
            const contrast = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
            if (accent !== 'default') expect(contrast).toBeGreaterThanOrEqual(4.5)
            const status = page.locator('.h-button--danger').first()
            await expect(status).toBeVisible()
            const statusColor = await status.evaluate(button => getComputedStyle(button).color)
            await page.locator('html').evaluate(html => html.setAttribute('data-h0n-accent', 'default'))
            expect(await status.evaluate(button => getComputedStyle(button).color)).toBe(statusColor)
            await page.locator('html').evaluate((html, accent) => html.setAttribute('data-h0n-accent', accent), accent)
            await page.screenshot({ path: `test-results/palette-${accent}-${mode}.png` })
        })
    }
}

test('Header palette selection uses keyboard, survives reload and fits mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/docs/colors')
    const selector = page.getByRole('combobox', { name: 'Accent palette' })
    await selector.focus()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('End')
    await page.keyboard.press('Enter')
    await expect(page.locator('html')).toHaveAttribute('data-h0n-accent', 'uber')
    const toggle = page.locator('.theme-button')
    await toggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-h0n-accent', 'uber')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-h0n-accent', 'uber')
    await expect(selector).toContainText('Uber')
    expect(await page.locator('.site-header').evaluate(header => header.scrollWidth <= window.innerWidth)).toBe(true)
    await page.screenshot({ path: 'test-results/palette-mobile.png' })
})

test('dark palettes keep fixed-color avatar and alert foregrounds independent', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('documentation-theme', 'dark')
        localStorage.setItem('documentation-theme:accent', 'uber')
    })
    for (const route of ['/components/avatar', '/components/alert']) {
        await page.goto(route)
        const fixedFill = route.endsWith('avatar')
            ? page.locator('.h-avatar--fallback').first()
            : page.locator('.h-alert--warning .h-alert__action').first()
        await expect(fixedFill).toBeVisible()
        const originalColor = await fixedFill.evaluate(element => getComputedStyle(element).color)
        for (const accent of ['default', 'telegram', 'uber']) {
            await page.locator('html').evaluate((html, accent) => html.setAttribute('data-h0n-accent', accent), accent)
            expect(await fixedFill.evaluate(element => getComputedStyle(element).color)).toBe(originalColor)
        }
    }
})
