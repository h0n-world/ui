<script setup lang="ts" generic="Result = unknown">
import { computed, onBeforeUnmount, ref, shallowRef, triggerRef, watch } from 'vue'
import { useH0ControllableState } from '../../composables'
import { defaultH0FileUploadLocale, useH0Locale } from '../../locale'
import type { H0UploadAdapter, H0UploadItem } from '../../types'
import H0Button from '../Button/H0Button.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Label from '../Typography/H0Label.vue'
import { createH0UploadId, validateH0File } from '../_shared/upload'
import { useFormField } from '../_shared/useFormField'
import type { H0FileUploadValidationError, H0FileUploadVariant } from './FileUpload.types'

defineOptions({ name: 'H0FileUpload' })
type QueueItem = H0UploadItem<Result> & { previewUrl?: string }
const props = withDefaults(defineProps<{ modelValue?: File[]; defaultValue?: File[]; multiple?: boolean; accept?: string; maxSize?: number; maxFiles?: number; validator?: (file: File, files: readonly File[]) => string | null | undefined | Promise<string | null | undefined>; upload?: H0UploadAdapter<Result>; autoUpload?: boolean; concurrency?: number; reorderable?: boolean; variant?: H0FileUploadVariant; id?: string; name?: string; label?: string; required?: boolean; disabled?: boolean; error?: string; hint?: string }>(), { modelValue: undefined, defaultValue: () => [], multiple: false, accept: '', maxSize: undefined, maxFiles: undefined, validator: undefined, upload: undefined, autoUpload: false, concurrency: 3, reorderable: false, variant: 'surface', id: '', name: '', label: '', required: false, disabled: false, error: '', hint: '' })
const emit = defineEmits<{ 'update:modelValue': [files: File[]]; change: [files: File[]]; add: [files: File[]]; remove: [file: File]; clear: []; invalid: [error: H0FileUploadValidationError]; 'upload-start': [item: H0UploadItem<Result>]; progress: [item: H0UploadItem<Result>]; success: [item: H0UploadItem<Result>]; error: [item: H0UploadItem<Result>]; cancel: [item: H0UploadItem<Result>]; reorder: [files: File[]]; focus: [event: FocusEvent]; blur: [event: FocusEvent] }>()
const input = ref<HTMLInputElement>()
const dragging = ref(false)
const queue = shallowRef<QueueItem[]>([])
const controllers = new Map<string, AbortController>()
const uploadWaiters = new Set<() => void>()
let counter = 0
let active = 0
const localeService = useH0Locale()
const text = computed(() => localeService.locale.value.fileUpload ?? defaultH0FileUploadLocale)
const state = useH0ControllableState<File[]>({ modelValue: () => props.modelValue, defaultValue: () => [...props.defaultValue], onUpdate: (value) => emit('update:modelValue', value) })
const localError = ref('')
const { controlId, fieldContext, hasMessage, messageId, resolvedDisabled, resolvedHint, resolvedLabel, resolvedName, resolvedRequired, setFormValue, visibleError } = useFormField({ id: () => props.id, name: () => props.name, label: () => props.label, required: () => props.required, disabled: () => props.disabled, error: () => props.error || localError.value, hint: () => props.hint, idPrefix: 'h-file-upload', getValue: () => state.value.value, getValidationMessage: () => localError.value || input.value?.validationMessage || '', focus: () => input.value?.focus(), reset: () => { cleanup(); queue.value = []; if (input.value) input.value.value = ''; return state.reset() } })
function syncQueue(files: readonly File[]) { const ids = new Set(files); for (const item of queue.value) if (!ids.has(item.file)) disposeItem(item); const previous = new Map(queue.value.map((item) => [item.file, item])); queue.value = files.map((file) => previous.get(file) ?? { id: createH0UploadId(file, ++counter), file, status: 'idle', progress: 0, previewUrl: file.type.startsWith('image/') && typeof URL !== 'undefined' ? URL.createObjectURL(file) : undefined }) }
watch(state.value, (files) => syncQueue(files), { immediate: true })
function disposeItem(item: QueueItem) { controllers.get(item.id)?.abort(); controllers.delete(item.id); if (item.previewUrl && typeof URL !== 'undefined') URL.revokeObjectURL(item.previewUrl) }
function resolveUploadWaiters() { uploadWaiters.forEach((resolve) => resolve()); uploadWaiters.clear() }
function settleUploadWaiters() { if (!active && !queue.value.some((item) => item.status === 'idle' || item.status === 'uploading')) resolveUploadWaiters() }
function cleanup() { queue.value.forEach(disposeItem); controllers.clear(); active = 0; resolveUploadWaiters() }
function commit(files: File[]) { state.setValue(files); setFormValue(files); emit('change', files) }
async function addFiles(incoming: readonly File[]) { const accepted: File[] = []; const base = props.multiple ? [...state.value.value] : []; for (const file of incoming) { if (props.maxFiles != null && base.length + accepted.length >= props.maxFiles) { emit('invalid', { code: 'count', message: text.value.invalid, file }); break } const code = validateH0File(file, { accept: props.accept, maxSize: props.maxSize }); const custom = !code ? await props.validator?.(file, [...base, ...accepted]) : null; if (code || custom) { const issue = { code: code ?? 'custom', message: custom || text.value.invalid, file } as H0FileUploadValidationError; localError.value = issue.message; emit('invalid', issue); continue } accepted.push(file); if (!props.multiple) break } if (!accepted.length) return; localError.value = ''; const next = props.multiple ? [...base, ...accepted] : accepted; commit(next); emit('add', accepted); if (props.autoUpload) queueMicrotask(() => void start()) }
function onInput(event: Event) { void addFiles(Array.from((event.target as HTMLInputElement).files ?? [])); (event.target as HTMLInputElement).value = '' }
function remove(target: File | string) { const item = typeof target === 'string' ? queue.value.find((entry) => entry.id === target) : queue.value.find((entry) => entry.file === target); if (!item) return; disposeItem(item); const next = state.value.value.filter((file) => file !== item.file); commit(next); emit('remove', item.file) }
function clear() { cleanup(); queue.value = []; commit([]); emit('clear'); settleUploadWaiters() }
async function run(item: QueueItem) { if (!props.upload || item.status === 'uploading') return; const controller = new AbortController(); controllers.set(item.id, controller); item.status = 'uploading'; item.progress = 0; active += 1; triggerRef(queue); emit('upload-start', item); try { item.result = await props.upload(item.file, { signal: controller.signal, onProgress: (progress) => { item.progress = Math.max(0, Math.min(100, progress)); triggerRef(queue); emit('progress', item) } }); item.progress = 100; item.status = 'success'; triggerRef(queue); emit('success', item) } catch (error) { if (controller.signal.aborted) { item.status = 'cancelled'; triggerRef(queue); emit('cancel', item) } else { item.status = 'error'; item.error = error instanceof Error ? error.message : String(error); triggerRef(queue); emit('error', item) } } finally { controllers.delete(item.id); active = Math.max(0, active - 1); pump(); settleUploadWaiters() } }
function pump() { if (!props.upload) return; const capacity = Math.max(1, props.concurrency) - active; queue.value.filter((item) => item.status === 'idle').slice(0, capacity).forEach((item) => void run(item)) }
function start(target?: string): Promise<void> { if (!props.upload) return Promise.resolve(); if (target) { const item = queue.value.find((entry) => entry.id === target); if (item && item.status !== 'uploading') { item.status = 'idle'; triggerRef(queue) } } pump(); if (!active && !queue.value.some((item) => item.status === 'idle')) return Promise.resolve(); return new Promise((resolve) => uploadWaiters.add(resolve)) }
function retry(id: string) { const item = queue.value.find((entry) => entry.id === id); if (!item) return; item.status = 'idle'; item.error = undefined; triggerRef(queue); void start(id) }
function cancel(id: string) { controllers.get(id)?.abort() }
function reorder(from: number, to: number) { if (!props.reorderable || from === to || from < 0 || to < 0 || from >= queue.value.length || to >= queue.value.length) return; const next = [...state.value.value]; const [file] = next.splice(from, 1); next.splice(to, 0, file); commit(next); emit('reorder', next) }
function open() { if (!resolvedDisabled.value) input.value?.click() }
defineExpose({ cancel, clear, open, queue, remove, reorder, retry, start })
onBeforeUnmount(cleanup)
</script>

