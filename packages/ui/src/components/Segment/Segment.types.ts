import type { H0IconSource } from '../Icon'
import type { H0Size } from '../../types'

export type H0SegmentValue = string

export type H0SegmentSize = H0Size

export type H0SegmentVariant = 'default' | 'secondary' | 'outline' | 'ghost'

export type H0SegmentItem = {
    label: string
    value: H0SegmentValue
    icon?: H0IconSource
    disabled?: boolean
}
import type H0SegmentComponent from './H0Segment.vue'
import type { H0PublicEmits, H0PublicProps } from '../_shared/publicComponent.types'

export type H0SegmentProps = H0PublicProps<typeof H0SegmentComponent>
export type H0SegmentEmits = H0PublicEmits<typeof H0SegmentComponent>
