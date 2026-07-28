import type { ComponentAgentRecordV1 } from '../schema.ts'

export const carouselAgentRecord = {
    schemaVersion: 1, component: 'H0Carousel', status: 'migrated', summary: 'Generic controlled or uncontrolled carousel with drag, keyboard, pagination, autoplay, and imperative navigation.',
    imports: { components: ['H0Carousel'], types: ['H0CarouselControlsPosition', 'H0CarouselEffect', 'H0CarouselEmits', 'H0CarouselItem', 'H0CarouselPaginationVariant', 'H0CarouselProps'], styles: ['@h0nio/ui/style.css'] },
    api: {
        props: [
            { name: 'items', type: 'Item[]', default: '[]', description: 'Generic slide source rendered through the default slot.' }, { name: 'modelValue', type: 'number', default: 'undefined', description: 'Controlled zero-based active index.' },
            { name: 'defaultValue', type: 'number', default: '0', description: 'Initial uncontrolled index.' }, { name: 'width', type: 'number | string', default: 'undefined', description: 'Explicit root width; numbers become pixels.' },
            { name: 'height', type: 'number | string', default: 'undefined', description: 'Explicit root height; numbers become pixels.' }, { name: 'fullWidth', type: 'boolean', default: 'true', description: 'Fills available width when width is absent.' },
            { name: 'fullHeight', type: 'boolean', default: 'false', description: 'Fills an established parent height when height is absent.' }, { name: 'slideWidth', type: 'number | string', default: "'100%'", description: 'Width of each slide.' },
            { name: 'gap', type: 'number | string', default: '12', description: 'Gap between slides.' }, { name: 'showPagination', type: 'boolean', default: 'false', description: 'Renders interactive pagination.' },
            { name: 'paginationVariant', type: 'H0CarouselPaginationVariant', default: "'dots'", description: 'Dot or pill active pagination style.' }, { name: 'showControls', type: 'boolean', default: 'true', description: 'Renders previous and next controls when multiple slides exist.' },
            { name: 'controlsPosition', type: 'H0CarouselControlsPosition', default: "'inside'", description: 'Places controls over the viewport or below it.' }, { name: 'showCounter', type: 'boolean', default: 'false', description: 'Displays localized slide position text.' },
            { name: 'draggable', type: 'boolean', default: 'true', description: 'Enables pointer drag gestures outside interactive descendants.' }, { name: 'keyboard', type: 'boolean', default: 'true', description: 'Enables Left and Right Arrow navigation on the viewport.' },
            { name: 'effect', type: 'H0CarouselEffect', default: "'elastic'", description: 'Track follows drag movement or remains static until selection.' }, { name: 'loop', type: 'boolean', default: 'false', description: 'Wraps navigation at the first and last slide.' },
            { name: 'autoplay', type: 'boolean', default: 'false', description: 'Requests automatic advancement.' }, { name: 'autoplayInterval', type: 'number', default: '5000', description: 'Autoplay delay in milliseconds, clamped to at least 250.' },
            { name: 'pauseOnHover', type: 'boolean', default: 'true', description: 'Pauses autoplay while hovered.' }, { name: 'pauseOnFocus', type: 'boolean', default: 'true', description: 'Pauses autoplay while focus is within the carousel.' },
            { name: 'ariaLabel', type: 'string', default: 'Localized carousel label', description: 'Accessible name for the carousel region.' }, { name: 'hideInactiveSlidesFromAccessibility', type: 'boolean', default: 'true', description: 'Makes inactive slides aria-hidden and inert.' },
        ],
        events: [{ name: 'update:modelValue', type: 'number', description: 'Requests a controlled active-index update when the selected index changes.' }, { name: 'change', type: 'number', description: 'Reports a newly selected index when navigation changes the selection.' }],
        slots: [
            { name: 'default', type: '{ item: Item; index: number; active: boolean }', description: 'Slide content.' },
            { name: 'previous-control', type: '—', description: 'Custom previous icon/content inside the labeled button.' }, { name: 'next-control', type: '—', description: 'Custom next icon/content inside the labeled button.' },
        ],
        exposed: [
            { name: 'previous', type: '() => void', description: 'Selects the previous slide.' }, { name: 'next', type: '() => void', description: 'Selects the next slide.' },
            { name: 'goTo', type: '(index: number) => void', description: 'Selects a zero-based index.' }, { name: 'play', type: '() => void', description: 'Requests autoplay and schedules it when possible.' },
            { name: 'pause', type: '() => void', description: 'Stops requested autoplay and clears its timer.' },
        ],
        types: [
            { name: 'H0CarouselItem', fields: [{ name: 'H0CarouselItem', type: 'Record<string, unknown> | string | number | boolean | null', description: 'Allowed generic slide item base.' }] },
            { name: 'H0CarouselEffect', fields: [{ name: 'H0CarouselEffect', type: "'static' | 'elastic'", description: 'Drag feedback modes.' }] },
            { name: 'H0CarouselControlsPosition', fields: [{ name: 'H0CarouselControlsPosition', type: "'inside' | 'outside'", description: 'Control placement.' }] },
            { name: 'H0CarouselPaginationVariant', fields: [{ name: 'H0CarouselPaginationVariant', type: "'dots' | 'pills'", description: 'Pagination appearance.' }] },
        ],
    },
    useWhen: ['A compact viewport presents several peer cards, images, or panels.', 'Users need drag, keyboard, pagination, autoplay, or imperative slide control.'],
    avoidWhen: ['All content should remain visible for scanning.', 'The content is primary navigation between application views.', 'Autoplay would distract from a task.'],
    accessibility: ['Provide a specific ariaLabel.', 'Keep pauseOnFocus enabled and provide a persistent Play/Pause control for autoplay.', 'Keep inactive slides hidden and inert unless simultaneous accessibility is intentional.', 'Preserve visible controls or another clear navigation mechanism.'],
    styling: ['Style slides through the default slot.', 'Treat track transforms and carousel selectors as implementation details.'],
    responsive: ['Use fullWidth and CSS slideWidth values for fluid and peek layouts.', 'Avoid explicit widths wider than the container.'],
    performance: ['Keep item arrays stable.', 'Keep inactive slide trees lightweight.', 'Avoid short autoplay intervals and excessive slides.'],
    examples: [
        { key: 'components/carousel/BasicExample', purpose: 'Generic peek layout with inside controls.' }, { key: 'components/carousel/ControlledExample', purpose: 'v-model, outside controls, pills, and counter.' },
        { key: 'components/carousel/AutoplayExample', purpose: 'Looping autoplay with hover, focus, and explicit Play/Pause controls.' }, { key: 'components/carousel/ProgrammaticExample', purpose: 'All exposed navigation and playback methods.' },
        { key: 'components/carousel/CustomControlsExample', purpose: 'Custom labeled-button content with static drag feedback.' },
    ],
    relatedComponents: ['H0Image', 'H0Button'],
} satisfies ComponentAgentRecordV1
