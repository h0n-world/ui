<script setup lang="ts">
import { H0Button, H0Modal, H0Select, H0Skeleton, H0Spinner, H0Switch, useH0Animation, type H0AnimationLevel, type H0SelectOption } from '@h0nio/ui'
import { ref } from 'vue'

const motion = useH0Animation()
const open = ref(false)
const checked = ref(false)
const options: H0SelectOption<H0AnimationLevel>[] = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'off', label: 'Off' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]
function select(value: unknown) {
    if (value === 'recommended' || value === 'off' || value === 'low' || value === 'medium' || value === 'high') motion.setPreference(value)
}
</script>

<template>
    <div class="animation-example">
        <H0Select label="Motion preference" :model-value="motion.preference.value" :options="options" @update:model-value="select" />
        <dl class="animation-example__state" aria-live="polite">
            <div><dt>Effective quality</dt><dd data-motion-quality>{{ motion.quality.value }}</dd></div>
            <div><dt>Recommended quality</dt><dd data-motion-recommended>{{ motion.recommendedQuality.value }}</dd></div>
            <div><dt>Recommendation</dt><dd data-motion-reason>{{ motion.isEvaluating.value ? 'Evaluating…' : motion.recommendationReason.value }}</dd></div>
        </dl>
        <div class="animation-example__controls">
            <H0Switch v-model="checked" label="Enable notifications" />
            <H0Button tone="primary" @click="open = true">Open motion preview</H0Button>
            <H0Button variant="outline" @click="motion.refreshRecommendation()">Re-evaluate</H0Button>
        </div>
        <div class="animation-example__loading" aria-label="Loading examples">
            <H0Spinner label="Loading preview" />
            <H0Skeleton width="160px" height="24px" />
        </div>
        <H0Modal v-model="open" title="Motion preview" backdrop="blur">
            Controls, focus, Escape, and scroll restoration work at every quality.
        </H0Modal>
    </div>
</template>

<style scoped>
.animation-example { display: grid; gap: var(--h0n-ui-spacing-lg); width: 100%; min-width: 0; }
.animation-example__state { display: grid; gap: var(--h0n-ui-spacing-md); margin: 0; }
.animation-example__state > div { display: grid; gap: var(--h0n-ui-spacing-xs); }
.animation-example__state dt { color: var(--h0n-ui-color-muted); }
.animation-example__state dd { margin: 0; overflow-wrap: anywhere; }
.animation-example__controls, .animation-example__loading { display: flex; flex-wrap: wrap; align-items: center; gap: var(--h0n-ui-spacing-lg); }
</style>
