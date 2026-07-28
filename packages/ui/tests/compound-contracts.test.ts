import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Nui, { createH0LocaleService, H0EmptyState, H0Field, H0Input, H0Tabs, H0TabList, H0Tab, H0TabPanel, H0Tooltip, h0ComponentManifest, useH0RovingFocus } from '../src'
import { h0LocaleKey } from '../src/components/_shared/localeKey'
import { useH0CollectionNavigation } from '../src/components/_shared/useCollectionNavigation'

afterEach(() => { document.body.innerHTML = ''; vi.useRealTimers() })

describe('compound component contracts', () => {
    it('registers every component listed by the manifest', () => {
        const app = createApp({ render: () => null })
        app.use(H0Nui)
        const registered = app._context.components
        for (const entry of h0ComponentManifest) expect(registered[entry.name], entry.name).toBeTruthy()
        app.unmount()
    })

    it('supports keyboard roving focus without selecting disabled items', () => {
        const items = ref([{ text: 'Alpha' }, { text: 'Beta', disabled: true }, { text: 'Gamma' }])
        const roving = useH0RovingFocus({ items, loop: true })
        expect(roving.first()).toBe(0)
        expect(roving.move(1)).toBe(2)
        expect(roving.typeahead('a')).toBe(0)
        roving.dispose()
    })

    it('keeps Tabs change events user-only', async () => {
        const wrapper = mount(H0Tabs, { props: { defaultValue: 'one' }, slots: { default: () => [h(H0TabList, () => [h(H0Tab, { value: 'one' }, () => 'One'), h(H0Tab, { value: 'two' }, () => 'Two')]), h(H0TabPanel, { value: 'one' }, () => 'Panel one'), h(H0TabPanel, { value: 'two' }, () => 'Panel two')] } })
        await wrapper.findAll('[role=tab]')[1].trigger('click')
        expect(wrapper.emitted('change')?.[0]).toEqual(['two'])
        expect(wrapper.findAll('[role=tabpanel]').filter((panel) => panel.isVisible())).toHaveLength(1)
    })

    it('inherits Field metadata while direct control props take precedence', () => {
        const wrapper = mount(defineComponent({ render: () => h(H0Field, { id: 'field-id', name: 'project', label: 'Project', required: true }, () => h(H0Input, { required: false })) }))
        const input = wrapper.get('input')
        expect(input.attributes('id')).toBe('field-id')
        expect(input.attributes('name')).toBe('project')
        expect(input.attributes('required')).toBeUndefined()
    })

    it('cleans Tooltip timers on unmount', async () => {
        vi.useFakeTimers()
        const wrapper = mount(H0Tooltip, { props: { content: 'Hint', openDelay: 50 }, slots: { default: () => 'Target' } })
        await wrapper.trigger('pointerenter')
        wrapper.unmount()
        vi.runAllTimers()
        expect(document.querySelector('[role=tooltip]')).toBeNull()
    })

    it('keeps optional boolean models uncontrolled when modelValue is omitted', async () => {
        vi.useFakeTimers()
        const tooltip = mount(H0Tooltip, { attachTo: document.body, props: { content: 'Hint', openDelay: 0 }, slots: { default: () => 'Target' } })
        await tooltip.get('[data-h0n-component="tooltip"]').trigger('pointerenter')
        vi.runAllTimers()
        await nextTick()
        expect(tooltip.emitted('update:modelValue')).toEqual([[true]])
        expect(document.querySelector('[role=tooltip]')?.textContent).toBe('Hint')
        tooltip.unmount()
    })

    it('treats an explicit false boolean model as controlled', async () => {
        vi.useFakeTimers()
        const tooltip = mount(H0Tooltip, { attachTo: document.body, props: { modelValue: false, content: 'Hint', openDelay: 0 }, slots: { default: () => 'Target' } })
        await tooltip.get('[data-h0n-component="tooltip"]').trigger('pointerenter')
        vi.runAllTimers()
        await nextTick()
        expect(tooltip.emitted('update:modelValue')).toEqual([[true]])
        expect(document.querySelector('[role=tooltip]')).toBeNull()
        tooltip.unmount()
    })

    it('reactively applies locale sections with explicit props taking priority', async () => {
        const service = createH0LocaleService({ emptyState: { title: 'Noch nichts' } })
        const empty = mount(H0EmptyState, { global: { provide: { [h0LocaleKey as symbol]: service } } })
        expect(empty.text()).toContain('Noch nichts')
        service.patchLocale({ emptyState: { title: 'Aucun contenu' } })
        await nextTick()
        expect(empty.text()).toContain('Aucun contenu')
    })

    it('warns when data-driven and compound Tabs APIs are mixed', () => {
        const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const tabs = mount(H0Tabs, { props: { items: [{ value: 'one', label: 'One' }] }, slots: { default: () => h(H0Tab, { value: 'two' }, () => 'Two') } })
        expect(warning).toHaveBeenCalledWith(expect.stringContaining('H0Tabs'))
        tabs.unmount()
    })

    it('shares disabled-aware navigation and typeahead semantics across collections', () => {
        const items = ref([{ label: 'Alpha' }, { label: 'Beta', disabled: true }, { label: 'Bravo' }])
        const navigation = useH0CollectionNavigation({ items, disabled: (item) => Boolean(item.disabled) })
        expect(navigation.move(0, 1)).toBe(2)
        expect(navigation.move(2, 1)).toBe(0)
        expect(navigation.matchTypeahead('br', 0, (item) => item.label)).toBe(2)
    })
})
