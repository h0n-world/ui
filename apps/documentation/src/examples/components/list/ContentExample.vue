<script setup lang="ts">
import infoIcon from '@h0nio/icons/info-circle-stroke'
import warningIcon from '@h0nio/icons/danger-triangle-stroke'
import { H0Card, H0Icon, H0List, H0ListItem } from '@h0nio/ui'
</script>

<template>
    <H0Card class="list-card">
        <H0List label="Help and safety">
            <H0ListItem as="a" href="#navigation-roots" title="Navigation patterns" description="Native links and client-side routing">
                <template #end><H0Icon :icon="infoIcon" /></template>
            </H0ListItem>
            <H0ListItem as="a" href="#accessibility" title="Accessibility" description="Semantics, active state, and disabled rows">
                <template #end><H0Icon :icon="warningIcon" /></template>
            </H0ListItem>
        </H0List>
    </H0Card>
</template>

<style scoped>
.list-card {
    max-width: 38rem;
}
</style>
