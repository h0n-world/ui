import { inject, readonly, ref, type App, type Ref } from 'vue'
import { h0LocaleKey } from './components/_shared/localeKey'

export type H0Locale = {
    common: { clear: string; close: string; empty: string; loading: string }
    form: { required: (label?: string) => string }
    table: { ariaLabel: string; empty: string; loading: string; scrollArea: (label: string) => string }
    dataTable: { empty: string; filter: (label: string) => string; label: string; loading: string; selectAll: string; selectRow: (index: number) => string; sort: (label: string) => string }
    pagination: { label: string; next: string; page: (page: number) => string; previous: string; summary: (start: number, end: number, total: number) => string }
    select: { empty: string; listLabel: string; placeholder: string }
    search: { clear: string; label: string }
    infiniteScroll: { end: string; loadMore: string; loading: string }
    imageUpload: { label: string; remove: string; invalidType: string; maxSize: (size: number) => string }
    inputOtp: { character: (index: number) => string; invalid: string; label: string }
    radio: { required: string }
    overlay: { alertDialog: string; cancel: string; closeAlertDialog: string; closeDrawer: string; closeModal: string; confirm: string; confirmAction: string; drawer: string; modal: string; sheet: string }
    carousel: { controls: string; goTo: (index: number) => string; label: string; next: string; previous: string; slide: (index: number, total: number) => string }
    toast: { close: string }
    link: { external: string }
    tooltip: { label: string }
    tabs: { label: string }
    field: { optional: string }
    emptyState: { title: string }
    scrollArea: { label: string }
    numberInput: { decrement: string; increment: string; label: string }
    passwordInput: { capsLock: string; hide: string; reveal: string; strength: readonly [string, string, string, string, string] }
    fileUpload: { add: string; cancel: string; clear: string; drop: string; invalid: string; remove: string; retry: string; start: string }
    toolbar: { label: string }
}

export type H0LocaleConfig = { [Section in keyof H0Locale]?: Partial<H0Locale[Section]> }

export type H0LocaleService = {
    locale: Readonly<Ref<H0Locale>>
    language?: Readonly<Ref<string>>
    patchLocale: (config: H0LocaleConfig) => void
    setLocale: (config: H0LocaleConfig) => void
    setLanguage?: (language: string) => void
}

export type H0LocaleServiceOptions = { language?: string }

