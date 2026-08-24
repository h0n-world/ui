<script setup lang="ts">
import { renderIcon, type IconDefinition } from '@h0nio/icons'
import { icons } from '@h0nio/icons/all'
import {
    iconCatalog,
    iconCategories,
    iconStyles,
    type CatalogIconName,
    type IconCategory,
    type IconMetadata,
    type IconStyle,
} from '@h0nio/icons/catalog'
import { H0CellColorPicker, H0SearchField, H0Select, type H0SelectOption } from '@h0nio/ui'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
    name: 'IconCatalog',
})

const emit = defineEmits<{
    ready: []
}>()

type CatalogItem = {
    icon: IconDefinition
    metadata: IconMetadata
    name: CatalogIconName
    searchable: string
}

const batchSize = 96
const sizeValues = [18, 22, 26, 30, 34, 38, 42, 46] as const
const query = ref('')
const color = ref('#6d5dfc')
const size = ref<number>(34)
const selectedStyle = ref<'all' | IconStyle>('all')
const selectedCategory = ref<'all' | IconCategory>('all')
const visibleCount = ref(batchSize)
const copied = ref<CatalogIconName>()
const sentinel = ref<HTMLElement>()
const toolbarBoundary = ref<HTMLElement>()
const isToolbarSticky = ref(false)
let observer: IntersectionObserver | undefined
let toolbarObserver: IntersectionObserver | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined

const categoryOptions: H0SelectOption<'all' | IconCategory>[] = [
    { label: 'All categories', value: 'all' },
    ...iconCategories.map((category) => ({ label: humanize(category), value: category })),
]
const styleOptions: H0SelectOption<'all' | IconStyle>[] = [
    { label: 'All styles', value: 'all' },
    ...iconStyles.map((style) => ({ label: humanize(style), value: style })),
]
const sizeOptions: H0SelectOption<number>[] = sizeValues.map((value) => ({
    label: `${value}px`,
    value,
}))

const catalog: CatalogItem[] = Object.entries(icons).map(([name, icon]) => {
    const typedName = name as CatalogIconName
    const metadata = iconCatalog[typedName]

    return {
        icon,
        metadata,
        name: typedName,
        searchable: [typedName, ...metadata.tags, ...metadata.categories].join(' ').toLowerCase(),
    }
})

const filteredIcons = computed(() => {
    const needle = query.value.trim().toLowerCase()

    return catalog.filter(({ metadata, searchable }) => {
        const matchesQuery = !needle || searchable.includes(needle)
        const matchesStyle = selectedStyle.value === 'all' || metadata.style === selectedStyle.value
        const matchesCategory =
            selectedCategory.value === 'all' || metadata.categories.includes(selectedCategory.value)

        return matchesQuery && matchesStyle && matchesCategory
    })
})

const visibleIcons = computed(() => filteredIcons.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredIcons.value.length)

function humanize(value: string) {
    return value.replaceAll('-', ' ').replace(/^./, (letter) => letter.toUpperCase())
}

function loadNextBatch() {
    if (hasMore.value) visibleCount.value += batchSize
}

async function copyImport(name: CatalogIconName) {
    await navigator.clipboard.writeText(`import icon from '@h0nio/icons/${name}'`)
    copied.value = name
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = undefined), 1600)
}

function connectObserver() {
    observer?.disconnect()
    if (!sentinel.value || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) loadNextBatch()
        },
        { rootMargin: '500px 0px' },
    )
    observer.observe(sentinel.value)
}

function connectToolbarObserver() {
    toolbarObserver?.disconnect()
    if (!toolbarBoundary.value || typeof IntersectionObserver === 'undefined') return

    toolbarObserver = new IntersectionObserver(
        ([entry]) => {
            if (!entry) return
            isToolbarSticky.value = !entry.isIntersecting && entry.boundingClientRect.top <= 119
        },
        { rootMargin: '-119px 0px 0px', threshold: 0 },
    )
    toolbarObserver.observe(toolbarBoundary.value)
}

watch([query, selectedStyle, selectedCategory], async () => {
    visibleCount.value = batchSize
    await nextTick()
    connectObserver()
})

