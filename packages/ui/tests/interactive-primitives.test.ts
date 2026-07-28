import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0Card from '../src/components/Card/H0Card.vue'
import H0ListItem from '../src/components/List/H0ListItem.vue'

describe('shared interactive behavior', () => {
    it('gives an interactive non-native Card button semantics', async () => {
        const onClick = vi.fn()
        const wrapper = mount(H0Card, {
            attrs: { onClick },
            props: { interactive: true },
            slots: { default: 'Open details' }
        })
        const card = wrapper.get('[role="button"]')

        expect(card.attributes('tabindex')).toBe('0')

        await card.trigger('keydown', { key: ' ' })
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('blocks disabled custom interactive elements', async () => {
        const onClick = vi.fn()
        const wrapper = mount(H0ListItem, {
            attrs: { onClick },
            props: {
                as: 'div',
                disabled: true,
                title: 'Unavailable action'
            }
        })
        const item = wrapper.get('.h-list-item')

        expect(item.attributes('aria-disabled')).toBe('true')
        expect(item.attributes('tabindex')).toBe('-1')

        await item.trigger('click')
        await item.trigger('keydown', { key: 'Enter' })
        expect(onClick).not.toHaveBeenCalled()
    })
})
