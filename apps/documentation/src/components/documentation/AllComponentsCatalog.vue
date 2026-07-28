<script setup lang="ts">
import { h0ComponentManifest, type H0ComponentCategory } from '@h0nio/ui'
import { computed } from 'vue'

import ComponentCatalogCard from '@/components/documentation/ComponentCatalogCard.vue'
import { documentationPages } from '@/content/content'

defineOptions({
    name: 'AllComponentsCatalog',
})

const categoryOrder: H0ComponentCategory[] = [
    'actions',
    'content',
    'data',
    'feedback',
    'forms',
    'layout',
    'navigation',
    'overlays',
]

const categoryLabels: Record<H0ComponentCategory, string> = {
    actions: 'Actions',
    content: 'Content',
    data: 'Data display',
    feedback: 'Feedback',
    forms: 'Forms',
    layout: 'Layout',
    navigation: 'Navigation',
    overlays: 'Overlays',
}

const documentedPaths = new Set(
    documentationPages
        .filter((page) => page.path.startsWith('/components/') && page.template === 'article')
        .map((page) => page.path),
)

const categories = computed(() =>
    categoryOrder.map((category) => ({
        id: `category-${category}`,
        label: categoryLabels[category],
        items: h0ComponentManifest
            .filter((component) => component.category === category)
            .map((component) => {
                const docsPath = `/components/${component.docsSlug}`
                const docsAnchor = component.docsSlug !== component.slug ? `#h0${component.slug}` : ''

                return {
                    name: component.name.replace(/^H0/, ''),
                    path: documentedPaths.has(docsPath) ? `${docsPath}${docsAnchor}` : undefined,
                }
            })
            .sort((first, second) => first.name.localeCompare(second.name)),
    })),
)
</script>

<template>
    <div class="component-catalog">
        <section
            v-for="category in categories"
            :key="category.id"
            class="component-category"
        >
            <h2 :id="category.id">{{ category.label }}</h2>

            <div class="component-category__grid">
                <ComponentCatalogCard
                    v-for="component in category.items"
                    :key="component.name"
                    :name="component.name"
                    :path="component.path"
                />
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
.component-catalog {
    display: grid;
    gap: 58px;
    margin-top: 46px;
}

.component-category {
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
    .component-category__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 480px) {
    .component-category__grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
