import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0SearchField from '../src/components/SearchField/H0SearchField.vue'

describe('H0SearchField', () => {
    it('updates the controlled value and clears it', async () => {
        const wrapper = mount(H0SearchField, {
            props: {
                modelValue: 'query',
                'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value })
            }
        })

        expect(wrapper.find('input[type="search"]').attributes('placeholder')).toBe('Search...')
        expect(wrapper.findComponent({ name: 'H0Input' }).exists()).toBe(true)
        expect(wrapper.find('.h-input__clear').exists()).toBe(true)

        await wrapper.find('input').setValue('updated')
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['updated'])
        expect(wrapper.emitted('input')?.at(-1)?.[0]).toBe('updated')

        await wrapper.find('.h-input__clear').trigger('click')
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
        expect(wrapper.emitted('clear')).toHaveLength(1)
    })

    it('supports variants, a custom icon and disabled state', () => {
        const wrapper = mount(H0SearchField, {
            props: { modelValue: 'query', variant: 'secondary', disabled: true },
            slots: { icon: '<span data-test="custom-icon">⌘</span>' }
        })

        expect(wrapper.find('.h-search-field').exists()).toBe(false)
        expect(wrapper.findComponent({ name: 'H0Input' }).classes()).toContain('h-input--secondary')
        expect(wrapper.find('[data-test="custom-icon"]').exists()).toBe(true)
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
        expect(wrapper.find('.h-input__clear').exists()).toBe(false)
    })

    it('exposes controlled setValue, clear and focus methods', async () => {
        const wrapper = mount(H0SearchField, { attachTo: document.body, props: { modelValue: 'initial' } })
        const exposed = wrapper.vm as unknown as {
            clear: () => void
            focus: () => void
            setValue: (value: string) => void
        }

        exposed.setValue('from-function')
        exposed.clear()
        exposed.focus()

        expect(wrapper.emitted('update:modelValue')).toEqual([['from-function'], ['']])
        expect(document.activeElement).toBe(wrapper.find('input').element)
        wrapper.unmount()
    })
})
