import { expect, test } from '@playwright/test'
import { fileURLToPath } from 'node:url'

test('virtual table handles viewport resizing, dataset shrink and invalid geometry', async ({ page }) => {
    const modules: string[] = []
    page.on('request', request => modules.push(request.url()))
    await page.goto('/components/datatable')
    await page.waitForLoadState('networkidle')
    const vueUrl = modules.find(url => /\/vue\.js(?:\?|$)/.test(url))!
    expect(vueUrl).toBeTruthy()
    const sourcePath = fileURLToPath(new URL('../src/components/DataTable/H0DataTable.vue', import.meta.url)).replaceAll('\\', '/')
    const componentUrl = `/@fs${sourcePath.startsWith('/') ? '' : '/'}${sourcePath}`
    await page.evaluate(async ({ vueUrl, componentUrl }) => {
        const { createApp, h, ref } = await import(vueUrl)
        const { default: Table } = await import(componentUrl)
        const rows = ref(Array.from({ length: 1000 }, (_, id) => ({ id, name: `Row ${id}` })))
        const height = ref(240)
        const rowHeight = ref(48)
        const container = document.createElement('div')
        container.id = 'audit-table'
        Object.assign(container.style, { position: 'fixed', inset: '0', zIndex: '9999', background: 'white' })
        document.body.append(container)
        const app = createApp({ render: () => h(Table, { rows: rows.value, columns: [{ key: 'name', label: 'Name' }], getRowKey: (row: { id: number }) => row.id, virtual: true, rowHeight: rowHeight.value, scrollHeight: height.value, overscan: 0 }) })
        app.mount(container)
        ;(window as any).__tableAudit = { app, rows, height, rowHeight }
    }, { vueUrl, componentUrl })
    const table = page.locator('#audit-table')
    const viewport = table.locator('.h-table__viewport')
    const rendered = table.locator('.h-table__row')
    await expect(rendered).toHaveCount(5)
    await page.evaluate(() => { (window as any).__tableAudit.height.value = 480 })
    await expect(rendered).toHaveCount(10)
    await viewport.evaluate(el => { el.scrollTop = 900 * 48; el.dispatchEvent(new Event('scroll')) })
    await expect(table).toContainText('Row 900')
    await page.evaluate(() => { const state = (window as any).__tableAudit; state.rows.value = state.rows.value.slice(0, 3) })
    await expect(rendered).toHaveCount(3)
    await expect(table).toContainText('Row 0')
    await page.evaluate(() => { (window as any).__tableAudit.rowHeight.value = 0 })
    await expect(rendered).toHaveCount(3)
    expect(await table.evaluate(el => el.innerHTML.includes('NaNpx'))).toBe(false)
    await page.evaluate(() => { (window as any).__tableAudit.app.unmount(); document.getElementById('audit-table')!.remove() })
    await expect(table).toHaveCount(0)
})
