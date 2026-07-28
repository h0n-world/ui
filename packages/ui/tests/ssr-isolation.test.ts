import { createSSRApp, defineComponent, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it, vi } from 'vitest'
import H0Accordion from '../src/components/Accordion/H0Accordion.vue'
import H0Image from '../src/components/Image/H0Image.vue'
import H0Modal from '../src/components/Modal/H0Modal.vue'
import H0Toasts from '../src/components/Toast/H0Toasts.vue'
import { createH0ToastService } from '../src/components/Toast/toast'
import { createH0LocaleService } from '../src/locale'
import { H0Select, H0Tab, H0TabList, H0TabPanel, H0Tabs, H0Tooltip } from '../src'

const accordionItems = [{ title: 'First', content: 'Content' }]

describe('SSR-safe component state', () => {
    it('creates unique Accordion ids and reproduces them in independent renders', async () => {
        const render = () => renderToString(createSSRApp({ render: () => h('main', [h(H0Accordion, { items: accordionItems }), h(H0Accordion, { items: accordionItems })]) }))
        const firstRender = await render()
        const secondRender = await render()
        const ids = [...firstRender.matchAll(/id="([^"]+-header-0)"/g)].map((match) => match[1])

        expect(ids).toHaveLength(2)
        expect(new Set(ids).size).toBe(2)
        expect(secondRender).toBe(firstRender)
    })

    it('honours an explicit consumer-controlled Accordion prefix', async () => {
        const html = await renderToString(createSSRApp({ render: () => h(H0Accordion, { id: 'account-faq', items: accordionItems }) }))

        expect(html).toContain('id="account-faq-header-0"')
        expect(html).toContain('aria-controls="account-faq-panel-0"')
    })

    it('isolates Toast state between services and SSR application renders', async () => {
        const firstService = createH0ToastService()
        const secondService = createH0ToastService()

        firstService.success({ title: 'Only first app', duration: 0 })

        expect(firstService.state.toasts).toHaveLength(1)
        expect(secondService.state.toasts).toHaveLength(0)

        const firstRender = await renderToString(createSSRApp({ render: () => h(H0Toasts, { service: firstService }) }))
        const secondRender = await renderToString(createSSRApp({ render: () => h(H0Toasts, { service: secondService }) }))

        expect(firstRender).toBe('<!--teleport start--><!--teleport end-->')
        expect(secondRender).toBe(firstRender)

        firstService.dispose()
        secondService.dispose()
    })

    it('hydrates lazy images and closed overlays without hydration warnings', async () => {
        const Root = defineComponent({
            render: () => h('main', [h(H0Image, { src: '/image.webp', alt: 'Preview', lazy: true }), h(H0Modal, { modelValue: false, title: 'Details' })])
        })
        const context: { teleports?: Record<string, string> } = {}
        const serverHtml = await renderToString(createSSRApp(Root), context)
        const container = document.createElement('div')
        container.innerHTML = serverHtml
        document.body.append(container)
        document.body.insertAdjacentHTML('beforeend', context.teleports?.body ?? '')
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const app = createSSRApp(Root)

        app.mount(container)
        await nextTick()

        const warnings = warning.mock.calls.flat().map((value) => String(value)).join(' ')
        expect(warnings).not.toMatch(/hydration/i)
        app.unmount()
        warning.mockRestore()
        container.remove()
    })

    it('renders interactive families deterministically without process-global state', async () => {
        const Root = defineComponent({
            render: () => h('main', [
                h(H0Tooltip, { content: 'Hint' }, () => 'Target'),
                h(H0Tabs, { defaultValue: 'one' }, () => [h(H0TabList, null, () => h(H0Tab, { value: 'one' }, () => 'One')), h(H0TabPanel, { value: 'one' }, () => 'Panel')]),
                h(H0Select, { options: [{ value: 'one', label: 'One' }] })
            ])
        })
        const first = await renderToString(createSSRApp(Root))
        const second = await renderToString(createSSRApp(Root))
        expect(second).toBe(first)
        expect(first).not.toContain('role="listbox"')
        expect(first).not.toContain('role="menu"')
    })

    it('keeps locale services isolated between SSR applications', async () => {
        const first = createH0LocaleService({ emptyState: { title: 'First locale' } })
        const second = createH0LocaleService({ emptyState: { title: 'Second locale' } })
        first.patchLocale({ common: { loading: 'Loading A' } })
        expect(first.locale.value.emptyState.title).toBe('First locale')
        expect(second.locale.value.emptyState.title).toBe('Second locale')
        expect(second.locale.value.common.loading).toBe('Loading')
    })
})
