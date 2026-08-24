<script setup lang="ts">
import { H0Badge, H0Button, H0Card, H0Icon, H0Typography } from '@h0n/ui'
import { arrowRightIcon, checkIcon, searchIcon, settingsIcon } from '@h0n/ui/icons'
import { RouterLink } from 'vue-router'

import IconH0N from '@/components/icons/IconH0N.vue'
import SystemHeader from '@/components/system/SystemHeader.vue'
</script>

<template>
    <div class="home-page">
        <SystemHeader />

        <main>
            <section class="hero-section">
                <div class="hero-section__glow"></div>
                <H0Badge class="hero-section__badge" tone="primary" dot
                    >Documentation template · v0.1</H0Badge
                >

                <h1>Give your knowledge<br /><span>a place to breathe.</span></h1>
                <p>
                    A universal, Markdown-first documentation foundation — structured for readers,
                    comfortable for writers, and beautifully composed with H0N UI.
                </p>

                <div class="hero-section__actions">
                    <H0Button :as="RouterLink" to="/docs/introduction" tone="primary" size="lg"
                        >Start reading</H0Button
                    >
                    <H0Button :as="RouterLink" to="/docs/quick-start" variant="outline" size="lg"
                        >Build your docs</H0Button
                    >
                </div>

                <div class="hero-section__meta">
                    <span><H0Icon :icon="checkIcon" :size="14" /> Markdown native</span>
                    <span><H0Icon :icon="checkIcon" :size="14" /> Responsive layouts</span>
                    <span><H0Icon :icon="checkIcon" :size="14" /> Theme ready</span>
                </div>
            </section>

            <section class="product-preview" aria-label="Documentation layout preview">
                <div class="preview-window">
                    <header class="preview-window__header">
                        <IconH0N :size="26" />
                        <div class="preview-window__tabs">
                            <span class="is-active">Guides</span><span>Components</span
                            ><span>Releases</span>
                        </div>
                        <div class="preview-window__search">
                            <H0Icon :icon="searchIcon" :size="20" /> Search
                        </div>
                    </header>
                    <div class="preview-window__body">
                        <aside class="preview-nav">
                            <small>Overview</small>
                            <span class="is-active">Introduction</span>
                            <span>Quick start</span>
                            <span>Design principles</span>
                            <small>Foundations</small>
                            <span>Colors</span>
                            <span>Typography</span>
                            <span>Animation</span>
                        </aside>
                        <article class="preview-article">
                            <span class="preview-kicker">Getting started</span>
                            <h2>Documentation that gets out of the way.</h2>
                            <p>
                                Keep readers oriented with a predictable structure and make every
                                page easy to scan.
                            </p>
                            <div class="preview-callout">
                                <H0Icon :icon="settingsIcon" :size="18" />
                                <span
                                    ><strong>Built to adapt</strong>Change navigation, theme, and
                                    content without rebuilding the shell.</span
                                >
                            </div>
                            <div class="preview-code">
                                <span>01</span><code>title: Introduction</code><span>02</span
                                ><code>path: /docs/introduction</code><span>03</span
                                ><code>group: Getting started</code>
                            </div>
                        </article>
                        <aside class="preview-outline">
                            <small>On this page</small>
                            <span class="is-active">Why this template?</span>
                            <span>Project anatomy</span>
                            <span>What comes next</span>
                        </aside>
                    </div>
                </div>
            </section>

            <section class="principles-section">
                <div class="section-heading">
                    <span>Purposefully composed</span>
                    <h2>Everything a documentation site needs.<br />Nothing it doesn’t.</h2>
                    <p>
                        The template handles the repetitive decisions so your team can focus on
                        explaining the product.
                    </p>
                </div>

                <div class="feature-grid">
                    <H0Card variant="outline" padding>
                        <div class="feature-card feature-card--wide">
                            <div>
                                <span class="feature-card__index">01 / Content</span>
                                <H0Typography variant="h3"
                                    >Markdown stays the source of truth.</H0Typography
                                >
                                <p>
                                    Front matter generates navigation, routes, search, and page
                                    context from one portable file.
                                </p>
                            </div>
                            <div class="mini-editor">
                                <div><i></i><i></i><i></i><span>introduction.md</span></div>
                                <pre><em>---</em>
