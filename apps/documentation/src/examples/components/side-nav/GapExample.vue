<script setup lang="ts">
import { H0SideNav, H0SideNavGroup, H0SideNavItem, H0Stack, type H0SideNavGap } from '@h0nio/ui'

const gaps: H0SideNavGap[] = ['sm', 'md', 'lg']
</script>

<template>
    <H0Stack gap="xl">
        <section v-for="gap in gaps" :key="gap" class="row">
            <strong>{{ gap }}</strong>
            <H0SideNav :gap="gap" :aria-label="`${gap} group spacing`">
                <H0SideNavGroup label="Primary"><H0SideNavItem href="#sidenav-group-spacing" title="Overview" /></H0SideNavGroup>
                <H0SideNavGroup label="Secondary"><H0SideNavItem href="#sidenav-group-spacing" title="Settings" /></H0SideNavGroup>
            </H0SideNav>
        </section>
    </H0Stack>
</template>

<style scoped>
.row {
    display: grid;
    gap: var(--h0n-ui-spacing-sm);
    grid-template-columns: 3rem minmax(0, 16rem);
}
</style>
