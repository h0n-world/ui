import type { H0Size } from '../../types'

export type H0CheckboxSize = H0Size
export type H0CheckboxVariant = 'secondary' | 'surface'
export type H0CheckboxOption = {
    label: string
    value: string
    disabled?: boolean
}
import type H0CheckboxComponent from './H0Checkbox.vue'
import type H0CheckboxGroupComponent from './H0CheckboxGroup.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0CheckboxProps = H0PublicProps<typeof H0CheckboxComponent>
export type H0CheckboxEmits = H0PublicEmits<typeof H0CheckboxComponent>
export type H0CheckboxGroupProps = H0PublicProps<typeof H0CheckboxGroupComponent>
export type H0CheckboxGroupEmits = H0PublicEmits<typeof H0CheckboxGroupComponent>
