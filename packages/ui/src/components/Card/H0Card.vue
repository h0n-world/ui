<script lang="ts" setup>
import { computed, useSlots, useTemplateRef } from 'vue'
import H0Interactive from '../_shared/H0Interactive.vue'
import H0Ripple from '../Ripple/H0Ripple.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0CardElement, H0CardRadius, H0CardVariant } from './Card.types'

defineOptions({
    name: 'H0Card'
})

const props = withDefaults(
    defineProps<{
        as?: H0CardElement
        variant?: H0CardVariant
        radius?: H0CardRadius
        padding?: boolean
        shadow?: boolean
        interactive?: boolean
    }>(),
    {
        as: 'div',
        variant: 'surface',
        radius: 'all',
        shadow: false,
        interactive: false
    }
)

const slots = useSlots()
const ripple = useTemplateRef<InstanceType<typeof H0Ripple>>('ripple')
const hasContent = computed(() => Boolean(slots.default || slots.content))
const hasFooter = computed(() => Boolean(slots.footer))
const isDescriptionLast = computed(() => !hasContent.value && !hasFooter.value)

const radiusCorners = computed(() => {
    const radius = props.radius

    if (radius === 'none') {
        return []
    }

    if (radius === 'all') {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    }

    return Array.isArray(radius) ? radius : [radius]
})

const cardStyle = computed(() => {
    const corners = new Set(radiusCorners.value)

    return {
        '--h-card-radius-top-left': corners.has('top-left') ? 'var(--h0n-ui-radius-xl)' : '0',
        '--h-card-radius-top-right': corners.has('top-right') ? 'var(--h0n-ui-radius-xl)' : '0',
        '--h-card-radius-bottom-left': corners.has('bottom-left') ? 'var(--h0n-ui-radius-xl)' : '0',
        '--h-card-radius-bottom-right': corners.has('bottom-right') ? 'var(--h0n-ui-radius-xl)' : '0'
    }
})

function handlePointerDown(event: PointerEvent) {
    if (!props.interactive) {
        return
    }

    ripple.value?.create(event)
}
</script>

<template>
    <H0Interactive
        :as="as"
        :interactive="interactive"
        data-h0n-component="card"
        class="h-card"
        :class="[`h-card--${variant}`, padding && 'h-card--padding', shadow && 'h-card--shadow', interactive && 'h-card--interactive', isDescriptionLast && 'h-card--description-last']"
        :style="cardStyle"
        @pointerdown="handlePointerDown"
    >
        <H0Typography v-if="$slots.header" as="div" class="h-card__header" variant="body" :weight="600">
            <slot name="header" />
        </H0Typography>

        <H0Description v-if="$slots.description" as="div" class="h-card__description">
            <slot name="description" />
        </H0Description>

        <div v-if="$slots.default || $slots.content" class="h-card__content">
            <slot>
                <slot name="content" />
            </slot>
        </div>

        <div v-if="$slots.footer" class="h-card__footer">
            <slot name="footer" />
        </div>

        <H0Ripple ref="ripple" :disabled="!interactive" />
    </H0Interactive>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-card {
    --h-card-bg: var(--h0n-ui-color-surface);
    --h-card-border: transparent;
    --h-card-hover-bg: var(--h0n-ui-color-surface-hover);

    width: 100%;
    background: var(--h-card-bg);
    border: 1px solid var(--h-card-border);
    border-top-left-radius: var(--h-card-radius-top-left);
    border-top-right-radius: var(--h-card-radius-top-right);
    border-bottom-left-radius: var(--h-card-radius-bottom-left);
    border-bottom-right-radius: var(--h-card-radius-bottom-right);
    color: var(--h0n-ui-color-text);
    display: grid;
    font-family: var(--h0n-ui-font-family);
    min-width: 0;
    overflow: hidden;
    position: relative;
    transition:
        background-color var(--h0n-ui-duration-fast) ease,
        border-color var(--h0n-ui-duration-fast) ease,
        box-shadow var(--h0n-ui-duration-fast) ease,
        transform var(--h0n-ui-duration-fast) ease;

    &--secondary {
        --h-card-bg: var(--h0n-ui-color-secondary);
        --h-card-hover-bg: var(--h0n-ui-color-secondary-hover);
    }

    &--surface {
        --h-card-bg: var(--h0n-ui-color-surface);
        --h-card-hover-bg: var(--h0n-ui-color-surface-hover);
    }

    &--outline {
        --h-card-bg: transparent;
        --h-card-border: var(--h0n-ui-color-border);
        --h-card-hover-bg: color-mix(in srgb, var(--h0n-ui-color-secondary) 54%, transparent);
    }

    &--shadow {
        box-shadow: var(--h0n-ui-shadow);
    }

    &--interactive {
        cursor: pointer;

        @include mixins.h0n-focus-visible;
    }

    &--padding {
        .h-card__content {
            padding: 16px;
        }
    }

    &__header,
    &__description,
    &__content,
    &__footer {
        position: relative;
        z-index: 1;
    }

    &__header,
    &__footer {
        align-items: center;
        display: flex;
        gap: 12px;
        justify-content: space-between;
        min-width: 0;
        padding: 16px 16px 0;
    }

    &__header {
        color: var(--h0n-ui-color-text);
        line-height: 1.4;
    }

    &__description {
        line-height: 1.45;
        padding-inline: 16px;
        padding-top: 8px;
    }

    &--description-last {
        .h-card__description {
            padding-bottom: 16px;
        }
    }

    &__content {
        min-width: 0;
    }

    &__footer {
        border-top: 1px solid var(--h0n-ui-color-border);
        padding-bottom: 16px;
        padding-top: 16px;
    }

    @media (hover: hover) and (pointer: fine) {
        &--interactive:hover {
            background: var(--h-card-hover-bg);
            transform: translateY(-1px);
        }
    }
}
</style>
