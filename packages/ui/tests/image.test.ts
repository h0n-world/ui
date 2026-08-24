import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Image from '../src/components/Image/H0Image.vue'

describe('H0Image presentation', () => {
    it('renders the system error icon in the default fallback', () => {
        const wrapper = mount(H0Image, { props: { alt: 'Unavailable preview', src: '' } })
        const fallback = wrapper.get('.h-image__fallback')

        expect(fallback.attributes('role')).toBe('img')
        expect(fallback.attributes('aria-label')).toBe('Unavailable preview')
        expect(fallback.get('[data-h0n-component="icon"]').attributes('data-icon')).toBe('danger-circle-stroke')
    })

    it('shows the default skeleton while an eager image is loading', () => {
        const wrapper = mount(H0Image, { props: { lazy: false, src: '/pending-image.png' } })

        expect(wrapper.get('.h-image').classes()).toContain('h-image--loading')
        expect(wrapper.findComponent({ name: 'H0Skeleton' }).exists()).toBe(true)
        expect(wrapper.get('.h-image__img').attributes('src')).toBe('/pending-image.png')
    })

    it('forwards fit and position through the image style contract', () => {
        const wrapper = mount(H0Image, { props: { fit: 'contain', objectPosition: 'left top', src: '/preview.png' } })

        expect(wrapper.get('.h-image').attributes('style')).toContain('--h-image-fit: contain')
        expect(wrapper.get('.h-image').attributes('style')).toContain('--h-image-position: left top')
    })
})
