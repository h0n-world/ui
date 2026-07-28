import { expect, test } from '@playwright/test'

test.describe('documentation navigation', () => {
    test('resets page scroll and resolves component catalog anchors', async ({ page }) => {
        await page.goto('/components/button')

        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight }))
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

        await page.locator('.docs-layout__left').getByText('Carousel', { exact: true }).click()
        await page.waitForURL('**/components/carousel')
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

        await page.goto('/components/all#category-data')
        await expect(page.locator('#category-data')).toBeInViewport()
        await expect(page).toHaveURL(/\/components\/all#category-data$/)
    })
})