<template>
    <div data-h0n-component="file-upload" class="h-file-upload" :class="`h-file-upload--${variant}`">
        <H0Label v-if="!fieldContext && resolvedLabel" :for="controlId" :required="resolvedRequired">{{ resolvedLabel }}</H0Label>
        <button class="h-file-upload__drop" type="button" :disabled="resolvedDisabled" :class="{ 'is-dragging': dragging }" @click="open" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="dragging = false; addFiles(Array.from($event.dataTransfer?.files ?? []))">
            <slot name="drop" :open="open">{{ text.drop }}</slot>
        </button>
        <input
            ref="input"
            :id="controlId"
            class="h-file-upload__input"
            type="file"
            :name="resolvedName || undefined"
            :accept="accept || undefined"
            :multiple="multiple"
            :required="resolvedRequired && !state.value.value.length"
            :disabled="resolvedDisabled"
            @change="onInput"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
        />
        <ul v-if="queue.length" class="h-file-upload__list">
            <li v-for="(item, index) in queue" :key="item.id">
                <slot name="item" :item="item" :index="index" :remove="remove" :retry="retry" :cancel="cancel">
                    <span>{{ item.file.name }}</span>
                    <progress v-if="item.status === 'uploading'" :value="item.progress" max="100" />
                    <span v-if="item.error">{{ item.error }}</span>
                    <H0Button v-if="item.status === 'error'" size="sm" variant="outline" :disabled="resolvedDisabled" @click="retry(item.id)">{{ text.retry }}</H0Button>
                    <H0Button v-if="item.status === 'uploading'" size="sm" variant="ghost" :disabled="resolvedDisabled" @click="cancel(item.id)">{{ text.cancel }}</H0Button>
                    <H0Button size="sm" tone="danger" variant="soft" :disabled="resolvedDisabled" @click="remove(item.id)">{{ text.remove }}</H0Button>
                </slot>
            </li>
        </ul>
        <div v-if="queue.length" class="h-file-upload__actions">
            <H0Button v-if="upload && queue.some((item) => item.status === 'idle')" size="sm" :disabled="resolvedDisabled" @click="start()">{{ text.start }}</H0Button>
            <H0Button size="sm" variant="ghost" :disabled="resolvedDisabled" @click="clear">{{ text.clear }}</H0Button>
        </div>
        <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId">{{ visibleError }}</H0ErrorMessage>
        <H0Description v-else-if="!fieldContext && resolvedHint" :id="messageId">{{ resolvedHint }}</H0Description>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as mixins;

