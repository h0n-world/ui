import { computed, getCurrentScope, inject, onMounted, onScopeDispose, readonly, ref, watch, type App, type InjectionKey, type Ref } from 'vue'
import type { H0Density, H0Size } from './types'
import { createAnimationController } from './_animation'

export type H0ThemeName = 'light' | 'dark'
export type H0ThemePreference = H0ThemeName | 'system'
export type H0AccentName = 'default' | 'telegram' | 'uber'
export type H0AnimationQuality = 'off' | 'low' | 'medium' | 'high'
export type H0AnimationLevel = H0AnimationQuality | 'recommended'
export type H0AnimationRecommendationReason = 'pending' | 'reduced-motion' | 'save-data' | 'limited-resources'
    | 'software-rendering' | 'graphics-caveat' | 'unavailable-graphics' | 'unknown-graphics' | 'unavailable'
    | 'insufficient-sample' | 'slow-frames' | 'moderate-frames' | 'smooth-frames'
export type H0TypographySize = H0Size
export type H0RadiusSize = H0Size

export type H0ThemeConfig = {
    accent?: H0AccentName
    animation?: H0AnimationLevel
    density?: H0Density
    radiusSize?: H0RadiusSize
    storageKey?: string | false
    target?: HTMLElement
    theme?: H0ThemePreference
    typographySize?: H0TypographySize
}

export type H0ThemeService = {
    accent: Readonly<Ref<H0AccentName>>
    animation: Readonly<Ref<H0AnimationLevel>>
    resolvedAnimation: Readonly<Ref<H0AnimationQuality>>
    recommendedAnimation: Readonly<Ref<H0AnimationQuality>>
    animationRecommendationReason: Readonly<Ref<H0AnimationRecommendationReason>>
    isEvaluatingAnimation: Readonly<Ref<boolean>>
    refreshAnimationRecommendation: () => void
    density: Readonly<Ref<H0Density>>
    radiusSize: Readonly<Ref<H0RadiusSize>>
    resolvedTheme: Readonly<Ref<H0ThemeName>>
    setAccent: (value: H0AccentName) => void
    setAnimation: (value: H0AnimationLevel) => void
    setDensity: (value: H0Density) => void
    setRadiusSize: (value: H0RadiusSize) => void
    setTheme: (value: H0ThemePreference) => void
    setTypographySize: (value: H0TypographySize) => void
    theme: Readonly<Ref<H0ThemePreference>>
    toggleTheme: () => void
    typographySize: Readonly<Ref<H0TypographySize>>
    dispose: () => void
}

const defaults = {
    accent: 'default' as H0AccentName,
    animation: 'low' as H0AnimationLevel,
    density: 'default' as H0Density,
    radiusSize: 'lg' as H0RadiusSize,
    theme: 'light' as H0ThemePreference,
    typographySize: 'md' as H0TypographySize
}

const h0ThemeKey: InjectionKey<H0ThemeService> = Symbol('h0-theme')

function readStored(key: string | false) {
    try {
        return key && typeof localStorage !== 'undefined' ? localStorage.getItem(key) : undefined
    } catch {
        return undefined
    }
}

function writeStored(key: string | false, value: string) {
    try {
        if (key && typeof localStorage !== 'undefined') localStorage.setItem(key, value)
    } catch {
        // Appearance remains usable when the browser denies storage access.
    }
}

function setAttribute(name: string, value: string, target?: HTMLElement) {
    (target ?? (typeof document === 'undefined' ? undefined : document.documentElement))?.setAttribute(name, value)
}

