import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Chip from '../src/components/Chip/H0Chip.vue'

describe('H0Chip', () => {
    it('uses sibling buttons for the action and remove controls', async () => {
        const wrapper = mount(H0Chip, {
            props: {
                removable: true,
                removeAriaLabel: 'Remove filter',
                text: 'Active'
            }
        })
        const buttons = wrapper.findAll('button')

        expect(buttons).toHaveLength(2)
        expect(buttons[0].element.parentElement).toBe(buttons[1].element.parentElement)
        expect(wrapper.find('button button').exists()).toBe(false)
        expect(buttons[1].attributes('aria-label')).toBe('Remove filter')

        await buttons[1].trigger('click')
        expect(wrapper.emitted('remove')).toHaveLength(1)
        expect(wrapper.emitted('click')).toBeUndefined()

        await buttons[0].trigger('click')
        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})
