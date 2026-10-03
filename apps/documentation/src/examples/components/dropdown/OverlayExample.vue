<script setup lang="ts">
import { ref } from 'vue'
import { H0Button, H0Dropdown, H0Modal, H0Select } from '@h0nio/ui'
const modal = ref(false)
const folder = ref('personal')
const options = [{ label: 'Personal', value: 'personal' }, { label: 'Work', value: 'work' }]
</script>
<template>
    <div class="dropdown-overlay-example">
        <H0Button variant="outline" @click="modal = true">Open workspace dialog</H0Button>
        <H0Dropdown disabled><H0Button disabled>Unavailable actions</H0Button><template #content>Unavailable</template></H0Dropdown>
        <H0Modal v-model="modal" title="Workspace settings">
            <H0Dropdown aria-label="Folder settings" :min-width="260" :max-height="180">
                <H0Button>Folder settings</H0Button>
                <template #content="{ close }">
                    <div class="dropdown-folder-settings">
                        <H0Select v-model="folder" label="Folder" :options="options" />
                        <p v-for="index in 4" :key="index">Custom content {{ index }}</p>
                        <H0Button @click="close">Done</H0Button>
                    </div>
                </template>
            </H0Dropdown>
        </H0Modal>
    </div>
</template>
<style scoped>
.dropdown-overlay-example { display: flex; flex-wrap: wrap; gap: var(--h0n-ui-spacing-md); }
.dropdown-folder-settings { display: grid; gap: var(--h0n-ui-spacing-md); }
.dropdown-folder-settings p { margin: 0; }
</style>
