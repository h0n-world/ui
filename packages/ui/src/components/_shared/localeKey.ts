import type { InjectionKey } from 'vue'
import type { H0LocaleService } from '../../locale'

export const h0LocaleKey: InjectionKey<H0LocaleService> = Symbol('h0-locale')
