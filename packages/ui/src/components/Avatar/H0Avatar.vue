<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import H0Skeleton from '../Skeleton/H0Skeleton.vue'
import { toH0CssSize } from '../_shared/utils'
import type { H0AvatarColor, H0AvatarStatus } from './Avatar.types'

defineOptions({
    name: 'H0Avatar'
})

const props = withDefaults(
    defineProps<{
        alt?: string
        cache?: boolean
        color?: H0AvatarColor | null
        fallback?: string | null
        name?: string | null
        radius?: string
        size?: number | string
        src?: string | null
        username?: string | null
    }>(),
    {
        alt: '',
        cache: true,
        color: null,
        fallback: null,
        name: '',
        radius: '50%',
        size: 38,
        src: '',
        username: ''
    }
)

const avatarStatus = ref<H0AvatarStatus>('pending')
const normalizedSrc = computed(() => props.src?.trim() ?? '')
const avatarSize = computed(() => toH0CssSize(props.size))
const avatarStatusKey = computed(() => (normalizedSrc.value ? `h0n-ui.avatar.${encodeURIComponent(normalizedSrc.value)}` : ''))
const isLoading = computed(() => Boolean(normalizedSrc.value) && avatarStatus.value === 'pending')
const avatarUrl = computed(() => (avatarStatus.value === 'loaded' ? normalizedSrc.value : ''))

const initials = computed(() => {
    if (props.fallback?.trim()) {
        return props.fallback.trim().slice(0, 2).toUpperCase()
    }

    const source = props.username?.replace('@', '') || props.name || ''
    const normalized = source.trim()

    if (!normalized) {
        return 'UI'
    }

    const parts = normalized.split(/\s+/).filter(Boolean)

    if (parts.length > 1) {
        return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
    }

    return normalized.slice(0, 2).toUpperCase()
})

const accessibleLabel = computed(() => props.alt || props.name || props.username || 'Avatar')

const avatarColors = ['blue', 'red', 'green', 'purple', 'pink', 'cyan', 'orange'] as const

function getHash(value: string) {
    let hash = 0

    for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i)
        hash |= 0
    }

    return Math.abs(hash)
}

const avatarColorName = computed<H0AvatarColor>(() => {
    if (props.color) {
        return props.color
    }

    const source = props.username || props.name || props.fallback || 'h0n-ui'
    const normalized = source.trim().toLowerCase().replace('@', '')

    const index = getHash(normalized) % avatarColors.length

    return avatarColors[index]
})

const avatarColor = computed(() => `var(--h0n-avatar-${avatarColorName.value})`)

function getCachedStatus(key: string): H0AvatarStatus | null {
    if (!props.cache || typeof sessionStorage === 'undefined') {
        return null
    }

    const value = sessionStorage.getItem(key)

    return value === 'failed' || value === 'loaded' ? value : null
}

function setCachedStatus(key: string, status: H0AvatarStatus) {
    if (!props.cache || typeof sessionStorage === 'undefined') {
        return
    }

    sessionStorage.setItem(key, status)
}

watch(
    normalizedSrc,
    (src) => {
        if (!src || !avatarStatusKey.value) {
            avatarStatus.value = 'failed'
            return
        }

        avatarStatus.value = getCachedStatus(avatarStatusKey.value) ?? 'pending'
    },
    { immediate: true }
)

function setAvatarStatus(status: Exclude<H0AvatarStatus, 'pending'>) {
    avatarStatus.value = status

    if (avatarStatusKey.value) {
        setCachedStatus(avatarStatusKey.value, status)
    }
}
</script>

<template>
    <span
        data-h0n-component="avatar" class="h-avatar"
        :class="[isLoading && 'h-avatar--loading', !avatarUrl && !isLoading && 'h-avatar--fallback']"
        :style="{
            '--h-avatar-size': avatarSize,
            '--h-avatar-color': avatarColor,
            borderRadius: radius
        }"
        role="img"
        :aria-label="accessibleLabel"
    >
        <H0Skeleton v-if="isLoading" circle :radius height="100%" width="100%" />

        <img v-if="isLoading" class="h-avatar__preload" :src="normalizedSrc" alt="" @error="setAvatarStatus('failed')" @load="setAvatarStatus('loaded')" />

        <img v-else-if="avatarUrl" class="h-avatar__image" :src="avatarUrl" :alt="alt" @error="setAvatarStatus('failed')" @load="setAvatarStatus('loaded')" />

        <template v-else>{{ initials }}</template>
    </span>
</template>

<style scoped lang="scss">
.h-avatar {
    align-items: center;
    background: var(--h0n-ui-color-secondary);
    color: var(--h0n-ui-color-text);
    display: inline-flex;
    flex: 0 0 auto;
    font-family: var(--h0n-ui-font-family);
    height: var(--h-avatar-size);
    justify-content: center;
    line-height: 1;
    min-width: 0;
    overflow: hidden;
    position: relative;
    width: var(--h-avatar-size);

    &--fallback {
        background: var(--h-avatar-color, var(--h0n-avatar-blue));
        color: var(--h0n-ui-color-primary-contrast);
        font-size: calc(var(--h-avatar-size) * 0.34);
        font-weight: var(--h0n-ui-font-weight-semibold);
    }

    &--loading {
        border-color: transparent;
    }

    &__image {
        display: block;
        height: 100%;
        object-fit: cover;
        width: 100%;
    }

    &__preload {
        height: 1px;
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 1px;
    }
}
</style>
