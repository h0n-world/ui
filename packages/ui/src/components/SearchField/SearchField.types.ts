import type { H0InputVariant } from '../Input/Input.types'

export type H0SearchFieldVariant = H0InputVariant

export type H0SearchFieldEmits = {
    'update:modelValue': [value: string]
    blur: [event: FocusEvent]
    clear: []
    focus: [event: FocusEvent]
    input: [value: string, event: Event]
}
import type H0SearchFieldComponent from './H0SearchField.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0SearchFieldProps = H0PublicProps<typeof H0SearchFieldComponent>