title: <b>Introduction</b>
group: <b>Getting started</b>
order: <b>10</b>
<em>---</em>

<strong># Start with clarity</strong></pre>
                            </div>
                        </div>
                    </H0Card>

                    <H0Card variant="outline" padding>
                        <div class="feature-card">
                            <span class="feature-card__index">02 / Navigation</span>
                            <H0Typography variant="h3">Context, at every level.</H0Typography>
                            <p>
                                Primary sections, local chapters, and page anchors create an
                                effortless reading map.
                            </p>
                            <div class="feature-path">
                                <span>Getting started</span><H0Icon :icon="arrowRightIcon" /><span
                                    >Overview</span
                                ><H0Icon :icon="arrowRightIcon" /><strong>Introduction</strong>
                            </div>
                        </div>
                    </H0Card>

                    <H0Card variant="outline" padding>
                        <div class="feature-card">
                            <span class="feature-card__index">03 / System</span>
                            <H0Typography variant="h3">H0N UI all the way down.</H0Typography>
                            <p>
                                Components, icons, colors, motion, spacing, and radii speak the same
                                design language.
                            </p>
                            <div class="token-row"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                        </div>
                    </H0Card>
                </div>
            </section>

            <section class="cta-section">
                <span>Ready to write?</span>
                <h2>Start with a page.<br />Grow into a library.</h2>
                <p>The structure is already here. Make it unmistakably yours.</p>
                <H0Button :as="RouterLink" to="/docs/quick-start" tone="primary" size="lg"
                    >Open the quick start</H0Button
                >
            </section>
        </main>

        <footer class="home-footer">
            <RouterLink to="/" aria-label="H0N Docs home">
                <IconH0N :size="26" />
            </RouterLink>
            <span>Designed for documentation that lasts.</span>
            <span>Vue 3 · Markdown · H0N UI</span>
        </footer>
    </div>
</template>

<style scoped lang="scss">
.home-page {
    color: var(--h0n-ui-color-text);
    min-height: 100vh;
    overflow: hidden;
}

.hero-section {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1100px;
    padding: 112px 24px 74px;
    position: relative;
    text-align: center;

    &__glow {
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--h0n-ui-color-primary) 22%, transparent),
            transparent 68%
        );
        filter: blur(24px);
        height: 460px;
        left: 50%;
        pointer-events: none;
        position: absolute;
        top: -120px;
        transform: translateX(-50%);
        width: 780px;
    }

    &__badge {
        position: relative;
    }

    h1 {
        font-size: clamp(3rem, 7.5vw, 6.4rem);
        letter-spacing: -0.065em;
        line-height: 0.94;
        margin: 32px 0 24px;
        max-width: 1040px;
        position: relative;

        span {
            color: var(--h0n-ui-color-muted);
        }
    }

    > p {
        color: var(--h0n-ui-color-muted);
        font-size: clamp(1rem, 1.6vw, 1.25rem);
        line-height: 1.7;
        margin: 0;
        max-width: 740px;
        position: relative;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 34px;
        position: relative;
    }

    &__meta {
        color: var(--h0n-ui-color-muted);
        display: flex;
        flex-wrap: wrap;
        font-size: 0.72rem;
        gap: 22px;
        justify-content: center;
        margin-top: 26px;

        span {
            align-items: center;
            display: inline-flex;
            gap: 5px;
        }

        svg {
            color: var(--h0n-ui-color-primary);
        }
    }
}

.product-preview {
    margin: 0 auto;
    max-width: 1320px;
    padding: 0 28px 110px;
    position: relative;
}

