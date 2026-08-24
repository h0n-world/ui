<script setup lang="ts">
import { H0Button, H0Icon, H0Input, H0Typography } from '@h0n/ui'
import { searchIcon } from '@h0n/ui/icons'
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'

import { documentationPages } from '@/content/content'

const open = defineModel<boolean>('open', { default: false })
const query = ref('')
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const router = useRouter()

const results = computed(() => {
    const needle = query.value.trim().toLowerCase()
    if (!needle) return documentationPages.slice(0, 6)

    return documentationPages
        .filter((page) =>
            `${page.title} ${page.description} ${page.group}`.toLowerCase().includes(needle),
        )
        .slice(0, 8)
})

function close() {
    open.value = false
}

async function navigate(path: string) {
    close()
    await router.push(path)
}

function handleGlobalKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement | null
    const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]')

    if (event.key === '/' && !isTyping) {
        event.preventDefault()
        open.value = true
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        open.value = true
    }
}

watch(open, async (value) => {
    if (value && !dialog.value?.open) {
        dialog.value?.showModal()
        await nextTick()
        dialog.value?.querySelector('input')?.focus()
    } else if (!value && dialog.value?.open) {
        dialog.value.close()
        query.value = ''
    }
})

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>

<template>
    <dialog
        ref="dialog"
        class="search-palette"
        aria-label="Search documentation"
        @close="open = false"
        @click.self="close"
    >
        <div class="search-palette__panel">
            <div class="search-palette__field">
                <H0Icon :icon="searchIcon" :size="20" />
                <H0Input
                    v-model="query"
                    placeholder="Search documentation…"
                    aria-label="Search documentation"
                />
                <kbd>Esc</kbd>
            </div>

            <div class="search-palette__results" role="listbox" aria-label="Search results">
                <button
                    v-for="result in results"
                    :key="result.path"
                    class="search-result"
                    type="button"
                    role="option"
                    @click="navigate(result.path)"
                >
                    <span>
                        <H0Typography as="span" variant="body-sm" :weight="600">{{
                            result.title
                        }}</H0Typography>
                        <span class="search-result__description">{{ result.description }}</span>
                    </span>
                    <span class="search-result__group">{{ result.group }}</span>
                </button>

                <div v-if="!results.length" class="search-palette__empty">
                    No pages found for “{{ query }}”.
                </div>
            </div>

            <footer class="search-palette__footer">
                <span><kbd>↵</kbd> open</span>
                <H0Button size="sm" variant="ghost" @click="close">Close</H0Button>
            </footer>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
.search-palette {
    background: transparent;
    border: 0;
    color: var(--h0n-ui-color-text);
    margin: min(16vh, 140px) auto auto;
    max-width: calc(100vw - 32px);
    padding: 0;
    width: 620px;

    &::backdrop {
        backdrop-filter: blur(8px);
        background: var(--h0n-ui-color-backdrop);
    }

    &__panel {
        background: var(--h0n-ui-color-surface);
        border: 1px solid var(--h0n-ui-color-border);
        border-radius: var(--h0n-ui-radius-xxl);
        box-shadow: var(--h0n-ui-shadow-lg);
        overflow: hidden;
    }

    &__field {
        align-items: center;
        border-bottom: 1px solid var(--h0n-ui-color-border);
        display: grid;
        gap: 10px;
        grid-template-columns: auto minmax(0, 1fr) auto;
        padding: 10px 14px;

        :deep(.h-input__control) {
            background: transparent;
        }
    }

    &__results {
        display: grid;
        gap: 4px;
        max-height: 390px;
        overflow: auto;
        padding: 8px;
    }

    &__empty {
        color: var(--h0n-ui-color-muted);
        padding: 28px 18px;
        text-align: center;
    }

    &__footer {
        align-items: center;
        border-top: 1px solid var(--h0n-ui-color-border);
        color: var(--h0n-ui-color-muted);
        display: flex;
        font-size: 0.75rem;
        justify-content: space-between;
        padding: 7px 10px 7px 14px;
    }
}

.search-result {
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--h0n-ui-radius-lg);
    color: var(--h0n-ui-color-text);
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: 18px;
    justify-content: space-between;
    padding: 12px;
    text-align: left;
    width: 100%;

    &:hover,
    &:focus-visible {
        background: var(--h0n-ui-color-surface-hover);
        outline: none;
    }

    > span:first-child {
        display: grid;
        gap: 2px;
        min-width: 0;
    }

    &__description {
        color: var(--h0n-ui-color-muted);
        font-size: 0.75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__group {
        color: var(--h0n-ui-color-muted);
        flex: 0 0 auto;
        font-size: 0.7rem;
    }
}

kbd {
    background: var(--h0n-ui-color-secondary);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: 6px;
    color: var(--h0n-ui-color-muted);
    font: 500 0.68rem/1 var(--h0n-ui-font-family);
    padding: 5px 7px;
}
</style>
