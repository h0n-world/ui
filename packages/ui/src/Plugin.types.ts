import type { H0LocaleConfig, H0LocaleService } from './locale'
import type { H0ToastConfig } from './components/Toast'
import type { H0ThemeConfig } from './theme'

export type H0PluginConfig = H0ThemeConfig & {
    locale?: H0LocaleConfig | H0LocaleService
    localeLanguage?: string
    toast?: H0ToastConfig
}
