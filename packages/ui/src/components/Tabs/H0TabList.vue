<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { defaultH0TabsLocale } from '../../locale'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { h0TabsKey } from './Tabs.context'

defineOptions({
    name: 'H0TabList'
})

defineProps<{
    ariaLabel?: string
}>()

const context = inject(h0TabsKey)!
const locale = useH0LocaleSection('tabs', defaultH0TabsLocale)
const root = useTemplateRef<HTMLElement>('root')
const indicatorStyle = ref<Record<string, string>>({ opacity: '0' })
let layoutResizeObserver: ResizeObserver | undefined
let tabMutationObserver: MutationObserver | undefined

function getTabs() {
    return [...(root.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])]
}

function updateIndicator() {
    const tabList = root.value
    const activeTab = tabList?.querySelector<HTMLButtonElement>('[role="tab"][aria-selected="true"]')

    if (!tabList || !activeTab) {
        indicatorStyle.value = { opacity: '0' }
        return
    }

    const listRect = tabList.getBoundingClientRect()
    const tabRect = activeTab.getBoundingClientRect()

    if (context.orientation === 'vertical') {
        indicatorStyle.value = {
            height: `${tabRect.height}px`,
            opacity: '1',
            transform: `translate3d(0, ${tabRect.top - listRect.top + tabList.scrollTop}px, 0)`
        }
        return
    }

    indicatorStyle.value = {
        opacity: '1',
        transform: `translate3d(${tabRect.left - listRect.left + tabList.scrollLeft}px, 0, 0)`,
        width: `${tabRect.width}px`
    }
}

function observeLayout() {
    if (!layoutResizeObserver || !root.value) return

    layoutResizeObserver.disconnect()
    layoutResizeObserver.observe(root.value)
    getTabs().forEach((tab) => layoutResizeObserver?.observe(tab))
}

function keydown(event: KeyboardEvent) {
    const tabs = getTabs().filter((tab) => !tab.disabled)
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement)
    const rtl = root.value?.ownerDocument.dir === 'rtl'
    const previous = context.orientation === 'vertical' ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft'
    const next = context.orientation === 'vertical' ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight'
    let target = -1

    if (event.key === previous) target = current - 1
    else if (event.key === next) target = current + 1
    else if (event.key === 'Home') target = 0
    else if (event.key === 'End') target = tabs.length - 1
    else return

    event.preventDefault()

    if (context.loop) target = (target + tabs.length) % tabs.length
    else target = Math.max(0, Math.min(target, tabs.length - 1))

    tabs[target]?.focus()
}

watch(context.active, async () => {
    await nextTick()
    updateIndicator()
})

onMounted(async () => {
    await nextTick()
    updateIndicator()

    if (typeof ResizeObserver !== 'undefined' && root.value) {
        layoutResizeObserver = new ResizeObserver(updateIndicator)
        observeLayout()
    }

    if (typeof MutationObserver !== 'undefined' && root.value) {
        tabMutationObserver = new MutationObserver(() => {
            observeLayout()
            updateIndicator()
        })
        tabMutationObserver.observe(root.value, { childList: true })
    }

    window.addEventListener('resize', updateIndicator)
})

onBeforeUnmount(() => {
    layoutResizeObserver?.disconnect()
    tabMutationObserver?.disconnect()
    window.removeEventListener('resize', updateIndicator)
})
</script>

<template>
    <div
        ref="root"
        data-h0n-component="tab-list"
        class="h-tab-list"
        :class="`h-tab-list--${context.orientation}`"
        role="tablist"
        :aria-label="ariaLabel || locale.label"
        :aria-orientation="context.orientation"
        @keydown="keydown"
    >
        <span class="h-tab-list__indicator" :style="indicatorStyle" aria-hidden="true" />
        <slot />
    </div>
</template>

<style scoped lang="scss">
.h-tab-list {
    display: flex;
    position: relative;

    &__indicator {
        background: var(--h0n-ui-color-primary);
        pointer-events: none;
        position: absolute;
        transition:
            height var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            opacity var(--h0n-ui-duration-fast) ease,
            transform var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1),
            width var(--h0n-ui-duration-normal) cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform, width, height;
        z-index: 1;
    }

    &--horizontal {
        border-block-end: 1px solid var(--h0n-ui-color-border);
        overflow-x: auto;
        overflow-y: hidden;
    }

    &--horizontal &__indicator {
        block-size: 2px;
        inset-block-end: 0px;
        left: 0;
    }

    &--vertical {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
        flex-direction: column;
    }

    &--vertical &__indicator {
        inline-size: 2px;
        inset-block-start: 0;
        inset-inline-start: -1px;
    }
}

@media (forced-colors: active) {
    .h-tab-list,
    .h-tab-list__indicator {
        border-color: CanvasText;
    }

    .h-tab-list__indicator {
        background: CanvasText;
    }
}
</style>