.h-file-upload {
    @include mixins.h0n-input-root;

    --h-file-upload-drop-hover: var(--h0n-ui-color-surface-hover);

    &--surface {
        @include mixins.h0n-input-variant('surface');
    }

    &--secondary {
        @include mixins.h0n-input-variant('secondary');

        --h-file-upload-drop-hover: var(--h0n-ui-color-secondary-hover);
    }

    &__drop {
        background: var(--h0n-input-control-background);
        border: 1px dashed var(--h0n-ui-color-border);
        border-radius: var(--h0n-ui-radius-lg);
        color: inherit;
        cursor: pointer;
        min-block-size: 7rem;
        padding: var(--h0n-ui-spacing-lg);
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            border-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);

        &.is-dragging {
            background: var(--h-file-upload-drop-hover);
            border-color: var(--h0n-ui-color-primary);
        }
    }

    &__input {
        block-size: 1px;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        inline-size: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
    }

    &__list {
        display: grid;
        gap: var(--h0n-ui-spacing-xs);
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            align-items: center;
            border: 1px solid var(--h0n-ui-color-border);
            border-radius: var(--h0n-ui-radius-md);
            display: flex;
            flex-wrap: wrap;
            gap: var(--h0n-ui-spacing-sm);
            padding: var(--h0n-ui-spacing-sm);
        }

        li > span:first-child {
            flex: 1;
            min-inline-size: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--h0n-ui-spacing-sm);
    }
}
</style>
