import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Input from '../src/components/Input/H0Input.vue'
import H0Checkbox from '../src/components/Checkbox/H0Checkbox.vue'
import H0NumberInput from '../src/components/NumberInput/H0NumberInput.vue'
import H0PasswordInput from '../src/components/PasswordInput/H0PasswordInput.vue'
import H0Radio from '../src/components/Radio/H0Radio.vue'
import H0SearchField from '../src/components/SearchField/H0SearchField.vue'
import H0Select from '../src/components/Select/H0Select.vue'
import H0Switch from '../src/components/Switch/H0Switch.vue'
import H0Textarea from '../src/components/Textarea/H0Textarea.vue'

describe('form control messages', () => {
    it('keeps an external Input error visible for a non-empty required value', () => {
        const wrapper = mount(H0Input, {
            props: {
                error: 'Email is already used',
                id: 'email',
                modelValue: 'user@example.com',
                required: true
            }
        })

        const input = wrapper.get('input')
        const message = wrapper.get('.h-input__message')

        expect(message.text()).toBe('Email is already used')
        expect(message.attributes('id')).toBe('email-message')
        expect(message.attributes('role')).toBe('alert')
        expect(message.classes()).toContain('h-error-message')
        expect(input.attributes('aria-invalid')).toBe('true')
        expect(input.attributes('aria-describedby')).toBe('email-message')
        expect(input.attributes('aria-errormessage')).toBe('email-message')
    })

    it('connects a Textarea hint to its generated control id', () => {
        const wrapper = mount(H0Textarea, {
            props: {
                hint: 'Maximum 200 characters',
                modelValue: 'Text'
            }
        })

        const textarea = wrapper.get('textarea')
        const message = wrapper.get('.h-textarea__message')

        expect(textarea.attributes('id')).toBeTruthy()
        expect(textarea.attributes('aria-describedby')).toBe(message.attributes('id'))
        expect(textarea.attributes('aria-errormessage')).toBeUndefined()
        expect(message.classes()).toContain('h-description')
    })

    it('keeps an external Select error visible for a selected required value', () => {
        const wrapper = mount(H0Select, {
            props: {
                error: 'This option is unavailable',
                id: 'plan',
                modelValue: 'pro',
                options: [{ label: 'Pro', value: 'pro' }],
                required: true
            }
        })

        const trigger = wrapper.get('.h-select__trigger')

        expect(wrapper.get('.h-select__message').text()).toBe('This option is unavailable')
        expect(wrapper.get('.h-select__message').attributes('role')).toBe('alert')
        expect(trigger.attributes('aria-invalid')).toBe('true')
        expect(trigger.attributes('aria-describedby')).toBe('plan-message')
        expect(trigger.attributes('aria-errormessage')).toBe('plan-message')
    })
})

describe('form control attribute routing', () => {
    const cases = [
        { name: 'Input', component: H0Input, props: {}, control: 'input' },
        { name: 'Textarea', component: H0Textarea, props: {}, control: 'textarea' },
        { name: 'Checkbox', component: H0Checkbox, props: {}, control: 'input' },
        { name: 'Radio', component: H0Radio, props: { value: 'one' }, control: 'input' },
        { name: 'Switch', component: H0Switch, props: {}, control: 'input' },
        { name: 'NumberInput', component: H0NumberInput, props: {}, control: 'input' },
        { name: 'PasswordInput', component: H0PasswordInput, props: {}, control: 'input' },
        { name: 'SearchField', component: H0SearchField, props: {}, control: 'input' },
        { name: 'Select', component: H0Select, props: { options: [{ label: 'One', value: 'one' }] }, control: 'button.h-select__trigger' },
    ] as const

    it.each(cases)('routes $name root and control attributes without leaking them across boundaries', ({ component, props, control }) => {
        const wrapper = mount(component as never, {
            attrs: { 'data-fallthrough': 'root', title: 'fallthrough title' },
            props: {
                ...props,
                rootAttrs: { 'data-root': 'explicit', title: 'rootAttrs title' },
                controlAttrs: { 'aria-labelledby': 'external-label', 'data-control': 'native' },
            },
        })
        const nativeControl = wrapper.get(control)

        expect(wrapper.attributes('data-fallthrough')).toBe('root')
        expect(wrapper.attributes('data-root')).toBe('explicit')
        expect(wrapper.attributes('title')).toBe('rootAttrs title')
        expect(wrapper.attributes('data-control')).toBeUndefined()
        expect(nativeControl.attributes('data-control')).toBe('native')
        expect(nativeControl.attributes('aria-labelledby')).toBe('external-label')
        expect(nativeControl.attributes('data-fallthrough')).toBeUndefined()
    })
})
