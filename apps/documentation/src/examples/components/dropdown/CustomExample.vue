<script setup lang="ts">
import DocumentationPreviewActions from '@/components/documentation/DocumentationPreviewActions.vue'
import { ref } from 'vue'
import { H0Button, H0Dropdown, H0Input } from '@h0nio/ui'
const open = ref(false)
const name = ref('Alex')
const saved = ref('')
</script>
<template>
    <div class="dropdown-custom-example">
        <H0Dropdown v-model="open" aria-label="Edit profile" :min-width="240" max-width="22rem" :max-height="280" placement="bottom-end">
            <img class="dropdown-avatar" alt="Edit Alex profile" width="48" height="48" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' rx='24' fill='%232AABEE'/%3E%3Ctext x='24' y='31' font-family='sans-serif' font-size='22' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E">
            <template #content="{ close }">
                <form class="dropdown-profile-form" @submit.prevent="saved = name; close()">
                    <strong>Profile</strong>
                    <H0Input v-model="name" label="Display name" />
                    <H0Button type="submit">Save profile</H0Button>
                </form>
            </template>
        </H0Dropdown>
        <p aria-live="polite">{{ saved ? `Saved: ${saved}` : 'Click the avatar or use Enter / Space.' }}</p>
        <DocumentationPreviewActions>
            <H0Button variant="outline" size="sm" @click="open = !open">Toggle profile</H0Button>
        </DocumentationPreviewActions>
    </div>
</template>
<style scoped>
.dropdown-custom-example { display: flex; flex-wrap: wrap; align-items: center; gap: var(--h0n-ui-spacing-lg); }
.dropdown-avatar { display: block; border-radius: 50%; cursor: pointer; }
.dropdown-avatar:focus-visible { outline: 2px solid var(--h0n-ui-color-primary); outline-offset: 3px; }
.dropdown-profile-form { display: grid; gap: var(--h0n-ui-spacing-lg); padding: var(--h0n-ui-spacing-xs); }
.dropdown-custom-example p { color: var(--h0n-ui-color-muted); }
</style>
