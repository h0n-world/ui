import { computed, inject } from 'vue'
import type { H0Locale } from '../../locale'
import { h0LocaleKey } from './localeKey'

export function useH0LocaleSection<Section extends keyof H0Locale>(section: Section, fallback: H0Locale[Section]) {
    const service = inject(h0LocaleKey, undefined)
    return computed(() => service?.locale.value[section] ?? fallback)
}
