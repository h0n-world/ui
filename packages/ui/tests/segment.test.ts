import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Segment from '../src/components/Segment/H0Segment.vue'

const items = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
]

describe('H0Segment', () => {
    it('reflects uncontrolled default and user selection in radio state', async () => {
        const wrapper = mount(H0Segment, { props: { items, defaultValue: 'week' } })
        const radios = wrapper.findAll('[role="radio"]')

        expect(radios.map((radio) => radio.attributes('aria-checked'))).toEqual(['false', 'true', 'false'])
        expect(radios[1]?.classes()).toContain('h-segment__item--active')

        await radios[2]?.trigger('click')

        expect(radios.map((radio) => radio.attributes('aria-checked'))).toEqual(['false', 'false', 'true'])
        expect(wrapper.emitted('change')?.at(-1)).toEqual(['month'])
    })
})
