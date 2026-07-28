import { expect, test, type Locator } from '@playwright/test'

async function expectInsideViewport(locator: Locator) {
    await expect(locator).toBeVisible()
    const box = await locator.boundingBox()
    const viewport = locator.page().viewportSize()

    expect(box).not.toBeNull()
    expect(viewport).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.y).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width)
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height)
}

test('Modal opens inside the viewport and restores focus after dismissal', async ({ page }) => {
    await page.goto('/components/modal')
    const trigger = page.locator('.documentation-preview').first().getByRole('button', { name: 'Edit profile' })

    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Edit profile' })
    await expectInsideViewport(dialog)
    await expect(dialog).toContainText('Update the account details')

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
})

test('Select and Pagination expose usable keyboard and selection state', async ({ page }) => {
    await page.goto('/components/select')
    const select = page.getByRole('combobox', { name: 'Team' }).first()

    await select.click()
    const listbox = page.getByRole('listbox').first()
    await expectInsideViewport(listbox)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(select).toHaveAttribute('aria-expanded', 'false')
    await expect(select).toContainText('Engineering')

    await page.goto('/components/pagination')
    const pagination = page.getByRole('navigation', { name: 'Example pages' })
    await pagination.getByRole('button', { name: 'Page 2' }).click()
    await expect(pagination.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page')
})

test('Carousel updates the active slide through public controls', async ({ page }) => {
    await page.goto('/components/carousel')
    const carousel = page.getByRole('region', { name: 'Product areas' })

    await expect(carousel).toContainText('Workspace')
    await carousel.getByRole('button', { name: 'Next slide' }).click()
    await expect(carousel.getByText('Analytics', { exact: true })).toBeVisible()
})
