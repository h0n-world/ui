import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import H0Command from '../src/components/Command/H0Command.vue'
import type { H0CommandItem } from '../src/components/Command/Command.types'

const items: H0CommandItem[] = [
    { value: 'new-file', label: 'Create new file', group: 'Actions' },
    { value: 'new-folder', label: 'Create new folder', group: 'Actions', disabled: true },
    { value: 'preferences', label: 'Preferences', description: 'Open application preferences', group: 'Settings', keywords: ['configuration'] },
]

describe('H0Command', () => {
    it('opens from its trigger and exposes dialog semantics', async () => {
        const wrapper = mount(H0Command, { props: { items, teleportDisabled: true } })

        await wrapper.get('.h-command__trigger').trigger('click')

        expect(wrapper.get('[role="dialog"]').attributes('aria-modal')).toBe('true')
        expect(wrapper.get('[role="combobox"]').attributes('aria-controls')).toBeTruthy()
        expect(wrapper.emitted('open')).toHaveLength(1)
        expect(wrapper.emitted('change')?.[0]).toEqual([true])
        wrapper.unmount()
    })

    it('focuses search through the overlay without scrolling the document', async () => {
        const focus = vi.spyOn(HTMLElement.prototype, 'focus')
        const wrapper = mount(H0Command, { attachTo: document.body, props: { items, teleportDisabled: true } })

        await wrapper.get('.h-command__trigger').trigger('click')
        await nextTick()

        const input = wrapper.get<HTMLInputElement>('.h-command__input').element
        const inputFocusIndex = focus.mock.instances.findIndex((element) => element === input)
        expect(inputFocusIndex).toBeGreaterThanOrEqual(0)
        expect(focus.mock.calls[inputFocusIndex]?.[0]).toEqual({ preventScroll: true })

        wrapper.unmount()
        focus.mockRestore()
    })

    it('filters commands by keywords and reports query changes', async () => {
        const wrapper = mount(H0Command, { props: { defaultValue: true, items, teleportDisabled: true } })
        const input = wrapper.get<HTMLInputElement>('.h-command__input')

        await input.setValue('configuration')

        expect(wrapper.findAll('.h-command__item')).toHaveLength(1)
        expect(wrapper.text()).toContain('Preferences')
        expect(wrapper.emitted('update:query')?.at(-1)).toEqual(['configuration'])
        expect(wrapper.emitted('search')?.at(-1)).toEqual(['configuration'])
        wrapper.unmount()
    })

    it('skips disabled commands and selects the active item with Enter', async () => {
        const wrapper = mount(H0Command, { props: { defaultValue: true, items, teleportDisabled: true } })
        const input = wrapper.get('.h-command__input')

        await input.trigger('keydown', { key: 'ArrowDown' })
        await input.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ value: 'preferences' })
        expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
        expect(wrapper.emitted('close')).toHaveLength(1)
        wrapper.unmount()
    })

    it('scrolls active items for keyboard navigation but not pointer hover', async () => {
        const originalScrollIntoView = HTMLElement.prototype.scrollIntoView
        const scrollIntoView = vi.fn()
        Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: scrollIntoView })
        const wrapper = mount(H0Command, { props: { defaultValue: true, items, teleportDisabled: true } })

        try {
            await nextTick()
            await nextTick()
            scrollIntoView.mockClear()

            await wrapper.findAll('.h-command__item')[2]!.trigger('pointermove')
            await nextTick()
            expect(scrollIntoView).not.toHaveBeenCalled()

            await wrapper.get('.h-command__input').trigger('keydown', { key: 'ArrowUp' })
            await nextTick()
            expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' })
        } finally {
            wrapper.unmount()
            if (originalScrollIntoView) {
                Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: originalScrollIntoView })
            } else {
                Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
            }
        }
    })

    it('opens with a configured global hotkey', async () => {
        const wrapper = mount(H0Command, { props: { hotkey: 'ctrl+k', items, teleportDisabled: true } })

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))
        await nextTick()

        expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
        wrapper.unmount()
    })

    it('does not open while disabled', async () => {
        const wrapper = mount(H0Command, { props: { disabled: true, hotkey: 'ctrl+k', teleportDisabled: true } })

        await wrapper.get('.h-command__trigger').trigger('click')
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
        await nextTick()

        expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
        wrapper.unmount()
    })
})
