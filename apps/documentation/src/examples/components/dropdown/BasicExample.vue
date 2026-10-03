<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Dropdown } from '@h0nio/ui'
const selected = ref('No action selected')
function select(label: string, close: () => void) { selected.value = label; close() }
</script>
<template>
    <div class="dropdown-basic-example">
        <H0Dropdown aria-label="File actions" :min-width="220">
            <H0Button variant="soft" tone="primary" size="sm">Actions</H0Button>
            <template #content="{ close }">
                <div class="dropdown-actions">
                    <button v-for="label in ['New file', 'Copy link', 'Edit file', 'Delete file']" :key="label" type="button" :class="{ danger: label === 'Delete file' }" @click="select(label, close)">{{ label }}</button>
                </div>
            </template>
        </H0Dropdown>
        <p aria-live="polite">{{ selected }}</p>
    </div>
</template>
<style scoped>
.dropdown-basic-example { display: grid; justify-items: start; gap: var(--h0n-ui-spacing-md); }
.dropdown-basic-example p { margin: 0; color: var(--h0n-ui-color-muted); }
.dropdown-actions { display: grid; }
.dropdown-actions button { background: transparent; border: 0; border-radius: var(--h0n-ui-radius-md); color: var(--h0n-ui-color-text); cursor: pointer; font: inherit; font-weight: var(--h0n-ui-font-weight-medium); padding: var(--h0n-ui-spacing-md); text-align: start; }
.dropdown-actions button:hover { background: var(--h0n-ui-color-surface-hover); }
.dropdown-actions button:focus-visible { outline: 2px solid var(--h0n-ui-color-primary); outline-offset: -2px; }
.dropdown-actions button.danger { color: var(--h0n-ui-color-danger-soft-fg); }
</style>
