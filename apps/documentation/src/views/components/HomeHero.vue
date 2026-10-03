<script setup lang="ts">
import checkIcon from '@h0nio/icons/check-circle-stroke'
import { H0Badge, H0Button, H0Container, H0Icon, H0Inline, H0Stack, H0Typography } from '@h0nio/ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { siteConfig } from '@/content/site'

const phrases = [
    'already feel complete.',
    'stay consistent.',
    'feel intentional.',
    'scale gracefully.',
] as const

const TYPE_DELAY = 55
const DELETE_DELAY = 30
const HOLD_DELAY = 2000
const BETWEEN_DELAY = 250

const phraseIndex = ref(0)

// Первый заголовок сразу присутствует в DOM.
// Не начинаем страницу с пустого H1.
const displayedText = ref<string>(phrases[0])

const prefersReducedMotion = ref(false)

let timeoutId: ReturnType<typeof setTimeout> | undefined
let motionQuery: MediaQueryList | undefined

const longestPhrase = phrases.reduce((longest, phrase) => {
    return phrase.length > longest.length ? phrase : longest
}, phrases[0])

function clearTimer() {
    if (timeoutId === undefined) {
        return
    }

    clearTimeout(timeoutId)
    timeoutId = undefined
}

function schedule(callback: () => void, delay: number) {
    clearTimer()
    timeoutId = setTimeout(callback, delay)
}

function typePhrase(phrase: string, characterIndex = 1) {
    if (prefersReducedMotion.value) {
        return
    }

    displayedText.value = phrase.slice(0, characterIndex)

    if (characterIndex < phrase.length) {
        schedule(() => {
            typePhrase(phrase, characterIndex + 1)
        }, TYPE_DELAY)

        return
    }

    schedule(deletePhrase, HOLD_DELAY)
}

function deletePhrase() {
    if (prefersReducedMotion.value) {
        return
    }

    if (displayedText.value.length > 0) {
        displayedText.value = displayedText.value.slice(0, -1)

        schedule(deletePhrase, DELETE_DELAY)

        return
    }

    phraseIndex.value = (phraseIndex.value + 1) % phrases.length

    schedule(() => {
        typePhrase(phrases[phraseIndex.value])
    }, BETWEEN_DELAY)
}

function startAnimation() {
    clearTimer()

    displayedText.value = phrases[phraseIndex.value]

    if (!prefersReducedMotion.value) {
        schedule(deletePhrase, HOLD_DELAY)
    }
}

function handleMotionChange(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches

    phraseIndex.value = 0
    displayedText.value = phrases[0]

    if (event.matches) {
        clearTimer()
        return
    }

    startAnimation()
}

onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = motionQuery.matches

    motionQuery.addEventListener('change', handleMotionChange)

    startAnimation()
})

onBeforeUnmount(() => {
    clearTimer()
    motionQuery?.removeEventListener('change', handleMotionChange)
})
</script>

<template>
    <H0Container as="section" size="full" class="hero-section">
        <div class="hero-section__glow" aria-hidden="true" />
        <img src="../../assets/templates-bg-dark.webp" alt="" />

        <H0Stack class="hero-section__content" align="center" gap="lg">
            <H0Badge tone="primary" dot> H0N UI · {{ siteConfig.version }} </H0Badge>

            <H0Typography
                variant="h1"
                align="center"
                class="hero-section__title"
                aria-label="Build interfaces that already feel complete."
            >
                Build interfaces that

                <br />

                <span class="hero-section__typewriter" aria-hidden="true">
                    <span class="hero-section__typewriter-sizer">
                        {{ longestPhrase }}
                    </span>

                    <span class="hero-section__typewriter-text">
                        {{ displayedText }}

                        <span v-if="!prefersReducedMotion" class="hero-section__cursor" />
                    </span>
                </span>
            </H0Typography>

            <H0Typography
                variant="body"
                color="muted"
                align="center"
                class="hero-section__description"
            >
                A self-contained Vue 3 component library with accessible interaction patterns, a
                coherent visual system, and the building blocks for production interfaces.
            </H0Typography>

            <H0Inline gap="sm" justify="center">
                <H0Button :as="RouterLink" to="/docs/quick-start" tone="primary">
                    Start building
                </H0Button>

                <H0Button :as="RouterLink" to="/components/all" variant="outline">
                    Browse components
                </H0Button>
            </H0Inline>

            <H0Inline class="hero-section__meta" gap="lg" justify="center">
                <H0Inline as="span" gap="xs" :wrap="false">
                    <H0Icon :icon="checkIcon" :size="16" />
                    Accessible by design
                </H0Inline>

                <H0Inline as="span" gap="xs" :wrap="false">
                    <H0Icon :icon="checkIcon" :size="16" />
                    Fully typed
                </H0Inline>

                <H0Inline as="span" gap="xs" :wrap="false">
                    <H0Icon :icon="checkIcon" :size="16" />
                    Theme ready
                </H0Inline>
            </H0Inline>
        </H0Stack>
    </H0Container>
</template>

<style scoped lang="scss">
.hero-section {
    padding-block: clamp(5rem, 11vw, 9rem) clamp(4.5rem, 9vw, 7rem);
    position: relative;
    text-align: center;

    img {
        content: '';
        inset: 0;
        top: -150px;
        mask-image: linear-gradient(var(--h0n-background) 0% 14%, transparent 90%);
        opacity: 0.58;
        pointer-events: none;
        position: absolute;
        height: 85dvh;
        width: 100%;
    }

    &::before {
        background-image: radial-gradient(
            circle,
            color-mix(in srgb, var(--h0n-ui-color-text) 14%, transparent) 0.8px,
            transparent 0.9px
        );
        background-size: 8px 8px;
        content: '';
        inset: 0;
        mask-image: linear-gradient(var(--h0n-background) 0% 10%, transparent 90%);
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
        font-size: clamp(3.2rem, 8vw, 5rem);
        line-height: 0.95;
    }

    &__typewriter {
        color: var(--h0n-ui-color-muted);
        display: inline-grid;
        grid-template-areas: 'text';
    }

    &__typewriter-sizer,
    &__typewriter-text {
        grid-area: text;
    }

    &__typewriter-sizer {
        visibility: hidden;
    }

    &__typewriter-text {
        align-items: baseline;
        display: inline-flex;
        justify-content: center;
    }

    &__cursor {
        background: currentColor;
        display: inline-block;
        height: 0.8em;
        margin-left: 0.08em;
        width: 0.04em;

        animation: hero-cursor-blink 900ms steps(1, end) infinite;
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

@keyframes hero-cursor-blink {
    0%,
    45% {
        opacity: 1;
    }

    46%,
    100% {
        opacity: 0;
    }
}

@media (max-width: 600px) {
    .hero-section {
        padding-top: 4.5rem;

        &__title {
            font-size: clamp(2.8rem, 11vw, 4.2rem);
        }

        &__meta {
            gap: var(--h0n-ui-spacing-sm);
        }
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-section__cursor {
        animation: none;
    }
}
</style>
