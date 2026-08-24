import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0ContentState from '../src/components/ContentState/H0ContentState.vue'

describe('H0ContentState', () => {
    it('renders only the slot matching the controlled state', async () => {
        const wrapper = mount(H0ContentState, {
            props: { state: 'loading' },
            slots: {
                loading: '<div data-slot="loading">Loading</div>',
                error: '<div data-slot="error">Error</div>',
                empty: '<div data-slot="empty">Empty</div>',
                content: '<div data-slot="content">Content</div>'
            }
        })

        expect(wrapper.attributes('data-state')).toBe('loading')
        expect(wrapper.attributes('aria-busy')).toBe('true')
        expect(wrapper.find('[data-slot="loading"]').exists()).toBe(true)
        expect(wrapper.find('[data-slot="content"]').exists()).toBe(false)

        await wrapper.setProps({ state: 'error' })
        expect(wrapper.attributes('data-state')).toBe('error')
        expect(wrapper.attributes('aria-busy')).toBe('false')
        expect(wrapper.find('[data-slot="error"]').exists()).toBe(true)

        await wrapper.setProps({ state: 'empty' })
        expect(wrapper.find('[data-slot="empty"]').exists()).toBe(true)

        await wrapper.setProps({ state: 'content' })
        expect(wrapper.find('[data-slot="content"]').exists()).toBe(true)
    })

    it('uses the default slot as the content fallback', () => {
        const wrapper = mount(H0ContentState, {
            props: { state: 'content' },
            slots: { default: '<p>Default content</p>' }
        })

        expect(wrapper.text()).toBe('Default content')
    })
})
