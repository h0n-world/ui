import { mount, type VueWrapper } from '@vue/test-utils'
import { createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { autoUpdate } from '@floating-ui/dom'
import H0Dropdown from '../src/components/Dropdown/H0Dropdown.vue'
import H0Button from '../src/components/Button/H0Button.vue'
import H0Modal from '../src/components/Modal/H0Modal.vue'

const stop = vi.hoisted(() => vi.fn())
vi.mock('@floating-ui/dom', async original => ({ ...await original<typeof import('@floating-ui/dom')>(), autoUpdate: vi.fn(() => stop) }))
const wrappers: VueWrapper[] = []
async function settle() { await nextTick(); await nextTick(); await nextTick() }
function mountDropdown(props = {}, slots = {}) {
    const wrapper = mount(H0Dropdown, { attachTo: document.body, props, slots: {
        default: () => h('button', { type: 'button' }, 'Actions'),
        content: () => [h('button', { type: 'button' }, 'First'), h('button', { type: 'button' }, 'Last')],
        ...slots,
    } })
    wrappers.push(wrapper)
    return wrapper
}
afterEach(() => { wrappers.splice(0).forEach(wrapper => wrapper.unmount()); document.body.innerHTML = ''; vi.clearAllMocks() })

describe('Dropdown', () => {
    it('uses the actual slotted control; preserves handlers, refs and ARIA', async () => {
        const click = vi.fn()
        const button = ref<HTMLElement>()
        const wrapper = mountDropdown({}, { default: () => h(H0Button, { id: 'custom-trigger', ref: button, onClick: click }, () => 'Actions') })
        const trigger = wrapper.get('button')
        expect(wrapper.findAll('button')).toHaveLength(1)
        expect(trigger.attributes('aria-haspopup')).toBe('dialog')
        expect(trigger.attributes('aria-expanded')).toBe('false')
        await trigger.trigger('click'); await settle()
        const panel = document.querySelector<HTMLElement>('[data-h0n-component="dropdown-content"]')!
        expect(click).toHaveBeenCalledOnce()
        expect(button.value).toBeTruthy()
        expect(panel.getAttribute('aria-labelledby')).toBe('custom-trigger')
        expect(trigger.attributes('aria-controls')).toBe(panel.id)
        expect(document.activeElement?.textContent).toBe('First')
        expect(autoUpdate).toHaveBeenCalledWith(trigger.element, panel, expect.any(Function))
        expect(document.body.style.overflow).toBe('')
        panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
        await settle()
        expect(document.querySelector('[data-h0n-component="dropdown-content"]')).toBeNull()
        expect(document.activeElement).toBe(trigger.element)
        expect(stop).toHaveBeenCalled()
        expect(wrapper.emitted('open')).toHaveLength(1)
        expect(wrapper.emitted('close')).toHaveLength(1)
    })
    it('supports keyboard activation of an image and panel-only focus', async () => {
        const wrapper = mountDropdown({ teleportDisabled: true }, { default: () => h('img', { alt: 'Profile' }), content: () => h('p', 'Details') })
        const trigger = wrapper.get('img')
        expect(trigger.attributes('role')).toBe('button')
        expect(trigger.attributes('tabindex')).toBe('0')
        await trigger.trigger('keydown', { key: ' ' }); await settle()
        expect(document.activeElement).toBe(wrapper.get('[role="dialog"]').element)
        await wrapper.get('[role="dialog"]').trigger('keydown', { key: 'Escape' }); await settle()
        await trigger.trigger('keydown', { key: 'Enter' }); await settle()
        expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })
    it('makes a custom image wrapper keyboard accessible', async () => {
        const ImageTrigger = defineComponent({ render: () => h('div', {}, [h('img', { alt: 'Profile' })]) })
        const wrapper = mountDropdown({}, { default: () => h(ImageTrigger, { 'aria-label': 'Profile actions' }) })
        const trigger = wrapper.get('[role="button"]')
        expect(trigger.attributes('tabindex')).toBe('0')
        await trigger.trigger('keydown', { key: 'Enter' }); await settle()
        expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    })
    it('honors controlled owner requests and imperative methods', async () => {
        const wrapper = mountDropdown({ modelValue: false })
        await wrapper.get('button').trigger('click'); await settle()
        expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        await wrapper.setProps({ modelValue: true }); await settle()
        expect(document.querySelector('[role="dialog"]')).not.toBeNull()
        ;(wrapper.vm as unknown as { close: () => void }).close(); await settle()
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
        expect(document.querySelector('[role="dialog"]')).not.toBeNull()
        await wrapper.setProps({ modelValue: false }); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('supports initial open state and disabled updates', async () => {
        const wrapper = mountDropdown({ defaultValue: true, ariaLabel: 'File actions' })
        await settle()
        expect(document.querySelector('[role="dialog"]')?.getAttribute('aria-label')).toBe('File actions')
        await wrapper.setProps({ disabled: true }); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        await wrapper.get('button').trigger('click'); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        await wrapper.setProps({ disabled: false }); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('registers dismissal for an initially open dropdown', async () => {
        mountDropdown({ defaultValue: true }); await settle()
        document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true })); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('keeps arbitrary content clicks open and supports the close slot callback', async () => {
        const wrapper = mountDropdown({ teleportDisabled: true }, { content: ({ close }: { close: () => void }) => [h('span', 'Content'), h('button', { onClick: close }, 'Done')] })
        await wrapper.get('button').trigger('click'); await settle()
        await wrapper.get('.h-dropdown span').trigger('click')
        expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
        await wrapper.get('[role="dialog"] button').trigger('click'); await settle()
        expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })
    it('dismisses on outside pointer/focus without stealing focus', async () => {
        const wrapper = mountDropdown()
        const outside = document.createElement('button'); document.body.append(outside)
        await wrapper.get('button').trigger('click'); await settle()
        outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true })); outside.focus(); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        expect(document.activeElement).toBe(outside)
        await wrapper.get('button').trigger('click'); await settle()
        outside.focus(); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('Tab exits from the boundary without focus containment', async () => {
        const wrapper = mountDropdown()
        const outside = document.createElement('button'); document.body.append(outside)
        await wrapper.get('button').trigger('click'); await settle()
        const last = document.querySelector<HTMLElement>('[role="dialog"] button:last-child')!
        last.focus(); last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })); await settle()
        expect(document.activeElement).toBe(outside)
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        await wrapper.get('button').trigger('click'); await settle()
        document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })); await settle()
        expect(document.activeElement).toBe(wrapper.get('button').element)
    })
    it('Escape closes the dropdown before its parent modal', async () => {
        const wrapper = mount(H0Modal, { attachTo: document.body, props: { defaultValue: true, title: 'Parent' }, slots: { default: () => h(H0Dropdown, {}, { default: () => h('button', 'Actions'), content: () => h('button', 'Item') }) } })
        wrappers.push(wrapper); await settle()
        const trigger = Array.from(document.querySelectorAll('button')).find(button => button.textContent === 'Actions')!
        trigger.click(); await settle()
        document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); await settle()
        expect(document.querySelector('[data-h0n-component="dropdown-content"]')).toBeNull()
        expect(document.querySelector('.h-overlay')).not.toBeNull()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
    it('routes sizing/content attributes and cleans up observers on unmount', async () => {
        const wrapper = mountDropdown({ defaultValue: true, minWidth: 200, maxWidth: '24rem', minHeight: 80, maxHeight: '15rem', contentAttrs: { class: 'custom', 'data-testid': 'surface' } })
        await settle()
        const panel = document.querySelector<HTMLElement>('[data-testid="surface"]')!
        expect(panel.classList.contains('custom')).toBe(true)
        expect(panel.style.getPropertyValue('--dropdown-max-width')).toBe('24rem')
        expect(panel.style.getPropertyValue('--dropdown-min-height')).toBe('80px')
        wrapper.unmount(); wrappers.splice(wrappers.indexOf(wrapper), 1)
        expect(stop).toHaveBeenCalled()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('does not override a prevented trigger action or native disabled state', async () => {
        const wrapper = mountDropdown({}, { default: () => h('button', { onClick: (event: Event) => event.preventDefault() }, 'Actions') })
        await wrapper.get('button').trigger('click'); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
        const disabled = mountDropdown({}, { default: () => h('button', { disabled: true }, 'Disabled') })
        await disabled.get('button').trigger('click'); await settle()
        expect(document.querySelector('[role="dialog"]')).toBeNull()
    })
    it('renders stable SSR trigger relationships without browser work', async () => {
        const app = createSSRApp({ render: () => h(H0Dropdown, {}, { default: () => h('button', 'Actions'), content: () => h('p', 'Details') }) })
        const html = await renderToString(app)
        expect(html).toContain('aria-expanded="false"')
        expect(html).toContain('aria-haspopup="dialog"')
        expect(html).not.toContain('dropdown-content')
        const local = await renderToString(createSSRApp({ render: () => h(H0Dropdown, { defaultValue: true, teleportDisabled: true }, { default: () => h('button', { id: 'my-trigger' }, 'Actions'), content: () => h('p', 'Details') }) }))
        expect(local).toContain('aria-labelledby="my-trigger"')
    })
})
