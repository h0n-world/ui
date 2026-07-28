<script setup lang="ts">
import { H0Tab, H0TabList, H0TabPanel, H0Tabs } from '@h0nio/ui'
</script>

<template>
    <H0Tabs class="tabs" default-value="profile" orientation="vertical" activation-mode="manual" :loop="false">
        <H0TabList aria-label="Account settings">
            <H0Tab value="profile">Profile</H0Tab>
            <H0Tab value="security">Security</H0Tab>
            <H0Tab value="billing">Billing</H0Tab>
        </H0TabList>
        <H0TabPanel value="profile">Profile settings.</H0TabPanel>
        <H0TabPanel value="security">Security settings.</H0TabPanel>
        <H0TabPanel value="billing">Billing settings.</H0TabPanel>
    </H0Tabs>
</template>

<style scoped>
.tabs {
    width: min(42rem, 100%);
}
</style>
