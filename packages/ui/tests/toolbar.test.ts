import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import H0Toolbar from '../src/components/Toolbar/H0Toolbar.vue'
import H0ToolbarGroup from '../src/components/Toolbar/H0ToolbarGroup.vue'
import H0ToolbarItem from '../src/components/Toolbar/H0ToolbarItem.vue'
import H0ToolbarSeparator from '../src/components/Toolbar/H0ToolbarSeparator.vue'

const items = [
    { value: 'bold', label: 'Bold' },
    { value: 'disabled', label: 'Disabled', disabled: true },
    { value: 'italic', label: 'Italic' },
]

describe('H0Toolbar', () => {
    it('moves roving focus across enabled data items', async () => {
        const wrapper = mount(H0Toolbar, { attachTo: document.body, props: { items } })
        const buttons = wrapper.findAll('button')

        expect(buttons.map((button) => button.attributes('tabindex'))).toEqual(['0', undefined, '-1'])

        await buttons[0]?.trigger('focus')
        await buttons[0]?.trigger('keydown', { key: 'ArrowRight' })
        expect(document.activeElement).toBe(buttons[2]?.element)

        await buttons[2]?.trigger('keydown', { key: 'ArrowRight' })
        expect(document.activeElement).toBe(buttons[0]?.element)
        wrapper.unmount()
    })

    it('maintains one tab stop for compound toolbar items', async () => {
        const wrapper = mount(H0Toolbar, {
            attachTo: document.body,
            slots: {
                default: () => [h(H0ToolbarItem, { value: 'undo' }, () => 'Undo'), h(H0ToolbarItem, { value: 'redo' }, () => 'Redo')],
            },
        })
        const buttons = wrapper.findAll('button')

        expect(buttons.map((button) => button.attributes('tabindex'))).toEqual(['0', '-1'])

        await buttons[1]?.trigger('focus')
        await buttons[1]?.trigger('keydown', { key: 'ArrowLeft' })
        expect(document.activeElement).toBe(buttons[0]?.element)
        wrapper.unmount()
    })

    it('respects loop=false at the toolbar boundary', async () => {
        const wrapper = mount(H0Toolbar, { attachTo: document.body, props: { items, loop: false } })
        const buttons = wrapper.findAll('button')

        await buttons[2]?.trigger('focus')
        await buttons[2]?.trigger('keydown', { key: 'ArrowRight' })
        expect(document.activeElement).toBe(buttons[2]?.element)
        wrapper.unmount()
    })

    it('applies size, full-width, and pressed styling contracts in data mode', () => {
        const wrapper = mount(H0Toolbar, {
            props: {
                fullWidth: true,
                size: 'lg',
                items: [{ value: 'bold', label: 'Bold', pressed: true }],
            },
        })

        expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-toolbar--data', 'h-toolbar--horizontal', 'h-toolbar--lg', 'h-toolbar--full-width']))
        expect(wrapper.get('button').classes()).toContain('h-toolbar__item')
        expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
    })

    it('passes layout context to compound groups, items, and separators', async () => {
        const wrapper = mount(H0Toolbar, {
            props: { fullWidth: true, orientation: 'vertical', size: 'sm' },
            slots: {
                default: () => [
                    h(H0ToolbarGroup, { ariaLabel: 'Formatting' }, () => [
                        h(H0ToolbarItem, { value: 'bold', pressed: true }, () => 'Bold'),
                        h(H0ToolbarItem, { value: 'italic' }, () => 'Italic'),
                    ]),
                    h(H0ToolbarSeparator),
                ],
            },
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.get('[data-h0n-component="toolbar-group"]').classes()).toEqual(expect.arrayContaining(['h-toolbar-group--vertical', 'h-toolbar-group--full-width']))
        expect(wrapper.get('[data-h0n-component="toolbar-item"]').classes()).toEqual(expect.arrayContaining(['h-toolbar-item--vertical', 'h-toolbar-item--sm', 'h-toolbar-item--full-width']))
        expect(wrapper.get('[data-h0n-component="toolbar-item"]').attributes('aria-pressed')).toBe('true')
        expect(wrapper.get('[data-h0n-component="toolbar-separator"]').classes()).toContain('h-toolbar-separator--horizontal')
        expect(wrapper.get('[data-h0n-component="toolbar-separator"]').attributes('aria-orientation')).toBe('horizontal')
    })
})