export const defaultH0TableLocale: H0Locale['table'] = { ariaLabel: 'Data table', empty: 'No results found', loading: 'Loading rows', scrollArea: (label) => `${label} scroll area` }
export const defaultH0DataTableLocale: H0Locale['dataTable'] = { empty: 'No results found', filter: (label) => `Filter ${label}`, label: 'Data table', loading: 'Loading rows', selectAll: 'Select all rows', selectRow: (index) => `Select row ${index + 1}`, sort: (label) => `Sort by ${label}` }
export const defaultH0PaginationLocale: H0Locale['pagination'] = { label: 'Pagination', next: 'Next', page: (page) => `Page ${page}`, previous: 'Previous', summary: (start, end, total) => (total > 0 ? `Showing ${start}-${end} of ${total} results` : 'Showing 0 results') }
export const defaultH0LinkLocale: H0Locale['link'] = { external: 'Opens in a new window' }
export const defaultH0EmptyStateLocale: H0Locale['emptyState'] = { title: 'Nothing here yet' }
export const defaultH0ScrollAreaLocale: H0Locale['scrollArea'] = { label: 'Scrollable content' }
export const defaultH0TabsLocale: H0Locale['tabs'] = { label: 'Tabs' }
export const defaultH0TooltipLocale: H0Locale['tooltip'] = { label: 'Tooltip' }
export const defaultH0NumberInputLocale: H0Locale['numberInput'] = { decrement: 'Decrease value', increment: 'Increase value', label: 'Number' }
export const defaultH0PasswordInputLocale: H0Locale['passwordInput'] = { capsLock: 'Caps Lock is on', hide: 'Hide password', reveal: 'Show password', strength: ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'] }
export const defaultH0FileUploadLocale: H0Locale['fileUpload'] = { add: 'Add files', cancel: 'Cancel upload', clear: 'Clear files', drop: 'Drop files here or choose files', invalid: 'File is not accepted', remove: 'Remove file', retry: 'Retry upload', start: 'Upload files' }
export const defaultH0ToolbarLocale: H0Locale['toolbar'] = { label: 'Toolbar' }

export const defaultH0Locale: H0Locale = {
    common: { clear: 'Clear', close: 'Close', empty: 'No results', loading: 'Loading' },
    form: { required: (label) => (label ? `Enter ${label.toLowerCase()}` : 'This field is required.') },
    table: defaultH0TableLocale,
    dataTable: defaultH0DataTableLocale,
    pagination: defaultH0PaginationLocale,
    select: { empty: 'No options', listLabel: 'Select options', placeholder: 'Select option' },
    search: { clear: 'Clear search', label: 'Search' },
    infiniteScroll: { end: 'No more items', loadMore: 'Load more', loading: 'Loading more' },
    imageUpload: { label: 'Upload image', remove: 'Remove image', invalidType: 'Unsupported file type.', maxSize: (size) => `File must be no larger than ${size} bytes.` },
    inputOtp: { character: (index) => `Code character ${index}`, invalid: 'Invalid verification code', label: 'One-time password' },
    radio: { required: 'Select an option.' },
    overlay: {
        alertDialog: 'Alert dialog', cancel: 'Cancel', closeAlertDialog: 'Close alert dialog', closeDrawer: 'Close drawer', closeModal: 'Close modal', confirm: 'Confirm', confirmAction: 'Confirm action', drawer: 'Drawer', modal: 'Modal', sheet: 'Sheet'
    },
    carousel: { controls: 'Carousel controls', goTo: (index) => `Go to slide ${index + 1}`, label: 'Carousel', next: 'Next slide', previous: 'Previous slide', slide: (index, total) => `Slide ${index + 1} of ${total}` },
    toast: { close: 'Close notification' },
    link: defaultH0LinkLocale,
    tooltip: defaultH0TooltipLocale,
    tabs: defaultH0TabsLocale,
    field: { optional: 'Optional' },
    emptyState: defaultH0EmptyStateLocale,
    scrollArea: defaultH0ScrollAreaLocale,
    numberInput: defaultH0NumberInputLocale,
    passwordInput: defaultH0PasswordInputLocale,
    fileUpload: defaultH0FileUploadLocale,
    toolbar: defaultH0ToolbarLocale,
}

function mergeH0Locale(config: H0LocaleConfig = {}, base: H0Locale = defaultH0Locale): H0Locale {
    return Object.fromEntries(Object.entries(base).map(([section, values]) => [section, { ...values, ...(config[section as keyof H0Locale] ?? {}) }])) as H0Locale
}

export function createH0LocaleService(config: H0LocaleConfig = {}, options: H0LocaleServiceOptions = {}): H0LocaleService {
    const locale = ref(mergeH0Locale(config)) as Ref<H0Locale>
    const language = ref(options.language || 'en-US')

    return {
        locale: readonly(locale),
        language: readonly(language),
        patchLocale(nextConfig) {
            locale.value = mergeH0Locale(nextConfig, locale.value)
        },
        setLocale(nextConfig) {
            locale.value = mergeH0Locale(nextConfig)
        },
        setLanguage(nextLanguage) {
            language.value = nextLanguage || 'en-US'
        }
    }
}

export function provideH0Locale(app: App, service: H0LocaleService) {
    app.provide(h0LocaleKey, service)
}

export function useH0Locale() {
    return inject(h0LocaleKey, () => createH0LocaleService(), true)
}
