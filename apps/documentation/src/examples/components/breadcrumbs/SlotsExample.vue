<script setup lang="ts">
import { H0Breadcrumbs, type H0BreadcrumbItem } from '@h0nio/ui'

const items: H0BreadcrumbItem[] = [
    { label: 'Workspace', href: '#breadcrumbs-customization' },
    { label: 'Archived project', disabled: true },
    { label: 'Settings' },
]
</script>

<template>
    <H0Breadcrumbs :items="items" aria-label="Project settings path" @click.prevent>
        <template #item="{ item, current }">
            <strong v-if="current">{{ item.label }}</strong>
            <span v-else>{{ item.label }}</span>
        </template>
        <template #separator>→</template>
    </H0Breadcrumbs>
</template>
