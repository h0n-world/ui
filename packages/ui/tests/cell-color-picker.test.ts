import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0CellColorPicker from '../src/components/CellColorPicker/H0CellColorPicker.vue'

describe('H0CellColorPicker', () => {
    it('renders a normalized controlled value and emits updates', async () => {
        const wrapper = mount(H0CellColorPicker, { props: { modelValue: '#3b82f6', teleportDisabled: true } })
        expect(wrapper.text()).toContain('#3B82F6')

        await wrapper.get('button').trigger('click')
        const hue = wrapper.get('.h-cell-color-picker__hue')
        await hue.trigger('keydown', { key: 'Home' })

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        expect(wrapper.emitted('change')).toBeTruthy()
        wrapper.unmount()
    })

    it('supports uncontrolled values and swatch placement', async () => {
        const wrapper = mount(H0CellColorPicker, { props: { defaultValue: '#abc', display: 'minimal', swatchPosition: 'left', teleportDisabled: true } })
        expect(wrapper.text()).toContain('#AABBCC')
        expect(wrapper.get('.h-cell-color-picker__value').classes()).toContain('h-cell-color-picker__value--swatch-left')

        await wrapper.get('button').trigger('click')
        await wrapper.get('.h-cell-color-picker__hue').trigger('keydown', { key: 'ArrowRight' })
        expect(wrapper.text()).toMatch(/#[0-9A-F]{6}/)
        wrapper.unmount()
    })

    it('does not open while disabled', async () => {
        const wrapper = mount(H0CellColorPicker, { props: { disabled: true, teleportDisabled: true } })
        await wrapper.get('button').trigger('click')
        expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('keeps a fixed-width HEX value cell', () => {
        const wrapper = mount(H0CellColorPicker, { props: { defaultValue: '#111111' } })
        expect(wrapper.get('.h-cell-color-picker__code').text()).toBe('#111111')
        expect(wrapper.get('.h-cell-color-picker__code').classes()).toContain('h-cell-color-picker__code')
        expect(wrapper.classes()).toContain('h-cell-color-picker--standard')
    })
})
