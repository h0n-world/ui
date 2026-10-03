<script setup lang="ts">
import { H0Button, H0Dropdown, H0Segment, type H0SegmentItem, type H0SegmentValue } from '@h0nio/ui'
import { computed, defineComponent, onBeforeUnmount, onMounted, provide, ref, shallowRef, useSlots, watch, type Slot } from 'vue'

import DocumentationCodeBlock from './DocumentationCodeBlock.vue'
import { previewActionsKey } from './previewActions'

defineOptions({
    name: 'DocumentationPreview',
})

type PreviewViewport = 'desktop' | 'tablet' | 'mobile'

const viewportOrder: PreviewViewport[] = ['desktop', 'tablet', 'mobile']
const viewportConfig: Record<PreviewViewport, { label: string; width: string }> = {
    desktop: { label: 'Desktop', width: '100%' },
    tablet: { label: 'Tablet', width: '768px' },
    mobile: { label: 'Mobile', width: '390px' },
}

const props = withDefaults(
    defineProps<{
        code: string
        collapsedLines?: number
        defaultViewport?: PreviewViewport
    }>(),
    {
        collapsedLines: 8,
        defaultViewport: 'desktop',
    },
)

const activeViewport = ref<PreviewViewport>(props.defaultViewport)
const copied = ref(false)
const expanded = ref(false)
const actionsOpen = ref(false)
const screenIsMobile = ref(false)
const isMobile = computed(() => screenIsMobile.value || activeViewport.value === 'mobile')
const actions = shallowRef<Slot>()
const slots = useSlots()
provide(previewActionsKey, actions)
const hasActions = computed(() => Boolean(slots.actions || actions.value))
const PreviewActions = defineComponent({
    name: 'PreviewActions',
    setup: () => () => (slots.actions || actions.value)?.(),
})
let mobileQuery: MediaQueryList | undefined

function syncMobile() {
    screenIsMobile.value = mobileQuery?.matches ?? false
}

function closeActionsOnActivation(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest('button, a[href], [role="button"]')) {
        actionsOpen.value = false
    }
}

watch(isMobile, (mobile) => {
    if (!mobile) actionsOpen.value = false
})

onMounted(() => {
    mobileQuery = window.matchMedia('(max-width: 720px)')
    syncMobile()
    mobileQuery.addEventListener('change', syncMobile)
})
let copiedTimeout: ReturnType<typeof setTimeout> | undefined

const viewportItems: H0SegmentItem[] = viewportOrder.map((viewport) => ({
    label: viewportConfig[viewport].label,
    value: viewport,
}))
const selectedViewportConfig = computed(() => viewportConfig[activeViewport.value])
const codeLineCount = computed(() => props.code.split(/\r\n|\r|\n/).length)
const canToggleCode = computed(() => codeLineCount.value > props.collapsedLines)
const codeIsCollapsed = computed(() => canToggleCode.value && !expanded.value)
const codeMaxHeight = computed(() => `${Math.max(props.collapsedLines, 1) * 22 + 40}px`)

function selectViewport(value: H0SegmentValue) {
    if (viewportOrder.includes(value as PreviewViewport)) {
        activeViewport.value = value as PreviewViewport
    }
}

async function copyCode() {
    try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard API is unavailable')
        await navigator.clipboard.writeText(props.code)
    } catch {
        const textarea = document.createElement('textarea')
        textarea.value = props.code
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.append(textarea)
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
    }

    copied.value = true
    if (copiedTimeout) window.clearTimeout(copiedTimeout)
    copiedTimeout = window.setTimeout(() => (copied.value = false), 1600)
}

onBeforeUnmount(() => {
    if (copiedTimeout) window.clearTimeout(copiedTimeout)
    mobileQuery?.removeEventListener('change', syncMobile)
})
</script>

