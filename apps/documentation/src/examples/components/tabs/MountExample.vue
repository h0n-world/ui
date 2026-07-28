<script setup lang="ts">
import { H0Input, H0Tab, H0TabList, H0TabPanel, H0Tabs } from '@h0nio/ui'
</script>

<template>
    <H0Tabs default-value="first" mount-mode="lazy">
        <H0TabList aria-label="Lazy panel example">
            <H0Tab value="first">First</H0Tab>
            <H0Tab value="second">Second</H0Tab>
        </H0TabList>
        <H0TabPanel value="first"><H0Input label="First panel value" default-value="Retained after switching" /></H0TabPanel>
        <H0TabPanel value="second"><H0Input label="Second panel value" default-value="Mounted on first visit" /></H0TabPanel>
    </H0Tabs>
</template>
