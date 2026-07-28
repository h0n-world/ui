import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Button from '../src/components/Button/H0Button.vue'
import { closeIcon } from '../src/icons'

describe('H0Button', () => {
    it('uses safe native defaults', () => {
        const wrapper = mount(H0Button, {
            slots: {
                default: 'Save'
            }
        })

        const button = wrapper.get('button')

        expect(button.attributes('type')).toBe('button')
        expect(button.text()).toContain('Save')
        expect(button.classes()).toContain('h-button--md')
    })

    it('renders an explicitly labelled icon-only button', () => {
        const wrapper = mount(H0Button, {
            props: {
                ariaLabel: 'Close',
                buttonType: 'onlyIcon',
                icon: closeIcon
            }
        })

        const button = wrapper.get('button')

        expect(button.attributes('aria-label')).toBe('Close')
        expect(button.find('svg').exists()).toBe(true)
    })

    it('accepts custom icon content without an icon definition', () => {
        const wrapper = mount(H0Button, {
            props: {
                ariaLabel: 'Custom action',
                buttonType: 'onlyIcon'
            },
            slots: {
                icon: '<svg data-custom-icon="true" />'
            }
        })

        expect(wrapper.get('[data-custom-icon="true"]').exists()).toBe(true)
    })

    it.each(['primary', 'success', 'warning', 'danger'] as const)('renders the %s soft tone', (tone) => {
        const wrapper = mount(H0Button, {
            props: { tone, variant: 'soft' }
        })

        expect(wrapper.get('button').classes()).toContain(`h-button--tone-${tone}`)
        expect(wrapper.get('button').classes()).toContain('h-button--variant-soft')
        expect(wrapper.get('button').classes()).toContain(`h-button--${tone}-soft`)
    })
})
