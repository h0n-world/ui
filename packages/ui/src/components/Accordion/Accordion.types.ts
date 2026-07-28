export type H0AccordionItem = {
    title?: string
    content?: string
    question?: string
    answer?: string
    disabled?: boolean
}
import type H0AccordionComponent from './H0Accordion.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0AccordionProps = H0PublicProps<typeof H0AccordionComponent>
