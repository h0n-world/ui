import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Stepper from '../src/components/Stepper/H0Stepper.vue'

const items = [{ label: 'Account' }, { label: 'Workspace' }, { label: 'Complete' }]

describe('H0Stepper', () => {
    it('marks completed, active, and pending items from the one-based step', () => {
        const wrapper = mount(H0Stepper, { props: { items, step: 2 } })
        const renderedItems = wrapper.findAll('.h-stepper__item')

        expect(renderedItems[0].classes()).toContain('h-stepper__item--complete')
        expect(renderedItems[1].classes()).toContain('h-stepper__item--active')
        expect(renderedItems[2].classes()).toContain('h-stepper__item--pending')
        expect(renderedItems[1].get('.h-stepper__label').attributes('aria-current')).toBe('step')
    })

    it('applies vertical orientation and the declared size', () => {
        const wrapper = mount(H0Stepper, { props: { items, orientation: 'vertical', size: 'lg' } })

        expect(wrapper.get('.h-stepper').classes()).toEqual(expect.arrayContaining(['h-stepper--vertical', 'h-stepper--lg']))
    })
})
