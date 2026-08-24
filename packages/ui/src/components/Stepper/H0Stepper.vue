<script setup lang="ts">
import unreadIcon from '@h0nio/icons/unread-stroke'
import { computed } from 'vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0StepperColor, H0StepperItem, H0StepperOrientation, H0StepperSize } from './Stepper.types'

defineOptions({
    name: 'H0Stepper'
})

const props = withDefaults(
    defineProps<{
        items: H0StepperItem[]
        step?: number
        orientation?: H0StepperOrientation
        size?: H0StepperSize
        color?: H0StepperColor
        ariaLabel?: string
    }>(),
    {
        step: 1,
        orientation: 'horizontal',
        size: 'md',
        color: 'accent',
        ariaLabel: 'Progress'
    }
)

const currentIndex = computed(() => Math.min(Math.max(Math.floor(props.step || 1), 1), Math.max(props.items.length, 1)) - 1)
const stepperStyle = computed(() => ({ '--h-stepper-count': String(Math.max(props.items.length, 1)) }))
const labelVariant = computed(() => (props.size === 'lg' ? 'body' : props.size === 'sm' ? 'body-xs' : 'body-sm'))
const descriptionVariant = computed(() => (props.size === 'lg' ? 'body-sm' : 'body-xs'))
const iconSize = computed(() => {
    if (props.size === 'sm') {
        return 16
    }

    if (props.size === 'lg') {
        return 24
    }

    return 20
})

function getStepState(index: number) {
    if (index < currentIndex.value) {
        return 'complete'
    }

    if (index === currentIndex.value) {
        return 'active'
    }

    return 'pending'
}
</script>

<template>
    <nav data-h0n-component="stepper" class="h-stepper" :class="[`h-stepper--${orientation}`, `h-stepper--${size}`, `h-stepper--${color}`]" :style="stepperStyle" :aria-label="ariaLabel">
        <ol class="h-stepper__list">
            <li v-for="(item, index) in items" :key="`${item.label ?? 'step'}-${index}`" class="h-stepper__item" :class="[`h-stepper__item--${getStepState(index)}`]">
                <div class="h-stepper__marker-wrap" aria-hidden="true">
                    <span class="h-stepper__marker">
                        <H0Icon v-if="item.icon" class="h-stepper__marker-content" :icon="item.icon" :size="iconSize" />
                        <H0Icon v-else-if="getStepState(index) === 'complete'" class="h-stepper__marker-content" :icon="unreadIcon" :size="iconSize" />
                        <span v-else class="h-stepper__marker-content">{{ index + 1 }}</span>
                    </span>
                </div>

                <div v-if="item.label || item.description" class="h-stepper__content">
                    <H0Typography v-if="item.label" as="p" class="h-stepper__label" :variant="labelVariant" :weight="600" :aria-current="getStepState(index) === 'active' ? 'step' : undefined">{{
                        item.label
                    }}</H0Typography>
                    <H0Description v-if="item.description" as="p" class="h-stepper__description" :variant="descriptionVariant">{{ item.description }}</H0Description>
                </div>
            </li>
        </ol>
    </nav>
</template>

<style scoped lang="scss">
@use '../../styles/breakpoints' as bp;
.h-stepper {
    --h-stepper-marker-size: 28px;
    --h-stepper-icon-size: 16px;
    --h-stepper-line-size: 2px;
    --h-stepper-gap: 12px;
    --h-stepper-active: var(--h0n-ui-color-primary);
    --h-stepper-active-contrast: var(--h0n-ui-color-primary-contrast);
    --h-stepper-pending: var(--h0n-ui-color-muted);
    --h-stepper-line-pending: var(--h0n-ui-color-border);

    color: var(--h0n-ui-color-text);
    font-family: var(--h0n-ui-font-family);
    min-width: 0;
    width: 100%;

    &--sm {
        --h-stepper-marker-size: 22px;
        --h-stepper-icon-size: 13px;
        --h-stepper-gap: 8px;
    }

    &--lg {
        --h-stepper-marker-size: 36px;
        --h-stepper-icon-size: 20px;
        --h-stepper-line-size: 3px;
        --h-stepper-gap: 14px;
    }

    &--success {
        --h-stepper-active: var(--h0n-ui-color-success);
        --h-stepper-active-contrast: var(--h0n-ui-color-text);
    }

    &--danger {
        --h-stepper-active: var(--h0n-ui-color-danger);
        --h-stepper-active-contrast: var(--h0n-ui-color-text);
    }

    &--warning {
        --h-stepper-active: var(--h0n-ui-color-warning);
        --h-stepper-active-contrast: var(--h0n-ui-color-text);
    }

    &--inverted {
        --h-stepper-active: var(--h0n-ui-color-text);
        --h-stepper-active-contrast: var(--h0n-ui-color-surface);
    }
}

