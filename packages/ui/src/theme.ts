import { computed, inject, readonly, ref, type App, type InjectionKey, type Ref } from 'vue'
import type { H0Density, H0Size } from './types'

export type H0ThemeName = 'light' | 'dark'
export type H0ThemePreference = H0ThemeName | 'system'
export type H0AnimationLevel = 'low' | 'high'
export type H0TypographySize = H0Size
export type H0RadiusSize = H0Size

export type H0ThemeConfig = {
    animation?: H0AnimationLevel
    density?: H0Density
    radiusSize?: H0RadiusSize
    storageKey?: string | false
    target?: HTMLElement
    theme?: H0ThemePreference
    typographySize?: H0TypographySize
}

export type H0ThemeService = {
    animation: Readonly<Ref<H0AnimationLevel>>
    density: Readonly<Ref<H0Density>>
    radiusSize: Readonly<Ref<H0RadiusSize>>
    resolvedTheme: Readonly<Ref<H0ThemeName>>
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
    animation: 'low' as H0AnimationLevel,
    density: 'default' as H0Density,
    radiusSize: 'lg' as H0RadiusSize,
    theme: 'light' as H0ThemePreference,
    typographySize: 'md' as H0TypographySize
}

const h0ThemeKey: InjectionKey<H0ThemeService> = Symbol('h0-theme')

function setAttribute(name: string, value: string, target?: HTMLElement) {
    (target ?? (typeof document === 'undefined' ? undefined : document.documentElement))?.setAttribute(name, value)
}

export function createH0ThemeService(config: H0ThemeConfig = {}): H0ThemeService {
    const storageKey = config.storageKey === undefined ? false : config.storageKey
    const storedTheme = typeof localStorage === 'undefined' || !storageKey ? undefined : localStorage.getItem(storageKey)
    const theme = ref<H0ThemePreference>(storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : (config.theme ?? defaults.theme))
    const animation = ref(config.animation ?? defaults.animation)
    const density = ref(config.density ?? defaults.density)
    const radiusSize = ref(config.radiusSize ?? defaults.radiusSize)
    const typographySize = ref(config.typographySize ?? defaults.typographySize)
    const systemDark = ref(false)
    const resolvedTheme = computed<H0ThemeName>(() => (theme.value === 'system' ? (systemDark.value ? 'dark' : 'light') : theme.value))
    let mediaQuery: MediaQueryList | undefined

    function apply() {
        setAttribute('data-h0n-theme', resolvedTheme.value, config.target)
        setAttribute('data-h0n-animation', animation.value, config.target)
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
        animation: readonly(animation),
        density: readonly(density),
        radiusSize: readonly(radiusSize),
        resolvedTheme,
        setAnimation(value) {
            animation.value = value
            setAttribute('data-h0n-animation', value, config.target)
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
            if (storageKey && typeof localStorage !== 'undefined') {
                localStorage.setItem(storageKey, value)
            }
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
            mediaQuery?.removeEventListener('change', handleSystemTheme)
            mediaQuery = undefined
        }
    }

    apply()
    return service
}

export function provideH0Theme(app: App, service: H0ThemeService) {
    app.provide(h0ThemeKey, service)
}

export function useH0Theme() {
    return inject(h0ThemeKey, () => createH0ThemeService(), true)
}
