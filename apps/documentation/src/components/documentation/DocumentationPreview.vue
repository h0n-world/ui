<script setup lang="ts">
import { H0Button, H0Segment, type H0SegmentItem, type H0SegmentValue } from '@h0nio/ui'
import { computed, onBeforeUnmount, ref } from 'vue'

import DocumentationCodeBlock from './DocumentationCodeBlock.vue'

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
            <span>{{ selectedViewportConfig.width }}</span>
        </div>

        <div class="documentation-preview__mobile-width" aria-label="Preview width">100%</div>

        <div class="documentation-preview__stage" :data-preview-viewport="activeViewport">
            <div
                class="documentation-preview__frame"
                :style="{ '--documentation-preview-width': selectedViewportConfig.width }"
            >
                <slot />
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
    position: relative;

    &__toolbar {
        align-items: center;
        background: var(--h0n-ui-color-surface);
        border-bottom: 1px solid var(--h0n-ui-color-border);
        display: flex;
        justify-content: space-between;
        min-height: 52px;
        padding: var(--h0n-ui-spacing-sm) var(--h0n-ui-spacing-md);

        > span {
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
        padding: var(--h0n-ui-spacing-lg);
    }

    &__mobile-width {
        display: none;
    }

    &__frame {
        align-items: center;
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
        }

        &__stage {
            padding: var(--h0n-ui-spacing-sm);
        }

        &__frame {
            flex-basis: 100%;
            padding: var(--h0n-ui-spacing-md);
            width: 100%;
        }
    }
}
</style>
