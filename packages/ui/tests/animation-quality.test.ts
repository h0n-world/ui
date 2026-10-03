import { mount } from '@vue/test-utils'
import { createSSRApp, defineComponent, h, nextTick, type App } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createH0ThemeService, provideH0Theme, type H0ThemeService } from '../src/theme'
import { useH0Animation } from '../src/composables/useH0Animation'
import H0Carousel from '../src/components/Carousel/H0Carousel.vue'

const services: H0ThemeService[] = []
function service(config: Parameters<typeof createH0ThemeService>[0] = {}) {
    const result = createH0ThemeService({ target: document.createElement('div'), ...config })
    services.push(result)
    return result
}

function browser(options: { cores?: number; memory?: number; graphics?: 'hardware' | 'software' | 'caveat' | 'missing' | 'private' | 'throws'; reduced?: boolean; saveData?: boolean } = {}) {
    const reduced = new EventTarget() as EventTarget & { matches: boolean }
    reduced.matches = options.reduced ?? false
    const removeMedia = vi.spyOn(reduced, 'removeEventListener')
    vi.stubGlobal('matchMedia', vi.fn((query: string) => query.includes('reduced-motion')
        ? reduced as unknown as MediaQueryList
        : { matches: false, addEventListener() {}, removeEventListener() {} } as unknown as MediaQueryList))
    const connection = Object.assign(new EventTarget(), { saveData: options.saveData ?? false })
    const removeConnection = vi.spyOn(connection, 'removeEventListener')
    vi.stubGlobal('navigator', { hardwareConcurrency: options.cores ?? 8, deviceMemory: options.memory ?? 8, connection })
    let visibility: DocumentVisibilityState = 'visible'
    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility)
    const pending = new Map<number, FrameRequestCallback>()
    let sequence = 0, time = 0
    vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => { pending.set(++sequence, callback); return sequence }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { pending.delete(id) }))
    const loseContext = vi.fn()
    const gpu = {
        getExtension(name: string) {
            if (name === 'WEBGL_lose_context') return { loseContext }
            return options.graphics === 'private' ? null : { UNMASKED_RENDERER_WEBGL: 1 }
        },
        getParameter() { return options.graphics === 'software' ? 'Google SwiftShader' : 'ANGLE Hardware Renderer' }
    }
    const context = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(((_kind: string, attributes?: WebGLContextAttributes) => {
        if (options.graphics === 'throws') throw new Error('blocked')
        if (options.graphics === 'missing' || (options.graphics === 'caveat' && attributes?.failIfMajorPerformanceCaveat)) return null
        return gpu
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext)
    return {
        connection, loseContext, context, pending, removeMedia, removeConnection,
        frames(intervals: number[]) {
            for (const delta of intervals) {
                time += delta
                const callbacks = [...pending.values()]
                pending.clear()
                callbacks.forEach(callback => callback(time))
            }
        },
        reduce(value: boolean) {
            reduced.matches = value
            const event = new Event('change')
            Object.defineProperty(event, 'matches', { value })
            reduced.dispatchEvent(event)
        },
        visibility(value: DocumentVisibilityState) {
            visibility = value
            document.dispatchEvent(new Event('visibilitychange'))
        }
    }
}

afterEach(() => {
    services.splice(0).forEach(value => value.dispose())
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
})

describe('app-scoped animation quality', () => {
    it('resolves every manual level and makes system reduction win synchronously', () => {
        const env = browser()
        const target = document.createElement('div')
        const appearance = service({ target, animation: 'high' })
        for (const level of ['off', 'low', 'medium', 'high'] as const) {
            appearance.setAnimation(level)
            expect(appearance.resolvedAnimation.value).toBe(level)
            expect(target.dataset.h0nAnimation).toBe(level)
        }
        env.reduce(true)
        expect(appearance.animation.value).toBe('high')
        expect(appearance.resolvedAnimation.value).toBe('off')
        expect(appearance.recommendedAnimation.value).toBe('off')
        expect(target.dataset.h0nAnimation).toBe('off')
        expect(target.dataset.h0nAnimationPreference).toBe('high')
        env.reduce(false)
        expect(appearance.resolvedAnimation.value).toBe('high')
    })

    it.each([
        [{ cores: 2 }, 'limited-resources'],
        [{ memory: 2 }, 'limited-resources'],
        [{ saveData: true }, 'save-data'],
        [{ graphics: 'software' }, 'software-rendering'],
        [{ graphics: 'caveat' }, 'graphics-caveat'],
        [{ graphics: 'missing' }, 'unavailable-graphics'],
    ] as const)('caps weak/browser-limited signals at low: %j', (options, reason) => {
        const env = browser(options)
        const appearance = service({ animation: 'recommended' })
        appearance.refreshAnimationRecommendation()
        env.frames([16])
        expect(appearance.resolvedAnimation.value).toBe('low')
        expect(appearance.animationRecommendationReason.value).toBe(reason)
        expect(appearance.isEvaluatingAnimation.value).toBe(false)
        expect(env.pending.size).toBe(0)
        if (options.graphics && options.graphics !== 'missing') expect(env.loseContext).toHaveBeenCalledOnce()
    })

    it.each([
        [{}, 16, 'high', 'smooth-frames'],
        [{}, 22, 'medium', 'moderate-frames'],
        [{}, 40, 'low', 'slow-frames'],
        [{ cores: 4 }, 16, 'medium', 'limited-resources'],
        [{ graphics: 'private' }, 16, 'medium', 'unknown-graphics'],
        [{ graphics: 'throws' }, 16, 'medium', 'unknown-graphics'],
    ] as const)('combines foreground cadence and caps: %j, %i ms', (options, delta, quality, reason) => {
        const env = browser(options)
        const appearance = service({ animation: 'recommended' })
        expect(appearance.resolvedAnimation.value).toBe('low')
        appearance.refreshAnimationRecommendation()
        appearance.refreshAnimationRecommendation()
        expect(env.pending.size).toBe(1)
        env.frames(Array(80).fill(delta))
        expect(appearance.resolvedAnimation.value).toBe(quality)
        expect(appearance.animationRecommendationReason.value).toBe(reason)
        expect(appearance.isEvaluatingAnimation.value).toBe(false)
        expect(env.pending.size).toBe(0)
    })

    it('detects frequent long frames even when the median is smooth', () => {
        const env = browser()
        const appearance = service({ animation: 'recommended' })
        appearance.refreshAnimationRecommendation()
        env.frames(Array.from({ length: 80 }, (_, index) => index % 3 ? 16 : 50))
        expect(appearance.recommendedAnimation.value).toBe('low')
        expect(appearance.animationRecommendationReason.value).toBe('slow-frames')
    })

    it('ignores hidden-tab time, retries foreground and Save-Data changes, and disposes', () => {
        const env = browser()
        const appearance = service({ animation: 'recommended' })
        appearance.refreshAnimationRecommendation()
        env.frames([16, 16])
        env.visibility('hidden')
        expect(env.pending.size).toBe(0)
        env.frames([10_000])
        env.visibility('visible')
        env.frames(Array(60).fill(16))
        expect(appearance.recommendedAnimation.value).toBe('high')
        env.connection.saveData = true
        env.connection.dispatchEvent(new Event('change'))
        expect(appearance.recommendedAnimation.value).toBe('low')
        env.connection.saveData = false
        env.connection.dispatchEvent(new Event('change'))
        expect(env.pending.size).toBe(1)
        appearance.dispose()
        expect(env.pending.size).toBe(0)
        expect(env.removeMedia).toHaveBeenCalled()
        expect(env.removeConnection).toHaveBeenCalled()
        expect(appearance.isEvaluatingAnimation.value).toBe(false)
    })

    it('bounds incomplete samples by an absolute deadline and tolerates no rAF', () => {
        vi.useFakeTimers()
        const env = browser()
        const appearance = service({ animation: 'recommended' })
        appearance.refreshAnimationRecommendation()
        env.frames([16])
        vi.advanceTimersByTime(1600)
        expect(appearance.animationRecommendationReason.value).toBe('insufficient-sample')
        expect(env.pending.size).toBe(0)
        vi.stubGlobal('window', { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }) })
        const unsupported = service({ animation: 'recommended' })
        unsupported.refreshAnimationRecommendation()
        expect(unsupported.animationRecommendationReason.value).toBe('unavailable')
    })

    it('starts no browser work on the server and isolates preferences', () => {
        vi.stubGlobal('window', undefined)
        vi.stubGlobal('document', undefined)
        vi.stubGlobal('navigator', undefined)
        const first = createH0ThemeService({ animation: 'recommended' })
        const second = createH0ThemeService({ animation: 'medium' })
        services.push(first, second)
        first.refreshAnimationRecommendation()
        first.setAnimation('off')
        expect(first.resolvedAnimation.value).toBe('off')
        expect(second.resolvedAnimation.value).toBe('medium')
        expect(first.recommendedAnimation.value).toBe('low')
        expect(first.isEvaluatingAnimation.value).toBe(false)
    })

    it('exposes exactly the library decision to application composables', async () => {
        const env = browser()
        const appearance = service({ animation: 'recommended' })
        const Probe = defineComponent({ setup() {
            const motion = useH0Animation()
            return () => h('output', { 'data-quality': motion.quality.value, 'data-rich': motion.rich.value, 'data-continuous': motion.continuous.value }, motion.recommendedQuality.value)
        } })
        const wrapper = mount(Probe, { global: { plugins: [{ install: (app: App) => provideH0Theme(app, appearance) }] } })
        env.frames(Array(60).fill(16))
        await nextTick()
        expect(wrapper.attributes('data-quality')).toBe('high')
        expect(wrapper.attributes('data-rich')).toBe('true')
        appearance.setAnimation('medium')
        await nextTick()
        expect(wrapper.attributes('data-rich')).toBe('false')
        expect(wrapper.attributes('data-continuous')).toBe('true')
        env.reduce(true)
        await nextTick()
        expect(wrapper.attributes('data-quality')).toBe('off')
        expect(wrapper.attributes('data-continuous')).toBe('false')
        wrapper.unmount()
    })

    it('hydrates Recommended with a stable Low initial render before evaluating', async () => {
        const Root = defineComponent({ setup() {
            const motion = useH0Animation()
            return () => h('output', motion.quality.value)
        } })
        vi.stubGlobal('window', undefined)
        vi.stubGlobal('document', undefined)
        vi.stubGlobal('navigator', undefined)
        const server = createH0ThemeService({ animation: 'recommended' })
        services.push(server)
        const serverApp = createSSRApp(Root)
        provideH0Theme(serverApp, server)
        const html = await renderToString(serverApp)
        expect(html).toBe('<output>low</output>')
        vi.unstubAllGlobals()
        const env = browser()
        const client = service({ animation: 'recommended' })
        const host = document.createElement('div')
        host.innerHTML = html
        document.body.append(host)
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const app = createSSRApp(Root)
        provideH0Theme(app, client)
        app.mount(host)
        expect(host.textContent).toBe('low')
        expect(warn.mock.calls.flat().join(' ')).not.toMatch(/hydration/i)
        env.frames(Array(60).fill(16))
        await nextTick()
        expect(host.textContent).toBe('high')
        app.unmount()
        host.remove()
    })

    it('evaluates the recommendation after an initial system reduction is removed in a manual mode', async () => {
        const env = browser({ reduced: true })
        const appearance = service({ animation: 'high' })
        const Root = defineComponent({ setup() {
            const motion = useH0Animation()
            return () => h('output', motion.recommendedQuality.value)
        } })
        const wrapper = mount(Root, { global: { plugins: [{ install: (app: App) => provideH0Theme(app, appearance) }] } })
        expect(wrapper.text()).toBe('off')
        expect(env.pending.size).toBe(0)
        env.reduce(false)
        env.frames(Array(60).fill(16))
        await nextTick()
        expect(wrapper.text()).toBe('high')
        wrapper.unmount()
    })

    it('stops carousel autoplay in Off, retains explicit navigation, and resumes when enabled', async () => {
        vi.useFakeTimers()
        browser()
        const appearance = service({ animation: 'off' })
        const wrapper = mount(H0Carousel, { props: { autoplay: true, loop: true, autoplayInterval: 300, items: [{ id: 'a' }, { id: 'b' }] }, global: { plugins: [{ install: (app: App) => provideH0Theme(app, appearance) }] } })
        await vi.advanceTimersByTimeAsync(900)
        expect(wrapper.emitted('change')).toBeUndefined()
        ;(wrapper.vm as unknown as { next: () => void }).next()
        expect(wrapper.emitted('change')).toEqual([[1]])
        appearance.setAnimation('medium')
        await nextTick()
        await vi.advanceTimersByTimeAsync(300)
        expect(wrapper.emitted('change')).toEqual([[1], [0]])
        appearance.setAnimation('off')
        await nextTick()
        await vi.advanceTimersByTimeAsync(900)
        expect(wrapper.emitted('change')).toEqual([[1], [0]])
        wrapper.unmount()
    })
})
