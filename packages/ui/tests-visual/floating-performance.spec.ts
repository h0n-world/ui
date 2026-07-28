import { expect, test } from '@playwright/test'

const selectCycleBaselineMs = 20_000

test('Select floating surface stays inside the viewport and cleans up', async ({ page }) => {
    await page.goto('/components/select')
    const trigger = page.getByRole('combobox').first()
    await trigger.click()
    const popover = page.getByRole('listbox').first()
    await expect(popover).toBeVisible()

    const box = await popover.boundingBox()
    const viewport = page.viewportSize()
    expect(box).not.toBeNull()
    expect(viewport).not.toBeNull()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.y).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width)
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height)

    await page.keyboard.press('Escape')
    await expect(popover).toHaveCount(0)
})

test('rapid Select disclosure cycles do not retain detached floating nodes', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Pinned timing/leak scenario runs in Chromium')
    await page.goto('/components/select')
    const trigger = page.getByRole('combobox').first()
    const started = performance.now()

    for (let index = 0; index < 100; index += 1) {
        await trigger.click()
        await page.keyboard.press('Escape')
    }

    const duration = performance.now() - started
    console.log(`Select timing: 100 disclosure cycles ${duration.toFixed(1)}ms`)
    if (duration > selectCycleBaselineMs * 1.2) {
        console.warn(`Select timing regression: ${duration.toFixed(1)}ms exceeds the ${(selectCycleBaselineMs * 1.2).toFixed(0)}ms warning threshold`)
    }
    await expect(page.locator('[data-h0n-component="select-popover"]')).toHaveCount(0)
    await expect(page.locator('[data-h0n-component="select-overlay"]')).toHaveCount(0)
})
