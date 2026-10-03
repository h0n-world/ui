import { computed, readonly, ref, type Ref } from 'vue'
import type { H0AnimationLevel, H0AnimationQuality, H0AnimationRecommendationReason } from './theme'

// This is a conservative UI policy, not a hardware benchmark.
export function createAnimationController(preference: Ref<H0AnimationLevel>) {
    const reducedMotion = ref(false)
    const recommendation = ref<H0AnimationQuality>('low')
    const reason = ref<H0AnimationRecommendationReason>('pending')
    const evaluating = ref(false)
    const quality = computed<H0AnimationQuality>(() => reducedMotion.value ? 'off'
        : preference.value === 'recommended' ? recommendation.value : preference.value)
    const recommended = computed<H0AnimationQuality>(() => reducedMotion.value ? 'off' : recommendation.value)
    const recommendationReason = computed<H0AnimationRecommendationReason>(() => reducedMotion.value ? 'reduced-motion' : reason.value)
    const view = typeof window === 'undefined' ? undefined : window
    const doc = typeof document === 'undefined' ? undefined : document
    const nav = typeof navigator === 'undefined' ? undefined : navigator as Navigator & {
        deviceMemory?: number
        connection?: EventTarget & { saveData?: boolean }
    }
    let media: MediaQueryList | undefined
    let frame: number | undefined
    let timeout: number | undefined
    let started = false
    let disposed = false

    function cancelSample() {
        if (frame !== undefined) view?.cancelAnimationFrame?.(frame)
        if (timeout !== undefined) view?.clearTimeout(timeout)
        frame = timeout = undefined
        evaluating.value = false
    }

    function updateReducedMotion(event?: MediaQueryListEvent) {
        reducedMotion.value = event?.matches ?? media?.matches ?? false
        if (reducedMotion.value) cancelSample()
        else if (started) refresh()
    }

    if (view?.matchMedia) {
        media = view.matchMedia('(prefers-reduced-motion: reduce)')
        updateReducedMotion()
        media.addEventListener('change', updateReducedMotion)
    }

    function graphics(): 'available' | 'software' | 'caveat' | 'unavailable' | 'unknown' {
        let gl: WebGLRenderingContext | null = null
        try {
            const canvas = doc!.createElement('canvas')
            gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true, powerPreference: 'low-power', antialias: false })
            if (!gl) {
                gl = canvas.getContext('webgl', { powerPreference: 'low-power', antialias: false })
                return gl ? 'caveat' : 'unavailable'
            }
            const info = gl.getExtension('WEBGL_debug_renderer_info')
            if (!info) return 'unknown'
            const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
            if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return 'software'
            return renderer && !/^(null|webgl|webkit webgl)$/i.test(renderer) ? 'available' : 'unknown'
        } catch {
            return 'unknown'
        } finally {
            // Never leave a graphics context or identifying renderer data behind.
            try { gl?.getExtension('WEBGL_lose_context')?.loseContext() } catch { /* Unsupported cleanup extension. */ }
        }
    }

    function refresh() {
        if (disposed || !view || !doc || evaluating.value) return
        started = true
        if (reducedMotion.value || doc.visibilityState === 'hidden') return
        const cores = nav?.hardwareConcurrency
        const memory = nav?.deviceMemory
        if (nav?.connection?.saveData || (cores && cores <= 2) || (memory && memory <= 2)) {
            recommendation.value = 'low'
            reason.value = nav?.connection?.saveData ? 'save-data' : 'limited-resources'
            return
        }
        if (!view.requestAnimationFrame) {
            recommendation.value = 'low'
            reason.value = 'unavailable'
            return
        }
        evaluating.value = true
        // Do not reuse a previous High result after a workload/visibility change.
        recommendation.value = 'low'
        reason.value = 'pending'
        let cap: H0AnimationQuality = 'medium'
        let capReason: H0AnimationRecommendationReason = 'unknown-graphics'
        let began: number | undefined
        let previous: number | undefined
        let warmup = 4
        const intervals: number[] = []

        function finish() {
            cancelSample()
            if (disposed || reducedMotion.value || doc!.visibilityState === 'hidden') return
            if (intervals.length < 20) {
                recommendation.value = 'low'
                reason.value = 'insufficient-sample'
                return
            }
            const sorted = [...intervals].sort((a, b) => a - b)
            const median = sorted[Math.floor(sorted.length / 2)]!
            const slow = intervals.filter(value => value > Math.max(24, median * 1.5)).length / intervals.length
            if (median > 28 || slow > 0.2) {
                recommendation.value = 'low'
                reason.value = 'slow-frames'
            } else if (median > 19 || slow > 0.08) {
                recommendation.value = 'medium'
                reason.value = 'moderate-frames'
            } else {
                recommendation.value = cap
                reason.value = cap === 'high' ? 'smooth-frames' : capReason
            }
        }

        function sample(time: number) {
            frame = undefined
            if (disposed || reducedMotion.value || doc!.visibilityState === 'hidden') { cancelSample(); return }
            if (began === undefined) {
                began = time
                const gpu = graphics()
                if (gpu === 'software' || gpu === 'caveat' || gpu === 'unavailable') {
                    cancelSample()
                    recommendation.value = 'low'
                    reason.value = gpu === 'software' ? 'software-rendering' : gpu === 'caveat' ? 'graphics-caveat' : 'unavailable-graphics'
                    return
                }
                if ((cores && cores <= 4) || (memory && memory <= 4)) capReason = 'limited-resources'
                else if (gpu === 'available') { cap = 'high'; capReason = 'smooth-frames' }
            }
            if (previous !== undefined) {
                const delta = time - previous
                if (warmup > 0) warmup -= 1
                else if (delta > 0) intervals.push(delta)
            }
            previous = time
            if (intervals.length >= 48 || time - began >= 1200) finish()
            else frame = view!.requestAnimationFrame(sample)
        }

        // An absolute deadline also covers browsers that stop scheduling frames.
        timeout = view.setTimeout(finish, 1600)
        frame = view.requestAnimationFrame(sample)
    }

    function visibilityChanged() {
        if (doc?.visibilityState === 'hidden') cancelSample()
        else if (started) refresh()
    }
    function resourcesChanged() { cancelSample(); if (started) refresh() }
    doc?.addEventListener('visibilitychange', visibilityChanged)
    nav?.connection?.addEventListener('change', resourcesChanged)

    return {
        quality,
        recommended,
        reason: recommendationReason,
        evaluating: readonly(evaluating),
        refresh,
        dispose() {
            disposed = true
            cancelSample()
            media?.removeEventListener('change', updateReducedMotion)
            doc?.removeEventListener('visibilitychange', visibilityChanged)
            nav?.connection?.removeEventListener('change', resourcesChanged)
        }
    }
}
