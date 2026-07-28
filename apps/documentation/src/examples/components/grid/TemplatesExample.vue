<script setup lang="ts">
import { H0Card, H0Grid } from '@h0nio/ui'
</script>

<template>
    <H0Grid
        as="section"
        variant="default"
        gap="sm"
        columns="minmax(8rem, 1fr) 2fr"
        rows="auto minmax(5rem, auto)"
    >
        <H0Card padding>Navigation</H0Card>
        <H0Card padding>Main content</H0Card>
        <H0Card padding>Metadata</H0Card>
        <H0Card padding>Details</H0Card>
    </H0Grid>
</template>
