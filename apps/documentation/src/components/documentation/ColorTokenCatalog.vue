<script setup lang="ts">
defineOptions({
    name: 'ColorTokenCatalog',
})

type ColorToken = {
    description: string
    name: `--h0n-ui-${string}`
}

type ColorTokenGroup = {
    id: string
    label: string
    tokens: ColorToken[]
}

const groups: ColorTokenGroup[] = [
    {
        id: 'color-brand',
        label: 'Brand and emphasis',
        tokens: [
            { name: '--h0n-ui-color-primary', description: 'Primary actions, selected states, and branded emphasis.' },
            { name: '--h0n-ui-color-primary-hover', description: 'Hover state paired with the primary color.' },
            { name: '--h0n-ui-color-primary-contrast', description: 'Content displayed on a primary background.' },
            { name: '--h0n-ui-color-accent', description: 'Accent alias for custom highlighted elements.' },
            { name: '--h0n-ui-color-accent-hover', description: 'Interactive accent hover state.' },
        ],
    },
    {
        id: 'color-surfaces',
        label: 'Surfaces and borders',
        tokens: [
            { name: '--h0n-ui-color-secondary', description: 'Secondary panels, controls, and quiet filled surfaces.' },
            { name: '--h0n-ui-color-secondary-hover', description: 'Hover state for secondary surfaces.' },
            { name: '--h0n-ui-color-surface', description: 'Primary elevated surface used by cards and overlays.' },
            { name: '--h0n-ui-color-surface-hover', description: 'Interactive surface hover state.' },
            { name: '--h0n-ui-color-surface-subtle', description: 'Low-emphasis surface separated from the page background.' },
            { name: '--h0n-ui-color-border', description: 'Default separator and control border.' },
            { name: '--h0n-ui-color-ghost-hover', description: 'Hover surface for transparent controls.' },
        ],
    },
    {
        id: 'color-content',
        label: 'Text and content',
        tokens: [
            { name: '--h0n-ui-color-text', description: 'Primary readable text and icons.' },
            { name: '--h0n-ui-color-text-secondary', description: 'Supporting text with reduced emphasis.' },
            { name: '--h0n-ui-color-muted', description: 'Metadata, hints, placeholders, and quiet labels.' },
            { name: '--h0n-ui-color-control-muted', description: 'Muted control fill and inactive indicators.' },
            { name: '--h0n-ui-color-control-muted-hover', description: 'Hover state for muted controls.' },
        ],
    },
    {
        id: 'color-semantic',
        label: 'Semantic status',
        tokens: [
            { name: '--h0n-ui-color-success', description: 'Successful actions and positive status.' },
            { name: '--h0n-ui-color-success-hover', description: 'Hover state for success controls.' },
            { name: '--h0n-ui-color-success-text', description: 'Accessible success text on neutral surfaces.' },
            { name: '--h0n-ui-color-warning', description: 'Warnings and actions requiring caution.' },
            { name: '--h0n-ui-color-warning-hover', description: 'Hover state for warning controls.' },
            { name: '--h0n-ui-color-warning-text', description: 'Accessible warning text on neutral surfaces.' },
            { name: '--h0n-ui-color-danger', description: 'Destructive actions and error status.' },
            { name: '--h0n-ui-color-danger-hover', description: 'Hover state for danger controls.' },
            { name: '--h0n-ui-color-danger-text', description: 'Accessible danger text on neutral surfaces.' },
            { name: '--h0n-ui-color-danger-soft', description: 'Low-emphasis danger background.' },
            { name: '--h0n-ui-color-danger-soft-hover', description: 'Hover state for a soft danger surface.' },
            { name: '--h0n-ui-color-danger-soft-fg', description: 'Foreground paired with a soft danger surface.' },
            { name: '--h0n-ui-color-info-text', description: 'Informational text and icons on neutral surfaces.' },
        ],
    },
    {
        id: 'color-overlays',
        label: 'Overlays and scrolling',
        tokens: [
            { name: '--h0n-ui-color-backdrop', description: 'Standard modal and drawer backdrop.' },
            { name: '--h0n-ui-color-backdrop-soft', description: 'Lower-emphasis overlay backdrop.' },
            { name: '--h0n-ui-color-scrollbar-thumb', description: 'Default custom scrollbar thumb.' },
            { name: '--h0n-ui-color-scrollbar-thumb-hover', description: 'Scrollbar thumb hover state.' },
        ],
    },
]
</script>

<template>
    <div class="color-token-catalog">
        <section v-for="group in groups" :key="group.id" class="color-token-category">
            <h2 :id="group.id">{{ group.label }}</h2>

            <div class="color-token-category__grid">
                <article v-for="token in group.tokens" :key="token.name" class="color-token-card">
                    <div class="color-token-card__swatch" aria-hidden="true">
                        <span :style="{ background: `var(${token.name})` }"></span>
                    </div>
                    <div class="color-token-card__content">
                        <code>{{ token.name }}</code>
                        <p>{{ token.description }}</p>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
.color-token-catalog {
    display: grid;
    gap: 58px;
    margin-top: 46px;
}

.color-token-category {
    h2 {
        color: var(--h0n-ui-color-text);
        font-size: 1.65rem;
        letter-spacing: -0.025em;
        line-height: 1.25;
        margin: 0 0 20px;
        scroll-margin-top: 24px;
    }

    &__grid {
        display: grid;
        gap: var(--h0n-ui-spacing-md);
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

.color-token-card {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-lg);
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    min-width: 0;
    overflow: hidden;

    &__swatch {
        background-color: var(--h0n-ui-color-surface);
        background-image:
            linear-gradient(45deg, var(--h0n-ui-color-border) 25%, transparent 25%),
            linear-gradient(-45deg, var(--h0n-ui-color-border) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--h0n-ui-color-border) 75%),
            linear-gradient(-45deg, transparent 75%, var(--h0n-ui-color-border) 75%);
        background-position: 0 0, 0 8px, 8px -8px, -8px 0;
        background-size: 16px 16px;
        min-height: 96px;

        span {
            display: block;
            height: 100%;
            width: 100%;
        }
    }

    &__content {
        align-content: center;
        background: var(--h0n-ui-color-surface);
        display: grid;
        gap: 7px;
        min-width: 0;
        padding: var(--h0n-ui-spacing-md);

        code {
            color: var(--h0n-ui-color-text);
            font:
                0.72rem/1.45 'SFMono-Regular',
                Consolas,
                monospace;
            overflow-wrap: anywhere;
        }

        p {
            color: var(--h0n-ui-color-muted);
            font-size: var(--h0n-ui-typography-body-sm-size);
            line-height: 1.5;
            margin: 0;
        }
    }
}

@media (max-width: 760px) {
    .color-token-category__grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
