<script setup lang="ts">
import emailIcon from '@h0nio/icons/letter-stroke'
import plusIcon from '@h0nio/icons/add-circle-stroke'
import searchIcon from '@h0nio/icons/search'
import trashIcon from '@h0nio/icons/trash-bin-trash-stroke'
import { H0Button } from '@h0nio/ui'
</script>

<template>
    <div class="icon-example">
        <H0Button button-type="withIcon" :icon="searchIcon" tone="primary">Search</H0Button>
        <H0Button button-type="withIcon" :icon="plusIcon" variant="soft">Add member</H0Button>
        <H0Button button-type="withIcon" :icon="emailIcon" variant="outline">Email</H0Button>
        <H0Button button-type="withIcon" :icon="trashIcon" tone="danger">Delete</H0Button>
    </div>
</template>

<style scoped>
.icon-example {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-md);
    justify-content: center;
}

@container documentation-preview (max-width: 520px) {
    .icon-example {
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }
}
</style>
