import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Radio from '../src/components/Radio/H0Radio.vue'
import H0RadioGroup from '../src/components/Radio/H0RadioGroup.vue'
import type { H0RadioOption } from '../src/components/Radio/Radio.types'

const options: H0RadioOption[] = [
    { title: 'Standard', description: '4–10 business days', price: '$5.00', value: 'standard' },
    { title: 'Express', description: '2–5 business days', price: '$16.00', value: 'express' },
    { title: 'Super Fast', description: '1 business day', price: '$25.00', value: 'super-fast', disabled: true }
]

describe('H0Radio', () => {
    it('selects its value and respects disabled state', async () => {
        const wrapper = mount(H0Radio, { props: { modelValue: null, value: 'one', label: 'One' } })

        await wrapper.find('input').setValue(true)
        expect(wrapper.emitted('update:modelValue')).toEqual([['one']])
        expect(wrapper.emitted('change')?.[0]?.[0]).toBe('one')

        await wrapper.setProps({ disabled: true })
        expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('validates required and custom rules through the exposed controller', async () => {
        const wrapper = mount(H0Radio, {
            props: { modelValue: null, value: 'one', required: true, validator: (value) => value === 'one' || 'Choose one' }
        })
        const exposed = wrapper.vm as unknown as { validate: () => boolean }

        expect(exposed.validate()).toBe(false)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Select an option')

        await wrapper.setProps({ modelValue: 'one' })
        expect(exposed.validate()).toBe(true)
    })
})

describe('H0RadioGroup', () => {
    it('renders list options and emits one selected value', async () => {
        const wrapper = mount(H0RadioGroup, { props: { modelValue: 'standard', options, orientation: 'horizontal' } })

        expect(wrapper.classes()).toContain('h-radio-group--horizontal')
        expect(wrapper.findAll('input[type="radio"]')).toHaveLength(3)
        await wrapper.findAll('input')[1].setValue(true)
        expect(wrapper.emitted('update:modelValue')).toEqual([['express']])
        expect(wrapper.emitted('change')).toEqual([['express']])
    })

    it('renders card options and validates the group', async () => {
        const wrapper = mount(H0RadioGroup, { props: { modelValue: null, options, variant: 'cards', required: true } })
        const exposed = wrapper.vm as unknown as { validate: () => boolean }

        expect(wrapper.findAll('.h-radio-group__card-option')).toHaveLength(3)
        expect(wrapper.text()).toContain('$16.00')
        expect(exposed.validate()).toBe(false)
        await wrapper.vm.$nextTick()
        expect(wrapper.find('[role="alert"]').text()).toBe('Select an option.')

        await wrapper.findAll('.h-radio-group__card-option')[1].trigger('click')
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['express'])
    })
})
