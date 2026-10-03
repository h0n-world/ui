import { mount } from '@vue/test-utils'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { describe, expect, it } from 'vitest'
import H0TextShimmer from '../src/components/TextShimmer/H0TextShimmer.vue'

describe('TextShimmer', () => {
    it('renders slot text once and forwards native/status attributes without automatic announcements', () => {
        const wrapper = mount(H0TextShimmer, { attrs: { id: 'loading', title: 'Current operation' }, slots: { default: 'Thinking...' } })
        expect(wrapper.element.tagName).toBe('SPAN')
        expect(wrapper.text()).toBe('Thinking...')
        expect(Array.from(wrapper.element.childNodes).filter(node => node.textContent?.trim())).toHaveLength(1)
        expect(wrapper.attributes('id')).toBe('loading')
        expect(wrapper.attributes('role')).toBeUndefined()
        expect(wrapper.attributes('aria-live')).toBeUndefined()
        wrapper.unmount()
    })
    it('updates activation, duration and text while preserving semantic attributes', async () => {
        const wrapper = mount(H0TextShimmer, { props: { as: 'p', duration: 3500 }, attrs: { role: 'status', 'aria-live': 'polite', dir: 'rtl' }, slots: { default: '<strong>Loading</strong>' } })
        expect(wrapper.element.tagName).toBe('P')
        expect(wrapper.attributes('role')).toBe('status')
        expect(wrapper.attributes('dir')).toBe('rtl')
        expect((wrapper.element as HTMLElement).style.getPropertyValue('--text-shimmer-duration')).toBe('3500ms')
        await wrapper.setProps({ active: false, duration: 1200 })
        expect(wrapper.classes()).not.toContain('h-text-shimmer--active')
        expect(wrapper.text()).toBe('Loading')
        expect((wrapper.element as HTMLElement).style.getPropertyValue('--text-shimmer-duration')).toBe('1200ms')
        wrapper.unmount()
    })
    it.each([0, -100, Number.NaN, Number.POSITIVE_INFINITY])('keeps invalid duration %s from producing an unusable CSS animation', duration => {
        const wrapper = mount(H0TextShimmer, { props: { duration }, slots: { default: 'Processing' } })
        expect((wrapper.element as HTMLElement).style.getPropertyValue('--text-shimmer-duration')).toBe('2000ms')
        wrapper.unmount()
    })
    it('renders an identical SSR structure independent of browser motion policy', async () => {
        const app = createSSRApp({ render: () => h(H0TextShimmer, { active: true, as: 'div' }, () => 'Streaming') })
        const output = await renderToString(app)
        expect(output).toContain('data-h0n-component="text-shimmer"')
        expect(output.match(/Streaming/g)).toHaveLength(1)
        expect(output).not.toContain('aria-hidden')
        expect(output).not.toContain('aria-live')
    })
})
