import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0ScrollArea from '../src/components/ScrollArea/H0ScrollArea.vue'

describe('H0ScrollArea', () => {
    it('forwards imperative scrolling and reports boundary changes', async () => {
        const wrapper = mount(H0ScrollArea, {
            props: {
                maxHeight: 180,
                fadeEdges: true
            },
            slots: {
                default: '<div style="height: 600px">Scrollable content</div>'
            }
        })
        const viewport = wrapper.get('.h-scroll__viewport')
        const element = viewport.element as HTMLElement
        const scrollTo = vi.fn()
        const scrollBy = vi.fn()
        Object.defineProperties(element, {
            clientHeight: { configurable: true, value: 180 },
            scrollHeight: { configurable: true, value: 600 },
            scrollTop: { configurable: true, writable: true, value: 0 },
            scrollTo: { configurable: true, value: scrollTo },
            scrollBy: { configurable: true, value: scrollBy }
        })
        const exposed = wrapper.vm as unknown as {
            scrollTo: (options: ScrollToOptions) => void
            scrollBy: (options: ScrollToOptions) => void
        }

        exposed.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' })
        exposed.scrollBy({ top: 120 })
        expect(scrollTo).toHaveBeenCalledWith({ top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' })
        expect(scrollBy).toHaveBeenCalledWith({ top: 120 })

        element.scrollTop = 420
        await viewport.trigger('scroll')
        expect(wrapper.emitted('reach-end')).toHaveLength(1)
        expect(wrapper.classes()).not.toContain('h-scroll--away-end')

        element.scrollTop = 0
        await viewport.trigger('scroll')
        expect(wrapper.emitted('reach-start')).toHaveLength(1)
        expect(wrapper.classes()).not.toContain('h-scroll--away-start')
    })
})
