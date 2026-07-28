<script setup lang="ts">
import { H0Avatar, H0Card, H0List, H0ListItem } from '@h0nio/ui'
</script>

<template>
    <H0Card class="list-card">
        <H0List label="Team member">
            <H0ListItem size="lg" :interactive="false">
                <template #start><H0Avatar name="Alex Morgan" :size="42" /></template>
                <div class="person">
                    <strong>Alex Morgan</strong>
                    <span>Product designer</span>
                </div>
                <template #end>
                    <div class="end">
                        <strong>Admin</strong>
                        <span>Active</span>
                    </div>
                </template>
            </H0ListItem>
        </H0List>
    </H0Card>
</template>

<style scoped>
.list-card {
    max-width: 38rem;
}

.person,
.end {
    display: grid;
    gap: 0.2rem;
    min-width: 0;
}

.person span,
.end span {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}

.end {
    justify-items: end;
}
</style>
