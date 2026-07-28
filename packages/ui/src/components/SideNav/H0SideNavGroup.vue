<script setup lang="ts">
import H0List from '../List/H0List.vue'

defineOptions({
    name: 'H0SideNavGroup'
})

withDefaults(
    defineProps<{
        label?: string
    }>(),
    {
        label: ''
    }
)
</script>

<template>
    <H0List data-h0n-component="side-nav-group" class="h-side-nav-group" :label="label" gap="sm" :divided="false">
        <template v-if="$slots.label" #label>
            <slot name="label" />
        </template>

        <slot />
    </H0List>
</template>