<template>
    <section class="documentation-preview">
        <div class="documentation-preview__toolbar">
            <H0Segment
                :model-value="activeViewport"
                :items="viewportItems"
                size="sm"
                variant="secondary"
                aria-label="Preview size"
                @update:model-value="selectViewport"
            />
            <H0Dropdown
                v-if="hasActions && isMobile && !screenIsMobile"
                v-model="actionsOpen"
                aria-label="Preview actions"
                :min-width="180"
            >
                <H0Button size="sm" variant="soft">Actions</H0Button>
                <template #content>
                    <div class="documentation-preview__actions documentation-preview__actions--dropdown" @click="closeActionsOnActivation">
                        <PreviewActions />
                    </div>
                </template>
            </H0Dropdown>
            <span>{{ selectedViewportConfig.width }}</span>
        </div>

        <div class="documentation-preview__mobile-width">
            <H0Dropdown
                v-if="hasActions && screenIsMobile"
                v-model="actionsOpen"
                aria-label="Preview actions"
                :min-width="180"
            >
                <H0Button size="sm" variant="soft">Actions</H0Button>
                <template #content>
                    <div class="documentation-preview__actions documentation-preview__actions--dropdown" @click="closeActionsOnActivation">
                        <PreviewActions />
                    </div>
                </template>
            </H0Dropdown>
            <span aria-label="Preview width">100%</span>
        </div>

        <div class="documentation-preview__stage" :data-preview-viewport="activeViewport">
            <div
                class="documentation-preview__frame"
                :class="{ 'documentation-preview__frame--with-actions': hasActions }"
                :style="{ '--documentation-preview-width': selectedViewportConfig.width }"
            >
                <aside v-if="hasActions && !isMobile" class="documentation-preview__actions" aria-label="Preview actions">
                    <PreviewActions />
                </aside>
                <div class="documentation-preview__content">
                    <slot />
                </div>
            </div>
        </div>

        <div
            class="documentation-preview__code"
            :class="{ 'documentation-preview__code--collapsed': codeIsCollapsed }"
            :style="codeIsCollapsed ? { maxHeight: codeMaxHeight } : undefined"
        >
            <button type="button" :aria-label="copied ? 'Copied' : 'Copy code'" @click="copyCode">
                {{ copied ? 'Copied' : 'Copy' }}
            </button>
            <DocumentationCodeBlock :code="code" language="vue" />
        </div>

        <div v-if="canToggleCode" class="documentation-preview__action">
            <H0Button size="sm" variant="soft" @click="expanded = !expanded">
                {{ expanded ? 'Collapse code' : 'Expand code' }}
            </H0Button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.documentation-preview {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-xl);
    margin: 26px 0 36px;
    min-width: 0;
    overflow: hidden;
    overflow-anchor: none;
    position: relative;

    &__toolbar {
        align-items: center;
        background: var(--h0n-ui-color-surface);
        border-bottom: 1px solid var(--h0n-ui-color-border);
        display: flex;
        gap: var(--h0n-ui-spacing-sm);
        justify-content: space-between;
        min-height: 52px;
        padding: var(--h0n-ui-spacing-sm) var(--h0n-ui-spacing-md);

        > span {
            margin-left: auto;
            color: var(--h0n-ui-color-muted);
            font:
                0.7rem/1.4 'SFMono-Regular',
                Consolas,
                monospace;
        }
    }

    &__stage {
        background: var(--h0n-ui-color-surface);
        display: flex;
        justify-content: center;
        min-width: 0;
        overflow-x: auto;
        overflow-y: hidden;
        padding: var(--h0n-ui-spacing-lg);
    }

    &__mobile-width {
        display: none;
    }

    &__frame {
        align-items: flex-start;
        background: var(--h0n-background);
        border-radius: var(--h0n-ui-radius-lg);
        container-name: documentation-preview;
        container-type: inline-size;
        display: flex;
        flex: 0 0 var(--documentation-preview-width);
        justify-content: center;
        max-width: 100%;
        min-width: 0;
        padding: var(--h0n-ui-spacing-xl);
        transition: width var(--h0n-ui-duration-normal);
        width: var(--documentation-preview-width);

        &--with-actions {
            align-items: stretch;
            padding: 0;
        }
    }

    &__actions {
        border-right: 1px solid var(--h0n-ui-color-border);
        display: flex;
        flex: 0 0 20%;
        flex-direction: column;
        gap: var(--h0n-ui-spacing-sm);
        min-width: 0;
        padding: var(--h0n-ui-spacing-md);
        overflow-wrap: anywhere;

        :deep([data-h0n-component="button"]) {
            line-height: 1.4;
            padding-block: var(--h0n-ui-spacing-xs);
            white-space: normal;
        }

        &--dropdown {
            border: 0;
            padding: 0;
        }
    }

    &__content {
        display: flex;
        flex: 1;
        justify-content: center;
        min-width: 0;
        container-name: documentation-preview;
        container-type: inline-size;
    }

    &__frame--with-actions &__content {
        padding: var(--h0n-ui-spacing-xl);
    }

    &__code {
        border-top: 1px solid var(--h0n-ui-color-border);
        min-width: 0;
        overflow: hidden;
        position: relative;

        > button {
            background: var(--h0n-ui-color-surface);
            border: 1px solid var(--h0n-ui-color-border);
            border-radius: var(--h0n-ui-radius-md);
            color: var(--h0n-ui-color-muted);
            cursor: pointer;
            font-size: var(--h0n-ui-typography-body-xs-size);
            padding: 6px 9px;
            position: absolute;
            right: 12px;
            top: 12px;
            z-index: 1;
        }

        &--collapsed {
            mask-image: linear-gradient(#000 0 38%, transparent 100%);
        }
    }

    &__action {
        bottom: 0;
        display: flex;
        justify-content: center;
        left: 0;
        padding: 14px;
        pointer-events: none;
        position: absolute;
        right: 0;

        > * {
            pointer-events: auto;
        }
    }
}

@media (max-width: 720px) {
    .documentation-preview {
        &__toolbar {
            display: none;
        }

        &__mobile-width {
            align-items: center;
            background: var(--h0n-ui-color-surface);
            border-bottom: 1px solid var(--h0n-ui-color-border);
            color: var(--h0n-ui-color-muted);
            display: flex;
            font:
                0.7rem/1.4 'SFMono-Regular',
                Consolas,
                monospace;
            justify-content: flex-end;
            min-height: 32px;
            padding: 0 var(--h0n-ui-spacing-md);

            > span:last-child {
                margin-left: auto;
            }
        }

        &__stage {
            padding: var(--h0n-ui-spacing-sm);
        }

        &__frame {
            flex-basis: 100%;
            padding: var(--h0n-ui-spacing-md);
            width: 100%;

            &--with-actions {
                padding: 0;
            }
        }

        &__frame--with-actions &__content {
            padding: var(--h0n-ui-spacing-md);
        }
    }
}
</style>
