<script setup lang="ts">
import { computed } from 'vue'
import { defaultH0EmptyStateLocale } from '../../locale'
import H0Button from '../Button/H0Button.vue'
import H0Icon from '../Icon/H0Icon.vue'
import H0Typography from '../Typography/H0Typography.vue'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import type { H0EmptyStateProps } from './EmptyState.types'
defineOptions({ name: 'H0EmptyState' })
const props = withDefaults(defineProps<H0EmptyStateProps>(), { title: '', description: '', image: '', imageAlt: '', primaryAction: '', secondaryAction: '', variant: 'inline' })
const emit = defineEmits<{ primaryAction: []; secondaryAction: [] }>()
const locale = useH0LocaleSection('emptyState', defaultH0EmptyStateLocale)
const resolvedTitle = computed(() => props.title || locale.value.title)
</script>
<template>
    <section data-h0n-component="empty-state" class="h-empty" :class="`h-empty--${variant}`">
        <slot name="visual"><img v-if="image" class="h-empty__image" :src="image" :alt="imageAlt" /><H0Icon v-else-if="icon" class="h-empty__icon" :icon="icon" :size="40" /></slot
        ><slot name="title"
            ><H0Typography variant="h4">{{ resolvedTitle }}</H0Typography></slot
        ><slot name="description"
            ><p v-if="description" class="h-empty__description">{{ description }}</p></slot
        >
        <div v-if="$slots.actions || primaryAction || secondaryAction" class="h-empty__actions">
            <slot name="actions"
                ><H0Button v-if="primaryAction" tone="primary" @click="emit('primaryAction')">{{ primaryAction }}</H0Button
                ><H0Button v-if="secondaryAction" variant="ghost" @click="emit('secondaryAction')">{{ secondaryAction }}</H0Button></slot
            >
        </div>
    </section>
</template>
<style scoped>
.h-empty {
    align-items: center;
    color: var(--h0n-ui-color-text);
    display: flex;
    flex-direction: column;
    font-family: var(--h0n-ui-font-family);
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
    padding: var(--h0n-ui-spacing-xl);
    text-align: center;
}
.h-empty--surface {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
}
.h-empty--page {
    min-block-size: 50vh;
}
.h-empty__icon {
    color: var(--h0n-ui-color-muted);
}
.h-empty__image {
    block-size: auto;
    max-inline-size: min(100%, 240px);
}
.h-empty__description {
    color: var(--h0n-ui-color-muted);
    margin: 0;
    max-inline-size: 52ch;
}
.h-empty__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    justify-content: center;
}
</style>
