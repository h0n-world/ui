import { expect, test } from '@playwright/test'

test.use({ launchOptions: { args: ['--disable-gpu', '--disable-software-rasterizer'] } })

test('animation recommendation with real disabled graphics remains usable', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/docs/animations')
    await expect(page.locator('[data-motion-reason]')).not.toHaveText('Evaluating…')
    await expect(page.locator('[data-motion-recommended]')).toHaveText('low')
    await expect(page.locator('[data-motion-reason]')).toHaveText(/unavailable-graphics|software-rendering|graphics-caveat|limited-resources/)
    await expect(page.locator('html')).toHaveAttribute('data-h0n-animation', 'low')
    const trigger = page.getByRole('button', { name: 'Open motion preview' })
    await trigger.click()
    await expect(page.getByRole('dialog', { name: 'Motion preview' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
})
