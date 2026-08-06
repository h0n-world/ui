<script setup lang="ts">
import type { H0ImageFit } from '@h0nio/ui'
import { H0Image } from '@h0nio/ui'

const image = `https://th.bing.com/th/id/R.20ebe42d85d819696194c2ff332b81cb?rik=fM7nn7YZkEX92A&pid=ImgRaw&r=0`

const groups: Array<{
    title: string
    description: string
    items: Array<{ fit: H0ImageFit; description: string }>
}> = [
    {
        title: 'Scaling behavior',
        description: 'Compare how the source is resized to relate to the same fixed frame.',
        items: [
            {
                fit: 'contain',
                description:
                    'Shows the entire image and leaves unused space when proportions differ.',
            },
            {
                fit: 'cover',
                description:
                    'Fills the frame while cropping content that extends beyond its edges.',
            },
            {
                fit: 'fill',
                description: 'Fills both dimensions without preserving the source aspect ratio.',
            },
        ],
    },
    {
        title: 'Intrinsic sizing',
        description: 'These modes take the source image’s natural 120 × 60 px size into account.',
        items: [
            { fit: 'none', description: 'Keeps the natural size without scaling the source.' },
            {
                fit: 'scale-down',
                description:
                    'Uses the smaller result of none or contain and never enlarges the source.',
            },
        ],
    },
]
</script>

<template>
    <div class="fit-example">
        <section v-for="group in groups" :key="group.title" class="fit-group">
            <header class="fit-group__header">
                <h3>{{ group.title }}</h3>
                <p>{{ group.description }}</p>
            </header>

            <div class="fit-grid">
                <article v-for="item in group.items" :key="item.fit" class="fit-card">
                    <div class="fit-card__content">
                        <code>{{ item.fit }}</code>
                        <p>{{ item.description }}</p>
                    </div>
                    <H0Image
                        :src="image"
                        :alt="`Geometric test image using ${item.fit} fit`"
                        width="100%"
                        :height="160"
                        :fit="item.fit"
                        radius="var(--h0n-ui-radius-md)"
                        :lazy="false"
                    />
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped>
.fit-example,
.fit-group {
    display: grid;
    width: 100%;
}

.fit-example {
    gap: var(--h0n-ui-spacing-xl);
}

.fit-group {
    gap: var(--h0n-ui-spacing-md);
}

.fit-group__header {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.fit-group__header h3,
.fit-group__header p,
.fit-card p {
    margin: 0;
}

.fit-group__header p,
.fit-card p {
    color: var(--h0n-ui-color-muted);
}

.fit-group__header p {
    font-size: var(--h0n-ui-typography-body-sm-size);
}

.fit-grid {
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
}

.fit-card {
    background: var(--h0n-ui-color-surface);
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-lg);
    display: grid;
    gap: var(--h0n-ui-spacing-md);
    overflow: hidden;
    padding: var(--h0n-ui-spacing-md);
}

.fit-card__content {
    display: grid;
    gap: var(--h0n-ui-spacing-xs);
}

.fit-card code {
    color: var(--h0n-ui-color-text);
    font-size: var(--h0n-ui-typography-body-xs-size);
    width: fit-content;
}

.fit-card p {
    font-size: var(--h0n-ui-typography-body-xs-size);
    line-height: 1.45;
}
</style>
