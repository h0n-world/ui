import type { H0IconDefinition } from '../Icon'
import type { H0Size } from '../../types'

export type H0StepperOrientation = 'horizontal' | 'vertical'
export type H0StepperSize = H0Size
export type H0StepperColor = 'accent' | 'success' | 'danger' | 'warning' | 'inverted'

export type H0StepperItem = {
    label?: string
    description?: string
    icon?: H0IconDefinition
}
import type H0StepperComponent from './H0Stepper.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0StepperProps = H0PublicProps<typeof H0StepperComponent>
