import type { InjectionKey, ShallowRef, Slot } from 'vue'

export const previewActionsKey: InjectionKey<ShallowRef<Slot | undefined>> = Symbol('documentation-preview-actions')
