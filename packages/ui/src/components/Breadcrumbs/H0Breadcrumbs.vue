<script lang="ts" setup>
import { computed, type Component } from 'vue'
import type { H0BreadcrumbItem } from './Breadcrumbs.types'

defineOptions({
    name: 'H0Breadcrumbs'
})

const props = withDefaults(
    defineProps<{
        items: H0BreadcrumbItem[]
        ariaLabel?: string
        linkComponent?: string | Component
        separator?: string
    }>(),
    {
        ariaLabel: 'Breadcrumbs',
        linkComponent: 'a',
        separator: '›'
    }
)

const isAnchorLink = computed(() => props.linkComponent === 'a')

function isCurrent(index: number) {
    return index === props.items.length - 1
}

function getItemKey(item: H0BreadcrumbItem, index: number) {
    return `${item.label}-${index}`
}

function getHref(item: H0BreadcrumbItem) {
    if (item.href) {
        return item.href
    }

    return typeof item.to === 'string' ? item.to : undefined
}

function isLink(item: H0BreadcrumbItem, index: number) {
    if (isCurrent(index) || item.disabled) {
        return false
    }

    return Boolean(item.href || item.to)
}

function getLinkProps(item: H0BreadcrumbItem) {
    if (isAnchorLink.value) {
        return {
            href: getHref(item)
        }
    }

    return {
        to: item.to ?? item.href
    }
}
</script>

<template>
    <nav data-h0n-component="breadcrumbs" class="h-breadcrumbs" :aria-label="ariaLabel">
        <ol class="h-breadcrumbs__list">
            <li v-for="(item, index) in items" :key="getItemKey(item, index)" class="h-breadcrumbs__item">
                <component :is="linkComponent" v-if="isLink(item, index)" class="h-breadcrumbs__link" v-bind="getLinkProps(item)">
                    <slot name="item" :item="item" :index="index" :current="false">
                        {{ item.label }}
                    </slot>
                </component>

                <span v-else class="h-breadcrumbs__current" :aria-current="isCurrent(index) ? 'page' : undefined">
                    <slot name="item" :item="item" :index="index" :current="isCurrent(index)">
                        {{ item.label }}
                    </slot>
                </span>

                <span v-if="!isCurrent(index)" class="h-breadcrumbs__separator" aria-hidden="true">
                    <slot name="separator" :item="item" :index="index">{{ separator }}</slot>
                </span>
            </li>
        </ol>
    </nav>
</template>

<style scoped lang="scss">
.h-breadcrumbs {
    color: var(--h0n-ui-color-muted);
    font-family: var(--h0n-ui-font-family);
    max-width: 100%;
    min-width: 0;
    width: 100%;

    &__list {
        align-items: center;
        display: flex;
        gap: 8px;
        list-style: none;
        margin: 0;
        min-width: 0;
        overflow-x: auto;
        padding: 0;
        scrollbar-width: none;
    }

    &__list::-webkit-scrollbar {
        display: none;
    }

    &__item {
        align-items: center;
        color: var(--h0n-ui-color-muted);
        display: inline-flex;
        flex: 0 0 auto;
        font-size: var(--h0n-ui-typography-body-sm-size);
        gap: 8px;
        line-height: 1.2;
        min-width: 0;
    }

    &__link {
        border-radius: var(--h0n-ui-radius-sm);
        color: inherit;
        font-weight: var(--h0n-ui-font-weight-medium);
        text-decoration: none;
        transition:
            color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    }

    &__link:hover {
        color: var(--h0n-ui-color-text);
    }

    &__link:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &__current {
        color: var(--h0n-ui-color-text);
        font-weight: var(--h0n-ui-font-weight-semibold);
    }

    &__separator {
        color: var(--h0n-ui-color-muted);
        font-size: 14px;
        line-height: 1;
        margin-bottom: 2px;
        user-select: none;
    }
}
</style>
