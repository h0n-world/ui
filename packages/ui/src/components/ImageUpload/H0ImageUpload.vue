<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useH0ControllableState } from '../../composables/useH0ControllableState'
import { plusIcon, trashIcon } from '../../icons'
import { useH0Locale } from '../../locale'
import H0Icon from '../Icon/H0Icon.vue'
import H0Image from '../Image/H0Image.vue'
import H0Spinner from '../Spinner/H0Spinner.vue'
import H0Description from '../Typography/H0Description.vue'
import H0ErrorMessage from '../Typography/H0ErrorMessage.vue'
import H0Typography from '../Typography/H0Typography.vue'
import { matchesH0FileAccept } from '../_shared/upload'
import { useFormField } from '../_shared/useFormField'
import { toH0CssSize, useH0ObjectUrl } from '../_shared/utils'
import type { H0ImageUploadError, H0ImageUploadFit, H0ImageUploadPreset } from './ImageUpload.types'

defineOptions({
    name: 'H0ImageUpload'
})

const presetSizes: Record<Exclude<H0ImageUploadPreset, 'custom'>, { width: string; height: string; radius: string }> = {
    avatar: { width: '128px', height: '128px', radius: '50%' },
    banner: { width: '100%', height: '220px', radius: 'var(--h0n-ui-radius-xl)' },
    square: { width: '220px', height: '220px', radius: 'var(--h0n-ui-radius-xl)' },
    vertical: { width: '240px', height: '360px', radius: 'var(--h0n-ui-radius-xl)' }
}

const props = withDefaults(
    defineProps<{
        modelValue?: File | null
        src?: string
        accept?: string
        maxSize?: number
        preset?: H0ImageUploadPreset
        width?: number | string
        height?: number | string
        radius?: string
        fit?: H0ImageUploadFit
        disabled?: boolean
        loading?: boolean
        label?: string
        hint?: string
        dropLabel?: string
        browseLabel?: string
        removeLabel?: string
        loadingLabel?: string
        invalidFormatMessage?: string
        invalidSizeMessage?: string
        id?: string
        name?: string
        required?: boolean
        error?: string
        defaultValue?: File | null
    }>(),
    {
        src: '',
        accept: 'image/png,image/jpeg,image/webp',
        maxSize: 5 * 1024 * 1024,
        preset: 'banner',
        width: undefined,
        height: undefined,
        radius: undefined,
        fit: 'cover',
        disabled: false,
        loading: false,
        label: '',
        hint: '',
        dropLabel: 'Drop image here',
        browseLabel: 'Click to choose',
        removeLabel: '',
        loadingLabel: '',
        invalidFormatMessage: '',
        invalidSizeMessage: '',
        id: '',
        name: '',
        required: false,
        error: '',
        defaultValue: null
    }
)

