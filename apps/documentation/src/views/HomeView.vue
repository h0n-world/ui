<script setup lang="ts">
import type { H0SelectOption, H0TabItem } from '@h0nio/ui'
import {
    H0Alert,
    H0Avatar,
    H0Badge,
    H0Button,
    H0Card,
    H0Checkbox,
    H0Container,
    H0Divider,
    H0Grid,
    H0Icon,
    H0Inline,
    H0Input,
    H0Select,
    H0Stack,
    H0Switch,
    H0Tabs,
    H0Typography,
} from '@h0nio/ui'
import { arrowRightIcon, checkIcon, searchIcon, settingsIcon } from '@h0nio/ui/icons'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import IconH0N from '@/components/icons/IconH0N.vue'
import SystemHeader from '@/components/system/SystemHeader.vue'
import { siteConfig } from '@/content/site'

const demoTabs: H0TabItem<string>[] = [
    { value: 'profile', label: 'Profile' },
    { value: 'appearance', label: 'Appearance' },
    { value: 'notifications', label: 'Notifications' },
]

const teamOptions: H0SelectOption<string>[] = [
    { value: 'design', label: 'Design' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product' },
]

const activeDemoTab = ref('profile')
const workspaceName = ref('H0N Studio')
const selectedTeam = ref<string | null>('design')
const weeklyDigest = ref(true)
const productUpdates = ref(true)
const interfaceTips = ref(false)
</script>

<template>
    <div class="home-page">
        <SystemHeader />

        <main>
            <H0Container as="section" size="full" class="hero-section">
                <div class="hero-section__glow" aria-hidden="true" />
                <H0Stack class="hero-section__content" align="center" gap="lg">
                    <H0Badge tone="primary" dot>H0N UI · {{ siteConfig.version }}</H0Badge>

                    <H0Typography variant="h1" align="center" class="hero-section__title">
                        Build interfaces that<br /><span>already feel complete.</span>
                    </H0Typography>

                    <H0Typography
                        variant="body"
                        color="muted"
                        align="center"
                        class="hero-section__description"
                    >
                        A self-contained Vue 3 component library with accessible interaction
                        patterns, a coherent visual system, and the building blocks for production
                        interfaces.
                    </H0Typography>

                    <H0Inline gap="sm" justify="center">
                        <H0Button :as="RouterLink" to="/docs/quick-start" tone="primary" size="lg">
                            Start building
                        </H0Button>
                        <H0Button :as="RouterLink" to="/components/all" variant="outline" size="lg">
                            Browse components
                        </H0Button>
                    </H0Inline>

                    <H0Inline class="hero-section__meta" gap="lg" justify="center">
                        <H0Inline as="span" gap="xs" :wrap="false">
                            <H0Icon :icon="checkIcon" :size="15" /> Accessible by design
                        </H0Inline>
                        <H0Inline as="span" gap="xs" :wrap="false">
                            <H0Icon :icon="checkIcon" :size="15" /> Fully typed
                        </H0Inline>
                        <H0Inline as="span" gap="xs" :wrap="false">
                            <H0Icon :icon="checkIcon" :size="15" /> Theme ready
                        </H0Inline>
                    </H0Inline>
                </H0Stack>
            </H0Container>

            <H0Container
                as="section"
                size="xl"
                class="showcase-section"
                aria-labelledby="showcase-title"
            >
                <H0Stack gap="xl">
                    <H0Stack class="section-heading" gap="sm">
                        <H0Typography as="span" variant="body-xs" color="primary" :weight="700"
                            >BUILT WITH H0N UI</H0Typography
                        >
                        <H0Typography id="showcase-title" variant="h2"
                            >Real components. One coherent interface.</H0Typography
                        >
                        <H0Typography color="muted">
                            This workspace panel is composed from the same public components
                            available to every H0N UI application.
                        </H0Typography>
                    </H0Stack>

                    <H0Card class="workspace-card" padding>
                        <template #header>
                            <H0Inline gap="sm" :wrap="false">
                                <H0Avatar name="H0N Studio" fallback="H0" color="blue" :size="42" />
                                <H0Stack gap="xs">
                                    <H0Typography as="strong" variant="body" :weight="600"
                                        >Workspace settings</H0Typography
                                    >
                                    <H0Typography variant="body-xs" color="muted"
                                        >Manage the details your team shares.</H0Typography
                                    >
                                </H0Stack>
                            </H0Inline>
                            <H0Badge tone="success" dot>Saved</H0Badge>
                        </template>

                        <H0Tabs
                            v-model="activeDemoTab"
                            :items="demoTabs"
                            mount-mode="active"
                            aria-label="Workspace settings sections"
                        >
                            <template #panel="{ item }">
                                <H0Stack
                                    v-if="item.value === 'profile'"
                                    class="workspace-panel"
                                    gap="lg"
                                >
                                    <H0Grid
                                        class="workspace-form-grid"
                                        columns="repeat(2, minmax(0, 1fr))"
                                        gap="md"
                                    >
                                        <H0Input
                                            v-model="workspaceName"
                                            variant="secondary"
                                            label="Workspace name"
                                            hint="Visible to everyone in your organization."
                                        />
                                        <H0Select
                                            v-model="selectedTeam"
                                            variant="secondary"
                                            label="Default team"
                                            :options="teamOptions"
                                            hint="New projects start in this team."
                                        />
                                    </H0Grid>

                                    <H0Divider />

                                    <H0Inline class="setting-row" justify="between" :wrap="false">
                                        <H0Stack gap="xs">
                                            <H0Typography
                                                as="strong"
                                                variant="body-sm"
                                                :weight="600"
                                                >Weekly workspace digest</H0Typography
                                            >
                                            <H0Typography variant="body-xs" color="muted"
                                                >Receive a concise summary every
                                                Monday.</H0Typography
                                            >
                                        </H0Stack>
                                        <H0Switch
                                            v-model="weeklyDigest"
                                            :control-attrs="{
                                                'aria-label': 'Weekly workspace digest',
                                            }"
                                        />
                                    </H0Inline>

                                    <H0Alert
                                        tone="success"
                                        variant="secondary"
                                        title="Everything is connected"
                                        text="Inputs, selection, feedback, layout, and navigation all share the same tokens and interaction language."
                                    />
                                </H0Stack>

                                <H0Stack
                                    v-else-if="item.value === 'appearance'"
                                    class="workspace-panel"
                                    gap="lg"
                                >
                                    <H0Typography color="muted"
                                        >Compose product settings without recreating control states
                                        or spacing rules.</H0Typography
                                    >
                                    <H0Inline gap="sm">
                                        <H0Badge tone="primary">Primary</H0Badge>
                                        <H0Badge tone="success">Success</H0Badge>
                                        <H0Badge tone="warning">Warning</H0Badge>
                                        <H0Badge tone="danger">Danger</H0Badge>
                                    </H0Inline>
                                    <H0Checkbox
                                        v-model="interfaceTips"
                                        variant="secondary"
                                        label="Show interface guidance"
                                    />
                                </H0Stack>

                                <H0Stack v-else class="workspace-panel" gap="lg">
                                    <H0Switch
                                        v-model="productUpdates"
                                        label="Product updates"
                                        hint="Announcements about new components and improvements."
                                    />
                                    <H0Switch
                                        v-model="weeklyDigest"
                                        label="Weekly digest"
                                        hint="A summary of activity across your workspace."
                                    />
                                </H0Stack>
                            </template>
                        </H0Tabs>

                        <template #footer>
                            <H0Typography variant="body-xs" color="muted"
                                >Built from 11 public H0N UI components</H0Typography
                            >
                            <H0Inline gap="sm">
                                <H0Button size="sm" variant="ghost">Cancel</H0Button>
                                <H0Button size="sm" tone="primary">Save changes</H0Button>
                            </H0Inline>
                        </template>
                    </H0Card>
                </H0Stack>
            </H0Container>

            <H0Container
                as="section"
                size="xl"
                class="principles-section"
                aria-labelledby="principles-title"
            >
                <H0Stack gap="xl">
                    <H0Stack class="section-heading" gap="sm">
                        <H0Typography as="span" variant="body-xs" color="primary" :weight="700"
                            >A COMPLETE FOUNDATION</H0Typography
                        >
                        <H0Typography id="principles-title" variant="h2"
                            >Spend time on the product, not the primitives.</H0Typography
                        >
                        <H0Typography color="muted"
                            >H0N UI keeps common decisions consistent while leaving product
                            composition in your hands.</H0Typography
                        >
                    </H0Stack>

                    <H0Grid class="feature-grid" columns="repeat(3, minmax(0, 1fr))" gap="md">
                        <H0Card padding>
                            <H0Stack class="feature-card" gap="md">
                                <span class="feature-card__icon"
                                    ><H0Icon :icon="checkIcon" :size="22"
                                /></span>
                                <H0Typography variant="h3">Accessible contracts</H0Typography>
                                <H0Typography color="muted"
                                    >Keyboard behavior, focus states, labels, validation, and
                                    overlay semantics are built into the components.</H0Typography
                                >
                            </H0Stack>
                        </H0Card>

                        <H0Card padding>
                            <H0Stack class="feature-card" gap="md">
                                <span class="feature-card__icon"
                                    ><H0Icon :icon="settingsIcon" :size="22"
                                /></span>
                                <H0Typography variant="h3">One design language</H0Typography>
                                <H0Typography color="muted"
                                    >Typography, spacing, color, motion, density, and radius
                                    settings stay synchronized across the library.</H0Typography
                                >
                            </H0Stack>
                        </H0Card>

                        <H0Card padding>
                            <H0Stack class="feature-card" gap="md">
                                <span class="feature-card__icon"
                                    ><H0Icon :icon="searchIcon" :size="22"
                                /></span>
                                <H0Typography variant="h3">Documentation you can run</H0Typography>
                                <H0Typography color="muted"
                                    >Every example uses workspace source, so the documentation
                                    doubles as a live integration surface.</H0Typography
                                >
                            </H0Stack>
                        </H0Card>
                    </H0Grid>

                    <H0Card class="install-card" variant="outline">
                        <H0Inline class="install-card__content" justify="between">
                            <H0Stack gap="xs">
                                <H0Typography variant="body-sm" :weight="600"
                                    >Start with one package</H0Typography
                                >
                                <H0Typography variant="body-xs" color="muted"
                                    >Vue 3.5+, TypeScript declarations, styles, icons, and
                                    composables included.</H0Typography
                                >
                            </H0Stack>
                            <H0Inline class="install-command" gap="sm" :wrap="false">
                                <H0Typography as="code" variant="code"
                                    >pnpm add @h0nio/ui</H0Typography
                                >
                                <H0Button
                                    :as="RouterLink"
                                    to="/docs/quick-start"
                                    size="sm"
                                    variant="soft"
                                >
                                    Quick start <H0Icon :icon="arrowRightIcon" :size="16" />
                                </H0Button>
                            </H0Inline>
                        </H0Inline>
                    </H0Card>
                </H0Stack>
            </H0Container>

            <section class="cta-section">
                <H0Container size="md">
                    <H0Stack align="center" gap="lg">
                        <H0Badge tone="primary">READY WHEN YOU ARE</H0Badge>
                        <H0Typography variant="h2" align="center" class="cta-section__title"
                            >Build the next screen with components that already agree.</H0Typography
                        >
                        <H0Typography color="muted" align="center"
                            >Explore the catalog, copy a live example, and keep your application
                            focused on its own product decisions.</H0Typography
                        >
                        <H0Button :as="RouterLink" to="/components/all" tone="primary" size="lg">
                            Explore all components
                        </H0Button>
                    </H0Stack>
                </H0Container>
            </section>
        </main>

        <H0Container as="footer" size="xl" class="home-footer">
            <H0Inline justify="between">
                <RouterLink to="/" aria-label="H0N UI home"><IconH0N :size="26" /></RouterLink>
                <H0Typography variant="body-xs" color="muted"
                    >Built with Vue 3 · TypeScript · H0N UI</H0Typography
                >
                <H0Typography variant="body-xs" color="muted">{{
                    siteConfig.version
                }}</H0Typography>
            </H0Inline>
        </H0Container>
    </div>