.h-stepper__list {
    list-style: none;
    margin: 0;
    min-width: 0;
    padding: 0;
}

.h-stepper__item {
    min-width: 0;
    position: relative;
}

.h-stepper__marker-wrap {
    align-items: center;
    display: flex;
    justify-content: center;
    min-width: 0;
    position: relative;
}

.h-stepper__marker {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 2px solid var(--h-stepper-line-pending);
    border-radius: var(--h0n-ui-radius-round);
    box-sizing: border-box;
    color: var(--h-stepper-pending);
    display: inline-grid;
    flex: 0 0 auto;
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-semibold);
    height: var(--h-stepper-marker-size);
    line-height: 1;
    place-items: center;
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        border-color var(--h0n-ui-duration-fast) ease,
        color var(--h0n-ui-duration-fast) ease;
    width: var(--h-stepper-marker-size);
    z-index: 1;
}

.h-stepper__marker-content {
    grid-area: 1 / 1;
    line-height: 1;
}

.h-stepper__content {
    min-width: 0;
}

.h-stepper__label,
.h-stepper__description {
    margin: 0;
}

.h-stepper__label {
    color: var(--h0n-ui-color-muted);
    line-height: 1.3;
}

.h-stepper__description {
    color: var(--h0n-ui-color-muted);
    line-height: 1.35;
    margin-top: 2px;
}

.h-stepper__item--complete,
.h-stepper__item--active {
    .h-stepper__label {
        color: var(--h0n-ui-color-text);
    }
}

.h-stepper__item--complete {
    .h-stepper__marker {
        background: var(--h-stepper-active);
        border-color: var(--h-stepper-active);
        color: var(--h-stepper-active-contrast);
    }
}

.h-stepper__item--active {
    .h-stepper__marker {
        background: var(--h0n-ui-color-surface);
        border-color: var(--h-stepper-active);
        color: var(--h-stepper-active);
    }
}

.h-stepper--horizontal {
    .h-stepper__list {
        display: grid;
        gap: 0;
        grid-template-columns: repeat(var(--h-stepper-count, 1), minmax(0, 1fr));
    }

    .h-stepper__item {
        display: grid;
        gap: var(--h-stepper-gap);
        justify-items: center;
        text-align: center;
    }

    .h-stepper__item:not(:last-child)::before {
        background: var(--h-stepper-line-pending);
        content: '';
        height: var(--h-stepper-line-size);
        left: calc(50% + (var(--h-stepper-marker-size) / 2));
        position: absolute;
        right: calc(-50% + (var(--h-stepper-marker-size) / 2));
        top: calc((var(--h-stepper-marker-size) - var(--h-stepper-line-size)) / 2);
    }

    .h-stepper__item--complete:not(:last-child)::before {
        background: var(--h-stepper-active);
    }
}

.h-stepper--vertical {
    .h-stepper__list {
        display: grid;
        gap: 0;
    }

    .h-stepper__item {
        display: grid;
        gap: var(--h-stepper-gap);
        grid-template-columns: var(--h-stepper-marker-size) minmax(0, 1fr);
        min-height: calc(var(--h-stepper-marker-size) + 22px);
        padding-bottom: var(--h0n-ui-spacing-md);
    }

    .h-stepper__item:last-child {
        min-height: var(--h-stepper-marker-size);
        padding-bottom: 0;
    }

    .h-stepper__item:not(:last-child)::before {
        background: var(--h-stepper-line-pending);
        bottom: calc(var(--h-stepper-marker-size) / -2);
        content: '';
        left: calc((var(--h-stepper-marker-size) - var(--h-stepper-line-size)) / 1.6);
        position: absolute;
        top: calc(var(--h-stepper-marker-size) / 2);
        width: var(--h-stepper-line-size);
        z-index: 0;
    }

    .h-stepper__item--complete:not(:last-child)::before {
        background: var(--h-stepper-active);
    }

    .h-stepper__marker-wrap {
        align-self: start;
    }

    .h-stepper__content {
        padding-top: 2px;
    }
}

@include bp.h0n-at-most(bp.$h0n-breakpoint-sm) {
    .h-stepper--horizontal {
        overflow-x: auto;
        padding-bottom: 2px;

        .h-stepper__list {
            min-width: max(100%, calc(var(--h-stepper-count, 1) * 96px));
        }
    }
}
</style>
