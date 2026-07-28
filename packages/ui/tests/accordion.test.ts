import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0Accordion from '../src/components/Accordion/H0Accordion.vue'
import type { H0AccordionItem } from '../src/components/Accordion/Accordion.types'

const items: H0AccordionItem[] = [
    { title: 'Account', content: 'Account details' },
    { title: 'Billing', content: 'Billing details' },
    { title: 'Security', content: 'Security details', disabled: true },
]

describe('H0Accordion', () => {
    it('keeps one panel open by default and updates its disclosure relationships', async () => {
        const wrapper = mount(H0Accordion, { props: { id: 'settings', items, defaultOpen: [0, 1] } })
        const buttons = wrapper.findAll('button')
        const panels = wrapper.findAll('[role="region"]')

        expect(buttons[0]?.attributes()).toMatchObject({ 'aria-controls': 'settings-panel-0', 'aria-expanded': 'true', id: 'settings-header-0' })
        expect(buttons[1]?.attributes('aria-expanded')).toBe('false')
        expect(panels[0]?.attributes()).toMatchObject({ 'aria-hidden': 'false', 'aria-labelledby': 'settings-header-0' })
        expect(panels[0]?.attributes('inert')).toBeUndefined()
        expect(panels[1]?.attributes('inert')).toBeDefined()

        await buttons[1]?.trigger('click')

        expect(buttons[0]?.attributes('aria-expanded')).toBe('false')
        expect(buttons[1]?.attributes('aria-expanded')).toBe('true')
    })

    it('supports multiple open panels and ignores disabled items', async () => {
        const wrapper = mount(H0Accordion, { props: { items, multiple: true, defaultOpen: [0, 1] } })
        const buttons = wrapper.findAll('button')

        expect(buttons.slice(0, 2).map((button) => button.attributes('aria-expanded'))).toEqual(['true', 'true'])
        expect(buttons[2]?.attributes('disabled')).toBeDefined()

        await buttons[2]?.trigger('click')
        expect(buttons[2]?.attributes('aria-expanded')).toBe('false')
    })

    it('normalizes compatibility fields for the item slot', () => {
        const wrapper = mount(H0Accordion, {
            props: { items: [{ question: 'Legacy question', answer: 'Legacy answer' }] },
            slots: {
                item: ({ item, index, open }: { item: H0AccordionItem; index: number; open: boolean }) => `${item.title}|${item.content}|${index}|${open}`,
            },
        })

        expect(wrapper.text()).toContain('Legacy question|Legacy answer|0|false')
    })
})
