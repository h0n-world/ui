// @vitest-environment node
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it, vi } from 'vitest'
import H0Nui, { H0Carousel, H0Command, H0DataTable, H0Dropdown, H0FileUpload, H0Image, H0InfiniteScroll, H0Select, H0TextShimmer, H0Tooltip } from '../src'

describe('actual server environment', () => {
    it('renders the runtime-heavy families without browser globals', async () => {
        expect(typeof window).toBe('undefined')
        expect(typeof document).toBe('undefined')
        const render = async () => {
            const app = createSSRApp({ render: () => h('main', [
                h(H0Command, { items: [] }), h(H0InfiniteScroll), h(H0Carousel, { items: [] }),
                h(H0Image, { src: '/preview.png', alt: 'Preview', lazy: true }),
                h(H0DataTable, { columns: [{ key: 'name', label: 'Name' }], rows: [{ id: 1, name: 'Server row' }], getRowKey: row => Number(row.id), virtual: true, scrollHeight: 240 }),
                h(H0Select, { options: [{ label: 'One', value: 1 }], virtual: true }),
                h(H0Dropdown, null, { default: () => h('button', 'Actions'), content: () => 'Menu' }),
                h(H0Tooltip, { content: 'Hint' }, () => h('button', 'Target')),
                h(H0TextShimmer, null, () => 'Processing'), h(H0FileUpload),
            ]) })
            app.use(H0Nui, { theme: { theme: 'system', animation: 'recommended' } })
            return renderToString(app)
        }
        const first = await render()
        expect(first).toContain('Server row')
        expect(first).toContain('Processing')
        expect(await render()).toBe(first)
    })
    it('does not allocate browser preview URLs during file-upload SSR', async () => {
        const create = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:server-test')
        const file = new File(['image'], 'preview.png', { type: 'image/png' })
        const html = await renderToString(createSSRApp({ render: () => h(H0FileUpload, { defaultValue: [file] }) }))
        expect(html).toContain('preview.png')
        expect(create).not.toHaveBeenCalled()
        create.mockRestore()
    })
})
