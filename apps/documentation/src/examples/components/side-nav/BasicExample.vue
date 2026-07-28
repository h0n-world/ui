<script setup lang="ts">
import { H0SideNav, H0SideNavGroup, H0SideNavItem } from '@h0nio/ui'
import { ref } from 'vue'

const active = ref('overview')
</script>

<template>
    <H0SideNav class="side-nav-example" aria-label="Workspace navigation">
        <H0SideNavGroup label="Workspace">
            <H0SideNavItem href="#sidenav-usage" title="Overview" :active="active === 'overview'" @click.prevent="active = 'overview'" />
            <H0SideNavItem href="#sidenav-usage" title="Members" :active="active === 'members'" @click.prevent="active = 'members'" />
            <H0SideNavItem href="#sidenav-usage" title="Billing" :active="active === 'billing'" @click.prevent="active = 'billing'" />
        </H0SideNavGroup>
        <H0SideNavGroup label="Support">
            <H0SideNavItem href="#sidenav-usage" title="Help center" :indicator="false" @click.prevent />
        </H0SideNavGroup>
    </H0SideNav>
</template>

<style scoped>
.side-nav-example { width: min(18rem, 100%); }
</style>
