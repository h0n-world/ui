<script setup lang="ts">
import { checkIcon, moreHorizontalIcon } from '@h0n/ui/icons'
import { H0Button, H0Drawer, H0Icon } from '@h0n/ui'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import MarkdownContent from '@/components/MarkdownContent.vue'
import SystemSidebar from '@/components/system/SystemSidebar.vue'
import SystemHeader from '@/components/system/SystemHeader.vue'
import { documentationPages, renderDocumentationPage } from '@/content/content'

defineOptions({
    name: 'SystemLayout',
})

const route = useRoute()
const menuOpen = ref(false)
const copied = ref(false)
const activeHeading = ref('')
let observer: IntersectionObserver | undefined
let copyTimer: ReturnType<typeof setTimeout> | undefined

const page = computed(() => renderDocumentationPage(route.path))
const pageIndex = computed(() => documentationPages.findIndex((item) => item.path === route.path))
const previousPage = computed(() =>
    pageIndex.value > 0 ? documentationPages[pageIndex.value - 1] : undefined,
)
const nextPage = computed(() =>
    pageIndex.value >= 0 ? documentationPages[pageIndex.value + 1] : undefined,
)

async function copyMarkdown() {
    if (!page.value) return
    await navigator.clipboard.writeText(page.value.source)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1800)
}

async function handleArticleClick(event: MouseEvent) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-copy-code]')
    if (!button) return

    const code = button.closest('.code-block')?.querySelector('code')?.textContent
    if (!code) return

    await navigator.clipboard.writeText(code)
    button.textContent = 'Copied'
    setTimeout(() => (button.textContent = 'Copy'), 1400)
}

function observeHeadings() {
    observer?.disconnect()
    const headings = [
        ...document.querySelectorAll<HTMLElement>('.markdown-content h2, .markdown-content h3'),
    ]
    activeHeading.value = headings[0]?.id ?? ''

    observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
            if (visible?.target.id) activeHeading.value = visible.target.id
        },
        { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    )
    headings.forEach((heading) => observer?.observe(heading))
}

watch(
    () => route.path,
    async () => {
        menuOpen.value = false
        await nextTick()
        observeHeadings()
        window.scrollTo({ top: 0 })
    },
    { immediate: true },
)

onBeforeUnmount(() => {
    observer?.disconnect()
    if (copyTimer) clearTimeout(copyTimer)
})
</script>

<template>
    <div v-if="page" class="docs-layout">
        <SystemHeader @menu="menuOpen = true" />

        <div class="docs-layout__container">
            <aside class="docs-layout__left" aria-label="Documentation navigation">
                <SystemSidebar :group="page.group" @navigate="menuOpen = false" />
            </aside>

            <main class="docs-layout__main">
                <article class="documentation-article">
                    <div class="article-eyebrow">
                        <span>{{ page.group }}</span>
                        <H0Button
                            size="sm"
                            variant="outline"
                            :icon="copied ? checkIcon : undefined"
                            :button-type="copied ? 'withIcon' : 'default'"
                            @click="copyMarkdown"
                        >
                            {{ copied ? 'Copied' : 'Copy Markdown' }}
                        </H0Button>
                    </div>

                    <h1 class="article-title">{{ page.title }}</h1>
                    <p class="article-description">{{ page.description }}</p>
                    <MarkdownContent
                        :alerts="page.alerts"
                        :html="page.html"
                        :tables="page.tables"
                        @click="handleArticleClick"
                    />

                    <nav class="article-pagination" aria-label="Previous and next pages">
                        <RouterLink v-if="previousPage" :to="previousPage.path">
                            <small>Previous</small>
                            <span>← {{ previousPage.title }}</span>
                        </RouterLink>
                        <span v-else></span>
                        <RouterLink v-if="nextPage" :to="nextPage.path">
                            <small>Next</small>
                            <span>{{ nextPage.title }} →</span>
                        </RouterLink>
                    </nav>
                </article>
            </main>

            <aside class="docs-layout__right" aria-label="On this page">
                <div class="page-outline">
                    <div class="page-outline__title">
                        <H0Icon :icon="moreHorizontalIcon" :size="16" />
                        <span>On this page</span>
                    </div>
                    <nav>
                        <a
                            v-for="item in page.toc"
                            :key="item.id"
                            :href="`#${item.id}`"
                            :class="[
                                item.level === 3 && 'is-nested',
                                activeHeading === item.id && 'is-active',
                            ]"
                            >{{ item.title }}</a
                        >
                    </nav>

                    <H0Card>
                        <template #header>Was this helpful?</template>
                        <template #description>This template is ready for your content.</template>
                    </H0Card>
                </div>
            </aside>
        </div>

        <H0Drawer
            v-model="menuOpen"
            side="right"
            backdrop="blur"
            title="Documentation"
            aria-label="Documentation navigation"
            close-aria-label="Close navigation"
        >
            <SystemSidebar variant="drawer" :group="page.group" @navigate="menuOpen = false" />
        </H0Drawer>
    </div>