const emit = defineEmits<{
    'update:modelValue': [file: File | null]
    'update:src': [src: string]
    change: [file: File]
    drop: [file: File]
    invalid: [error: H0ImageUploadError]
    remove: []
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement>()
const objectUrl = ref('')
const objectUrlLifecycle = useH0ObjectUrl()
const { locale } = useH0Locale()
const state = useH0ControllableState<File | null>({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue, onUpdate: (value) => emit('update:modelValue', value) })
const resolvedLabel = computed(() => props.label || locale.value.imageUpload.label)
const resolvedRemoveLabel = computed(() => props.removeLabel || locale.value.imageUpload.remove)
const resolvedLoadingLabel = computed(() => props.loadingLabel || locale.value.common.loading)
const isDragging = ref(false)
const errorMessage = ref('')
const {
    controlId,
    fieldContext,
    hasMessage,
    messageId,
    resolvedDisabled: fieldDisabled,
    resolvedHint: fieldHint,
    resolvedName: fieldName,
    resolvedRequired: fieldRequired,
    setFormValue,
    visibleError
} = useFormField({
    id: () => props.id,
    name: () => props.name,
    label: () => resolvedLabel.value,
    required: () => props.required,
    disabled: () => props.disabled,
    error: () => props.error || errorMessage.value,
    hint: () => props.hint,
    idPrefix: 'h-image-upload',
    getValue: () => state.value.value,
    getValidationMessage: () => errorMessage.value || inputRef.value?.validationMessage || '',
    focus: () => inputRef.value?.focus(),
    reset: () => {
        objectUrlLifecycle.revoke()
        objectUrl.value = ''
        resetInput()
        state.reset()
        emit('update:src', '')
        return props.defaultValue
    }
})

const presetSize = computed(() => (props.preset === 'custom' ? undefined : presetSizes[props.preset]))
const resolvedWidth = computed(() => toH0CssSize(props.width) ?? presetSize.value?.width ?? '100%')
const resolvedHeight = computed(() => toH0CssSize(props.height) ?? presetSize.value?.height ?? '220px')
const resolvedRadius = computed(() => props.radius ?? presetSize.value?.radius ?? 'var(--h0n-ui-radius-xl)')
const previewSrc = computed(() => objectUrl.value || props.src)
const hasPreview = computed(() => Boolean(previewSrc.value))
const acceptedFormats = computed(() =>
    props.accept
        .split(',')
        .map((format) => format.trim())
        .filter(Boolean)
)
const maxSizeLabel = computed(() => formatBytes(props.maxSize))
const detailsText = computed(() => `${acceptedFormats.value.map(formatAcceptedFormat).join(', ')} · Max ${maxSizeLabel.value}`)
const detailsId = computed(() => `${controlId.value}-details`)
const describedBy = computed(() => [detailsId.value, hasMessage.value ? messageId.value : ''].filter(Boolean).join(' '))

const rootStyle = computed(() => ({
    '--h-image-upload-width': resolvedWidth.value,
    '--h-image-upload-height': resolvedHeight.value,
    '--h-image-upload-radius': resolvedRadius.value
}))

function formatBytes(value: number) {
    if (value >= 1024 * 1024) {
        return `${Number((value / 1024 / 1024).toFixed(1))} MB`
    }

    if (value >= 1024) {
        return `${Math.round(value / 1024)} KB`
    }

    return `${value} B`
}

function formatAcceptedFormat(value: string) {
    const normalized = value.toLowerCase()
    const knownFormats: Record<string, string> = {
        'image/jpeg': 'JPEG',
        'image/jpg': 'JPG',
        'image/png': 'PNG',
        'image/webp': 'WebP',
        'image/gif': 'GIF',
        'image/avif': 'AVIF',
        'image/svg+xml': 'SVG'
    }

    if (knownFormats[normalized]) {
        return knownFormats[normalized]
    }

    if (normalized.startsWith('.')) {
        return normalized.slice(1).toUpperCase()
    }

    return value
}

function revokeObjectUrl() {
    objectUrlLifecycle.revoke()
    objectUrl.value = ''
}

function setFilePreview(file: File | null) {
    revokeObjectUrl()

    if (file) {
        objectUrl.value = objectUrlLifecycle.create(file)
    }
}

function openFileDialog() {
    if (props.disabled || props.loading) {
        return
    }

    inputRef.value?.click()
}

function validateFile(file: File | undefined): file is File {
    if (!file) {
        setError({ code: 'empty', message: 'No image selected.' })
        return false
    }

    if (!matchesAccept(file)) {
        setError({ code: 'format', message: props.invalidFormatMessage || locale.value.imageUpload.invalidType, file })
        return false
    }

    if (file.size > props.maxSize) {
        setError({ code: 'size', message: props.invalidSizeMessage || locale.value.imageUpload.maxSize(props.maxSize), file })
        return false
    }

    errorMessage.value = ''
    return true
}

function matchesAccept(file: File) {
    return matchesH0FileAccept(file, props.accept)
}

function setError(error: H0ImageUploadError) {
    errorMessage.value = error.message
    emit('invalid', error)
}

function selectFile(file: File | undefined, source: 'input' | 'drop') {
    if (!validateFile(file)) {
        resetInput()
        return
    }

    setFilePreview(file)
    state.setValue(file)
    emit('update:src', '')
    emit('change', file)
    setFormValue(file)

    if (source === 'drop') {
        emit('drop', file)
    }
}

function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    selectFile(target.files?.[0], 'input')
}

function handleDragEnter(event: DragEvent) {
    if (props.disabled || props.loading) {
        return
    }

    event.preventDefault()
    isDragging.value = true
}

