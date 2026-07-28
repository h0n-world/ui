<script setup lang="ts">
import type { H0ListItemBorderRadius, H0ListItemElement, H0ListItemSize } from './List.types'
import H0Interactive from '../_shared/H0Interactive.vue'
import H0Ripple from '../Ripple/H0Ripple.vue'
import H0Typography from '../Typography/H0Typography.vue'
import { computed, useTemplateRef, type PropType } from 'vue'
import { toH0CssSize } from '../_shared/utils'

defineOptions({
    name: 'H0ListItem'
})

const props = defineProps({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    interactive: { type: Boolean, default: true },
    as: { type: [String, Object, Function] as PropType<H0ListItemElement>, default: undefined },
    size: { type: String as PropType<H0ListItemSize>, default: 'md' },
    borderRadius: { type: [Number, String] as PropType<H0ListItemBorderRadius>, default: 0 }
})

const ripple = useTemplateRef<InstanceType<typeof H0Ripple>>('ripple')
const elementTag = computed(() => props.as ?? (props.interactive ? 'button' : 'div'))
const itemStyle = computed(() => ({
    '--h-list-item-border-radius': toH0CssSize(props.borderRadius)
}))

function handlePointerDown(event: PointerEvent) {
    if (!props.interactive || props.disabled) {
        return
    }

    ripple.value?.create(event)
}
</script>

<template>
    <H0Interactive
        :as="elementTag"
        :interactive="interactive"
        :disabled="disabled"
        data-h0n-component="list-item"
        class="h-list-item"
        :class="[`h-list-item--${size}`, interactive && !disabled && 'h-list-item--interactive', active && 'h-list-item--active', disabled && 'h-list-item--disabled']"
        :style="itemStyle"
        @pointerdown="handlePointerDown"
    >
        <span v-if="$slots.start" class="h-list-item__start">
            <slot name="start" />
        </span>

        <span class="h-list-item__content" :class="(description || $slots.description) && 'h-list-item__content--stacked'">
            <slot v-if="$slots.default" />
            <template v-else>
                <H0Typography as="span" class="h-list-item__title" variant="body" :weight="500">
                    <slot name="title">{{ title }}</slot>
                </H0Typography>
                <H0Typography v-if="description || $slots.description" as="span" class="h-list-item__description" variant="body-sm" color="muted">
                    <slot name="description">{{ description }}</slot>
                </H0Typography>
            </template>
        </span>

        <H0Typography v-if="$slots.end || value" as="span" class="h-list-item__end" variant="body-sm" :weight="600" color="inherit">
            <slot name="end">
                {{ value }}
            </slot>
        </H0Typography>

        <H0Ripple ref="ripple" :disabled="!interactive || disabled" />
    </H0Interactive>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-list-item {
    --h-list-item-border-radius: 0;
    --h-list-item-height: 56px;

    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--h-list-item-border-radius);
    color: var(--h0n-ui-color-text);
    display: flex;
    gap: 12px;
    min-height: var(--h-list-item-height);
    min-width: 0;
    padding: 10px 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    width: 100%;

    @include mixins.h0n-focus-visible;

    &--interactive {
        cursor: pointer;
    }

    &--disabled {
        cursor: not-allowed;
        opacity: 0.56;
    }

    &__start,
    &__end {
        align-items: center;
        display: inline-flex;
        flex: 0 0 auto;
        justify-content: center;
        min-width: 0;
        position: relative;
        z-index: 1;
    }

    &__content {
        align-items: center;
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
        position: relative;
        z-index: 1;

        &--stacked {
            align-items: flex-start;
            flex-direction: column;
            gap: 2px;
        }
    }

    &__title {
        // line-height: 1.35;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__description {
        line-height: 1.35;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    &__end {
        color: var(--h0n-ui-color-accent);
        line-height: 1.3;
    }

    &--sm {
        --h-list-item-height: 48px;
    }

    &--md {
        --h-list-item-height: 56px;
    }

    &--lg {
        --h-list-item-height: 76px;
    }

    &--active {
        background: var(--h0n-ui-color-surface);
    }

    @media (hover: hover) and (pointer: fine) {
        &--interactive:hover {
            background: var(--h0n-ui-color-surface-hover);
        }
    }
}
</style>
