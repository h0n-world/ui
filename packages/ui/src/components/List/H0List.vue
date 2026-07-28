<script setup lang="ts">
import { useId } from 'vue'
import type { H0ListGap } from './List.types'

defineOptions({
    name: 'H0List'
})

const props = withDefaults(
    defineProps<{
        divided?: boolean
        label?: string
        gap?: H0ListGap
    }>(),
    {
        divided: true,
        label: '',
        gap: 'none'
    }
)

const labelId = `h-list-label-${useId()}`
</script>

<template>
    <div
        data-h0n-component="list"
        class="h-list"
        :class="[`h-list--gap-${gap}`, divided && 'h-list--divided']"
        :role="props.label || $slots.label ? 'group' : undefined"
        :aria-labelledby="props.label || $slots.label ? labelId : undefined"
    >
        <div v-if="props.label || $slots.label" :id="labelId" class="h-list__label">
            <slot name="label">{{ props.label }}</slot>
        </div>

        <slot />
    </div>
</template>

<style scoped lang="scss">
.h-list {
    --h-list-gap: 0;

    display: grid;
    min-width: 0;
    gap: var(--h-list-gap);

    &--gap-sm {
        --h-list-gap: var(--h0n-ui-spacing-xxs);
    }

    &--gap-md {
        --h-list-gap: var(--h0n-ui-spacing-xs);
    }

    &__label {
        color: var(--h0n-ui-color-text-secondary);
        font-size: var(--h0n-ui-typography-body-xs-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
        letter-spacing: 0.06em;
        line-height: 1.4;
        margin: 10px;
        text-transform: uppercase;
    }

    &--divided {
        :deep(.h-list-item:not(:last-child)) {
            border-bottom: 1px solid var(--h0n-ui-color-border);
        }
    }
}
</style>
