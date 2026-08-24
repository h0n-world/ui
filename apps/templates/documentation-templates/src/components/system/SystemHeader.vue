<script setup lang="ts">
import { H0Button, H0Icon, useH0Theme } from '@h0n/ui'
import { searchIcon, settingsIcon, type H0IconDefinition } from '@h0n/ui/icons'
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SearchPalette from '@/components/SearchPalette.vue'

import IconH0N from '../icons/IconH0N.vue'

import { siteConfig } from '@/content/site'

defineOptions({
    name: 'SystemHeader',
})

const props = defineProps<{ minimal?: boolean }>()
const emit = defineEmits<{ menu: [] }>()

const route = useRoute()
const theme = useH0Theme()
const searchOpen = ref(false)
const themeLabel = computed(() =>
    theme.resolvedTheme.value === 'dark' ? 'Light theme' : 'Dark theme',
)
const showMenu = computed(() => !props.minimal && route.meta.documentationGroup !== undefined)
const navigationIcon = {
    name: 'sidebar-navigation',
    nodes: [
        ['path', { d: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z' }],
        ['line', { x1: 9, y1: 3, x2: 9, y2: 21 }],
    ],
} as const satisfies H0IconDefinition

function isActive(group: string) {
    return route.meta.documentationGroup === group
}
</script>

<template>
    <header class="site-header" :class="minimal && 'site-header--minimal'">
        <div class="site-header__row">
            <RouterLink class="site-header__brand" to="/" aria-label="H0N Docs home">
                <IconH0N :size="26" />
                <span class="site-header__divider"></span>
                <span>Docs</span>
                <span class="site-header__version">{{ siteConfig.version }}</span>
            </RouterLink>

            <div class="site-header__actions">
                <button
                    class="header-search"
                    type="button"
                    aria-label="Search documentation"
                    @click="searchOpen = true"
                >
                    <H0Icon :icon="searchIcon" :size="20" />
                    <span>Search documentation</span>
                    <kbd>Ctrl K</kbd>
                </button>

                <H0Button
                    class="theme-button"
                    size="sm"
                    variant="ghost"
                    :icon="settingsIcon"
                    button-type="withIcon"
                    :aria-label="themeLabel"
                    @click="theme.toggleTheme()"
                >
                    <span>{{ theme.resolvedTheme.value === 'dark' ? 'Light' : 'Dark' }}</span>
                </H0Button>

                <H0Button
                    v-if="showMenu"
                    class="menu-button"
                    size="sm"
                    variant="ghost"
                    button-type="onlyIcon"
                    :icon="navigationIcon"
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

    <SearchPalette v-model:open="searchOpen" />
</template>

<style scoped lang="scss">
.site-header {
    background: var(--h0n-background);
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
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-lg);
    color: var(--h0n-ui-color-muted);
    cursor: pointer;
    display: flex;
    font: inherit;
    font-size: 0.75rem;
    gap: 8px;
    height: 38px;
    min-width: 220px;
    padding: 0 8px 0 11px;

    span {
        flex: 1;
        text-align: left;
    }

    &:hover {
        background: var(--h0n-ui-color-surface-hover);
        color: var(--h0n-ui-color-text);
    }
}

kbd {
    background: var(--h0n-ui-color-secondary);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: 6px;
    color: var(--h0n-ui-color-muted);
    font: 500 0.62rem/1 var(--h0n-ui-font-family);
    padding: 5px 6px;
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
        min-width: 38px;
        width: 38px;

        span,
        kbd {
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
