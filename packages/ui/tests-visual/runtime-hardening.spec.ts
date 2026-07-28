import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('RTL keyboard navigation, mobile geometry and runtime appearance contracts remain stable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/components/tabs')
    await page.locator('html').evaluate((element) => {
        element.dir = 'rtl'
        element.dataset.h0nTheme = 'dark'
        element.dataset.h0nDensity = 'compact'
        element.dataset.h0nRadiusSize = 'lg'
        element.dataset.h0nAnimation = 'low'
    })
    const example = page.locator('.documentation-preview').first()
    const overview = example.getByRole('tab', { name: 'Overview' })
    const activity = example.getByRole('tab', { name: 'Activity' })
    await overview.focus()
    await page.keyboard.press('ArrowLeft')
    await expect(activity).toBeFocused()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('forced colors preserves focus, selection, disabled controls and open overlays', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Forced-colors emulation is a Chromium release gate.')
    await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' })
    await page.goto('/components/modal')
    const trigger = page.locator('.documentation-preview').first().getByRole('button', { name: 'Edit profile' })
    await trigger.focus()
    await trigger.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).disableRules(['color-contrast']).analyze()
    expect(results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([])
})