</template>

<style scoped lang="scss">
.docs-layout {
    --docs-header-height: 107px;

    color: var(--h0n-ui-color-text);
    min-height: 100vh;

    &__container {
        display: grid;
        grid-template-columns: 252px minmax(0, 1fr) 258px;
        margin: 0 auto;
        max-width: 1440px;
        min-height: calc(100vh - var(--docs-header-height));
        width: 100%;
    }

    &__left,
    &__right {
        align-self: start;
        height: calc(100vh - var(--docs-header-height));
        overflow-y: auto;
        position: sticky;
        top: var(--docs-header-height);
    }

    &__left {
        border-inline-end: 1px solid var(--h0n-ui-color-border);
    }

    &__main {
        min-width: 0;
    }

    &__right {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
    }
}

.documentation-article {
    margin: 0 auto;
    padding: 58px 52px 90px;
}

.article-eyebrow {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    > span {
        color: var(--h0n-ui-color-primary);
        font-size: 0.72rem;
        font-weight: var(--h0n-ui-font-weight-semibold);
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }
}

.article-description {
    color: var(--h0n-ui-color-text-secondary);
    font-size: 1.04rem;
    line-height: 1.7;
    margin: 0 190px 40px 0;
    max-width: 620px;
}

.article-title {
    font-size: clamp(2.4rem, 5vw, 3.75rem);
    letter-spacing: -0.05em;
    line-height: 1.03;
    margin: 16px 190px 16px 0;
}

.markdown-content :deep(> h1:first-child) {
    display: none;
}

.article-pagination {
    border-top: 1px solid var(--h0n-ui-color-border);
    display: grid;
    gap: 18px;
    grid-template-columns: 1fr 1fr;
    margin-top: 64px;
    padding-top: 24px;

    a {
        color: var(--h0n-ui-color-text);
        display: grid;
        gap: 5px;
        text-decoration: none;

        &:last-child {
            text-align: right;
        }

        small {
            color: var(--h0n-ui-color-muted);
            font-size: var(--h0n-ui-typography-body-xs-size);
            text-transform: uppercase;
        }

        span {
            font-size: var(--h0n-ui-typography-body-sm-size);
            font-weight: var(--h0n-ui-font-weight-medium);
        }
    }
}

.page-outline {
    display: grid;
    gap: 14px;
    padding: 38px 28px 38px 22px;

    &__title {
        align-items: center;
        color: var(--h0n-ui-color-text-secondary);
        display: flex;
        font-size: 0.72rem;
        gap: 7px;
    }

    nav {
        border-inline-start: 1px solid var(--h0n-ui-color-border);
        display: grid;
        gap: 3px;
    }

    a {
        color: var(--h0n-ui-color-text-secondary);
        font-size: var(--h0n-ui-typography-body-sm-size);
        line-height: 1.45;
        margin-inline-start: -1px;
        overflow: hidden;
        padding: 5px 0 5px 14px;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.is-nested {
            padding-inline-start: 26px;
        }

        &.is-active {
            border-inline-start: 1px solid var(--h0n-ui-color-primary);
            color: var(--h0n-ui-color-text);
        }
    }
}

@media (max-width: 1260px) {
    .docs-layout__container {
        grid-template-columns: 252px minmax(0, 1fr);
    }

    .docs-layout__right {
        display: none;
    }
}

@media (max-width: 1120px) {
    .docs-layout__container {
        grid-template-columns: minmax(0, 1fr);
    }

    .docs-layout__left {
        display: none;
    }
}

@media (max-width: 720px) {
    .docs-layout {
        --docs-header-height: 105px;
    }

    .documentation-article {
        padding: 36px 20px 70px;
    }

    .article-eyebrow {
        align-items: flex-start;
        gap: 14px;
    }

    .article-description {
        margin: 18px 0 32px;
    }

    .article-title {
        font-size: 2.35rem;
        margin: 18px 0 0;
    }
}
</style>
