import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Select from '../src/components/Select/H0Select.vue'

const options = Array.from({ length: 100 }, (_, value) => ({ value, label: `Option ${value}` }))
describe('Select virtual window', () => {
    it('keeps options visible when the scrolled collection shrinks', async () => {
        const wrapper = mount(H0Select, { props: { options, virtual: true, teleportDisabled: true, optionHeight: 44, scrollHeight: 220 } })
        await wrapper.get('[role=combobox]').trigger('click')
        await flushPromises()
        const list = wrapper.get('[role=listbox]')
        const viewport = list.element as HTMLElement
        viewport.scrollTop = 80 * 44
        await list.trigger('scroll')
        await wrapper.setProps({ options: options.slice(0, 3) })
        expect(wrapper.findAll('[role=option]')).toHaveLength(3)
        wrapper.unmount()
    })
    it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])('shows normal options when optionHeight is invalid: %s', async optionHeight => {
        const wrapper = mount(H0Select, { props: { options: options.slice(0, 3), virtual: true, teleportDisabled: true, optionHeight } })
        await wrapper.get('[role=combobox]').trigger('click')
        await flushPromises()
        expect(wrapper.findAll('[role=option]')).toHaveLength(3)
        expect(wrapper.html()).not.toContain('NaNpx')
        wrapper.unmount()
    })
})
