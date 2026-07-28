import type {ComputedRef,InjectionKey} from 'vue'
export type H0FieldContext={id:ComputedRef<string>;name:ComputedRef<string>;label:ComputedRef<string>;required:ComputedRef<boolean>;disabled:ComputedRef<boolean>;error:ComputedRef<string>;hint:ComputedRef<string>;messageId:ComputedRef<string>}
export const h0FieldKey:InjectionKey<H0FieldContext>=Symbol('h0-field')
