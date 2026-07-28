import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import H0ImageUpload from '../src/components/ImageUpload/H0ImageUpload.vue'
import H0Description from '../src/components/Typography/H0Description.vue'
import H0ErrorMessage from '../src/components/Typography/H0ErrorMessage.vue'
import H0Label from '../src/components/Typography/H0Label.vue'
import H0Typography from '../src/components/Typography/H0Typography.vue'

describe('typography primitives', () => {
    it('uses variant defaults and supports an explicit weight', () => {
        const heading = mount(H0Typography, { props: { text: 'Heading', variant: 'h2' } })
        const emphasizedBody = mount(H0Typography, { props: { text: 'Body', variant: 'body', weight: 500 } })

        expect(heading.element.tagName).toBe('H2')
        expect(heading.classes()).toContain('h-typography--h2')
        expect(heading.classes()).not.toContain('h-typography--weight-500')
        expect(emphasizedBody.classes()).toContain('h-typography--weight-500')
    })

    it('renders label, legend and inline semantics without leaking for', () => {
        const label = mount(H0Label, { props: { htmlFor: 'email', text: 'Email' } })
        const legend = mount(H0Label, { props: { as: 'legend', htmlFor: 'ignored', text: 'Options' } })
        const inline = mount(H0Label, { props: { as: 'span', htmlFor: 'ignored', text: 'Inline' } })

        expect(label.element.tagName).toBe('LABEL')
        expect(label.attributes('for')).toBe('email')
        expect(legend.element.tagName).toBe('LEGEND')
        expect(legend.attributes('for')).toBeUndefined()
        expect(inline.element.tagName).toBe('SPAN')
        expect(inline.attributes('for')).toBeUndefined()
    })

    it('supports regular descriptions at both documented sizes', () => {
        const compact = mount(H0Description, { props: { as: 'span', text: 'Metadata', variant: 'body-xs' } })

        expect(compact.element.tagName).toBe('SPAN')
        expect(compact.classes()).toContain('h-typography--body-xs')
        expect(compact.classes()).toContain('h-typography--weight-400')
    })

    it('keeps error announcements opt-in', () => {
        const passive = mount(H0ErrorMessage, { props: { text: 'Static error' } })
        const announced = mount(H0ErrorMessage, { attrs: { role: 'alert' }, props: { as: 'span', text: 'Dynamic error' } })

        expect(passive.attributes('role')).toBeUndefined()
        expect(passive.classes()).toContain('h-typography--weight-500')
        expect(announced.element.tagName).toBe('SPAN')
        expect(announced.attributes('role')).toBe('alert')
    })

    it('announces ImageUpload validation errors through H0ErrorMessage', async () => {
        const wrapper = mount(H0ImageUpload)
        const input = wrapper.get<HTMLInputElement>('input[type="file"]')
        const file = new File(['text'], 'notes.txt', { type: 'text/plain' })

        Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })
        await input.trigger('change')

        const error = wrapper.get('.h-image-upload__error')

        expect(error.classes()).toContain('h-error-message')
        expect(error.attributes('role')).toBe('alert')
    })
})
