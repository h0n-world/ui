<script setup lang="ts">
import { H0Accordion, H0Card, type H0AccordionItem } from '@h0nio/ui'

const items: H0AccordionItem[] = [
    {
        title: 'What is H0N UI?',
        content: 'A Vue component library for building consistent product interfaces.',
    },
    {
        title: 'Can I use design tokens?',
        content: 'Yes. Public CSS custom properties are available to application styles.',
    },
    {
        title: 'Is server rendering supported?',
        content:
            'Accordion generates stable, instance-specific disclosure relationships during SSR.',
    },
]
</script>

<template>
    <div class="accordion-example">
        <H0Card>
            <H0Accordion :items="items" :default-open="[0]" />
        </H0Card>
    </div>
</template>

<style scoped>
.accordion-example {
    max-width: 42rem;
    overflow: hidden;
    width: 100%;
}
</style>
