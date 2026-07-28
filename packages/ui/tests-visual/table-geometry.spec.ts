import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        const style = document.createElement('style')
        style.textContent = '*, *::before, *::after { box-sizing: content-box; }'
        document.documentElement.append(style)
    })
})

test('Table owns one clipped viewport with integrated vertical and horizontal scrolling', async ({ page }) => {
    await page.goto('/components/table')
    const usageExample = page.locator('#markdown-example-componentstable-1')
    const usageViewport = usageExample.locator('.h-table__viewport')
    const usageTable = usageViewport.locator('.h-table__table')
    const layoutExample = page.locator('#markdown-example-componentstable-2')
    const shell = layoutExample.locator('.h-table')
    const viewport = shell.locator('.h-table__viewport')

    await expect(shell).toHaveCSS('box-sizing', 'border-box')
    await expect(viewport).toHaveCSS('box-sizing', 'border-box')
    await expect(usageExample.locator('.h-table')).toHaveCSS('padding', '4px')
    await expect(usageViewport).toHaveCSS('scrollbar-gutter', 'auto')
    expect(await usageViewport.evaluate((element) => element.scrollHeight <= element.clientHeight)).toBe(true)
    expect(
        await usageViewport.evaluate((element, table) => Math.abs(element.getBoundingClientRect().right - (table as HTMLElement).getBoundingClientRect().right), await usageTable.elementHandle())
    ).toBeLessThanOrEqual(1)
    expect(Number.parseFloat(await usageTable.locator('tbody tr:first-child td:first-child').evaluate((element) => getComputedStyle(element).borderStartStartRadius))).toBeGreaterThan(0)
    expect(await layoutExample.locator('.h-table__viewport').count()).toBe(1)
    expect(await viewport.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true)
    expect(await viewport.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true)

    for (const theme of ['light', 'dark']) {
        for (const radius of ['sm', 'md', 'lg']) {
            await page.locator('html').evaluate((element, settings) => {
                element.dataset.h0nTheme = settings.theme
                element.dataset.h0nRadiusSize = settings.radius
            }, { theme, radius })
            await expect(shell).toHaveCSS('overflow', 'hidden')
            expect(Number.parseFloat(await shell.evaluate((element) => getComputedStyle(element).borderTopLeftRadius))).toBeGreaterThan(0)
        }
    }

    for (const position of [
        { left: 0, top: 0 },
        { left: 120, top: 160 },
        { left: 10_000, top: 10_000 }
    ]) {
        await viewport.evaluate((element, nextPosition) => element.scrollTo(nextPosition), position)
        await expect(shell).toBeVisible()
        expect((await shell.boundingBox())?.width ?? 0).toBeGreaterThan(200)
    }
})

test('DataTable keeps pagination outside the scroll viewport and bounds virtual rows', async ({ page }) => {
    await page.goto('/components/datatable')
    const clientExample = page.locator('#markdown-example-componentsdatatable-1')
    const footer = clientExample.locator('.h-data-table__footer')

    await expect(footer).toBeVisible()
    expect(await footer.locator('.h-table__viewport').count()).toBe(0)

    const virtualExample = page.locator('#markdown-example-componentsdatatable-4')
    const virtualViewport = virtualExample.locator('.h-table__viewport')
    expect(await virtualExample.locator('.h-table__row').count()).toBeLessThan(30)
    await virtualViewport.evaluate((element) => element.scrollTo({ top: element.scrollHeight / 2 }))
    await expect(virtualExample.getByText(/Pipeline event 5\d{3}/).first()).toBeVisible()
    expect(await virtualExample.locator('.h-table__row').count()).toBeLessThan(30)
})