export function createH0ThemeService(config: H0ThemeConfig = {}): H0ThemeService {
    const storageKey = config.storageKey === undefined ? false : config.storageKey
    const storedTheme = readStored(storageKey)
    const accentStorageKey = storageKey ? `${storageKey}:accent` : false
    const storedAccent = readStored(accentStorageKey)
    const accent = ref<H0AccentName>(storedAccent === 'default' || storedAccent === 'telegram' || storedAccent === 'uber' ? storedAccent : (config.accent ?? defaults.accent))
    const theme = ref<H0ThemePreference>(storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : (config.theme ?? defaults.theme))
    const animation = ref(config.animation ?? defaults.animation)
    const motion = createAnimationController(animation)
    function applyAnimation() {
        setAttribute('data-h0n-animation', motion.quality.value, config.target)
        setAttribute('data-h0n-animation-preference', animation.value, config.target)
    }
    const stopAnimationWatch = watch([animation, motion.quality], applyAnimation, { flush: 'sync' })
    const density = ref(config.density ?? defaults.density)
    const radiusSize = ref(config.radiusSize ?? defaults.radiusSize)
    const typographySize = ref(config.typographySize ?? defaults.typographySize)
    const systemDark = ref(false)
    const resolvedTheme = computed<H0ThemeName>(() => (theme.value === 'system' ? (systemDark.value ? 'dark' : 'light') : theme.value))
    let mediaQuery: MediaQueryList | undefined

    function apply() {
        setAttribute('data-h0n-accent', accent.value, config.target)
        setAttribute('data-h0n-theme', resolvedTheme.value, config.target)
        applyAnimation()
        setAttribute('data-h0n-density', density.value, config.target)
        setAttribute('data-h0n-radius-size', radiusSize.value, config.target)
        setAttribute('data-h0n-typography-size', typographySize.value, config.target)
    }

    function handleSystemTheme(event?: MediaQueryListEvent) {
        systemDark.value = event?.matches ?? mediaQuery?.matches ?? false
        if (theme.value === 'system') {
            setAttribute('data-h0n-theme', resolvedTheme.value, config.target)
        }
    }

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        handleSystemTheme()
        mediaQuery.addEventListener('change', handleSystemTheme)
    }

    const service: H0ThemeService = {
        accent: readonly(accent),
        animation: readonly(animation),
        resolvedAnimation: motion.quality,
        recommendedAnimation: motion.recommended,
        animationRecommendationReason: motion.reason,
        isEvaluatingAnimation: motion.evaluating,
        refreshAnimationRecommendation: motion.refresh,
        density: readonly(density),
        radiusSize: readonly(radiusSize),
        resolvedTheme,
        setAccent(value) {
            accent.value = value
            writeStored(accentStorageKey, value)
            setAttribute('data-h0n-accent', value, config.target)
        },
        setAnimation(value) {
            animation.value = value
            if (value === 'recommended') motion.refresh()
        },
        setDensity(value) {
            density.value = value
            setAttribute('data-h0n-density', value, config.target)
        },
        setRadiusSize(value) {
            radiusSize.value = value
            setAttribute('data-h0n-radius-size', value, config.target)
        },
        setTheme(value) {
            theme.value = value
            writeStored(storageKey, value)
            setAttribute('data-h0n-theme', resolvedTheme.value, config.target)
        },
        setTypographySize(value) {
            typographySize.value = value
            setAttribute('data-h0n-typography-size', value, config.target)
        },
        theme: readonly(theme),
        toggleTheme() {
            service.setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
        },
        typographySize: readonly(typographySize),
        dispose() {
            stopAnimationWatch()
            motion.dispose()
            mediaQuery?.removeEventListener('change', handleSystemTheme)
            mediaQuery = undefined
        }
    }

    apply()
    return service
}

export function provideH0Theme(app: App, service: H0ThemeService) {
    app.provide(h0ThemeKey, service)
    let mounted = false
    app.mixin({ mounted() {
        if (!mounted) {
            mounted = true
            if (service.animation.value === 'recommended') service.refreshAnimationRecommendation()
        }
    } })
}

export function useH0Theme() {
    return inject(h0ThemeKey, () => {
        const service = createH0ThemeService()
        if (getCurrentScope()) {
            onScopeDispose(service.dispose)
            onMounted(() => { if (service.animation.value === 'recommended') service.refreshAnimationRecommendation() })
        }
        return service
    }, true)
}
