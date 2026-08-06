import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0InputOTP from '../src/components/InputOTP/H0InputOTP.vue'

describe('H0InputOTP', () => {
    it('uses medium by default and supports small and large sizes', async () => {
        const wrapper = mount(H0InputOTP)

        expect(wrapper.get('.h-input-otp').classes()).toContain('h-input-otp--md')

        await wrapper.setProps({ size: 'sm' })
        expect(wrapper.get('.h-input-otp').classes()).toContain('h-input-otp--sm')

        await wrapper.setProps({ size: 'lg' })
        expect(wrapper.get('.h-input-otp').classes()).toContain('h-input-otp--lg')
    })

    it('redirects focus to the first available cell', async () => {
        const wrapper = mount(H0InputOTP, {
            attachTo: document.body,
            props: {
                length: 4,
                modelValue: ''
            }
        })
        const inputs = wrapper.findAll<HTMLInputElement>('.h-input-otp__cell')

        inputs[3].element.focus()
        expect(document.activeElement).toBe(inputs[0].element)

        await wrapper.setProps({ modelValue: '12' })
        inputs[3].element.focus()
        expect(document.activeElement).toBe(inputs[2].element)

        wrapper.unmount()
    })

    it('always removes characters from the end', async () => {
        const wrapper = mount(H0InputOTP, {
            props: {
                length: 4,
                modelValue: '123'
            }
        })

        await wrapper.findAll('.h-input-otp__cell')[0].trigger('keydown', { key: 'Backspace' })

        expect(wrapper.emitted('update:modelValue')).toEqual([['12']])
        expect(wrapper.emitted('change')).toEqual([['12']])
    })

    it('renders the six-character code as two visual groups', () => {
        const wrapper = mount(H0InputOTP, {
            props: {
                length: 6,
                modelValue: ''
            }
        })

        expect(wrapper.findAll('.h-input-otp__group')).toHaveLength(2)
        expect(wrapper.findAll('.h-input-otp__separator')).toHaveLength(1)
        expect(wrapper.findAll('.h-input-otp__cell')).toHaveLength(6)
        expect(wrapper.findAll('.h-input-otp__cell-shell')).toHaveLength(6)
    })

    it('keeps a native input for the caret and renders values in an animated visual layer', async () => {
        const wrapper = mount(H0InputOTP, {
            props: {
                length: 4,
                modelValue: '12'
            }
        })

        const inputs = wrapper.findAll<HTMLInputElement>('.h-input-otp__cell')
        const cells = wrapper.findAll('.h-input-otp__cell-shell')

        expect(inputs).toHaveLength(4)
        expect(cells[0].classes()).toContain('h-input-otp__cell-shell--filled')
        expect(cells[2].classes()).not.toContain('h-input-otp__cell-shell--filled')
        expect(wrapper.findAll('.h-input-otp__character').map((character) => character.text())).toEqual(['1', '2'])

        await wrapper.setProps({ modelValue: '1' })
        expect(cells[1].classes()).not.toContain('h-input-otp__cell-shell--filled')
    })

    it('filters numeric input and auto-completes a valid code', async () => {
        const validator = vi.fn((value: string) => value === '1234')
        const wrapper = mount(H0InputOTP, {
            props: {
                length: 4,
                modelValue: '123',
                validator
            }
        })

        await wrapper.setProps({ modelValue: '1234' })

        expect(validator).toHaveBeenCalledWith('1234')
        expect(wrapper.emitted('complete')).toEqual([['1234']])
        expect(wrapper.emitted('invalid')).toBeUndefined()
    })

    it('shows validator errors and does not complete an invalid code', async () => {
        const wrapper = mount(H0InputOTP, {
            props: {
                length: 4,
                modelValue: '123',
                validator: () => 'The verification code has expired'
            }
        })

        await wrapper.setProps({ modelValue: '9999' })

        expect(wrapper.get('.h-input-otp__message').text()).toBe('The verification code has expired')
        expect(wrapper.get('.h-input-otp__message').attributes('role')).toBe('alert')
        expect(wrapper.get('.h-input-otp__message').classes()).toContain('h-error-message')
        expect(wrapper.emitted('invalid')).toEqual([['9999', 'The verification code has expired']])
        expect(wrapper.emitted('complete')).toBeUndefined()
    })

    it('blocks input when disabled', async () => {
        const wrapper = mount(H0InputOTP, {
            props: {
                disabled: true,
                length: 4,
                modelValue: ''
            }
        })

        expect(wrapper.findAll('input:disabled')).toHaveLength(4)
        await wrapper.find('.h-input-otp__cell').trigger('input')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
})
