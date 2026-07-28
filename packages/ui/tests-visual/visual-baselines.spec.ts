import { expect, test } from '@playwright/test'

const screenshotOptions = { animations: 'disabled' as const, maxDiffPixelRatio: 0.08, threshold: 0.2 }

test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Critical visual baselines are Chromium-only.')
})

test('Table critical states and scroll positions', async ({ page }) => {
    await page.goto('/components/table')
    const states = page.locator('#markdown-example-componentstable-3').locator('.h-table')

    await expect(states.nth(0)).toHaveScreenshot('table-empty.png', screenshotOptions)
    await expect(states.nth(1)).toHaveScreenshot('table-one-row.png', screenshotOptions)

    const scrollTable = page.locator('#markdown-example-componentstable-2').locator('.h-table')
    const viewport = scrollTable.locator('.h-table__viewport')
    await expect(scrollTable).toHaveScreenshot('table-scroll-top-left.png', screenshotOptions)

    await viewport.evaluate((element) => element.scrollTo({ left: 120, top: 160 }))
    await expect(scrollTable).toHaveScreenshot('table-scroll-middle.png', screenshotOptions)

    await viewport.evaluate((element) => element.scrollTo({ left: element.scrollWidth, top: 0 }))
    await expect(scrollTable).toHaveScreenshot('table-scroll-right.png', screenshotOptions)

    await viewport.evaluate((element) => element.scrollTo({ left: 0, top: element.scrollHeight }))
    await expect(scrollTable).toHaveScreenshot('table-scroll-bottom.png', screenshotOptions)

    await viewport.evaluate((element) => element.scrollTo({ left: element.scrollWidth, top: element.scrollHeight }))
    await expect(scrollTable).toHaveScreenshot('table-scroll-bottom-right.png', screenshotOptions)
})

test('DataTable controlled, infinite and virtual states', async ({ page }) => {
    await page.goto('/components/datatable')
    const client = page.locator('#markdown-example-componentsdatatable-1')
    const dataTable = client.locator('.h-data-table')

    await client.getByRole('button', { name: 'Sort by Score' }).click()
    await client.getByRole('searchbox', { name: 'Filter Name' }).fill('Member 1')
    await client.getByRole('checkbox', { name: 'Select all rows' }).check()
    await expect(dataTable).toHaveScreenshot('data-table-sort-filter-selection-page.png', screenshotOptions)

    const infinite = page.locator('#markdown-example-componentsdatatable-3').locator('.h-data-table')
    await infinite.locator('.h-table__viewport').evaluate((element) => element.scrollTo({ top: element.scrollHeight }))
    await expect(infinite).toHaveScreenshot('data-table-infinite.png', screenshotOptions)

    const virtual = page.locator('#markdown-example-componentsdatatable-4').locator('.h-data-table')
    await virtual.locator('.h-table__viewport').evaluate((element) => element.scrollTo({ top: element.scrollHeight / 2 }))
    await expect(virtual).toHaveScreenshot('data-table-virtual.png', screenshotOptions)
})

test('Form controls and overlay surfaces', async ({ page }) => {
    await page.goto('/components/form')
    const form = page.locator('#markdown-example-componentsform-1').locator('.form')
    await expect(form).toHaveScreenshot('form-controls.png', screenshotOptions)

    await page.goto('/components/modal')
    await page.locator('#markdown-example-componentsmodal-1').getByRole('button', { name: 'Edit profile' }).click()
    await expect(page.getByRole('dialog')).toHaveScreenshot('modal-overlay.png', screenshotOptions)

    await page.goto('/components/toast')
    await page.locator('#markdown-example-componentstoast-3').getByRole('button', { name: 'Upload file' }).click()
    const toastStack = page.locator('.h-toasts').filter({ hasText: 'Uploading file' })
    await expect(toastStack).toBeVisible()
    await expect(toastStack).toHaveScreenshot('toast-stack.png', screenshotOptions)
})

test('Layout and Tabs surfaces', async ({ page }) => {
    await page.goto('/components/layout')
    await expect(page.locator('#markdown-example-componentslayout-1 .layout-example')).toHaveScreenshot(
        'layout-responsive.png',
        screenshotOptions,
    )

    await page.goto('/components/tabs')
    await expect(page.locator('#markdown-example-componentstabs-1 [data-h0n-component="tabs"]')).toHaveScreenshot(
        'tabs.png',
        screenshotOptions,
    )
})
