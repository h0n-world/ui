<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

defineOptions({
    name: "H0Ripple",
});

const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        duration?: number;
        opacity?: number;
    }>(),
    {
        disabled: false,
        duration: 620,
        opacity: 0.24,
    },
);

const ripples = ref<Array<{ id: number; size: number; x: number; y: number }>>(
    [],
);

let nextRippleId = 0;
const timeouts = new Set<number>();

function remove(id: number) {
    ripples.value = ripples.value.filter((ripple) => ripple.id !== id);
}

function isAnimationEnabled(target: HTMLElement) {
    if (typeof window === "undefined") {
        return false;
    }

    const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
    ).matches ?? false;
    const animationTarget = target.closest<HTMLElement>(
        "[data-h0n-animation]",
    );

    return !prefersReducedMotion &&
        animationTarget?.dataset.h0nAnimation === "high";
}

function create(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement | null;

    if (!target || props.disabled || !isAnimationEnabled(target)) {
        return;
    }

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = nextRippleId++;

    ripples.value.push({
        id,
        size,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
    });

    const timeoutId = window.setTimeout(() => {
        remove(id);
        timeouts.delete(timeoutId);
    }, props.duration);

    timeouts.add(timeoutId);
}

defineExpose({ create });

onBeforeUnmount(() => {
    timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
    });

    timeouts.clear();
});
</script>

<template>
    <span
        v-if="ripples.length > 0"
        data-h0n-component="ripple" class="h-ripple"
        :style="{
            '--h-ripple-duration': `${duration}ms`,
            '--h-ripple-opacity': String(opacity),
        }"
        inert
    >
        <span
            v-for="ripple in ripples"
            :key="ripple.id"
            class="h-ripple__item"
            :style="{
                height: `${ripple.size}px`,
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: `${ripple.size}px`,
            }"
        />
    </span>
</template>

<style scoped lang="scss">
.h-ripple {
    border-radius: inherit;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: 0;

    &__item {
        animation: h-ripple var(--h-ripple-duration) ease-out forwards;
        background: currentColor;
        border-radius: 50%;
        opacity: var(--h-ripple-opacity);
        position: absolute;
        transform: scale(0);
        will-change: opacity, transform;
    }
}

@keyframes h-ripple {
    to {
        opacity: 0;
        transform: scale(1);
    }
}
</style>
