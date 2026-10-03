<script setup lang="ts">
import { ref } from 'vue'
import { H0Switch, H0TextShimmer } from '@h0nio/ui'
const active = ref(true)
</script>
<template>
    <div class="text-shimmer-custom-example">
        <H0Switch v-model="active" label="Enable shimmer" />
        <H0TextShimmer class="text-shimmer-custom-label" as="p" :active="active" :duration="3500" role="status">Loading your workspace...</H0TextShimmer>
        <H0TextShimmer class="text-shimmer-multiline" :active="active" :duration="2800" dir="rtl" lang="ar">جارٍ معالجة البيانات وتحميل مساحة العمل الخاصة بك</H0TextShimmer>
    </div>
</template>
<style scoped>
.text-shimmer-custom-example { display: grid; justify-items: start; gap: var(--h0n-ui-spacing-lg); }
.text-shimmer-custom-label { font-size: 1.5rem; font-weight: var(--h0n-ui-font-weight-semibold); }
.text-shimmer-multiline { inline-size: 12rem; line-height: 1.8; }
</style>
