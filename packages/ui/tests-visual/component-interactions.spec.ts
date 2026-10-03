import { expect, test } from '@playwright/test'

test('Tooltip exposes stable floating interactions', async ({ page }) => {
    await page.goto('/components/tooltip')
    const example = page.locator('.documentation-preview').first()
    const tooltipTrigger = example.getByRole('button', { name: 'Hover or focus' })
    await tooltipTrigger.focus()
    await expect(page.getByRole('tooltip')).toHaveText('Copies the project URL')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('tooltip')).toBeHidden()
})

test('Tabs follow keyboard navigation patterns', async ({ page }) => {
    await page.goto('/components/tabs')
    const example = page.locator('.documentation-preview').first()
    const overview = example.getByRole('tab', { name: 'Overview' })
    const activity = example.getByRole('tab', { name: 'Activity' })
    await overview.focus()
    await page.keyboard.press('ArrowRight')
    await expect(activity).toBeFocused()
    await expect(activity).toHaveAttribute('aria-selected', 'true')
    await expect(example.getByRole('tabpanel')).toContainText('Recent changes')
})

test('Field inheritance remains accessible', async ({ page }) => {
    await page.goto('/components/field')
    const field = page.locator('.documentation-preview').first().getByRole('textbox', { name: 'Workspace slug' })
    await expect(field).toHaveAttribute('required', '')
    await expect(field).toHaveAccessibleDescription('Used in public project URLs.')
})

test('horizontal Field places label beside its control and feedback below in LTR and RTL', async ({ page }) => {
    await page.goto('/components/field')
    const field = page.locator('.h-field--horizontal').first()
    for (const direction of ['ltr', 'rtl']) {
        await page.locator('html').evaluate((element, direction) => { element.dir = direction }, direction)
        const label = await field.locator('[data-h0n-component="label"]').boundingBox()
        const input = await field.locator('input').boundingBox()
        const error = await field.getByRole('alert').boundingBox()
        expect(Math.abs(label!.y + label!.height / 2 - input!.y - input!.height / 2)).toBeLessThan(2)
        expect(direction === 'ltr' ? label!.x < input!.x : label!.x > input!.x).toBe(true)
        expect(error!.y).toBeGreaterThanOrEqual(input!.y + input!.height)
    }
})

test('responsive layout components render in RTL', async ({ page }) => {
    await page.goto('/components/layout')
    await page.locator('html').evaluate((element) => { element.dir = 'rtl' })
    await expect(page.locator('[data-h0n-component="inline"]').first()).toBeVisible()
})
