<script setup lang="ts">
import closeIcon from '@h0nio/icons/close';
import H0Button from '../Button/H0Button.vue';
import H0Typography from '../Typography/H0Typography.vue';

defineOptions({
    name: 'H0OverlayHeader'
})

withDefaults(
    defineProps<{
        title?: string
        subtitle?: string
        closeAriaLabel: string
        customContent?: boolean
        border?: boolean
    }>(),
    {
        title: '',
        subtitle: '',
        customContent: false,
        border: false
    }
)

defineEmits<{
    close: []
}>()
</script>

<template>
    <header class="h-overlay-header" :class="{ 'h-overlay-header--border': border }">
        <div class="h-overlay-header__heading">
            <slot v-if="customContent" />
            <template v-else>
                <H0Typography v-if="subtitle" as="p" :weight="700" variant="body-xs" color="secondary">{{ subtitle }}</H0Typography>
                <H0Typography v-if="title" as="h2" variant="h5">{{ title }}</H0Typography>
            </template>
        </div>
        <H0Button size="sm" variant="soft" :icon="closeIcon" button-type="onlyIcon" :aria-label="closeAriaLabel" @click="$emit('close')" />
    </header>
</template>

<style scoped lang="scss">
.h-overlay-header {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding: 16px 16px 0;
}

.h-overlay-header--border {
    border-block-end: 1px solid var(--h0n-ui-color-border);
    padding-block-end: 16px;
}

.h-overlay-header__heading {
    display: grid;
    flex: 1;
    gap: var(--h0n-ui-spacing-xxs);
    min-width: 0;
}
</style>
