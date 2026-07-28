import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, type App } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Input from '../src/components/Input/H0Input.vue'
import H0Modal from '../src/components/Modal/H0Modal.vue'
import H0Ripple from '../src/components/Ripple/H0Ripple.vue'
import { useH0ReducedMotion } from '../src/composables'
import { createH0LocaleService } from '../src/locale'
import { createH0ThemeService, provideH0Theme } from '../src/theme'

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('controlled state and app-scoped services', () => {
    it('keeps uncontrolled input state and emits one user change', async () => {
        const wrapper = mount(H0Input, { props: { defaultValue: 'initial' } })
        const input = wrapper.get('input')

        expect(input.element.value).toBe('initial')
        await input.setValue('next')
        expect(input.element.value).toBe('next')
        expect(wrapper.emitted('update:modelValue')).toEqual([['next']])
        expect(wrapper.emitted('change')).toEqual([['next']])
    })

    it('does not turn an external controlled sync into a user change', async () => {
        const wrapper = mount(H0Input, { props: { modelValue: 'first' } })
        await wrapper.setProps({ modelValue: 'second' })

        expect(wrapper.get('input').element.value).toBe('second')
        expect(wrapper.emitted('change')).toBeUndefined()
    })

    it('supports an uncontrolled disclosure and emits the same close contract', async () => {
        const wrapper = mount(H0Modal, { attachTo: document.body, props: { defaultValue: true, teleportDisabled: true, title: 'Modal' } })
        await wrapper.get('[aria-label="Close modal"]').trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
        expect(wrapper.emitted('change')).toEqual([[false]])
        wrapper.unmount()
    })

    it('isolates locale and theme state between app services', () => {
        const firstTarget = document.createElement('div')
        const secondTarget = document.createElement('div')
        const firstTheme = createH0ThemeService({ target: firstTarget, theme: 'light' })
        const secondTheme = createH0ThemeService({ target: secondTarget, theme: 'dark' })
        const firstLocale = createH0LocaleService()
        const secondLocale = createH0LocaleService()

        firstTheme.setDensity('compact')
        firstLocale.patchLocale({ common: { close: 'Закрыть' } })

        expect(firstTarget.dataset.h0nDensity).toBe('compact')
        expect(secondTarget.dataset.h0nDensity).toBe('default')
        expect(firstLocale.locale.value.common.close).toBe('Закрыть')
        expect(secondLocale.locale.value.common.close).toBe('Close')
        firstTheme.dispose()
        secondTheme.dispose()
    })

    it('reacts to the app-scoped animation level in useH0ReducedMotion', async () => {
        const target = document.createElement('div')
        const theme = createH0ThemeService({ animation: 'high', target })
        const plugin = { install: (app: App) => provideH0Theme(app, theme) }
        const MotionProbe = defineComponent({
            setup() {
                const reducedMotion = useH0ReducedMotion()
                return () => h('span', { 'data-reduced-motion': String(reducedMotion.value) })
            }
        })
        const wrapper = mount(MotionProbe, { global: { plugins: [plugin] } })

        expect(wrapper.get('span').attributes('data-reduced-motion')).toBe('false')

        theme.setAnimation('low')
        await nextTick()

        expect(wrapper.get('span').attributes('data-reduced-motion')).toBe('true')
        wrapper.unmount()
        theme.dispose()
    })

    it('gives the system reduced-motion preference priority over high animation', async () => {
        const originalMatchMedia = window.matchMedia
        window.matchMedia = vi.fn((query: string) => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn()
        })) as typeof window.matchMedia
        const target = document.createElement('div')
        const theme = createH0ThemeService({ animation: 'high', target })
        const plugin = { install: (app: App) => provideH0Theme(app, theme) }
        const MotionProbe = defineComponent({
            setup() {
                const reducedMotion = useH0ReducedMotion()
                return () => h('span', { 'data-reduced-motion': String(reducedMotion.value) })
            }
        })
        const wrapper = mount(MotionProbe, { global: { plugins: [plugin] } })

        try {
            await nextTick()
            expect(wrapper.get('span').attributes('data-reduced-motion')).toBe('true')
        } finally {
            wrapper.unmount()
            theme.dispose()
            window.matchMedia = originalMatchMedia
        }
    })

    it('creates ripples only while app-scoped motion is high', async () => {
        const target = document.createElement('div')
        const theme = createH0ThemeService({ animation: 'high', target })
        const plugin = { install: (app: App) => provideH0Theme(app, theme) }
        const wrapper = mount(H0Ripple, { global: { plugins: [plugin] } })
        const host = document.createElement('button')

        target.append(host)
        Object.defineProperty(host, 'getBoundingClientRect', {
            value: () => ({ bottom: 40, height: 40, left: 0, right: 80, top: 0, width: 80, x: 0, y: 0, toJSON: () => ({}) })
        })

        const create = (wrapper.vm as unknown as { create: (event: PointerEvent) => void }).create
        const event = { clientX: 20, clientY: 20, currentTarget: host } as unknown as PointerEvent

        create(event)
        await nextTick()
        expect(wrapper.findAll('.h-ripple__item')).toHaveLength(1)

        theme.setAnimation('low')
        await nextTick()
        create(event)
        await nextTick()

        expect(wrapper.findAll('.h-ripple__item')).toHaveLength(1)
        wrapper.unmount()
        theme.dispose()
    })
})
