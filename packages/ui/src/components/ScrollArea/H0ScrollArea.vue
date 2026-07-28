<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { toH0CssSize } from '../_shared/utils'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0ScrollAreaLocale } from '../../locale'
import type { H0ScrollAreaProps } from './ScrollArea.types'
defineOptions({ name: 'H0ScrollArea' })
const props = withDefaults(defineProps<H0ScrollAreaProps>(), { orientation: 'vertical', stableGutter: true, fadeEdges: false, ariaLabel: '' })
const locale = useH0LocaleSection('scrollArea', defaultH0ScrollAreaLocale)
const resolvedAriaLabel = computed(() => props.ariaLabel || locale.value.label)
const emit = defineEmits<{ scroll: [event: Event]; 'reach-start': []; 'reach-end': [] }>()
const viewport = useTemplateRef<HTMLElement>('viewport')
const start = ref(true)
const end = ref(false)
const styles = computed(() => ({ maxHeight: toH0CssSize(props.maxHeight), maxWidth: toH0CssSize(props.maxWidth) }))
function onScroll(event: Event) { const el=event.currentTarget as HTMLElement;const vertical=props.orientation!=='horizontal';const position=vertical?el.scrollTop:el.scrollLeft;const maximum=vertical?el.scrollHeight-el.clientHeight:el.scrollWidth-el.clientWidth;const nextStart=position<=1,nextEnd=position>=maximum-1;if(nextStart&&!start.value)emit('reach-start');if(nextEnd&&!end.value)emit('reach-end');start.value=nextStart;end.value=nextEnd;emit('scroll',event) }
defineExpose({ scrollTo: (options: ScrollToOptions) => viewport.value?.scrollTo(options), scrollBy: (options: ScrollToOptions) => viewport.value?.scrollBy(options), viewport })
</script>
<template><div data-h0n-component="scroll-area" class="h-scroll" :class="[`h-scroll--${orientation}`,stableGutter&&'h-scroll--stable',fadeEdges&&'h-scroll--fade',!start&&'h-scroll--away-start',!end&&'h-scroll--away-end']"><div ref="viewport" class="h-scroll__viewport" :style="styles" role="region" :aria-label="resolvedAriaLabel" tabindex="0" @scroll="onScroll"><slot /></div></div></template>
<style scoped>
.h-scroll {
    --h-scroll-fade-color: var(--h0n-background, var(--h0n-ui-color-surface));

    min-width: 0;
    position: relative;
}

.h-scroll__viewport {
    overscroll-behavior: contain;
    scrollbar-color: var(--h0n-ui-color-border) transparent;
    scrollbar-width: thin;
}

.h-scroll--vertical .h-scroll__viewport {
    overflow-x: hidden;
    overflow-y: auto;
}

.h-scroll--horizontal .h-scroll__viewport {
    overflow-x: auto;
    overflow-y: hidden;
}

.h-scroll--both .h-scroll__viewport {
    overflow: auto;
}

.h-scroll--stable .h-scroll__viewport {
    scrollbar-gutter: stable;
}

.h-scroll--fade::before,
.h-scroll--fade::after {
    block-size: 56px;
    content: '';
    inset-inline: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
    z-index: 1;
}

.h-scroll--fade::before {
    background: linear-gradient(
        to bottom,
        var(--h-scroll-fade-color) 0%,
        color-mix(in srgb, var(--h-scroll-fade-color) 86%, transparent) 22%,
        color-mix(in srgb, var(--h-scroll-fade-color) 52%, transparent) 50%,
        color-mix(in srgb, var(--h-scroll-fade-color) 18%, transparent) 78%,
        transparent 100%
    );
    inset-block-start: 0;
}

.h-scroll--fade::after {
    background: linear-gradient(
        to top,
        var(--h-scroll-fade-color) 0%,
        color-mix(in srgb, var(--h-scroll-fade-color) 86%, transparent) 22%,
        color-mix(in srgb, var(--h-scroll-fade-color) 52%, transparent) 50%,
        color-mix(in srgb, var(--h-scroll-fade-color) 18%, transparent) 78%,
        transparent 100%
    );
    inset-block-end: 0;
}

.h-scroll--fade.h-scroll--away-start::before,
.h-scroll--fade.h-scroll--away-end::after {
    opacity: 1;
}

@media (forced-colors: active) {
    .h-scroll__viewport {
        border: 1px solid CanvasText;
    }

    .h-scroll--fade::before,
    .h-scroll--fade::after {
        display: none;
    }
}
</style>
