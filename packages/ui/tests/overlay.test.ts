import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Modal from '../src/components/Modal/H0Modal.vue'
import H0Drawer from '../src/components/Drawer/H0Drawer.vue'
import H0Sheet from '../src/components/Sheet/H0Sheet.vue'
import H0Select from '../src/components/Select/H0Select.vue'
import H0AlertDialog from '../src/components/Alert/H0AlertDialog.vue'

vi.mock('@floating-ui/dom', async (importOriginal) => {
    const floatingUi = await importOriginal<typeof import('@floating-ui/dom')>()

    return {
        ...floatingUi,
        autoUpdate: vi.fn(() => () => undefined)
    }
})

afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
    document.body.className = ''
    document.body.removeAttribute('style')
})

describe('overlay focus management', () => {
    it.each([
        [H0Sheet, 'h-sheet'],
        [H0Drawer, 'h-drawer']
    ] as const)('%s supports all four viewport sides', async (component, className) => {
        for (const side of ['top', 'right', 'bottom', 'left'] as const) {
            const wrapper = mount(component, { props: { modelValue: true, side, teleportDisabled: true } })
            await nextTick()
            expect(wrapper.get(`.${className}`).classes()).toContain(`${className}--${side}`)
            wrapper.unmount()
        }
    })

    it('keeps the centered Modal and supports all four viewport sides', async () => {
        for (const side of ['center', 'top', 'right', 'bottom', 'left'] as const) {
            const wrapper = mount(H0Modal, { props: { modelValue: true, side, teleportDisabled: true } })
            await nextTick()
            expect(wrapper.get('.h-modal').classes()).toContain(`h-modal--${side}`)
            wrapper.unmount()
        }
    })

    it('moves focus inside, traps it and restores the opener', async () => {
        const opener = document.createElement('button')
        opener.textContent = 'Open'
        document.body.append(opener)
        opener.focus()

        const wrapper = mount(H0Modal, {
            attachTo: document.body,
            props: {
                modelValue: false,
                title: 'Settings'
            },
            slots: {
                default: '<button id="modal-last-action" type="button">Apply</button>'
            }
        })

        await wrapper.setProps({ modelValue: true })
        await nextTick()

        const panel = document.querySelector<HTMLElement>('.h-modal__panel')
        const closeButton = panel?.querySelector<HTMLButtonElement>('[aria-label="Close modal"]')
        const lastButton = panel?.querySelector<HTMLButtonElement>('#modal-last-action')

        expect(panel).not.toBeNull()
        expect(document.activeElement).toBe(closeButton)

        lastButton?.focus()
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
        expect(document.activeElement).toBe(closeButton)

        await wrapper.setProps({ modelValue: false })
        await nextTick()
        expect(document.activeElement).toBe(opener)

        wrapper.unmount()
    })

    it('closes only the top overlay on Escape', async () => {
        const lowerOverlay = mount(H0Sheet, {
            attachTo: document.body,
            props: { modelValue: true }
        })
        const topOverlay = mount(H0Sheet, {
            attachTo: document.body,
            props: { modelValue: true }
        })

        await nextTick()
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

        expect(lowerOverlay.emitted('close')).toBeUndefined()
        expect(topOverlay.emitted('close')).toHaveLength(1)

        topOverlay.unmount()
        lowerOverlay.unmount()
    })

    it('applies the shared backdrop close policy', async () => {
        const wrapper = mount(H0Modal, {
            attachTo: document.body,
            props: {
                closeOnBackdrop: false,
                modelValue: true
            }
        })

        await nextTick()
        document.querySelector<HTMLElement>('.h-overlay__backdrop')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))
        expect(wrapper.emitted('close')).toBeUndefined()

        await wrapper.setProps({ closeOnBackdrop: true })
        document.querySelector<HTMLElement>('.h-overlay__backdrop')?.dispatchEvent(new Event('pointerdown', { bubbles: true }))
        expect(wrapper.emitted('close')).toHaveLength(1)

        wrapper.unmount()
    })

    it('compensates for the disappearing scrollbar until the final overlay closes', async () => {
        vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000)
        vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(980)
        document.body.style.paddingInlineEnd = '12px'

        const lowerOverlay = mount(H0Sheet, {
            attachTo: document.body,
            props: { modelValue: true }
        })
        const topOverlay = mount(H0Modal, {
            attachTo: document.body,
            props: { modelValue: true }
        })

        await nextTick()
        expect(document.body.classList.contains('h-overlay-lock-scroll')).toBe(true)
        expect(document.body.style.paddingInlineEnd).toBe('32px')

        lowerOverlay.unmount()
        expect(document.body.classList.contains('h-overlay-lock-scroll')).toBe(true)
        expect(document.body.style.paddingInlineEnd).toBe('32px')

        topOverlay.unmount()
        expect(document.body.classList.contains('h-overlay-lock-scroll')).toBe(false)
        expect(document.body.style.paddingInlineEnd).toBe('12px')
    })

    it('keeps scrollbar compensation throughout the leave transition', async () => {
        vi.useFakeTimers()
        vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000)
        vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(980)
        document.body.style.paddingInlineEnd = '12px'

        const wrapper = mount(H0Modal, {
            attachTo: document.body,
            props: { modelValue: true },
            global: {
                stubs: { Transition: false }
            }
        })

        await nextTick()
        expect(document.body.style.paddingInlineEnd).toBe('32px')

        await wrapper.setProps({ modelValue: false })
        expect(document.body.style.paddingInlineEnd).toBe('32px')

        await vi.runAllTimersAsync()
        await nextTick()
        expect(document.body.style.paddingInlineEnd).toBe('12px')

        wrapper.unmount()
        vi.useRealTimers()
    })
})

