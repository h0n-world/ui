import type { H0IconDefinition } from '../components/Icon/Icon.types'

export type { H0IconDefinition, H0IconNode } from '../components/Icon/Icon.types'

export const arrowDownIcon = { name: 'arrow-down', nodes: [['polyline', { points: '6 9 12 15 18 9' }]] } as const satisfies H0IconDefinition
export const arrowLeftIcon = { name: 'arrow-left', nodes: [['polyline', { points: '15 6 9 12 15 18' }]] } as const satisfies H0IconDefinition
export const arrowRightIcon = { name: 'arrow-right', nodes: [['polyline', { points: '9 6 15 12 9 18' }]] } as const satisfies H0IconDefinition
export const arrowUpIcon = { name: 'arrow-up', nodes: [['polyline', { points: '6 15 12 9 18 15' }]] } as const satisfies H0IconDefinition
export const bellIcon = {
    name: 'bell',
    nodes: [
        ['path', { d: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' }],
        ['path', { d: 'M13.7 21a2 2 0 0 1-3.4 0' }]
    ]
} as const satisfies H0IconDefinition
export const checkIcon = { name: 'check', nodes: [['polyline', { points: '20 6 9 17 4 12' }]] } as const satisfies H0IconDefinition
export const closeIcon = {
    name: 'close',
    nodes: [
        ['line', { x1: 18, y1: 6, x2: 6, y2: 18 }],
        ['line', { x1: 6, y1: 6, x2: 18, y2: 18 }]
    ]
} as const satisfies H0IconDefinition
export const emailIcon = {
    name: 'email',
    nodes: [
        ['path', { d: 'M4 6h16v12H4z' }],
        ['path', { d: 'm4 8 8 5 8-5' }]
    ]
} as const satisfies H0IconDefinition
export const errorIcon = {
    name: 'error',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
        ['line', { x1: 12, y1: 16, x2: 12.01, y2: 16 }]
    ]
} as const satisfies H0IconDefinition
export const infoIcon = {
    name: 'info',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['line', { x1: 12, y1: 11, x2: 12, y2: 16 }],
        ['line', { x1: 12, y1: 8, x2: 12.01, y2: 8 }]
    ]
} as const satisfies H0IconDefinition
export const loadingIcon = {
    name: 'loading',
    nodes: [
        ['path', { d: 'M21 12a9 9 0 0 1-9 9' }],
        ['path', { d: 'M3 12a9 9 0 0 1 9-9' }]
    ]
} as const satisfies H0IconDefinition
export const minusIcon = { name: 'minus', nodes: [['line', { x1: 5, y1: 12, x2: 19, y2: 12 }]] } as const satisfies H0IconDefinition
export const moreHorizontalIcon = {
    name: 'more-horizontal',
    nodes: [
        ['circle', { cx: 6, cy: 12, r: 1 }],
        ['circle', { cx: 12, cy: 12, r: 1 }],
        ['circle', { cx: 18, cy: 12, r: 1 }]
    ]
} as const satisfies H0IconDefinition
export const pendingIcon = {
    name: 'pending',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['path', { d: 'M12 7v5l3 3' }]
    ]
} as const satisfies H0IconDefinition
export const plusIcon = {
    name: 'plus',
    nodes: [
        ['line', { x1: 12, y1: 5, x2: 12, y2: 19 }],
        ['line', { x1: 5, y1: 12, x2: 19, y2: 12 }]
    ]
} as const satisfies H0IconDefinition
export const searchIcon = {
    name: 'search',
    nodes: [
        ['circle', { cx: 11, cy: 11, r: 6 }],
        ['line', { x1: 16, y1: 16, x2: 21, y2: 21 }]
    ]
} as const satisfies H0IconDefinition
export const settingsIcon = {
    name: 'settings',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 3 }],
        ['path', { d: 'M12 3v2' }],
        ['path', { d: 'M12 19v2' }],
        ['path', { d: 'M4.2 7.5 6 8.5' }],
        ['path', { d: 'M18 15.5l1.8 1' }],
        ['path', { d: 'M4.2 16.5 6 15.5' }],
        ['path', { d: 'M18 8.5l1.8-1' }]
    ]
} as const satisfies H0IconDefinition
export const successIcon = {
    name: 'success',
    nodes: [
        ['circle', { cx: 12, cy: 12, r: 9 }],
        ['polyline', { points: '8 12.5 10.8 15.3 16 9.7' }]
    ]
} as const satisfies H0IconDefinition
export const thumbUpIcon = {
    name: 'thumb-up',
    nodes: [
        ['path', { d: 'M7 11v9' }],
        ['path', { d: 'M4 12v7a1 1 0 0 0 1 1h2' }],
        ['path', { d: 'M7 12l4-8a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7' }]
    ]
} as const satisfies H0IconDefinition
export const trashIcon = {
    name: 'trash',
    nodes: [
        ['path', { d: 'M5 7h14' }],
        ['path', { d: 'M10 11v6' }],
        ['path', { d: 'M14 11v6' }],
        ['path', { d: 'M6 7l1 14h10l1-14' }],
        ['path', { d: 'M9 7V4h6v3' }]
    ]
} as const satisfies H0IconDefinition
export const userIcon = {
    name: 'user',
    nodes: [
        ['circle', { cx: 12, cy: 8, r: 4 }],
        ['path', { d: 'M4 21a8 8 0 0 1 16 0' }]
    ]
} as const satisfies H0IconDefinition
export const warningIcon = {
    name: 'warning',
    nodes: [
        ['path', { d: 'M10.3 4.5 2.8 17.5A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.5L13.7 4.5a2 2 0 0 0-3.4 0Z' }],
        ['line', { x1: 12, y1: 9, x2: 12, y2: 13 }],
        ['line', { x1: 12, y1: 17, x2: 12.01, y2: 17 }]
    ]
} as const satisfies H0IconDefinition