function handleDragOver(event: DragEvent) {
    if (props.disabled || props.loading) {
        return
    }

    event.preventDefault()
}

function handleDragLeave(event: DragEvent) {
    if (event.currentTarget === event.target) {
        isDragging.value = false
    }
}

function handleDrop(event: DragEvent) {
    if (props.disabled || props.loading) {
        return
    }

    event.preventDefault()
    isDragging.value = false
    selectFile(event.dataTransfer?.files[0], 'drop')
}

function removeImage(event?: MouseEvent) {
    event?.stopPropagation()
    revokeObjectUrl()
    resetInput()
    errorMessage.value = ''
    state.setValue(null)
    emit('update:src', '')
    emit('remove')
    setFormValue(null)
}

function resetInput() {
    if (inputRef.value) {
        inputRef.value.value = ''
    }
}

watch(
    () => state.value.value,
    (file) => {
        setFilePreview(file ?? null)
    },
    { immediate: true }
)
</script>

<template>
    <div
        data-h0n-component="image-upload"
        class="h-image-upload"
        :class="[
            `h-image-upload--${preset}`,
            hasPreview && 'h-image-upload--has-preview',
            isDragging && 'h-image-upload--dragging',
            disabled && 'h-image-upload--disabled',
            loading && 'h-image-upload--loading',
            visibleError && 'h-image-upload--error'
        ]"
        :style="rootStyle"
    >
        <input
            :id="controlId"
            ref="inputRef"
            class="h-image-upload__input"
            type="file"
            :name="fieldName || undefined"
            :accept="accept"
            :required="fieldRequired"
            :disabled="fieldDisabled || loading"
            :aria-invalid="Boolean(visibleError)"
            :aria-label="resolvedLabel"
            :aria-describedby="describedBy"
            @blur="emit('blur', $event)"
            @change="handleInputChange"
            @focus="emit('focus', $event)"
        />

        <button
            class="h-image-upload__surface"
            type="button"
            :disabled="fieldDisabled || loading"
            :aria-label="resolvedLabel"
            :aria-busy="loading || undefined"
            :aria-describedby="describedBy"
            @click="openFileDialog"
            @dragenter="handleDragEnter"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
        >
            <H0Image
                v-if="hasPreview"
                class="h-image-upload__preview"
                :src="previewSrc"
                :alt="resolvedLabel"
                :width="resolvedWidth"
                :height="resolvedHeight"
                :radius="resolvedRadius"
                :fit="fit"
                loading="eager"
            />

            <span v-else class="h-image-upload__empty">
                <span class="h-image-upload__icon" aria-hidden="true">
                    <H0Icon :icon="plusIcon" :size="24" />
                </span>
                <span class="h-image-upload__copy">
                    <H0Typography class="h-image-upload__title" as="span" variant="body" :weight="600">{{ dropLabel }}</H0Typography>
                    <H0Description class="h-image-upload__text" as="span">{{ browseLabel }}</H0Description>
                </span>
            </span>

            <span v-if="loading" class="h-image-upload__overlay">
                <H0Spinner size="24px" :label="resolvedLoadingLabel" />
            </span>
        </button>

        <button v-if="hasPreview && !loading && !fieldDisabled" class="h-image-upload__remove" type="button" :aria-label="resolvedRemoveLabel" :title="resolvedRemoveLabel" @click="removeImage">
            <H0Icon :icon="trashIcon" :size="16" />
        </button>

        <span class="h-image-upload__supporting">
            <H0Description :id="detailsId" class="h-image-upload__details" as="span" variant="body-xs">{{ detailsText }}</H0Description>
            <H0ErrorMessage v-if="!fieldContext && visibleError" :id="messageId" class="h-image-upload__error" role="alert">{{ visibleError }}</H0ErrorMessage>
            <H0Description v-else-if="!fieldContext && fieldHint" :id="messageId" class="h-image-upload__hint" as="span">{{ fieldHint }}</H0Description>
        </span>
    </div>
</template>

