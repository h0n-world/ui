import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0ListItem from '../src/components/List/H0ListItem.vue'
import H0List from '../src/components/List/H0List.vue'
import H0Select from '../src/components/Select/H0Select.vue'

describe('H0Select keyboard navigation', () => {
    it('uses the declared component size instead of leaking Floating UI middleware into class names', () => {
        const wrapper = mount(H0Select, { props: { options: [], size: 'lg' } })

        expect(wrapper.get('.h-select').classes()).toContain('h-select--lg')
        expect(wrapper.get('.h-select').attributes('class')).not.toContain('function')
    })

    it('keeps option DOM bounded for 10,000 fixed-height options', async () => {
        const options = Array.from({ length: 10_000 }, (_, index) => ({ label: `Option ${index}`, value: index }))
        const wrapper = mount(H0Select, { props: { options, virtual: true, optionHeight: 40, scrollHeight: 240, teleportDisabled: true } })

        await wrapper.get('.h-select__trigger').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.findAll('.h-select__option').length).toBeLessThanOrEqual(20)
        wrapper.unmount()
    })

    it('skips disabled options and selects the active option', async () => {
        const wrapper = mount(H0Select, {
            props: {
                id: 'status',
                options: [
                    { label: 'Disabled', value: 'disabled', disabled: true },
                    { label: 'Ready', value: 'ready' },
                    { label: 'Done', value: 'done' }
                ]
            }
        })
        const trigger = wrapper.get('.h-select__trigger')

        await trigger.trigger('keydown', { key: 'ArrowDown' })
        expect(trigger.attributes('aria-expanded')).toBe('true')
        expect(trigger.attributes('aria-activedescendant')).toBe('status-list-option-1')

        await trigger.trigger('keydown', { key: 'ArrowDown' })
        expect(trigger.attributes('aria-activedescendant')).toBe('status-list-option-2')

        await trigger.trigger('keydown', { key: 'Enter' })
        expect(wrapper.emitted('update:modelValue')).toEqual([['done']])
        expect(wrapper.emitted('change')).toEqual([['done']])
        expect(trigger.attributes('aria-expanded')).toBe('false')
    })

    it('supports Home, End and Escape without moving DOM focus into an option', async () => {
        const wrapper = mount(H0Select, {
            attachTo: document.body,
            props: {
                id: 'priority',
                options: [
                    { label: 'Low', value: 'low' },
                    { label: 'High', value: 'high' }
                ]
            }
        })
        const trigger = wrapper.get<HTMLButtonElement>('.h-select__trigger')

        trigger.element.focus()
        await trigger.trigger('keydown', { key: 'End' })
        expect(trigger.attributes('aria-activedescendant')).toBe('priority-list-option-1')
        expect(document.activeElement).toBe(trigger.element)

        await trigger.trigger('keydown', { key: 'Home' })
        expect(trigger.attributes('aria-activedescendant')).toBe('priority-list-option-0')

        await trigger.trigger('keydown', { key: 'Escape' })
        expect(trigger.attributes('aria-expanded')).toBe('false')
        expect(document.activeElement).toBe(trigger.element)

        wrapper.unmount()
    })
})

describe('H0ListItem interaction', () => {
    it('renders an interactive item as a native button by default', () => {
        const wrapper = mount(H0ListItem, {
            props: {
                title: 'Open settings'
            }
        })

        const button = wrapper.get('button')

        expect(button.attributes('type')).toBe('button')
    })

    it('provides keyboard activation when an interactive div is requested', async () => {
        const onClick = vi.fn()
        const wrapper = mount(H0ListItem, {
            attrs: {
                onClick
            },
            props: {
                as: 'div',
                title: 'Open settings'
            }
        })

        const item = wrapper.get('[role="button"]')

        await item.trigger('keydown', { key: 'Enter' })
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('renders a native link and forwards its href', () => {
        const wrapper = mount(H0ListItem, {
            attrs: { href: '/settings' },
            props: { as: 'a', title: 'Settings' }
        })

        expect(wrapper.get('a').attributes('href')).toBe('/settings')
        expect(wrapper.find('[role="button"]').exists()).toBe(false)
    })

    it('renders primary and secondary text without custom markup', () => {
        const wrapper = mount(H0ListItem, {
            props: { title: 'Account', description: 'Profile and security' }
        })

        expect(wrapper.get('.h-list-item__title').text()).toBe('Account')
        expect(wrapper.get('.h-list-item__description').text()).toBe('Profile and security')
    })
})

describe('H0List presentation', () => {
    it('connects a visible section label to an accessible group', () => {
        const wrapper = mount(H0List, {
            props: { label: 'Overview', gap: 'sm', divided: false },
            slots: { default: '<div>Introduction</div>' }
        })

        const list = wrapper.get('.h-list')
        const label = wrapper.get('.h-list__label')

        expect(list.attributes('role')).toBe('group')
        expect(list.attributes('aria-labelledby')).toBe(label.attributes('id'))
        expect(list.classes()).toContain('h-list--gap-sm')
        expect(list.classes()).not.toContain('h-list--divided')
    })
})
