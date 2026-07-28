import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Icon from '../src/components/Icon/H0Icon.vue'
import { warningIcon } from '../src/icons'

describe('H0Icon', () => {
    it('renders a framework-agnostic icon definition', () => {
        const wrapper = mount(H0Icon, {
            props: {
                icon: warningIcon,
                size: 24,
                title: 'Warning'
            }
        })

        const svg = wrapper.get('svg')

        expect(svg.attributes('data-icon')).toBe('warning')
        expect(svg.attributes('width')).toBe('24px')
        expect(svg.attributes('role')).toBe('img')
        expect(svg.get('title').text()).toBe('Warning')
        expect(svg.findAll('path')).toHaveLength(1)
        expect(svg.findAll('line')).toHaveLength(2)
    })
})
