<script setup lang="ts">
import { computed } from 'vue'
import { useH0Locale } from '../../locale'
import H0OverlayContent from '../_shared/H0OverlayContent.vue'
import H0OverlayFooter from '../_shared/H0OverlayFooter.vue'
import H0OverlayHeader from '../_shared/H0OverlayHeader.vue'
import H0OverlayRoot from '../_shared/H0OverlayRoot.vue'
import { useH0OverlayModel } from '../_shared/useOverlayModel'
import type { H0DrawerBackdrop, H0DrawerSide } from './Drawer.types'

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
        subtitle?: string
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
        subtitle: '',
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
    <H0OverlayRoot
        :model-value="currentValue"
        :backdrop="backdrop"
        :close-on-backdrop="closeOnBackdrop"
        :close-on-esc="closeOnEsc"
        :teleport-to="teleportTo"
        :teleport-disabled="teleportDisabled"
        :initial-focus="initialFocus"
        :return-focus="returnFocus"
        :lock-scroll="lockScroll"
        @request-close="close"
    >
        <template #default="{ panelRef }">
            <div data-h0n-component="drawer" class="h-drawer" :class="drawerClasses">
                <aside :ref="panelRef" class="h-drawer__panel" role="dialog" aria-modal="true" :aria-label="title || ariaLabel || locale.overlay.drawer" tabindex="-1">
                    <H0OverlayHeader
                        v-if="title || subtitle || $slots.header"
                        :title="title"
                        :subtitle="subtitle"
                        :close-aria-label="closeAriaLabel || locale.overlay.closeDrawer"
                        :custom-content="Boolean($slots.header)"
                        border
                        @close="close"
                    >
                        <slot name="header" />
                    </H0OverlayHeader>
                    <H0OverlayContent>
                        <slot />
                    </H0OverlayContent>
                    <H0OverlayFooter v-if="$slots.footer" border>
                        <slot name="footer" :close="close" />
                    </H0OverlayFooter>
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
    --h-overlay-footer-gap: 12px;

    background: var(--h0n-ui-color-surface);
    box-shadow: var(--h0n-ui-shadow);
    color: var(--h0n-ui-color-text);
    display: flex;
    flex-direction: column;
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
    min-height: 200px;
    max-height: calc(100dvh - 100px);
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
