<script setup lang="ts">
import { H0Card, H0Container, H0Stack, H0Typography } from '@h0nio/ui'
</script>

<template>
    <H0Container as="main" size="lg" :gutter="{ base: 'sm', sm: 'md', lg: 'xl' }">
        <H0Card padding>
            <H0Stack :gap="{ base: 'sm', md: 'lg' }">
                <H0Typography variant="h6">Container</H0Typography>
                <H0Typography variant="body"
                    >Inline gutters increase from sm to md and xl without JavaScript resize
                    listeners</H0Typography
                >
            </H0Stack>
        </H0Card>
    </H0Container>
</template>