.preview-window {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    box-shadow: var(--h0n-ui-shadow-lg);
    overflow: hidden;

    &__header {
        align-items: center;
        border-bottom: 1px solid var(--h0n-ui-color-border);
        display: grid;
        gap: 26px;
        grid-template-columns: auto 1fr auto;
        min-height: 58px;
        padding: 0 20px;
    }

    &__tabs {
        display: flex;
        font-size: 0.69rem;
        gap: 22px;

        span {
            color: var(--h0n-ui-color-muted);
        }

        .is-active {
            color: var(--h0n-ui-color-text);
        }
    }

    &__search {
        align-items: center;
        background: var(--h0n-ui-color-secondary);
        border-radius: 7px;
        color: var(--h0n-ui-color-muted);
        display: flex;
        font-size: 0.65rem;
        gap: 6px;
        padding: 8px 54px 8px 10px;
    }

    &__body {
        display: grid;
        grid-template-columns: 190px minmax(0, 1fr) 190px;
        min-height: 550px;
    }
}

.preview-nav,
.preview-outline {
    display: flex;
    flex-direction: column;
    font-size: 0.67rem;
    gap: 4px;
    padding: 28px 20px;

    small {
        color: var(--h0n-ui-color-muted);
        font-size: 0.59rem;
        letter-spacing: 0.08em;
        margin: 16px 8px 6px;
        text-transform: uppercase;
    }

    span {
        border-radius: 7px;
        color: var(--h0n-ui-color-muted);
        padding: 8px;
    }

    .is-active {
        background: var(--h0n-ui-color-surface);
        color: var(--h0n-ui-color-text);
    }
}

.preview-nav {
    border-inline-end: 1px solid var(--h0n-ui-color-border);
}

.preview-outline {
    border-inline-start: 1px solid var(--h0n-ui-color-border);

    .is-active {
        background: transparent;
        border-inline-start: 1px solid var(--h0n-ui-color-primary);
        border-radius: 0;
    }
}

.preview-article {
    padding: 64px clamp(30px, 7vw, 92px);

    .preview-kicker {
        color: var(--h0n-ui-color-primary);
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    h2 {
        font-size: clamp(1.8rem, 3.6vw, 3rem);
        letter-spacing: -0.045em;
        line-height: 1.08;
        margin: 13px 0 15px;
        max-width: 590px;
    }

    > p {
        color: var(--h0n-ui-color-muted);
        font-size: 0.85rem;
        line-height: 1.7;
        max-width: 540px;
    }
}

.preview-callout {
    align-items: flex-start;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    display: flex;
    font-size: 0.7rem;
    gap: 12px;
    margin-top: 28px;
    padding: 16px;

    svg {
        color: var(--h0n-ui-color-primary);
    }

    span {
        color: var(--h0n-ui-color-muted);
        display: grid;
        gap: 4px;
    }

    strong {
        color: var(--h0n-ui-color-text);
    }
}

.preview-code {
    background: var(--h0n-ui-color-secondary);
    border-radius: var(--h0n-ui-radius-lg);
    display: grid;
    font-size: 0.68rem;
    gap: 8px 13px;
    grid-template-columns: auto 1fr;
    margin-top: 14px;
    padding: 18px;

    span {
        color: var(--h0n-ui-color-muted);
    }

    code {
        color: var(--h0n-ui-color-text);
    }
}

.principles-section {
    margin: 0 auto;
    max-width: 1240px;
    padding: 20px 28px 120px;
}

.section-heading {
    display: grid;
    gap: 16px;
    margin-bottom: 44px;
    max-width: 760px;

    > span {
        color: var(--h0n-ui-color-primary);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.09em;
        text-transform: uppercase;
    }

    h2 {
        font-size: clamp(2.2rem, 4.8vw, 4.2rem);
        letter-spacing: -0.055em;
        line-height: 1.03;
        margin: 0;
    }

    p {
        color: var(--h0n-ui-color-muted);
        line-height: 1.7;
        margin: 0;
        max-width: 580px;
    }
}

.feature-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: 1fr 1fr;

    > :first-child {
        grid-column: 1 / -1;
    }

    :deep(.h-card__content) {
        height: 100%;
        padding: clamp(24px, 4vw, 46px);
    }
}

