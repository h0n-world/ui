<script setup lang="ts">
import ComponentCatalogCard from '@/components/documentation/ComponentCatalogCard.vue'
import type { DocumentationComponentLink } from '@/content/agent/related.ts'

defineOptions({
    name: 'RelatedComponentsCatalog',
})

defineProps<{
    items: DocumentationComponentLink[]
}>()
</script>

<template>
    <section v-if="items.length" class="related-components">
        <h2 id="related-components">Related Components</h2>

        <div class="related-components__grid">
            <ComponentCatalogCard
                v-for="component in items"
                :key="component.component"
                :name="component.name"
                :path="component.path"
            />
        </div>
    </section>
</template>

<style scoped lang="scss">
.related-components {
    margin-top: 58px;

    h2 {
        color: var(--h0n-ui-color-text);
        font-size: 1.65rem;
        letter-spacing: -0.025em;
        line-height: 1.25;
        margin: 0 0 20px;
        scroll-margin-top: 24px;
    }

    &__grid {
        display: grid;
        gap: 30px 16px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 760px) {
    .related-components__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 480px) {
    .related-components__grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
