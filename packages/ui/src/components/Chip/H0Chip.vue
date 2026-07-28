<script setup lang="ts">
import { closeIcon } from '../../icons'
import H0Icon from '../Icon/H0Icon.vue'
import type { H0ChipTone } from './Chip.types'

defineOptions({
    name: 'H0Chip'
})

withDefaults(
    defineProps<{
        tone?: H0ChipTone
        selected?: boolean
        disabled?: boolean
        removable?: boolean
        text?: string
        ariaLabel?: string
        removeAriaLabel?: string
    }>(),
    {
        tone: 'default',
        selected: false,
        disabled: false,
        removable: false,
        text: '',
        ariaLabel: '',
        removeAriaLabel: 'Remove'
    }
)

const emit = defineEmits<{
    click: [event: MouseEvent]
    remove: [event: MouseEvent]
}>()

function handleRemove(event: MouseEvent) {
    event.stopPropagation()
    emit('remove', event)
}
</script>

<template>
    <span data-h0n-component="chip" class="h-chip" :class="[`h-chip--${tone}`, selected && 'h-chip--selected', disabled && 'h-chip--disabled']">
        <button class="h-chip__action" type="button" :disabled="disabled" :aria-pressed="selected" :aria-label="ariaLabel || undefined" @click="emit('click', $event)">
            <slot>{{ text }}</slot>
        </button>
        <button v-if="removable" class="h-chip__remove" type="button" :disabled="disabled" :aria-label="removeAriaLabel" @click="handleRemove">
            <H0Icon :icon="closeIcon" :size="13" :stroke-width="1.4" />
        </button>
    </span>
</template>

<style scoped lang="scss">
.h-chip {
    --h-chip-accent: var(--h0n-ui-color-text);
    --h-chip-bg: var(--h0n-ui-color-secondary);

    align-items: center;
    background: var(--h-chip-bg);
    border: none;
    border-radius: var(--h0n-ui-radius-round);
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--h0n-ui-font-family);
    font-size: var(--h0n-ui-typography-body-sm-size);
    font-weight: var(--h0n-ui-font-weight-medium);
    min-height: 34px;
    min-width: 0;
    transition:
        background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        border-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
        color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);

    &--primary {
        --h-chip-accent: var(--h0n-ui-color-primary);
    }

    &--success {
        --h-chip-accent: var(--h0n-ui-color-success);
    }

    &--warning {
        --h-chip-accent: var(--h0n-ui-color-warning);
    }

    &--danger {
        --h-chip-accent: var(--h0n-ui-color-danger);
    }

    &--selected {
        background: color-mix(in srgb, var(--h-chip-accent) 18%, transparent);
        border-color: color-mix(in srgb, var(--h-chip-accent) 42%, transparent);
        color: var(--h-chip-accent);
    }

    &--disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    &__action,
    &__remove {
        background: transparent;
        border: 0;
        color: inherit;
        cursor: pointer;
        font: inherit;

        &:focus-visible {
            box-shadow: var(--h0n-ui-focus-ring);
            outline: none;
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    &__action {
        align-items: center;
        border-radius: inherit;
        display: inline-flex;
        min-height: 34px;
        min-width: 0;
        padding: 0 12px;
    }

    &__remove {
        align-items: center;
        border-radius: 50%;
        display: inline-flex;
        height: 18px;
        justify-content: center;
        line-height: 1;
        margin-inline-end: 8px;
        margin-inline-start: -8px;
        padding: 0;
        width: 18px;
    }
}
</style>
