<script setup lang="ts">
import { H0SideNav, H0SideNavGroup, H0SideNavItem } from '@h0nio/ui'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { getDocumentationSections } from '@/content/content'

const props = withDefaults(
    defineProps<{
        group: string
        variant?: 'desktop' | 'drawer'
    }>(),
    {
        variant: 'desktop',
    },
)

const emit = defineEmits<{
    navigate: []
}>()

const sections = computed(() => getDocumentationSections(props.group))
</script>

<template>
    <div class="system-sidebar" :class="`system-sidebar--${variant}`">
        <H0SideNav gap="md">
            <H0SideNavGroup v-for="section in sections" :key="section.title" :label="section.title">
                <H0SideNavItem
                    v-for="page in section.items"
                    :key="page.path"
                    :as="RouterLink"
                    :to="page.path"
                    :title="page.title"
                    @click="emit('navigate')"
                />
            </H0SideNavGroup>
        </H0SideNav>
    </div>
</template>

<style scoped lang="scss">
.system-sidebar {
    min-width: 0;

    &--desktop {
        padding: 26px 20px 42px 28px;
    }

    &--drawer {
        padding: var(--h0n-ui-spacing-sm) 0 var(--h0n-ui-spacing-xl);
    }
}
</style>
