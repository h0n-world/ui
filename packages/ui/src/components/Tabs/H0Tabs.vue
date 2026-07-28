<script setup lang="ts" generic="Value extends H0TabValue = H0TabValue">
import { computed, onMounted, provide, ref, useId, useSlots, watchEffect } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import H0Tab from './H0Tab.vue'
import H0TabList from './H0TabList.vue'
import H0TabPanel from './H0TabPanel.vue'
import { h0TabsKey } from './Tabs.context'
import type { H0TabsProps, H0TabValue } from './Tabs.types'
defineOptions({ name: 'H0Tabs' })
const props = withDefaults(defineProps<H0TabsProps<Value>>(), { items: () => [], orientation: 'horizontal', activationMode: 'automatic', mountMode: 'all', loop: true, ariaLabel: '', id: '' })
const emit = defineEmits<{ 'update:modelValue': [value: Value]; change: [value: Value] }>()
const slots = useSlots()
const first = () => props.defaultValue ?? props.items.find((item) => !item.disabled)?.value
const state = useH0ControllableState<Value | undefined>({ modelValue: () => props.modelValue, defaultValue: first, onUpdate: (value) => { if(value!==undefined)emit('update:modelValue',value) } })
const generated = useId()
const visited = ref(new Set<H0TabValue>())
function set(value:H0TabValue,user=false){if(value===state.value.value)return;state.setValue(value as Value);if(user)emit('change',value as Value)}
provide(h0TabsKey,{active:computed(()=>state.value.value),activation:props.activationMode,orientation:props.orientation,mountMode:props.mountMode,loop:props.loop,baseId:props.id||`h-tabs-${generated}`,visited,set})
watchEffect(()=>{if(state.value.value!==undefined)visited.value.add(state.value.value)})
onMounted(()=>{if(props.items.length&&slots.default)console.warn('[H0Tabs] Use either items or compound children, not both.')})
</script>
<template><div data-h0n-component="tabs" class="h-tabs" :class="`h-tabs--${orientation}`"><template v-if="items.length"><H0TabList :aria-label="ariaLabel"><H0Tab v-for="(item,index) in items" :key="item.value" :value="item.value" :disabled="item.disabled"><slot name="tab" :item="item" :index="index">{{item.label}}</slot></H0Tab></H0TabList><H0TabPanel v-for="(item,index) in items" :key="item.value" :value="item.value"><slot name="panel" :item="item" :index="index" /></H0TabPanel></template><slot v-else /></div></template>
<style scoped>.h-tabs{color:var(--h0n-ui-color-text);font-family:var(--h0n-ui-font-family);min-width:0}.h-tabs--vertical{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--h0n-ui-spacing-lg)}</style>
