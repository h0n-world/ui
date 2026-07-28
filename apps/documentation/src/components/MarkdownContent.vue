<script setup lang="ts">
import { H0Alert, H0Table } from '@h0nio/ui'
import { nextTick, onMounted, ref, watch } from 'vue'

import DocumentationPreview from '@/components/documentation/DocumentationPreview.vue'
import type {
    DocumentationAlert,
    DocumentationTable,
    RenderedDocumentationExample,
} from '@/content/content'

defineOptions({
    name: 'MarkdownContent',
})

const props = defineProps<{
    alerts: DocumentationAlert[]
    examples: RenderedDocumentationExample[]
    html: string
    tables: DocumentationTable[]
}>()

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const targetsReady = ref(false)

onMounted(() => {
    targetsReady.value = true
})

watch(
    () => props.html,
    async () => {
        targetsReady.value = false
        await nextTick()
        targetsReady.value = true
    },
)
</script>

<template>
    <div class="markdown-content" @click="emit('click', $event)" v-html="html"></div>

    <template v-if="targetsReady">
        <Teleport v-for="alert in alerts" :key="alert.id" :to="`#${alert.id}`">
            <H0Alert class="markdown-alert" :tone="alert.tone" :title="alert.title">
                <div class="markdown-alert__content" v-html="alert.html"></div>
            </H0Alert>
        </Teleport>

        <Teleport v-for="example in examples" :key="example.id" :to="`#${example.id}`">
            <DocumentationPreview :code="example.source">
                <component :is="example.component" />
            </DocumentationPreview>
        </Teleport>

        <Teleport v-for="table in tables" :key="table.id" :to="`#${table.id}`">
            <H0Table
                class="markdown-table"
                :columns="table.columns"
                :rows="table.rows"
                :min-width="table.minWidth"
                :aria-label="table.ariaLabel"
                density="compact"
                hoverable
                :sticky-header="false"
            >
                <template v-for="column in table.columns" #[`cell-${column.key}`]="{ value }">
                    <span class="markdown-table__cell" v-html="String(value ?? '')"></span>
                </template>
            </H0Table>
        </Teleport>
    </template>
</template>

<style scoped lang="scss">
.markdown-content {
    :deep(> h1:first-child) {
        display: none;
    }
}

:deep(.markdown-table-slot) {
    margin: 28px 0 34px;
}

.markdown-alert__content {
    :deep(> :first-child) {
        margin-top: 0;
    }

    :deep(> :last-child) {
        margin-bottom: 0;
    }
}

.markdown-table__cell {
    :deep(> :first-child) {
        margin-top: 0;
    }

    :deep(> :last-child) {
        margin-bottom: 0;
    }
}
</style>
