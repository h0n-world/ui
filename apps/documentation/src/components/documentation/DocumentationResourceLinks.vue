<script setup lang="ts">
import { H0Button } from '@h0nio/ui'
import type { DocumentationResourceLink } from '@/content/componentResources'

defineOptions({ name: 'DocumentationResourceLinks' })
defineProps<{ links: DocumentationResourceLink[] }>()
</script>

<template>
    <nav v-if="links.length" class="documentation-resource-links" aria-label="Component resources">
        <H0Button
            v-for="link in links"
            :key="link.href"
            as="a"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="soft"
            :icon="link.icon"
            :button-type="link.icon ? 'withIcon' : 'default'"
        >
            {{ link.label }}
        </H0Button>
    </nav>
</template>

<style scoped>
.documentation-resource-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
    margin-bottom: var(--h0n-ui-spacing-xl);
}
</style>
