<script setup lang="ts">
import { settingsIcon, userIcon } from '@h0nio/ui/icons'
import { H0Icon, H0SideNav, H0SideNavGroup, H0SideNavItem } from '@h0nio/ui'
</script>

<template>
    <H0SideNav class="nav" gap="sm" :animated-indicator="false" aria-label="Account navigation">
        <H0SideNavGroup>
            <template #label>Account</template>
            <H0SideNavItem href="#sidenav-item-content-and-states" title="Profile" active>
                <template #start><H0Icon :icon="userIcon" :size="16" /></template>
            </H0SideNavItem>
            <H0SideNavItem href="#sidenav-item-content-and-states" title="Settings">
                <template #start><H0Icon :icon="settingsIcon" :size="16" /></template>
                <template #end><span>3</span></template>
            </H0SideNavItem>
            <H0SideNavItem href="#sidenav-item-content-and-states" title="Unavailable" disabled />
        </H0SideNavGroup>
    </H0SideNav>
</template>

<style scoped>
.nav {
    width: min(18rem, 100%);
}
</style>
