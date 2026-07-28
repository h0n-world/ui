import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import H0SideNav from '../src/components/SideNav/H0SideNav.vue'
import H0SideNavGroup from '../src/components/SideNav/H0SideNavGroup.vue'
import H0SideNavItem from '../src/components/SideNav/H0SideNavItem.vue'

const RouterLinkStub = defineComponent({
    name: 'RouterLinkStub',
    inheritAttrs: false,
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props, { attrs, slots }) {
        return () => h('a', { ...attrs, class: [attrs.class, 'router-link-active'], href: props.to }, slots.default?.())
    }
})

describe('H0SideNav', () => {
    it('renders grouped navigation with an accessible label and default indicators', () => {
        const wrapper = mount(H0SideNav, {
            attrs: { 'aria-label': 'Documentation' },
            slots: {
                default: () =>
                    h(H0SideNavGroup, { label: 'Overview' }, () => [
                        h(H0SideNavItem, { active: true, href: '#introduction', title: 'Introduction' }),
                        h(H0SideNavItem, { href: '#quick-start', title: 'Quick start' })
                    ])
            }
        })

        expect(wrapper.get('nav').attributes('aria-label')).toBe('Documentation')
        expect(wrapper.get('.h-side-nav-group').attributes('role')).toBe('group')
        expect(wrapper.findAll('.h-side-nav-item')).toHaveLength(2)
        expect(wrapper.findAll('.h-side-nav-item__indicator')).toHaveLength(2)
        expect(wrapper.get('.h-side-nav-item').classes()).toContain('h-list-item--interactive')
        expect(wrapper.get('.h-side-nav-item--active').attributes('aria-current')).toBe('page')
    })

    it('supports RouterLink-like components without adding button semantics', () => {
        const consoleWarning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const wrapper = mount(H0SideNavItem, {
            attrs: { to: '/settings' },
            props: { as: RouterLinkStub, title: 'Settings' }
        })

        const link = wrapper.get('a')

        expect(link.attributes('href')).toBe('/settings')
        expect(link.classes()).toContain('router-link-active')
        expect(link.attributes('role')).toBeUndefined()
        expect(link.attributes('tabindex')).toBeUndefined()
        expect(consoleWarning.mock.calls.flat().join(' ')).not.toContain('Invalid prop')

        consoleWarning.mockRestore()
    })

    it('allows the indicator and its animation to be disabled', () => {
        const nav = mount(H0SideNav, { props: { animatedIndicator: false } })
        const item = mount(H0SideNavItem, { props: { indicator: false, title: 'Billing' } })

        expect(nav.get('nav').classes()).not.toContain('h-side-nav--animated-indicator')
        expect(item.find('.h-side-nav-item__indicator').exists()).toBe(false)
    })
})
