<script setup lang="ts">
import { H0Accordion, type H0AccordionItem } from '@h0nio/ui'

const sections: H0AccordionItem[] = [
    { title: 'Profile', content: 'Update your name, avatar, and public profile details.' },
    { title: 'Notifications', content: 'Choose which product and account messages you receive.' },
    { title: 'Security', content: 'Review active sessions and configure account protection.' },
]
</script>

<template>
    <div class="accordion-example">
        <H0Accordion :items="sections" multiple :default-open="[0, 1]" />
    </div>
</template>

<style scoped>
.accordion-example {
    max-width: 42rem;
    overflow: hidden;
    width: 100%;
}
</style>
