<script setup lang="ts">
import { H0FileUpload, type H0UploadAdapter, type H0UploadItem } from '@h0nio/ui'
import { ref } from 'vue'

const status = ref('Select files, then use the built-in Upload files action.')
const adapter: H0UploadAdapter<{ id: string }> = async (file, { signal, onProgress }) => {
    onProgress(35)
    await new Promise<void>((resolve, reject) => {
        const timer = window.setTimeout(resolve, 500)
        signal.addEventListener('abort', () => {
            window.clearTimeout(timer)
            reject(new DOMException('Upload cancelled', 'AbortError'))
        })
    })
    onProgress(100)
    return { id: file.name }
}

function onUploadStart(item: H0UploadItem) {
    status.value = `Uploading ${item.file.name}…`
}

function onSuccess(item: H0UploadItem) {
    status.value = `${item.file.name} uploaded.`
}
</script>

<template>
    <div class="stack">
        <H0FileUpload multiple :upload="adapter" :concurrency="2" reorderable label="Release assets" hint="Select files, then start the queue manually." @upload-start="onUploadStart" @success="onSuccess" />
        <output aria-live="polite">{{ status }}</output>
    </div>
</template>

<style scoped>
.stack {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    width: min(38rem, 100%);
}
output {
    color: var(--h0n-ui-color-muted);
}
</style>
