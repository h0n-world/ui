<script setup lang="ts">
import { errorIcon, infoIcon, successIcon, warningIcon } from '../../icons'
import type { H0IconDefinition } from '../Icon'
import { computed } from 'vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Typography from './H0Typography.vue'
import type { H0MessageTone } from './Typography.types'

defineOptions({
    name: 'H0Message'
})

const props = withDefaults(
    defineProps<{
        tone?: H0MessageTone
        text?: string | number
        icon?: boolean
    }>(),
    {
        tone: 'default',
        text: '',
        icon: true
    }
)

const resolvedIcon = computed<H0IconDefinition>(() => {
    if (props.tone === 'success') {
        return successIcon
    }

    if (props.tone === 'warning') {
        return warningIcon
    }

    if (props.tone === 'error') {
        return errorIcon
    }

    return infoIcon
})
</script>

<template>
    <H0Typography data-h0n-component="message" class="h-message" :class="`h-message--${tone}`" variant="body-sm" as="p">
        <H0Icon v-if="icon" class="h-message__icon" :icon="resolvedIcon" :size="16" :stroke-width="1.4" />
        <span>
            <slot>{{ text }}</slot>
        </span>
    </H0Typography>
</template>

<style scoped lang="scss">
.h-message {
    align-items: flex-start;
    color: var(--h0n-ui-color-muted);
    display: inline-flex;
    gap: 6px;
    line-height: 1.35;
    font-weight: var(--h0n-ui-font-weight-regular);
}

.h-message--success {
    color: var(--h0n-ui-color-success);
}

.h-message--warning {
    color: var(--h0n-ui-color-warning);
}

.h-message--error {
    color: var(--h0n-ui-color-danger);
}

.h-message__icon {
    margin-top: 1px;
}
</style>
