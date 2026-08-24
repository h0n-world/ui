<script setup lang="ts">
import { H0Button, H0Command, useH0Theme, type H0CommandItem } from '@h0nio/ui'
import { computed, onMounted, onUnmounted, useTemplateRef } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import IconH0N from '../icons/IconH0N.vue'

import { documentationPages } from '@/content/content'
import { siteConfig } from '@/content/site'

import sidebarIcon from '@h0nio/icons/sidebar-minimalistic-stroke'
import sunIcon from '@h0nio/icons/sun-2'
import sunDarkIcon from '@h0nio/icons/sun-2-stroke'

defineOptions({
    name: 'SystemHeader',
})

const props = defineProps<{ minimal?: boolean }>()
const emit = defineEmits<{ menu: [] }>()

const route = useRoute()
const router = useRouter()
const theme = useH0Theme()
const commandRef = useTemplateRef<{ open: () => void }>('commandRef')
const searchItems: H0CommandItem[] = documentationPages.map((page) => ({
    value: page.path,
    label: page.title,
    description: page.description,
    group: page.group,
}))
const themeLabel = computed(() =>
    theme.resolvedTheme.value === 'dark' ? 'Light theme' : 'Dark theme',
)
const showMenu = computed(() => !props.minimal && route.meta.documentationGroup !== undefined)

function isActive(group: string) {
    return route.meta.documentationGroup === group
}

async function navigate(item: H0CommandItem) {
    await router.push(String(item.value))
}

function handleSearchShortcut(event: KeyboardEvent) {
    const target = event.target
    const isTyping =
        target instanceof Element &&
        target.matches('input, textarea, select, [contenteditable="true"]')
    if (event.key !== '/' || isTyping) return

    event.preventDefault()
    commandRef.value?.open()
}

onMounted(() => window.addEventListener('keydown', handleSearchShortcut))
onUnmounted(() => window.removeEventListener('keydown', handleSearchShortcut))
</script>

<template>
    <header class="site-header" :class="minimal && 'site-header--minimal'">
        <div class="site-header__row">
            <RouterLink class="site-header__brand" to="/" aria-label="H0N Docs home">
                <IconH0N :size="26" />
                <span class="site-header__divider"></span>
                <span>H0N UI</span>
                <span class="site-header__version">{{ siteConfig.version }}</span>
            </RouterLink>

            <div class="site-header__actions">
                <H0Command
                    ref="commandRef"
                    class="header-search"
                    :items="searchItems"
                    variant="surface"
                    backdrop="blur"
                    size="sm"
                    window-size="lg"
                    hotkey="mod+k"
                    trigger-label="Search documentation"
                    placeholder="Search documentation…"
                    empty-text="No documentation pages found."
                    aria-label="Search documentation"
                    :trigger-attrs="{ 'aria-label': 'Search documentation' }"
                    @select="navigate"
                />

                <H0Button
                    class="theme-button"
                    variant="ghost"
                    :icon="theme.resolvedTheme.value === 'dark' ? sunDarkIcon : sunIcon"
                    :aria-label="themeLabel"
                    button-type="withIcon"
                    @click="theme.toggleTheme()"
                >
                    <span> {{ theme.resolvedTheme.value === 'dark' ? 'Light' : 'Dark' }}</span>
                </H0Button>

                <H0Button
                    v-if="showMenu"
                    class="menu-button"
                    size="sm"
                    variant="ghost"
                    button-type="onlyIcon"
                    :icon="sidebarIcon"
                    aria-label="Open navigation"
                    @click="emit('menu')"
                />
            </div>
        </div>

        <div v-if="!minimal" class="site-header__navigation">
            <nav class="site-header__primary" aria-label="Primary navigation">
                <RouterLink
                    v-for="link in siteConfig.headerLinks"
                    :key="link.path"
                    :to="link.path"
                    :class="isActive(link.group) && 'is-active'"
                    >{{ link.label }}</RouterLink
                >
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
.site-header {
    background: color-mix(in srgb, var(--h0n-background) 70%, transparent);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--h0n-ui-color-border);
    inset: 0 0 auto;
    position: sticky;
    z-index: 40;

    &__row {
        align-items: center;
        display: flex;
        gap: 28px;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 1440px;
        min-height: 66px;
        padding: 0 28px;
    }

    &__navigation {
        margin: 0 auto;
        max-width: 1440px;
        overflow-x: auto;
        padding: 0 28px;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__brand {
        align-items: center;
        color: var(--h0n-ui-color-text);
        display: inline-flex;
        font-size: 0.92rem;
        font-weight: var(--h0n-ui-font-weight-semibold);
        gap: 9px;
        text-decoration: none;
        white-space: nowrap;
    }

    &__divider {
        background: var(--h0n-ui-color-border);
        height: 20px;
        width: 1px;
    }

    &__version {
        background: var(--h0n-ui-color-secondary);
        border-radius: var(--h0n-ui-radius-round);
        color: var(--h0n-ui-color-muted);
        font-size: 0.67rem;
        padding: 4px 7px;
    }

    &__primary {
        align-items: stretch;
        display: flex;
        gap: 6px;
        height: 40px;
        min-width: max-content;

        a {
            align-items: center;
            color: var(--h0n-ui-color-text-secondary);
            display: inline-flex;
            font-size: var(--h0n-ui-typography-body-sm-size);
            font-weight: var(--h0n-ui-font-weight-medium);
            padding: 0 10px;
            position: relative;
            text-decoration: none;

            &::after {
                background: var(--h0n-ui-color-primary);
                border-radius: var(--h0n-ui-radius-round);
                bottom: -1px;
                content: '';
                height: 2px;
                inset-inline: 12px;
                opacity: 0;
                position: absolute;
                transform: scaleX(0.6);
                transition: var(--h0n-ui-duration-fast) var(--h0n-ui-easing-standard);
            }

            &:hover,
            &.is-active {
                color: var(--h0n-ui-color-text);
            }

            &.is-active::after {
                opacity: 1;
                transform: scaleX(1);
            }
        }
    }

    &__actions {
        align-items: center;
        display: flex;
        gap: 8px;
    }
}

.header-search {
    :deep(.h-command__trigger) {
        color: var(--h0n-ui-color-muted);
        min-width: 220px;
    }

    :deep(.h-command__trigger > span) {
        flex: 1;
        text-align: start;
    }

    :deep(.h-command__trigger:hover) {
        background: var(--h0n-ui-color-surface-hover);
        color: var(--h0n-ui-color-text);
    }
}

.menu-button {
    display: none;
}

@media (max-width: 1120px) {
    .menu-button {
        display: inline-flex;

        :deep(.h-button__icon) {
            height: 20px;
            width: 20px;
        }
    }
}

@media (max-width: 720px) {
    .site-header__row {
        min-height: 60px;
        padding: 0 16px;
    }

    .site-header__navigation {
        padding: 0 16px;
    }

    .header-search {
        :deep(.h-command__trigger) {
            min-width: 38px;
            padding-inline: 10px;
        }

        :deep(.h-command__trigger > span),
        :deep(.h-command__shortcut) {
            display: none;
        }
    }

    .theme-button :deep(.h-button__content span:last-child),
    .site-header__version,
    .site-header__divider,
    .site-header__brand > span:not(.brand-mark) {
        display: none;
    }
}
</style>
