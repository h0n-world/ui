import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0InfiniteScroll from '../src/components/InfiniteScroll/H0InfiniteScroll.vue'
import H0Toasts from '../src/components/Toast/H0Toasts.vue'
import { createH0ToastService } from '../src/components/Toast/toast'

afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = '' })

describe('runtime boundaries', () => {
    it('discards queued intersections from replaced observers and after unmount', async () => {
        const callbacks: IntersectionObserverCallback[] = []
        vi.stubGlobal('IntersectionObserver', class {
            constructor(callback: IntersectionObserverCallback) { callbacks.push(callback) }
            observe() {}
            disconnect() {}
        })
        const onLoad = vi.fn()
        const wrapper = mount(H0InfiniteScroll, { attrs: { onLoad } })
        const notify = (index: number) => callbacks[index]([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
        await flushPromises()
        await wrapper.setProps({ rootMargin: '100px' })
        await flushPromises()
        notify(0)
        expect(wrapper.emitted('load')).toBeUndefined()
        notify(1)
        expect(onLoad).toHaveBeenCalledTimes(1)
        await wrapper.setProps({ disabled: true })
        await wrapper.setProps({ disabled: false })
        await flushPromises()
        const latest = callbacks.length - 1
        wrapper.unmount()
        notify(latest)
        expect(onLoad).toHaveBeenCalledTimes(1)
    })

    it('observeOnMount can disable and re-enable observation', async () => {
        const callbacks: IntersectionObserverCallback[] = []
        const disconnect = vi.fn()
        vi.stubGlobal('IntersectionObserver', class {
            constructor(callback: IntersectionObserverCallback) { callbacks.push(callback) }
            observe() {}
            disconnect = disconnect
        })
        const wrapper = mount(H0InfiniteScroll)
        await flushPromises()
        await wrapper.setProps({ observeOnMount: false })
        await flushPromises()
        expect(disconnect).toHaveBeenCalled()
        callbacks[0]([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
        expect(wrapper.emitted('load')).toBeUndefined()
        await wrapper.setProps({ observeOnMount: true })
        await flushPromises()
        expect(callbacks).toHaveLength(2)
        wrapper.unmount()
    })

    it.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])('bounds toast rendering for maxVisible=%s', async maxVisible => {
        const service = createH0ToastService()
        for (let i = 0; i < 6; i++) service.show({ title: `Toast ${i}`, duration: 0 })
        const wrapper = mount(H0Toasts, { props: { maxVisible, service }, global: { stubs: { teleport: true } } })
        try {
            expect(wrapper.findAll('.h-toasts__item')).toHaveLength(Number.isFinite(maxVisible) ? 0 : 4)
            expect(service.state.toasts).toHaveLength(6)
        } finally { wrapper.unmount(); service.dispose() }
    })
})