watch(visibleCount, async () => {
    await nextTick()
    connectObserver()
})

onMounted(() => {
    connectObserver()
    connectToolbarObserver()
    emit('ready')
})

onBeforeUnmount(() => {
    observer?.disconnect()
    toolbarObserver?.disconnect()
    if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
    <section class="icon-catalog" aria-labelledby="icon-catalog-heading">
        <div class="catalog-heading">
            <div>
                <p class="catalog-kicker">Explore the collection</p>
                <h2 id="icon-catalog-heading">All icons</h2>
            </div>
            <p class="catalog-count" aria-live="polite">
                <strong>{{ filteredIcons.length }}</strong>
                <span>{{
                    filteredIcons.length === catalog.length ? 'icons' : `of ${catalog.length}`
                }}</span>
            </p>
        </div>

        <div ref="toolbarBoundary" class="catalog-toolbar-boundary" aria-hidden="true"></div>
        <div
            class="catalog-toolbar"
            :class="isToolbarSticky && 'catalog-toolbar--sticky'"
            aria-label="Icon catalog controls"
        >
            <div class="toolbar-control toolbar-control--search">
                <H0SearchField
                    v-model="query"
                    label="Search"
                    placeholder="Name, tag, or category"
                    variant="secondary"
                    size="sm"
                />
            </div>

            <div class="toolbar-control">
                <H0Select
                    v-model="selectedCategory"
                    label="Category"
                    :options="categoryOptions"
                    variant="secondary"
                    size="sm"
                />
            </div>

            <div class="toolbar-control">
                <H0Select
                    v-model="selectedStyle"
                    label="Style"
                    :options="styleOptions"
                    variant="secondary"
                    size="sm"
                />
            </div>

            <div class="toolbar-control">
                <H0Select
                    v-model="size"
                    label="Preview size"
                    :options="sizeOptions"
                    variant="secondary"
                    size="sm"
                />
            </div>

            <div class="toolbar-control color-control">
                <span>Color</span>
                <H0CellColorPicker
                    v-model="color"
                    display="minimal"
                    swatch-position="left"
                    variant="secondary"
                    size="sm"
                    aria-label="Icon color"
                />
            </div>
        </div>

        <div v-if="visibleIcons.length" class="icon-grid">
            <button
                v-for="{ icon, metadata, name } in visibleIcons"
                :key="name"
                class="icon-card"
                type="button"
                :aria-label="`Copy import for ${name}`"
                @click="copyImport(name)"
            >
                <span class="icon-card__glyph" v-html="renderIcon(icon, { color, size })"></span>
                <span class="icon-card__details">
                    <code>{{ name }}</code>
                    <small>{{ metadata.style }} · {{ metadata.categories.join(', ') }}</small>
                </span>
                <span class="icon-card__copy">{{
                    copied === name ? 'Copied' : 'Copy import'
                }}</span>
            </button>
        </div>

        <div v-else class="catalog-empty">
            <strong>No icons found</strong>
            <span>Try another name, style, or category.</span>
        </div>

        <div v-if="hasMore" ref="sentinel" class="catalog-sentinel" aria-hidden="true">
            <span></span><span></span><span></span>
        </div>
        <p v-else-if="visibleIcons.length" class="catalog-end">
            Showing all {{ filteredIcons.length }} icons
        </p>
    </section>
</template>

<style scoped lang="scss">
.icon-catalog {
    margin-top: 60px;
}

.catalog-heading {
    align-items: end;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    h2 {
        font-size: 1.65rem;
        letter-spacing: -0.025em;
        margin: 4px 0 0;
        scroll-margin-top: 120px;
    }
}

.catalog-kicker,
.catalog-count span,
.color-control > span:first-child,
.toolbar-control :deep(.h-label) {
    color: var(--h0n-ui-color-muted);
    font-size: 0.68rem;
    font-weight: var(--h0n-ui-font-weight-semibold);
    letter-spacing: 0.07em;
    text-transform: uppercase;
}

.catalog-count {
    align-items: baseline;
    display: flex;
    gap: 6px;

    strong {
        font-size: 1.6rem;
        letter-spacing: -0.04em;
    }
}

.catalog-toolbar-boundary {
    height: 1px;
    margin-bottom: -1px;
    pointer-events: none;
}

.catalog-toolbar {
    background: color-mix(in srgb, var(--h0n-ui-color-surface) 88%, transparent);
    border-radius: var(--h0n-ui-radius-xl);
    backdrop-filter: blur(18px);
    display: grid;
    grid-template-columns:
        minmax(180px, 1fr) minmax(140px, 0.6fr) minmax(105px, 0.45fr)
        minmax(120px, 0.5fr) 130px;
    margin: 0 0 28px;
    overflow: hidden;
    position: sticky;
    top: 119px;
    transition: margin-inline var(--h0n-ui-duration-normal) var(--h0n-ui-easing-standard);
    z-index: 5;

    &--sticky {
        margin-inline: 20px;
    }
}

.toolbar-control {
    display: grid;
    min-width: 0;
    padding: 12px 14px;

    & + & {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
    }
}

.color-control {
    gap: 8px;
}

.icon-grid {
    border-left: 1px solid var(--h0n-ui-color-border);
    border-top: 1px solid var(--h0n-ui-color-border);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
}

.icon-card {
    background: transparent;
    border: 0;
    border-bottom: 1px solid var(--h0n-ui-color-border);
    border-right: 1px solid var(--h0n-ui-color-border);
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: grid;
    min-height: 174px;
    min-width: 0;
    padding: 20px 14px 14px;
    position: relative;
    text-align: left;
    transition: background var(--h0n-ui-duration-fast) ease;

    &:hover,
    &:focus-visible {
        background: var(--h0n-ui-color-surface-hover);
        z-index: 1;
    }

    &__glyph {
        display: grid;
        min-height: 82px;
        place-items: center;
    }

    &__details {
        align-self: end;
        display: grid;
        gap: 5px;
        min-width: 0;

        code,
        small {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        code {
            font-size: 0.7rem;
        }

        small {
            color: var(--h0n-ui-color-muted);
            font-size: 0.62rem;
        }
    }

    &__copy {
        color: var(--h0n-ui-color-primary);
        font-size: 0.62rem;
        opacity: 0;
        position: absolute;
        right: 10px;
        top: 9px;
        transform: translateY(3px);
        transition: var(--h0n-ui-duration-fast) ease;
    }

    &:hover &__copy,
    &:focus-visible &__copy {
        opacity: 1;
        transform: none;
    }
}

.catalog-empty {
    align-items: center;
    border: 1px dashed var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    color: var(--h0n-ui-color-muted);
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: center;
    min-height: 240px;

    strong {
        color: var(--h0n-ui-color-text);
    }
}

.catalog-sentinel {
    align-items: center;
    display: flex;
    gap: 6px;
    height: 80px;
    justify-content: center;

    span {
        animation: catalog-pulse 900ms infinite alternate;
        background: var(--h0n-ui-color-primary);
        border-radius: 50%;
        height: 5px;
        width: 5px;

        &:nth-child(2) {
            animation-delay: 150ms;
        }
        &:nth-child(3) {
            animation-delay: 300ms;
        }
    }
}

.catalog-end {
    color: var(--h0n-ui-color-muted);
    font-size: 0.72rem;
    margin: 24px 0 0;
    text-align: center;
}

@keyframes catalog-pulse {
    to {
        opacity: 0.25;
        transform: translateY(-3px);
    }
}

@media (max-width: 760px) {
    .catalog-toolbar {
        grid-template-columns: 1fr 1fr;
        position: static;

        &--sticky {
            margin-inline: 0;
        }

        .toolbar-control--search {
            border-bottom: 1px solid var(--h0n-ui-color-border);
            grid-column: 1 / -1;
        }

        .toolbar-control:nth-child(2),
        .toolbar-control:nth-child(4) {
            border-inline-start: 0;
        }

        .toolbar-control:nth-child(n + 4) {
            border-top: 1px solid var(--h0n-ui-color-border);
        }
    }

    .icon-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 520px) {
    .icon-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .icon-card {
        min-height: 150px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .catalog-sentinel span {
        animation: none;
    }
}
</style>
