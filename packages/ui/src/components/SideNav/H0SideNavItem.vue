<script setup lang="ts">
import { arrowRightIcon } from '../../icons'
import H0Icon from '../Icon/H0Icon.vue'
import H0ListItem from '../List/H0ListItem.vue'
import type { H0SideNavItemElement } from './SideNav.types'
import type { PropType } from 'vue'

defineOptions({
    name: 'H0SideNavItem'
})

defineProps({
    title: { type: String, default: '' },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    as: { type: [String, Object, Function] as PropType<H0SideNavItemElement>, default: 'a' },
    indicator: { type: Boolean, default: true }
})
</script>

<template>
    <H0ListItem
        data-h0n-component="side-nav-item"
        class="h-side-nav-item"
        :class="active && 'h-side-nav-item--active'"
        :as="as"
        :active="active"
        :disabled="disabled"
        :title="title"
        v-bind="active ? { 'aria-current': 'page' } : {}"
    >
        <template v-if="$slots.start" #start>
            <slot name="start" />
        </template>

        <template #title>
            <slot>{{ title }}</slot>
        </template>

        <template v-if="indicator || $slots.end" #end>
            <span class="h-side-nav-item__indicator" aria-hidden="true">
                <slot name="end">
                    <H0Icon :icon="arrowRightIcon" :size="14" :stroke-width="1.6" />
                </slot>
            </span>
        </template>
    </H0ListItem>
</template>

<style scoped lang="scss">
.h-side-nav-item {
    &__indicator {
        opacity: var(--h-side-nav-indicator-opacity, 1);
        transform: translateX(var(--h-side-nav-indicator-translate-x, 0));
        transition:
            opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    }

    &--active &__indicator,
    &.router-link-active &__indicator,
    &.router-link-exact-active &__indicator,
    &:focus-visible &__indicator {
        opacity: 1;
        transform: translateX(0);
    }

    @media (hover: hover) and (pointer: fine) {
        &.h-list-item--interactive:hover &__indicator {
            opacity: 1;
            transform: translateX(0);
        }
    }
}
</style>
