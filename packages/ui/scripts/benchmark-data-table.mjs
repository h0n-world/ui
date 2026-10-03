import { chromium } from '@playwright/test'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const browser = await chromium.launch()
const page = await browser.newPage()
const modules = []
page.on('request', request => modules.push(request.url()))
await page.goto(`${process.env.H0N_DOCUMENTATION_URL ?? 'http://localhost:5201'}/components/datatable`)
await page.waitForLoadState('networkidle')
const vueUrl = modules.find(url => /\/vue\.js(?:\?|$)/.test(url))
if (!vueUrl) throw new Error('Vue module URL not observed')
const sourcePath = fileURLToPath(new URL('../src/components/DataTable/H0DataTable.vue', import.meta.url)).replaceAll('\\', '/')
const componentUrl = `/@fs${sourcePath.startsWith('/') ? '' : '/'}${sourcePath}`
const results = await page.evaluate(async ({ vueUrl, componentUrl }) => {
  const { createApp, h, nextTick } = await import(vueUrl)
  const { default: Table } = await import(componentUrl)
  const results = []
  for (const count of [10000, 50000]) {
    const rows = Array.from({ length: count }, (_, id) => ({ id, name: `Item ${(id * 7919) % count}` }))
    for (const scenario of ['plain', 'sort', 'filter-sort']) {
      const samples = []
      for (let attempt = 0; attempt < 6; attempt++) {
        const container = document.createElement('div')
        document.body.append(container)
        const started = performance.now()
        const app = createApp({ render: () => h(Table, {
          columns: [{ key: 'name', label: 'Name', sortable: true, filter: { type: 'text' } }], rows,
          getRowKey: row => row.id, paginationMode: 'page', pageSize: 10,
          ...(scenario !== 'plain' ? { sort: { key: 'name', direction: 'asc' } } : {}),
          ...(scenario === 'filter-sort' ? { filters: { name: 'item 1' } } : {}),
        }) })
        app.mount(container)
        await nextTick()
        void container.offsetHeight
        const elapsed = performance.now() - started
        if (attempt > 0) samples.push(elapsed)
        app.unmount(); container.remove()
      }
      samples.sort((a, b) => a - b)
      results.push({ count, scenario, medianMs: samples[2], minMs: samples[0], maxMs: samples[4], samples })
    }
  }
  return { userAgent: navigator.userAgent, timing: 'Source-linked development component mount, client transform, 10-row page and layout; one warm-up plus five samples', results }
}, { vueUrl, componentUrl })
console.log(JSON.stringify(results, null, 2))
if (process.argv[2]) await writeFile(process.argv[2], `${JSON.stringify(results, null, 2)}\n`)
await browser.close()
