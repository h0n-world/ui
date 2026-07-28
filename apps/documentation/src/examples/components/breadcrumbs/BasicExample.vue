<script setup lang="ts">
import { H0Breadcrumbs, type H0BreadcrumbItem } from '@h0nio/ui'

const items: H0BreadcrumbItem[] = [
    { label: 'Home', href: '#breadcrumbs-usage' },
    { label: 'Components', href: '#breadcrumbs-usage' },
    { label: 'Navigation', href: '#breadcrumbs-usage' },
    { label: 'Breadcrumbs' },
]
</script>

<template>
    <H0Breadcrumbs :items="items" aria-label="Documentation path" @click.prevent />
</template>
