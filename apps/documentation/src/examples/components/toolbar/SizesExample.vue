<script setup lang="ts">
import { H0Toolbar, type H0Size, type H0ToolbarItemDefinition } from '@h0nio/ui'

const sizes: Array<{ label: string; value: H0Size }> = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium (default)', value: 'md' },
    { label: 'Large', value: 'lg' },
]

const items: H0ToolbarItemDefinition[] = [
    { value: 'bold', label: 'Bold', pressed: true },
    { value: 'italic', label: 'Italic' },
    { value: 'underline', label: 'Underline' },
]
</script>

<template>
    <div class="toolbar-sizes-example">
        <section v-for="size in sizes" :key="size.value">
            <span>{{ size.label }}</span>
            <H0Toolbar :items="items" :size="size.value" :aria-label="`${size.label} text formatting`" />
        </section>
    </div>
</template>

<style scoped>
.toolbar-sizes-example {
    display: grid;
    gap: var(--h0n-ui-spacing-lg);
    justify-items: center;
}

.toolbar-sizes-example section {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
    justify-items: start;
}

.toolbar-sizes-example section > span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}

@container documentation-preview (max-width: 520px) {
    .toolbar-sizes-example,
    .toolbar-sizes-example section {
        justify-items: center;
        width: 100%;
    }
}
</style>
