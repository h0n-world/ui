import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0ImageUpload from '../src/components/ImageUpload/H0ImageUpload.vue'

describe('H0ImageUpload presentation', () => {
    it('keeps upload restrictions outside the drop surface and connects them accessibly', () => {
        const wrapper = mount(H0ImageUpload, { props: { preset: 'avatar' } })
        const details = wrapper.get('.h-image-upload__details')
        const surface = wrapper.get('.h-image-upload__surface')

        expect(details.text()).toBe('PNG, JPEG, WebP · Max 5 MB')
        expect(details.element.parentElement?.classList).toContain('h-image-upload__supporting')
        expect(surface.find('.h-image-upload__details').exists()).toBe(false)
        expect(surface.attributes('aria-describedby')).toContain(details.attributes('id'))
    })

    it('uses the loading label only as the centered spinner accessible name', () => {
        const wrapper = mount(H0ImageUpload, { props: { loading: true, loadingLabel: 'Processing image' } })
        const overlay = wrapper.get('.h-image-upload__overlay')

        expect(overlay.get('.h-spinner').attributes('aria-label')).toBe('Processing image')
        expect(overlay.text()).toBe('')
    })

    it('keeps both restrictions and a custom hint in the description relationship', () => {
        const wrapper = mount(H0ImageUpload, { props: { hint: 'Use a front-facing photo.' } })
        const describedBy = wrapper.get('.h-image-upload__surface').attributes('aria-describedby').split(' ')
        const hint = wrapper.get('.h-image-upload__hint')

        expect(describedBy).toContain(wrapper.get('.h-image-upload__details').attributes('id'))
        expect(hint.element.parentElement?.classList).toContain('h-image-upload__supporting')
        expect(describedBy).toContain(hint.attributes('id'))
    })
})
