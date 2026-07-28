<script setup lang="ts">
import { H0Accordion, type H0AccordionItem } from '@h0nio/ui'

const deploymentHelp: H0AccordionItem[] = [
    {
        title: 'Build settings',
        content: 'Configure the command and output directory used by your deployment.',
    },
    {
        title: 'Custom domains',
        content: 'Domain configuration becomes available after the first successful deployment.',
        disabled: true,
    },
    {
        title: 'Environment variables',
        content: 'Keep secrets outside source control and scope them to the required environment.',
    },
]
</script>

<template>
    <div class="accordion-example">
        <H0Accordion :items="deploymentHelp" :default-open="[0]" />
    </div>
</template>

<style scoped>
.accordion-example {
    max-width: 42rem;
    overflow: hidden;
    width: 100%;
}
</style>
