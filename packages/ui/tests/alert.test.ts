import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Alert from '../src/components/Alert/H0Alert.vue'
import type { H0AlertVariant } from '../src/components/Alert/Alert.types'

describe('H0Alert', () => {
    it('uses the surface variant by default', () => {
        const wrapper = mount(H0Alert, { props: { title: 'Saved' } })

        expect(wrapper.classes()).toContain('h-alert--surface')
    })

    it.each<H0AlertVariant>(['secondary', 'surface', 'outline'])('applies the %s variant', (variant) => {
        const wrapper = mount(H0Alert, { props: { title: 'Status', variant } })

        expect(wrapper.classes()).toContain(`h-alert--${variant}`)
    })
})
