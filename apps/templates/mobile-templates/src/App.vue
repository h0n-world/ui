<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <SystemLayout>
        <RouterView v-slot="{ Component }">
            <component :is="Component" />
        </RouterView>
    </SystemLayout>
</template>
