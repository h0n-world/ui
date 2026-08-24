<script setup lang="ts">
import successIcon from '@h0nio/icons/check-circle-stroke'
import closeIcon from '@h0nio/icons/close'
import errorIcon from '@h0nio/icons/danger-circle-stroke'
import warningIcon from '@h0nio/icons/danger-triangle-stroke'
import infoIcon from '@h0nio/icons/info-circle-stroke'
import { computed } from 'vue'
import { useH0Locale } from '../../locale'
import type { H0IconSource } from '../Icon'
import H0Icon from '../Icon/H0Icon.vue'
import H0Description from '../Typography/H0Description.vue'
import H0Typography from '../Typography/H0Typography.vue'
import type { H0ToastTone } from './Toast.types'

defineOptions({
    name: 'H0Toast'
})

const props = withDefaults(
    defineProps<{
        tone?: H0ToastTone
        title?: string
        description?: string
        text?: string
        icon?: H0IconSource
        closable?: boolean
    }>(),
    {
        tone: 'default',
        title: '',
        description: '',
        text: '',
        icon: undefined,
        closable: true
    }
)

const emit = defineEmits<{
    close: []
}>()
const { locale } = useH0Locale()

const resolvedDescription = computed(() => props.description || props.text)
const resolvedIcon = computed<H0IconSource>(() => {
    if (props.icon) {
        return props.icon
    }

    if (props.tone === 'success') {
        return successIcon
    }

    if (props.tone === 'warning') {
        return warningIcon
    }

    if (props.tone === 'danger') {
        return errorIcon
    }

    return infoIcon
})
</script>

<template>
    <div data-h0n-component="toast" class="h-toast" :class="`h-toast--${tone}`" role="status" aria-live="polite">
        <H0Icon class="h-toast__icon" :icon="resolvedIcon" :size="16" aria-hidden="true" />

        <div class="h-toast__content">
            <H0Typography v-if="title || $slots.title" as="strong" class="h-toast__title" variant="body-sm" :weight="600" color="inherit">
                <slot name="title">{{ title }}</slot>
            </H0Typography>
            <H0Description v-if="resolvedDescription || $slots.default" as="div" class="h-toast__text">
                <slot>{{ resolvedDescription }}</slot>
            </H0Description>
        </div>

        <button v-if="closable" class="h-toast__close" type="button" :aria-label="locale.toast.close" @click.stop="emit('close')">
            <H0Icon :icon="closeIcon" :size="16" />
        </button>
    </div>
</template>

<style scoped lang="scss">
.h-toast {
    --h-toast-accent: var(--h0n-ui-color-muted);
    --h-toast-bg: var(--h0n-ui-color-surface);
    --h-toast-title-color: var(--h0n-ui-color-text);

    align-items: start;
    background: var(--h-toast-bg);
    border-radius: var(--h0n-ui-radius-xxl);
    box-shadow: var(--h0n-ui-shadow-lg);
    color: var(--h0n-ui-color-text);
    display: grid;
    font-family: var(--h0n-ui-font-family);
    gap: 10px;
    grid-template-columns: auto minmax(0, 1fr) auto;
    min-width: min(390px, calc(100vw - 32px));
    overflow: hidden;
    padding: 16px;

    &--info {
        --h-toast-accent: var(--h0n-ui-color-primary);
        --h-toast-title-color: var(--h-toast-accent);
    }

    &--success {
        --h-toast-accent: var(--h0n-ui-color-success);
        --h-toast-title-color: var(--h-toast-accent);
    }

    &--warning {
        --h-toast-accent: var(--h0n-ui-color-warning);
        --h-toast-title-color: var(--h-toast-accent);
    }

    &--danger {
        --h-toast-accent: var(--h0n-ui-color-danger);
        --h-toast-title-color: var(--h-toast-accent);
    }

    &__icon {
        color: var(--h-toast-title-color);
        flex: 0 0 auto;
        margin-top: 1px;
    }

    &__content {
        display: grid;
        gap: 3px;
        min-width: 0;
    }

    &__title {
        color: var(--h-toast-accent);
        line-height: 1.3;
    }

    &__text {
    }

    &__close {
        align-items: center;
        align-self: start;
        background: transparent;
        border: 0;
        border-radius: var(--h0n-ui-radius-round);
        color: var(--h0n-ui-color-muted);
        cursor: pointer;
        display: inline-flex;
        height: 26px;
        justify-content: center;
        line-height: 1;
        margin: -4px -4px 0 0;
        width: 26px;

        &:focus-visible {
            box-shadow: var(--h0n-ui-focus-ring);
            outline: none;
        }
    }
}
</style>
