import { expect, test } from '@playwright/test'

async function selectQuality(page: import('@playwright/test').Page, value: 'off' | 'low' | 'medium' | 'high' | 'recommended') {
    const selector = page.getByRole('button', { name: 'Animation quality', exact: true })
    await selector.click()
    const label = value === 'recommended' ? 'Recommended' : value.charAt(0).toUpperCase() + value.slice(1)
    await page.getByRole('dialog', { name: 'Animation quality' }).getByRole('button', { name: label, exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-h0n-animation-preference', value)
}

for (const quality of ['off', 'low', 'medium', 'high'] as const) {
    test(`animation ${quality}: effects and overlay lifecycle`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await page.goto('/docs/animations')
        await selectQuality(page, quality)
        await expect(page.locator('[data-motion-quality]')).toHaveText(quality)
        const example = page.locator('.animation-example')
        const effect = await example.evaluate(element => {
            const spinner = getComputedStyle(element.querySelector('.h-spinner')!)
            const skeleton = getComputedStyle(element.querySelector('.h-skeleton')!, '::after')
            const button = getComputedStyle(element.querySelector('.h-button')!)
            return { spinner: spinner.animationName, shimmer: skeleton.display, transition: button.transitionDuration }
        })
        expect(effect.spinner === 'none').toBe(quality === 'off' || quality === 'low')
        expect(effect.shimmer === 'none').toBe(quality !== 'high')
        if (quality === 'off') expect(effect.transition).toBe('0s')
        else expect(effect.transition).not.toBe('0s')
        const toggle = example.getByRole('switch', { name: 'Enable notifications' })
        await toggle.click()
        await expect(toggle).toHaveAttribute('aria-checked', 'true')
        const before = await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow])
        const trigger = example.getByRole('button', { name: 'Open motion preview' })
        await trigger.click()
        if (quality === 'high') await expect(trigger.locator('.h-ripple__item')).toHaveCount(1)
        else await expect(trigger.locator('.h-ripple__item')).toHaveCount(0)
        const dialog = page.getByRole('dialog', { name: 'Motion preview' })
        await expect(dialog).toBeVisible()
        await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
        if (quality === 'off') {
            expect(await dialog.evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s')
            expect(await page.locator('.h-overlay__backdrop').evaluate(element => getComputedStyle(element).backdropFilter)).toBe('none')
        }
        await page.keyboard.press('Escape')
        await expect(dialog).toHaveCount(0)
        await expect(trigger).toBeFocused()
        expect(await page.evaluate(() => [document.documentElement.style.overflow, document.body.style.overflow])).toEqual(before)
        await page.screenshot({ path: `test-results/animation-${quality}.png` })
    })
}

test('animation system reduction overrides High live and restores the preference', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/docs/animations')
    await selectQuality(page, 'high')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('html')).toHaveAttribute('data-h0n-animation', 'off')
    await expect(page.locator('html')).toHaveAttribute('data-h0n-animation-preference', 'high')
    await expect(page.locator('[data-motion-quality]')).toHaveText('off')
    expect(await page.locator('.animation-example .h-spinner').evaluate(element => getComputedStyle(element).animationName)).toBe('none')
    expect(await page.locator('.animation-example .h-button').first().evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s')
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(page.locator('[data-motion-quality]')).toHaveText('high')
})

test('animation controls fit a narrow Header and update application composables', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/docs/animations')
    await selectQuality(page, 'off')
    await expect(page.locator('[data-motion-quality]')).toHaveText('off')
    expect(await page.locator('.site-header').evaluate(element => element.scrollWidth <= window.innerWidth)).toBe(true)
    const palette = page.getByRole('button', { name: 'Accent palette', exact: true })
    const motion = page.getByRole('button', { name: 'Animation quality', exact: true })
    await expect(palette).toBeInViewport()
    await expect(motion).toBeInViewport()
    await page.screenshot({ path: 'test-results/animation-mobile.png' })
    for (const width of [320, 390, 768, 900, 1280]) {
        await page.setViewportSize({ width, height: 800 })
        expect(await page.locator('.site-header').evaluate(element => element.scrollWidth <= window.innerWidth)).toBe(true)
        await expect(palette).toBeInViewport()
        await expect(motion).toBeInViewport()
        const paletteBox = await palette.boundingBox()
        const searchBox = await page.getByRole('button', { name: 'Search documentation', exact: true }).boundingBox()
        expect(Math.abs(paletteBox!.y + paletteBox!.height / 2 - searchBox!.y - searchBox!.height / 2)).toBeLessThan(2)
    }
})
