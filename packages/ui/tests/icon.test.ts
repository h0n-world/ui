import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import gamepadIcon from '@h0nio/icons/gamepad-old-stroke'
import heartIcon from '@h0nio/icons/heart-duotone'
import searchIcon from '@h0nio/icons/search'
import H0Icon from '../src/components/Icon/H0Icon.vue'
import type { H0IconDefinition } from '../src/components/Icon/Icon.types'
import { warningIcon } from '../src/icons'

const legacyIcon = {
    name: 'legacy-test',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 8 }],
        ['line', { x1: 8, y1: 12, x2: 16, y2: 12 }]
    ]
} as const satisfies H0IconDefinition

describe('H0Icon', () => {
    it('preserves compatibility facade names for body definitions', () => {
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
        expect(svg.findAll('path').length).toBeGreaterThan(0)
    })

    it('preserves legacy nodes, stroke controls, fallback viewBox and decorative semantics', () => {
        const wrapper = mount(H0Icon, {
            props: {
                icon: legacyIcon,
                size: 18,
                strokeWidth: 1.5,
                strokeLinecap: 'square',
                strokeLinejoin: 'bevel'
            }
        })
        const svg = wrapper.get('svg')

        expect(svg.attributes()).toMatchObject({
            'aria-hidden': 'true',
            'data-icon': 'legacy-test',
            height: '18px',
            stroke: 'currentColor',
            'stroke-linecap': 'square',
            'stroke-linejoin': 'bevel',
            'stroke-width': '1.5',
            viewBox: '0 0 24 24',
            width: '18px'
        })
        expect(svg.findAll('circle')).toHaveLength(1)
        expect(svg.findAll('line')).toHaveLength(1)
    })

    it('renders solid body definitions with currentColor and authored viewBox', () => {
        const svg = mount(H0Icon, { props: { icon: searchIcon } }).get('svg')

        expect(svg.attributes('viewBox')).toBe(searchIcon.viewBox)
        expect(svg.attributes('stroke')).toBeUndefined()
        expect(svg.get('path').attributes('fill')).toBe('currentColor')
    })

    it('renders trusted body definitions without overriding their geometry', () => {
        const wrapper = mount(H0Icon, {
            props: {
                icon: heartIcon,
                size: '1.5rem',
                strokeWidth: 4,
                title: 'Favorite'
            }
        })
        const svg = wrapper.get('svg')

        expect(svg.attributes('data-icon')).toBe('heart-duotone')
        expect(svg.attributes('width')).toBe('1.5rem')
        expect(svg.attributes('stroke-width')).toBeUndefined()
        expect(svg.get('title').text()).toBe('Favorite')
        expect(svg.findAll('path').length).toBeGreaterThan(0)
    })

    it('scopes body definition ids for every icon instance', () => {
        const wrapper = mount({
            render: () => h('div', [h(H0Icon, { icon: gamepadIcon }), h(H0Icon, { icon: gamepadIcon })])
        })
        const ids = wrapper.findAll('clipPath').map((node) => node.attributes('id'))
        const references = wrapper.findAll('[clip-path]').map((node) => node.attributes('clip-path'))

        expect(ids).toHaveLength(2)
        expect(new Set(ids).size).toBe(2)
        expect(references).toEqual(ids.map((id) => `url(#${id})`))
    })
})
