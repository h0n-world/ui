<script setup lang="ts">
import { H0Card, H0List, H0ListItem } from '@h0nio/ui'
import { RouterLink } from 'vue-router'
</script>

<template>
    <H0Card class="list-card">
        <H0List label="Documentation navigation">
            <H0ListItem as="a" href="#accessibility" title="Native anchor" description="Jumps to accessibility on this page" />
            <H0ListItem :as="RouterLink" to="/components/list" title="RouterLink" description="Current component page" active aria-current="page" />
            <H0ListItem :as="RouterLink" to="/components/card" title="Card documentation" description="Navigate without a page reload" />
        </H0List>
    </H0Card>
</template>

<style scoped>
.list-card {
    max-width: 38rem;
}
</style>
