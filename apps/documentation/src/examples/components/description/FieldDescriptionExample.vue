<script setup lang="ts">
import { H0Input } from '@h0nio/ui'
</script>

<template>
    <H0Input class="described-field" id="workspace-name" label="Workspace name" hint="Use a short name that teammates will recognize." />
</template>

<style scoped>
.described-field {
    max-width: 28rem;
    width: 100%;
}
</style>
