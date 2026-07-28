<script setup lang="ts">
import { H0Field, H0Input } from '@h0nio/ui'
import { ref } from 'vue'

const slug = ref('')
</script>

<template>
    <H0Field class="field" label="Workspace slug" hint="Used in public project URLs." required>
        <H0Input v-model="slug" placeholder="design-system" />
    </H0Field>
</template>

<style scoped>
.field {
    width: min(28rem, 100%);
}
</style>
