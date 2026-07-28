import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import H0Modal from '../src/components/Modal/H0Modal.vue'
import H0Drawer from '../src/components/Drawer/H0Drawer.vue'
import H0Sheet from '../src/components/Sheet/H0Sheet.vue'

afterEach(() => {
    document.body.innerHTML = ''
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
})
