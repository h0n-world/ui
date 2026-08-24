export type H0TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'body-xs' | 'code'

export type H0TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em' | 'code'

export type H0TypographyWeight = 400 | 500 | 600 | 700

export type H0TypographyLineHeight = number | string

export type H0TypographyLetterSpacing = number | string

export type H0TypographyTextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase'

export type H0LabelElement = 'label' | 'legend' | 'span'

export type H0DescriptionElement = 'p' | 'span' | 'div'

export type H0DescriptionVariant = 'body-sm' | 'body-xs'

export type H0ErrorMessageElement = 'p' | 'span' | 'div'

export type H0TypographyAlign = 'left' | 'center' | 'right'

export type H0TypographyColor = 'default' | 'muted' | 'secondary' | 'primary' | 'inherit'

export type H0MessageTone = 'default' | 'error' | 'success' | 'warning'
import type H0DescriptionComponent from './H0Description.vue'
import type H0ErrorMessageComponent from './H0ErrorMessage.vue'
import type H0LabelComponent from './H0Label.vue'
import type H0MessageComponent from './H0Message.vue'
import type H0TypographyComponent from './H0Typography.vue'
import type { H0PublicProps } from '../_shared/publicComponent.types'

export type H0DescriptionProps = H0PublicProps<typeof H0DescriptionComponent>
export type H0ErrorMessageProps = H0PublicProps<typeof H0ErrorMessageComponent>
export type H0LabelProps = H0PublicProps<typeof H0LabelComponent>
export type H0MessageProps = H0PublicProps<typeof H0MessageComponent>
export type H0TypographyProps = H0PublicProps<typeof H0TypographyComponent>
