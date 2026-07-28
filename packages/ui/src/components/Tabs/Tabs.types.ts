import type { H0CollectionValue, H0Orientation } from '../../types'
export type H0TabValue = H0CollectionValue
export type H0TabItem<Value extends H0TabValue = H0TabValue> = { value: Value; label: string; disabled?: boolean }
export type H0TabsActivation = 'automatic' | 'manual'
export type H0TabsMountMode = 'all' | 'lazy' | 'active'
export type H0TabsProps<Value extends H0TabValue = H0TabValue> = { modelValue?: Value; defaultValue?: Value; items?: H0TabItem<Value>[]; orientation?: H0Orientation; activationMode?: H0TabsActivation; mountMode?: H0TabsMountMode; loop?: boolean; ariaLabel?: string; id?: string }
