<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useH0LocaleSection } from '../_shared/useLocaleSection'
import { defaultH0LinkLocale } from '../../locale'
import type { H0LinkProps } from './Link.types'
defineOptions({ name: 'H0Link', inheritAttrs: false })
const props = withDefaults(defineProps<H0LinkProps>(), { as: 'a', external: false, externalText: '', tone: 'primary', variant: 'default', size: 'md', disabled: false })
const emit = defineEmits<{ click: [event: MouseEvent]; focus: [event: FocusEvent]; blur: [event: FocusEvent] }>()
const locale = useH0LocaleSection('link', defaultH0LinkLocale)
const attrs = useAttrs()
const isAnchor = computed(() => props.as === 'a')
const resolvedRel = computed(() => props.rel || (props.external || props.target === '_blank' ? 'noopener noreferrer' : undefined))
const resolvedExternalText = computed(() => props.externalText || locale.value.external)
const merged = computed(() => ({ ...attrs, ...props.rootAttrs }))
function click(event: MouseEvent) { if(props.disabled){event.preventDefault();event.stopImmediatePropagation();return}emit('click',event) }
</script>
<template><component :is="as" v-bind="merged" data-h0n-component="link" class="h-link" :class="[`h-link--${tone}`,`h-link--${variant}`,`h-link--${size}`,disabled&&'h-link--disabled']" :href="isAnchor&&!disabled?href:undefined" :to="!isAnchor&&!disabled?to:undefined" :target="target" :rel="resolvedRel" :download="download" :aria-current="ariaCurrent" :aria-disabled="disabled||undefined" :tabindex="disabled?-1:undefined" @click="click" @focus="emit('focus',$event)" @blur="emit('blur',$event)"><slot /><span v-if="external" class="h-link__external" aria-hidden="true">↗</span><span v-if="external" class="h-link__sr-only">{{resolvedExternalText}}</span></component></template>
<style scoped lang="scss">.h-link{border-radius:var(--h0n-ui-radius-sm);color:var(--h-link-color,var(--h0n-ui-color-primary));font-family:var(--h0n-ui-font-family);font-weight:var(--h0n-ui-font-weight-medium);text-decoration:underline;text-decoration-thickness:.08em;text-underline-offset:.18em;transition:color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),opacity var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard)}.h-link:hover{filter:brightness(1.12)}.h-link:focus-visible{box-shadow:var(--h0n-ui-focus-ring);outline:none}.h-link--neutral{--h-link-color:var(--h0n-ui-color-text)}.h-link--info{--h-link-color:var(--h0n-ui-color-info)}.h-link--success{--h-link-color:var(--h0n-ui-color-success)}.h-link--warning{--h-link-color:var(--h0n-ui-color-warning)}.h-link--danger{--h-link-color:var(--h0n-ui-color-danger)}.h-link--subtle{--h-link-color:var(--h0n-ui-color-muted);text-decoration:none}.h-link--standalone{text-decoration:none}.h-link--sm{font-size:var(--h0n-ui-typography-body-sm-size)}.h-link--md{font-size:var(--h0n-ui-typography-body-size)}.h-link--lg{font-size:var(--h0n-ui-typography-h5-size)}.h-link--disabled{cursor:not-allowed;opacity:var(--h0n-ui-disabled-opacity);pointer-events:none}.h-link__external{display:inline-block;margin-inline-start:.25em}.h-link__sr-only{block-size:1px;clip:rect(0,0,0,0);clip-path:inset(50%);inline-size:1px;overflow:hidden;position:absolute;white-space:nowrap}@media (forced-colors:active){.h-link:focus-visible{outline:2px solid Highlight}}</style>
