<script setup lang="ts">
import { H0Toolbar, type H0ToolbarItemDefinition } from '@h0nio/ui'
import { computed, ref } from 'vue'

const activeFormats = ref(new Set<string | number>(['bold']))
const lastAction = ref('No formatting action selected')

const items = computed<H0ToolbarItemDefinition[]>(() => [
    { value: 'bold', label: 'Bold', pressed: activeFormats.value.has('bold') },
    { value: 'italic', label: 'Italic', pressed: activeFormats.value.has('italic') },
    { value: 'underline', label: 'Underline', pressed: activeFormats.value.has('underline') },
])

function selectFormat(item: H0ToolbarItemDefinition) {
    const next = new Set(activeFormats.value)
    if (next.has(item.value)) next.delete(item.value)
    else next.add(item.value)
    activeFormats.value = next
    lastAction.value = `${item.label} ${next.has(item.value) ? 'enabled' : 'disabled'}`
}
</script>

<template>
    <div class="toolbar-basic-example">
        <H0Toolbar :items="items" aria-label="Text formatting" @select="selectFormat" />
        <output aria-live="polite">{{ lastAction }}</output>
    </div>
</template>

<style scoped>
.toolbar-basic-example {
    align-items: center;
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    justify-items: center;
}

.toolbar-basic-example output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
