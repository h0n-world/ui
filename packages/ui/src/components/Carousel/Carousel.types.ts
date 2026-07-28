export type H0CarouselItem = Record<string, unknown> | string | number | boolean | null

export type H0CarouselProps<Item extends H0CarouselItem = H0CarouselItem> = {
    items?: Item[]
    modelValue?: number
    defaultValue?: number
    width?: number | string
    height?: number | string
    fullWidth?: boolean
    fullHeight?: boolean
    slideWidth?: number | string
    gap?: number | string
    showPagination?: boolean
    paginationVariant?: H0CarouselPaginationVariant
    showControls?: boolean
    controlsPosition?: H0CarouselControlsPosition
    showCounter?: boolean
    draggable?: boolean
    keyboard?: boolean
    effect?: H0CarouselEffect
    loop?: boolean
    autoplay?: boolean
    autoplayInterval?: number
    pauseOnHover?: boolean
    pauseOnFocus?: boolean
    ariaLabel?: string
    hideInactiveSlidesFromAccessibility?: boolean
}

export type H0CarouselEmits = {
    'update:modelValue': [index: number]
    change: [index: number]
}

export type H0CarouselEffect = 'static' | 'elastic'

export type H0CarouselControlsPosition = 'inside' | 'outside'

export type H0CarouselPaginationVariant = 'dots' | 'pills'
