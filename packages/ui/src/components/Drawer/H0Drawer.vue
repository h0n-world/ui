<script setup lang="ts">
import { closeIcon } from '../../icons'
import { computed } from 'vue'
import H0Button from '../Button/H0Button.vue'
import H0Typography from '../Typography/H0Typography.vue'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import type { H0DrawerBackdrop, H0DrawerSide } from './Drawer.types'
import { useH0OverlayModel } from '../_shared/useOverlayModel'
import { useH0Locale } from '../../locale'

defineOptions({
    name: 'H0Drawer'
})

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        defaultValue?: boolean
        side?: H0DrawerSide
        backdrop?: H0DrawerBackdrop
        title?: string
        closeOnBackdrop?: boolean
        closeOnEsc?: boolean
        ariaLabel?: string
        closeAriaLabel?: string
        teleportTo?: string | HTMLElement
        teleportDisabled?: boolean
        initialFocus?: string | HTMLElement
        returnFocus?: boolean | HTMLElement
        lockScroll?: boolean
    }>(),
    {
        modelValue: undefined,
        side: 'right',
        backdrop: 'opaque',
        title: '',
        closeOnBackdrop: true,
        closeOnEsc: true,
        defaultValue: false,
        teleportTo: 'body',
        teleportDisabled: false,
        returnFocus: true,
        lockScroll: true,
        ariaLabel: '',
        closeAriaLabel: ''
    }
)

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    change: [value: boolean]
    close: []
}>()

const drawerClasses = computed(() => [`h-drawer--${props.side}`])
const { locale } = useH0Locale()
const { close, currentValue } = useH0OverlayModel(props, emit)

</script>

<template>
    <H0OverlayRoot :model-value="currentValue" :backdrop="backdrop" :close-on-backdrop="closeOnBackdrop" :close-on-esc="closeOnEsc" :teleport-to="teleportTo" :teleport-disabled="teleportDisabled" :initial-focus="initialFocus" :return-focus="returnFocus" :lock-scroll="lockScroll" @request-close="close">
        <template #default="{ panelRef }">
            <div data-h0n-component="drawer" class="h-drawer" :class="drawerClasses">
                <aside :ref="panelRef" class="h-drawer__panel" role="dialog" aria-modal="true" :aria-label="title || ariaLabel || locale.overlay.drawer" tabindex="-1">
                    <header v-if="title || $slots.header" class="h-drawer__header">
                        <slot name="header">
                            <H0Typography as="h2" variant="h5">{{ title }}</H0Typography>
                        </slot>
                        <H0Button size="sm" variant="soft" :icon="closeIcon" button-type="onlyIcon" :aria-label="closeAriaLabel || locale.overlay.closeDrawer" @click="close" />
                    </header>
                    <div class="h-drawer__content">
                        <slot />
                    </div>
                    <footer v-if="$slots.footer" class="h-drawer__footer">
                        <slot name="footer" :close="close" />
                    </footer>
                </aside>
            </div>
        </template>
    </H0OverlayRoot>
</template>

<style scoped lang="scss">
.h-drawer {
    inset: 0;
    pointer-events: none;
    position: absolute;
}

.h-drawer__panel {
    background: var(--h0n-ui-color-surface);
    box-shadow: var(--h0n-ui-shadow);
    color: var(--h0n-ui-color-text);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    height: 100%;
    overflow: hidden;
    pointer-events: auto;
    position: absolute;
}

.h-drawer--right .h-drawer__panel {
    border-radius: var(--h0n-ui-radius-xxl) 0 0 var(--h0n-ui-radius-xxl);
    bottom: 0;
    max-width: calc(100vw - 24px);
    right: 0;
    top: 0;
    width: min(380px, calc(100vw - 24px));
}

.h-drawer--left .h-drawer__panel {
    border-radius: 0 var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl) 0;
    bottom: 0;
    left: 0;
    max-width: calc(100vw - 24px);
    top: 0;
    width: min(380px, calc(100vw - 24px));
}

.h-drawer--top .h-drawer__panel,
.h-drawer--bottom .h-drawer__panel {
    height: auto;
    left: 0;
    max-height: min(420px, calc(100dvh - 24px));
    max-width: 100vw;
    right: 0;
    width: 100%;
}

.h-drawer--top .h-drawer__panel {
    border-radius: 0 0 var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl);
    top: 0;
}

.h-drawer--bottom .h-drawer__panel {
    border-radius: var(--h0n-ui-radius-xxl) var(--h0n-ui-radius-xxl) 0 0;
    bottom: 0;
}

.h-drawer__header,
.h-drawer__footer {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: space-between;
    padding: 16px;
}

.h-drawer__header {
    border-bottom: 1px solid var(--h0n-ui-color-border);
}

.h-drawer__content {
    overflow: auto;
    padding: 16px;
}

.h-drawer__footer {
    border-top: 1px solid var(--h0n-ui-color-border);
    justify-content: flex-end;
}

:global(.h-overlay-enter-active .h-drawer__panel),
:global(.h-overlay-leave-active .h-drawer__panel) {
    transition: transform var(--h0n-ui-duration-normal) ease;
}

:global(.h-overlay-enter-from .h-drawer--right .h-drawer__panel),
:global(.h-overlay-leave-to .h-drawer--right .h-drawer__panel) {
    transform: translateX(100%);
}

:global(.h-overlay-enter-from .h-drawer--left .h-drawer__panel),
:global(.h-overlay-leave-to .h-drawer--left .h-drawer__panel) {
    transform: translateX(-100%);
}

:global(.h-overlay-enter-from .h-drawer--top .h-drawer__panel),
:global(.h-overlay-leave-to .h-drawer--top .h-drawer__panel) {
    transform: translateY(-100%);
}

:global(.h-overlay-enter-from .h-drawer--bottom .h-drawer__panel),
:global(.h-overlay-leave-to .h-drawer--bottom .h-drawer__panel) {
    transform: translateY(100%);
}
</style>