.feature-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;

    &--wide {
        align-items: center;
        display: grid;
        gap: 50px;
        grid-template-columns: minmax(0, 0.9fr) minmax(380px, 1.1fr);

        > div:first-child {
            display: grid;
            gap: 16px;
        }
    }

    &__index {
        color: var(--h0n-ui-color-primary);
        font-size: 0.66rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    p {
        color: var(--h0n-ui-color-muted);
        line-height: 1.7;
        margin: 0;
        max-width: 540px;
    }
}

.mini-editor {
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-xl);
    box-shadow: var(--h0n-ui-shadow);
    overflow: hidden;

    > div {
        align-items: center;
        border-bottom: 1px solid var(--h0n-ui-color-border);
        color: var(--h0n-ui-color-muted);
        display: flex;
        font-size: 0.68rem;
        gap: 6px;
        padding: 11px 13px;

        i {
            background: var(--h0n-ui-color-border);
            border-radius: 50%;
            height: 7px;
            width: 7px;
        }

        span {
            margin-inline-start: 6px;
        }
    }

    pre {
        color: var(--h0n-ui-color-muted);
        font:
            0.75rem/1.8 'SFMono-Regular',
            Consolas,
            monospace;
        margin: 0;
        padding: 18px 20px 22px;
    }

    b,
    strong {
        color: var(--h0n-ui-color-text);
    }

    em {
        color: var(--h0n-ui-color-primary);
        font-style: normal;
    }
}

.feature-path {
    align-items: center;
    background: var(--h0n-ui-color-surface);
    border-radius: var(--h0n-ui-radius-lg);
    display: flex;
    flex-wrap: wrap;
    font-size: 0.72rem;
    gap: 8px;
    margin-top: auto;
    padding: 14px;

    span,
    svg {
        color: var(--h0n-ui-color-muted);
    }
}

.token-row {
    display: flex;
    gap: 9px;
    margin-top: auto;

    i {
        background: var(--h0n-ui-color-primary);
        border-radius: 50%;
        height: 34px;
        width: 34px;

        &:nth-child(2) {
            background: var(--h0n-ui-color-success);
        }
        &:nth-child(3) {
            background: var(--h0n-ui-color-warning);
        }
        &:nth-child(4) {
            background: var(--h0n-ui-color-danger);
        }
        &:nth-child(5) {
            background: var(--h0n-ui-color-secondary);
        }
        &:nth-child(6) {
            background: var(--h0n-ui-color-text);
        }
    }
}

.cta-section {
    align-items: center;
    border-block: 1px solid var(--h0n-ui-color-border);
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 108px 24px;
    text-align: center;

    > span {
        color: var(--h0n-ui-color-primary);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.09em;
        text-transform: uppercase;
    }

    h2 {
        font-size: clamp(2.5rem, 6vw, 5.2rem);
        letter-spacing: -0.06em;
        line-height: 0.98;
        margin: 20px 0;
    }

    p {
        color: var(--h0n-ui-color-muted);
        margin: 0 0 28px;
    }
}

.home-footer {
    align-items: center;
    color: var(--h0n-ui-color-muted);
    display: grid;
    font-size: var(--h0n-ui-typography-body-sm-size);
    gap: 20px;
    grid-template-columns: 1fr auto 1fr;
    margin: 0 auto;
    max-width: 1320px;
    padding: 28px;

    > :last-child {
        text-align: right;
    }
}

@media (max-width: 900px) {
    .preview-window__body {
        grid-template-columns: 150px 1fr;
    }

    .preview-outline {
        display: none;
    }

    .feature-card--wide {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 680px) {
    .hero-section {
        padding-top: 80px;
    }

    .product-preview {
        padding-inline: 14px;
    }

    .preview-window__header {
        grid-template-columns: 1fr auto;
    }

    .preview-window__tabs,
    .preview-nav {
        display: none;
    }

    .preview-window__body {
        display: block;
        min-height: 0;
    }

    .preview-article {
        padding: 42px 24px;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .feature-grid > :first-child {
        grid-column: auto;
    }

    .mini-editor {
        max-width: calc(100vw - 90px);
    }

    .home-footer {
        grid-template-columns: 1fr;
        text-align: center;

        > * {
            justify-self: center;
        }

        > :last-child {
            text-align: center;
        }
    }
}
</style>