<style scoped lang="scss">
.h-image-upload {
    color: var(--h0n-ui-color-text);
    display: inline-grid;
    font-family: var(--h0n-ui-font-family);
    gap: var(--h0n-ui-spacing-md);
    max-width: 100%;
    min-width: 0;
    position: relative;
    width: min(100%, max(var(--h-image-upload-width), 220px));

    &__surface {
        align-items: center;
        background: color-mix(in srgb, var(--h0n-ui-color-secondary) 88%, transparent);
        border: 1px dashed color-mix(in srgb, var(--h0n-ui-color-muted) 45%, transparent);
        border-radius: var(--h-image-upload-radius);
        color: inherit;
        container-name: h-image-upload-surface;
        container-type: inline-size;
        cursor: pointer;
        display: grid;
        font: inherit;
        height: var(--h-image-upload-height);
        justify-items: center;
        min-height: 80px;
        min-width: 0;
        overflow: hidden;
        padding: 0;
        position: relative;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            border-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        justify-self: center;
        width: min(100%, var(--h-image-upload-width));
    }

    &__surface:hover:not(:disabled),
    &--dragging &__surface {
        background: color-mix(in srgb, var(--h0n-ui-color-primary) 10%, var(--h0n-ui-color-secondary));
        border-color: color-mix(in srgb, var(--h0n-ui-color-primary) 62%, transparent);
    }

    &__surface:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &__surface:disabled {
        cursor: not-allowed;
    }

    &__input {
        height: 1px;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        width: 1px;
    }

    &__preview {
        height: 100%;
        width: 100%;
    }

    &__empty {
        align-items: center;
        display: grid;
        gap: 14px;
        justify-items: center;
        max-width: min(320px, 100%);
        min-width: 0;
        padding: 18px;
        text-align: center;
    }

    &__icon {
        align-items: center;
        background: color-mix(in srgb, var(--h0n-ui-color-primary) 14%, transparent);
        border-radius: var(--h0n-ui-radius-round);
        color: var(--h0n-ui-color-primary);
        display: inline-flex;
        height: 46px;
        justify-content: center;
        width: 46px;
    }

    &__copy {
        display: grid;
        gap: 5px;
        min-width: 0;
    }

    &__title {
        line-height: 1.25;
    }

    &__text {
        line-height: 1.35;
    }

    &__details {
        color: var(--h0n-ui-color-muted);
        line-height: 1.35;
        min-width: 0;
        text-align: center;
    }

    &__supporting {
        display: grid;
        gap: 4px;
        justify-items: center;
        min-width: 0;
        text-align: center;
        width: 100%;
    }

    &__hint,
    &__error {
        max-width: 100%;
        text-align: center;
    }

    &__overlay {
        align-items: center;
        background: var(--h0n-ui-color-secondary);
        color: var(--h0n-ui-color-text);
        display: grid;
        inset: 0;
        place-items: center;
        line-height: 1.2;
        position: absolute;
        z-index: 2;
    }

    &--has-preview &__overlay {
        background: color-mix(in srgb, var(--h0n-ui-color-secondary) 72%, transparent);
    }

    &__remove {
        align-items: center;
        background: var(--h0n-ui-button-danger-soft);
        border: 0;
        border-radius: var(--h0n-ui-radius-round);
        color: var(--h0n-ui-button-danger-soft-contrast);
        cursor: pointer;
        display: inline-flex;
        height: 34px;
        justify-content: center;
        position: absolute;
        inset-block-start: 10px;
        inset-inline-end: 10px;
        transition:
            background-color var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            box-shadow var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard),
            transform var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
        width: 34px;
        z-index: 3;
    }

    &__remove:hover {
        background: var(--h0n-ui-button-danger-soft-hover);
    }

    &__remove:focus-visible {
        box-shadow: var(--h0n-ui-focus-ring);
        outline: none;
    }

    &__remove:active {
        transform: translateY(1px);
    }

    &__error {
        margin: 0;
    }

    &--error &__surface {
        border-color: color-mix(in srgb, var(--h0n-ui-color-danger) 72%, transparent);
    }

    &--disabled {
        opacity: 0.58;
    }

    &--avatar &__empty {
        padding: 0;
    }

    &--avatar &__copy {
        display: none;
    }
}

@container h-image-upload-surface (max-width: 179px) {
    .h-image-upload__empty {
        padding: 10px;
    }

    .h-image-upload__copy {
        display: none;
    }
}
</style>
