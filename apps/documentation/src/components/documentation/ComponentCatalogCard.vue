<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineOptions({
    name: 'ComponentCatalogCard',
})

defineProps<{
    name: string
    path?: string
}>()
</script>

<template>
    <article class="component-card">
        <div class="component-card__preview" :aria-label="`${name} preview placeholder`">
            <span>Preview</span>
        </div>

        <RouterLink v-if="path" :to="path">
            {{ name }}
        </RouterLink>
        <span v-else class="component-card__name">{{ name }}</span>
    </article>
</template>

<style scoped lang="scss">
.component-card {
    display: grid;
    gap: 10px;
    min-width: 0;

    &__preview {
        align-items: center;
        aspect-ratio: 1.4;
        background:
            linear-gradient(var(--h0n-ui-color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--h0n-ui-color-border) 1px, transparent 1px),
            var(--h0n-ui-color-surface);
        background-size: 24px 24px;
        border: 1px solid var(--h0n-ui-color-border);
        border-radius: var(--h0n-ui-radius-lg);
        display: flex;
        justify-content: center;
        overflow: hidden;

        span {
            background: var(--h0n-ui-color-surface);
            border: 1px solid var(--h0n-ui-color-border);
            border-radius: var(--h0n-ui-radius-round);
            color: var(--h0n-ui-color-muted);
            font-size: var(--h0n-ui-typography-body-xs-size);
            padding: 5px 9px;
        }
    }

    a,
    &__name {
        color: var(--h0n-ui-color-text);
        font-size: var(--h0n-ui-typography-body-sm-size);
        font-weight: var(--h0n-ui-font-weight-semibold);
        overflow: hidden;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    a:hover {
        color: var(--h0n-ui-color-primary);
    }
}
</style>
