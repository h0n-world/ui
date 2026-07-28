import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Carousel from '../src/components/Carousel/H0Carousel.vue'

const items = ['First', 'Second', 'Third']

afterEach(() => {
    vi.useRealTimers()
})

describe('H0Carousel', () => {
    it('accepts repeated navigation without dropping input during a transition', async () => {
        const wrapper = mount(H0Carousel, { props: { items } })
        const nextButton = wrapper.get('[aria-label="Next slide"]')

        await nextButton.trigger('click')
        await nextButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[1], [2]])
        expect(wrapper.emitted('change')).toEqual([[1], [2]])
    })

    it('supports outside controls, pill pagination and custom control content', () => {
        const wrapper = mount(H0Carousel, {
            props: {
                controlsPosition: 'outside',
                items,
                paginationVariant: 'pills',
                showPagination: true
            },
            slots: {
                'next-control': '<span class="custom-next">Continue</span>',
                'previous-control': '<span class="custom-previous">Back</span>'
            }
        })

        expect(wrapper.find('.h-carousel__outside-controls').exists()).toBe(true)
        expect(wrapper.find('.h-carousel__pagination--pills').exists()).toBe(true)
        expect(wrapper.find('.custom-next').exists()).toBe(true)
        expect(wrapper.find('.custom-previous').exists()).toBe(true)
        expect(wrapper.get('[aria-label="Go to slide 1"]').attributes('aria-current')).toBe('true')
    })

    it('can disable keyboard navigation and exposes programmatic controls', async () => {
        const wrapper = mount(H0Carousel, {
            props: {
                items,
                keyboard: false
            }
        })

        await wrapper.get('.h-carousel__viewport').trigger('keydown', { key: 'ArrowRight' })
        expect(wrapper.emitted('change')).toBeUndefined()

        const controls = wrapper.vm as unknown as { goTo: (index: number) => void; previous: () => void }

        controls.goTo(2)
        controls.previous()

        expect(wrapper.emitted('change')).toEqual([[2], [1]])
    })

    it('advances automatically and pauses while hovered', async () => {
        vi.useFakeTimers()

        const wrapper = mount(H0Carousel, {
            attachTo: document.body,
            props: {
                autoplay: true,
                autoplayInterval: 300,
                items,
                pauseOnHover: true
            }
        })

        await vi.advanceTimersByTimeAsync(300)
        expect(wrapper.emitted('change')).toEqual([[1]])

        await wrapper.trigger('mouseenter')
        await nextTick()
        await vi.advanceTimersByTimeAsync(600)
        expect(wrapper.emitted('change')).toEqual([[1]])

        wrapper.unmount()
    })

    it('removes inactive slides from keyboard interaction when accessibility hiding is enabled', () => {
        const wrapper = mount(H0Carousel, { props: { items } })
        const slides = wrapper.findAll('.h-carousel__slide')

        expect(slides[0].attributes('aria-hidden')).toBeUndefined()
        expect(slides[0].attributes('inert')).toBeUndefined()
        expect(slides[1].attributes('aria-hidden')).toBe('true')
        expect(slides[1].attributes()).toHaveProperty('inert')
    })
})