</template>

<style scoped lang="scss">
.home-page {
    color: var(--h0n-ui-color-text);
    overflow-x: clip;
}

.hero-section {
    padding-block: clamp(5rem, 11vw, 9rem) clamp(4.5rem, 9vw, 7rem);
    position: relative;
    text-align: center;

    &::before {
        background-image: radial-gradient(
            circle,
            color-mix(in srgb, var(--h0n-ui-color-text) 14%, transparent) 0.8px,
            transparent 0.9px
        );
        background-size: 8px 8px;
        content: '';
        inset: 0;
        mask-image: linear-gradient(#000 0% 64%, transparent 96%);
        opacity: 0.58;
        pointer-events: none;
        position: absolute;
    }

    &__glow {
        background: radial-gradient(
            circle,
            color-mix(in srgb, var(--h0n-ui-color-primary) 22%, transparent),
            transparent 68%
        );
        filter: blur(18px);
        height: 42rem;
        left: 50%;
        pointer-events: none;
        position: absolute;
        top: -18rem;
        transform: translateX(-50%);
        width: 100%;
    }

    &__content {
        margin-inline: auto;
        max-width: 66rem;
        position: relative;
    }

    &__title {
        font-size: clamp(3.2rem, 8vw, 6.8rem);
        letter-spacing: -0.065em;
        line-height: 0.95;

        span {
            color: var(--h0n-ui-color-muted);
        }
    }

    &__description {
        font-size: clamp(1rem, 1.7vw, 1.25rem);
        max-width: 47rem;
    }

    &__meta {
        color: var(--h0n-ui-color-muted);
        font-size: var(--h0n-ui-typography-body-xs-size);

        svg {
            color: var(--h0n-ui-color-primary);
        }
    }
}

.showcase-section,
.principles-section {
    padding-bottom: clamp(5rem, 10vw, 8rem);
}

.section-heading {
    max-width: 46rem;

    > :first-child {
        letter-spacing: 0.1em;
    }
}

.workspace-panel {
    padding-top: 1.5rem;
}

.setting-row {
    gap: var(--h0n-ui-spacing-lg);
}

.feature-card {
    &__icon {
        align-items: center;
        background: color-mix(in srgb, var(--h0n-ui-color-primary) 14%, transparent);
        border-radius: var(--h0n-ui-radius-lg);
        color: var(--h0n-ui-color-primary);
        display: inline-flex;
        height: 3rem;
        justify-content: center;
        width: 3rem;
    }
}

.install-card__content {
    padding: 1.25rem;
}

.install-command {
    background: var(--h0n-ui-color-secondary);
    border-radius: var(--h0n-ui-radius-lg);
    padding: var(--h0n-ui-spacing-xs);
    padding-inline-start: var(--h0n-ui-spacing-md);
}

.cta-section {
    border-block: 1px solid var(--h0n-ui-color-border);
    padding-block: clamp(5rem, 11vw, 8rem);

    &__title {
        font-size: clamp(2.5rem, 5.5vw, 4.8rem);
        letter-spacing: -0.055em;
        line-height: 1.02;
    }
}

.home-footer {
    padding-block: 1.75rem;

    a {
        color: inherit;
    }
}

@media (max-width: 860px) {
    .workspace-form-grid,
    .feature-grid {
        grid-template-columns: minmax(0, 1fr) !important;
    }

    .install-card__content {
        align-items: stretch;
        flex-direction: column;
    }

    .install-command {
        justify-content: space-between;
    }
}

@media (max-width: 600px) {
    .hero-section {
        padding-top: 4.5rem;

        &__title {
            font-size: clamp(2.8rem, 14vw, 4.2rem);
        }
    }

    .workspace-card {
        :deep(.h-card__footer) {
            align-items: flex-start;
            flex-direction: column;
        }
    }

    .setting-row {
        align-items: flex-start;
        flex-direction: column;
    }

    .home-footer > :deep(.h-inline) {
        flex-direction: column;
    }
}
</style>
