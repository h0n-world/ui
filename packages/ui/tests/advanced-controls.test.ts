import { flushPromises, mount } from '@vue/test-utils'
import { createApp, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import H0Nui, { H0FileUpload, H0NumberInput, H0PasswordInput, h0ComponentManifest } from '../src'
import { parseH0Number, stepH0Number } from '../src/components/_shared/number'

describe('advanced form control contracts', () => {
    it('registers every advanced control from the manifest in the plugin', () => {
        const app = createApp({ render: () => null })
        app.use(H0Nui)
        for (const entry of h0ComponentManifest.filter((item) => ['FileUpload', 'NumberInput', 'PasswordInput', 'Toolbar'].includes(item.family))) expect(app._context.components[entry.name], entry.name).toBeTruthy()
        app.unmount()
    })

    it('parses locale numbers and performs decimal-safe steps', () => {
        expect(parseH0Number('1.234,5', 'de-DE')).toBe(1234.5)
        expect(parseH0Number('-', 'en-US')).toBeUndefined()
        expect(stepH0Number(0.1, 0.2, 1, 1)).toBe(0.3)
    })

    it('keeps partial NumberInput text without emitting an invalid model', async () => {
        const wrapper = mount(H0NumberInput, { props: { defaultValue: null, locale: 'en-US' } })
        await wrapper.get('input').setValue('-')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        await wrapper.get('input').setValue('1.25')
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1.25])
    })

    it('keeps NumberInput step controls on opposite sides of the input', () => {
        const wrapper = mount(H0NumberInput)
        const control = wrapper.get('.h-number-input__control')
        const children = Array.from(control.element.children)

        expect(children[0]).toBe(wrapper.get('.h-number-input__step--decrement').element)
        expect(children[1]).toBe(wrapper.get('input').element)
        expect(children[2]).toBe(wrapper.get('.h-number-input__step--increment').element)
        expect(wrapper.classes()).toContain('h-number-input--md')
    })

    it('uses one custom PasswordInput visibility control', async () => {
        const wrapper = mount(H0PasswordInput, { props: { defaultValue: 'secret' } })
        const toggle = wrapper.get('.h-password-input__toggle')

        expect(wrapper.get('input').attributes('type')).toBe('password')
        expect(toggle.findAll('svg')).toHaveLength(1)
        await toggle.trigger('click')
        expect(wrapper.get('input').attributes('type')).toBe('text')
        expect(toggle.attributes('aria-pressed')).toBe('true')
        expect(wrapper.classes()).toContain('h-password-input--md')
    })

    it('validates FileUpload count before mutating the model', async () => {
        const invalid = vi.fn()
        const wrapper = mount(H0FileUpload, { props: { multiple: true, maxFiles: 1, onInvalid: invalid } })
        const first = new File(['a'], 'a.txt', { type: 'text/plain' })
        const second = new File(['b'], 'b.txt', { type: 'text/plain' })
        const input = wrapper.get('input[type=file]').element as HTMLInputElement
        Object.defineProperty(input, 'files', { configurable: true, value: [first, second] })
        await wrapper.get('input[type=file]').trigger('change')
        await nextTick()
        expect(invalid).toHaveBeenCalled()
        expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([first])
        wrapper.unmount()
    })

    it('renders FileUpload actions with H0Button and starts the reactive queue', async () => {
        const file = new File(['release'], 'release.txt', { type: 'text/plain' })
        const upload = vi.fn(async (_file: File, { onProgress }: { onProgress: (progress: number) => void }) => {
            onProgress(50)
            return { uploaded: true }
        })
        const wrapper = mount(H0FileUpload, { props: { defaultValue: [file], upload } })
        const actions = wrapper.findAll('[data-h0n-component="button"]')

        expect(actions).toHaveLength(3)
        expect(wrapper.findAll('.h-file-upload__list button:not(.h-button)')).toHaveLength(0)

        const startButton = actions.find((button) => button.text() === 'Upload files')
        expect(startButton).toBeDefined()
        await startButton!.trigger('click')
        await flushPromises()

        expect(upload).toHaveBeenCalledWith(file, expect.objectContaining({ signal: expect.any(AbortSignal), onProgress: expect.any(Function) }))
        expect(wrapper.emitted('upload-start')).toHaveLength(1)
        expect(wrapper.emitted('progress')).toHaveLength(1)
        expect(wrapper.emitted('success')).toHaveLength(1)
        expect(wrapper.findAll('[data-h0n-component="button"]').some((button) => button.text() === 'Upload files')).toBe(false)
        wrapper.unmount()
    })

})