describe('nested overlay surfaces', () => {
    it('reserves the Select surface levels before the next nested overlay', async () => {
        const wrapper = mount(H0Modal, {
            attachTo: document.body,
            props: { modelValue: true },
            slots: {
                default: () => h(H0Modal, { modelValue: true })
            }
        })

        await nextTick()

        const overlays = document.querySelectorAll<HTMLElement>('.h-overlay')
        expect(overlays).toHaveLength(2)
        expect(overlays[0]?.style.zIndex).toBe('var(--h0n-ui-layer-overlay)')
        expect(overlays[1]?.style.zIndex).toBe('calc(var(--h0n-ui-layer-overlay) + 3)')

        wrapper.unmount()
    })

    it.each([
        ['Modal', H0Modal],
        ['Drawer', H0Drawer],
        ['Sheet', H0Sheet]
    ] as const)('dims the parent %s and places the Select popover above it', async (_name, component) => {
        const wrapper = mount(component, {
            attachTo: document.body,
            props: { modelValue: true },
            slots: {
                default: () => h(H0Select, { options: [{ label: 'One', value: 'one' }] })
            }
        })

        await nextTick()
        document.querySelector<HTMLButtonElement>('.h-select__trigger')?.click()
        await nextTick()

        expect(document.querySelector<HTMLElement>('.h-overlay')?.style.zIndex).toBe('var(--h0n-ui-layer-overlay)')
        expect(document.querySelector<HTMLElement>('.h-select__overlay')?.style.zIndex).toBe('calc(var(--h0n-ui-layer-overlay) + 1)')
        expect(document.querySelector<HTMLElement>('.h-select__popover')?.style.zIndex).toBe('calc(var(--h0n-ui-layer-overlay) + 2)')

        wrapper.unmount()
    })

    it('keeps a nested Select within the critical layer range', async () => {
        const wrapper = mount(H0AlertDialog, {
            attachTo: document.body,
            props: { modelValue: true },
            slots: {
                actions: () => h(H0Select, { options: [{ label: 'One', value: 'one' }] })
            }
        })

        await nextTick()
        document.querySelector<HTMLButtonElement>('.h-select__trigger')?.click()
        await nextTick()

        expect(document.querySelector<HTMLElement>('.h-overlay')?.style.zIndex).toBe('var(--h0n-ui-layer-critical)')
        expect(document.querySelector<HTMLElement>('.h-select__overlay')?.style.zIndex).toBe('calc(var(--h0n-ui-layer-critical) + 1)')
        expect(document.querySelector<HTMLElement>('.h-select__popover')?.style.zIndex).toBe('calc(var(--h0n-ui-layer-critical) + 2)')

        wrapper.unmount()
    })
})
