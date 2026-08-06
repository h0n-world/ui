<script setup lang="ts">
import type { H0ImageStatus } from '@h0nio/ui'
import { H0Button, H0Image } from '@h0nio/ui'
import { ref } from 'vue'

const successfulImage = `https://th.bing.com/th/id/R.20ebe42d85d819696194c2ff332b81cb?rik=fM7nn7YZkEX92A&pid=ImgRaw&r=0`
const source = ref<string | null>(null)
const history = ref<H0ImageStatus[]>([])
const nativeEvent = ref('none')
const request = ref(0)

function loadSuccessfulImage() {
    request.value += 1
    history.value = []
    nativeEvent.value = 'none'
    source.value = `${successfulImage}#request-${request.value}`
}

function loadMissingImage() {
    request.value += 1
    history.value = []
    nativeEvent.value = 'none'
    source.value = `/missing-lifecycle-image-${request.value}.png`
}

function recordStatus(status: H0ImageStatus) {
    history.value.push(status)
}
</script>

<template>
    <div class="lifecycle-example">
        <H0Image
            :src="source"
            alt="Image lifecycle preview"
            :lazy="false"
            @status-change="recordStatus"
            @load="nativeEvent = 'load'"
            @error="nativeEvent = 'error'"
        />
        <div class="lifecycle-example__actions">
            <H0Button size="sm" @click="loadSuccessfulImage">Load image</H0Button>
            <H0Button size="sm" variant="soft" @click="loadMissingImage"
                >Load missing image</H0Button
            >
        </div>
        <output aria-live="polite"
            >Statuses: {{ history.join(' → ') || 'none' }} · Native event: {{ nativeEvent }}</output
        >
    </div>
</template>

<style scoped>
.lifecycle-example {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    max-width: 36rem;
    width: 100%;
}

.lifecycle-example__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--h0n-ui-spacing-sm);
}

.lifecycle-example output {
    color: var(--h0n-ui-color-muted);
    font-size: var(--h0n-ui-typography-body-sm-size);
}
</style>
