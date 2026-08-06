<script setup lang="ts">
import { H0Button, H0Divider, H0Inline, H0Stack } from '@h0nio/ui'
</script>

<template>
    <H0Stack class="divider-example" gap="lg">
        <H0Stack gap="sm">
            <span>Profile settings</span>
            <H0Divider>Account</H0Divider>
            <span>Security settings</span>
        </H0Stack>

        <H0Divider :inset="{ base: 'sm', md: 'xl' }" decorative />

        <H0Inline class="divider-example__toolbar" gap="sm" :wrap="false">
            <H0Button size="sm" variant="soft">Preview</H0Button>
            <H0Divider orientation="vertical" decorative />
            <H0Button size="sm">Publish</H0Button>
        </H0Inline>
    </H0Stack>
</template>

<style scoped>
.divider-example {
    width: 100%;
}

.divider-example__toolbar {
    min-height: 40px;
}
</style>
