<script setup lang="ts">
import { inject, useTemplateRef } from 'vue'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0TabsLocale } from '../../locale'
import { h0TabsKey } from './Tabs.context'
defineOptions({ name: 'H0TabList' })
defineProps<{ ariaLabel?: string }>()
const context = inject(h0TabsKey)!
const locale = useH0LocaleSection('tabs', defaultH0TabsLocale)
const root = useTemplateRef<HTMLElement>('root')
function keydown(event:KeyboardEvent){const tabs=[...(root.value?.querySelectorAll<HTMLButtonElement>('[role=tab]:not(:disabled)')??[])];const current=tabs.indexOf(document.activeElement as HTMLButtonElement);const rtl=root.value?.ownerDocument.dir==='rtl';const previous=context.orientation==='vertical'?'ArrowUp':rtl?'ArrowRight':'ArrowLeft';const next=context.orientation==='vertical'?'ArrowDown':rtl?'ArrowLeft':'ArrowRight';let target=-1;if(event.key===previous)target=current-1;else if(event.key===next)target=current+1;else if(event.key==='Home')target=0;else if(event.key==='End')target=tabs.length-1;else return;event.preventDefault();if(context.loop)target=(target+tabs.length)%tabs.length;else target=Math.max(0,Math.min(target,tabs.length-1));tabs[target]?.focus()}
</script>
<template><div ref="root" data-h0n-component="tab-list" class="h-tab-list" :class="`h-tab-list--${context.orientation}`" role="tablist" :aria-label="ariaLabel||locale.label" :aria-orientation="context.orientation" @keydown="keydown"><slot /></div></template>
<style scoped>.h-tab-list{display:flex}.h-tab-list--horizontal{border-block-end:1px solid var(--h0n-ui-color-border);overflow-x:auto}.h-tab-list--vertical{border-inline-end:1px solid var(--h0n-ui-color-border);flex-direction:column}@media (forced-colors:active){.h-tab-list{border-color:CanvasText}}</style>
