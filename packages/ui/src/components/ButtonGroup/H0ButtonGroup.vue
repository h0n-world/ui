<script setup lang="ts">
import { computed } from 'vue'
import H0Button from '../Button/H0Button.vue'
import type { H0ButtonGroupEmits, H0ButtonGroupItem, H0ButtonGroupProps } from './ButtonGroup.types'

defineOptions({
    name: 'H0ButtonGroup'
})

const props = withDefaults(
    defineProps<H0ButtonGroupProps>(),
    {
        tone: 'default',
        variant: 'solid',
        size: 'md',
        disabled: false,
        fullWidth: false,
        buttons: () => [{}, {}, {}],
        ariaLabel: 'Button group'
    }
)

const emit = defineEmits<H0ButtonGroupEmits>()

const normalizedButtons = computed(() => props.buttons)

function getButtonSlot(button: H0ButtonGroupItem, index: number) {
    return button.slot ?? `btn-${index + 1}`
}

function getButtonKey(button: H0ButtonGroupItem, index: number) {
    return button.key ?? getButtonSlot(button, index)
}

function getButtonDisabled(button: H0ButtonGroupItem) {
    return button.disabled ?? props.disabled
}

function getButtonFullWidth(button: H0ButtonGroupItem) {
    return button.fullWidth ?? props.fullWidth
}

function handleButtonClick(button: H0ButtonGroupItem, index: number) {
    emit('button-click', button, index)
}
</script>

<template>
    <div
        data-h0n-component="button-group" class="h-button-group"
        :class="[
            `h-button-group--${variant}`,
            `h-button-group--${tone}`,
            `h-button-group--${size}`,
            fullWidth && 'h-button-group--full-width',
        ]"
        role="group"
        :aria-label="ariaLabel"
    >
        <span
            v-for="(button, index) in normalizedButtons"
            :key="getButtonKey(button, index)"
            class="h-button-group__item"
        >
            <H0Button
                :variant="button.variant ?? variant"
                :tone="button.tone ?? tone"
                :size="button.size ?? size"
                :disabled="getButtonDisabled(button)"
                :loading="button.loading"
                :loading-text="button.loadingText"
                :full-width="getButtonFullWidth(button)"
                :rounded="false"
                @click="handleButtonClick(button, index)"
            >
                <slot
                    :name="getButtonSlot(button, index)"
                    :button="button"
                    :index="index"
                >
                    {{ button.label ?? `Button ${index + 1}` }}
                </slot>
            </H0Button>
        </span>
    </div>
</template>

<style scoped lang="scss">
.h-button-group {
    --h-button-group-separator: color-mix(
        in srgb,
        var(--h0n-ui-color-primary-contrast) 24%,
        transparent
    );

    align-items: stretch;
    border-radius: var(--h0n-ui-radius-xl);
    display: inline-flex;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    vertical-align: middle;

    &--full-width {
        display: flex;
        width: 100%;
    }

    &--secondary,
    &--ghost,
    &--outline,
    &--success,
    &--success-soft,
    &--warning,
    &--warning-soft,
    &--primary-soft,
    &--danger-soft {
        --h-button-group-separator: color-mix(
            in srgb,
            var(--h0n-ui-color-text) 18%,
            transparent
        );
    }

    &--danger {
        --h-button-group-separator: color-mix(
            in srgb,
            var(--h0n-ui-color-text) 22%,
            transparent
        );
    }

    &__item {
        display: inline-flex;
        min-width: 0;
        position: relative;
    }

    &--full-width &__item {
        flex: 1 1 0;
    }

    &__item + &__item::before {
        background: var(--h-button-group-separator);
        bottom: 24%;
        content: "";
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 24%;
        width: 1px;
        z-index: 2;
    }
}
</style>
