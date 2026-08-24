import { expect, test } from '@playwright/test'

test('icon catalog renders definitions across theme and size controls', async ({ page }) => {
    await page.goto('/icons/overview')

    const cards = page.getByRole('region', { name: 'All icons' }).getByRole('button', { name: /^Copy import for / })
    await expect(cards).toHaveCount(96, { timeout: 15_000 })

    const firstIcon = cards.first().locator('svg')
    await expect(firstIcon).toHaveAttribute('width', '34')
    await expect(firstIcon).toHaveAttribute('height', '34')
    await expect(firstIcon).toHaveAttribute('color', '#6d5dfc')

    const originalTheme = await page.locator('html').getAttribute('data-h0n-theme')
    await page.locator('.theme-button').click()
    await expect.poll(() => page.locator('html').getAttribute('data-h0n-theme')).not.toBe(originalTheme)
    await expect(firstIcon).toBeVisible()

    await page.getByRole('combobox', { name: 'Preview size' }).click()
    await page.getByRole('listbox', { name: 'Select options' }).getByRole('button', { name: '46px' }).click()
    await expect(firstIcon).toHaveAttribute('width', '46')
    await expect(firstIcon).toHaveAttribute('height', '46')

    await page.getByRole('searchbox', { name: 'Search' }).fill('magnifier')
    await expect(page.locator('.catalog-count strong')).not.toHaveText('0')
    await expect(cards.first()).toBeVisible()
})
