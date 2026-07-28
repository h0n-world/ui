import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const paginationAgentRecord = {
    schemaVersion: 1, component: 'H0Pagination', status: 'migrated', summary: 'Numbered page navigation with derived totals, boundary and sibling items, ellipses, sizes, and optional result summary.',
    imports: { components: ['H0Pagination'], types: ['H0PaginationEmits', 'H0PaginationProps', 'H0PaginationSize'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'page', type: 'number', default: '1', description: 'Controlled one-based current page.' }, { name: 'totalItems', type: 'number', default: '0', description: 'Total result count used to derive pages and summary.' }, { name: 'pageSize', type: 'number', default: '10', description: 'Results per derived page.' },
        { name: 'totalPages', type: 'number', default: 'undefined', description: 'Explicit page count that takes precedence over derivation.' }, { name: 'siblingCount', type: 'number', default: '1', description: 'Numbered pages shown beside the current page.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size.' },
        { name: 'showSummary', type: 'boolean', default: 'false', description: 'Shows the localized visible result range.' }, { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables every page control.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible navigation name, falling back to localized copy.' },
    ], events: [{ name: 'update:page', type: 'number', description: 'Requests controlled page update.' }, { name: 'change', type: 'number', description: 'Reports a different selected page.' }], slots: [], exposed: [], types: [
        { name: 'H0PaginationSize', fields: [{ name: 'H0PaginationSize', type: "'sm' | 'md' | 'lg'", description: 'Supported pagination control sizes.' }] },
    ] },
    useWhen: ['Users navigate a known finite number of result pages.'], avoidWhen: ['The API exposes only opaque cursors.', 'Content should append continuously; use H0InfiniteScroll.'], ...standardNavigationGuidance,
    performance: ['Rendered controls remain bounded by boundary and sibling counts.', 'Fetch data on change rather than recomputing expensive results during render.'],
    examples: [
        { key: 'components/pagination/BasicExample', purpose: 'Standard controlled navigation across a known page count.' },
        { key: 'components/pagination/SizesExample', purpose: 'Small, medium, and large pagination controls compared together.' },
        { key: 'components/pagination/SummaryExample', purpose: 'Controlled page navigation with a derived result summary.' },
        { key: 'components/pagination/WindowExample', purpose: 'Large page window, sibling count, and disabled state.' },
    ], relatedComponents: ['H0InfiniteScroll', 'H0DataTable'],
} satisfies ComponentAgentRecordV1
