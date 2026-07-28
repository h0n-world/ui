<script setup lang="ts">
import { H0Tab, H0TabList, H0TabPanel, H0Tabs } from '@h0nio/ui'
import { ref } from 'vue'

const active = ref('overview')
</script>

<template>
    <H0Tabs v-model="active" class="tabs-example">
        <H0TabList aria-label="Project sections">
            <H0Tab value="overview">Overview</H0Tab>
            <H0Tab value="activity">Activity</H0Tab>
            <H0Tab value="settings">Settings</H0Tab>
        </H0TabList>
        <H0TabPanel value="overview">Project status and recent milestones.</H0TabPanel>
        <H0TabPanel value="activity">Recent changes from the project team.</H0TabPanel>
        <H0TabPanel value="settings">Project visibility and notification settings.</H0TabPanel>
    </H0Tabs>
</template>

<style scoped>
.tabs-example { width: min(42rem, 100%); }
</style>
