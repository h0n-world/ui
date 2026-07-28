<script setup lang="ts">
import { H0Breadcrumbs, type H0BreadcrumbItem } from '@h0nio/ui'

const items: H0BreadcrumbItem[] = ['Home', 'Organization', 'Design systems', 'Component library', 'Navigation', 'Breadcrumbs'].map((label, index, values) => ({
    label,
    href: index < values.length - 1 ? '#breadcrumbs-responsive-behavior' : undefined,
}))
</script>

<template>
    <H0Breadcrumbs :items="items" aria-label="Long documentation path" @click.prevent />
</template>
