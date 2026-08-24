<script setup lang="ts">
import { computed } from 'vue';
import type { H0StackProps } from './Layout.types';
import { resolveAlign, resolveJustify, resolveSpace, resolveWrap, responsiveStyles } from './responsive';
defineOptions({ name: 'H0Stack' })
const props = withDefaults(defineProps<H0StackProps>(), { as: 'div', gap: 'md', align: 'stretch', justify: 'start', wrap: false })
const styles = computed(() => ({
    ...responsiveStyles('stack-gap', props.gap, resolveSpace),
    ...responsiveStyles('stack-align', props.align, resolveAlign),
    ...responsiveStyles('stack-justify', props.justify, resolveJustify),
    ...responsiveStyles('stack-wrap', props.wrap, resolveWrap)
}))
</script>
<template>
    <component :is="as" data-h0n-component="stack" class="h-stack" :style="styles"><slot /></component>
</template>
<style scoped lang="scss">
@use './responsive' as r;
.h-stack {
    display: flex;
    flex-direction: column;
    min-width: 0;
    @include r.responsive-property(gap, stack-gap, 0);
    @include r.responsive-property(align-items, stack-align, stretch);
    @include r.responsive-property(justify-content, stack-justify, flex-start);
    @include r.responsive-property(flex-wrap, stack-wrap, nowrap);
}
</style>
