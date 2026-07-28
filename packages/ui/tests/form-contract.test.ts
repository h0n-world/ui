import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Checkbox from '../src/components/Checkbox/H0Checkbox.vue'
import H0CheckboxGroup from '../src/components/Checkbox/H0CheckboxGroup.vue'
import H0Form from '../src/components/Form/H0Form.vue'
import H0ImageUpload from '../src/components/ImageUpload/H0ImageUpload.vue'
import H0Input from '../src/components/Input/H0Input.vue'
import H0Select from '../src/components/Select/H0Select.vue'

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('H0Form semantic contract', () => {
    it('emits one aggregate change for a registered native control and does not repeat it on submit', async () => {
        const Host = defineComponent({
            components: { H0Checkbox, H0Form },
            setup() {
                return { accepted: ref(false), values: ref({}) }
            },
            template: `<H0Form v-model="values"><H0Checkbox v-model="accepted" name="accepted" /></H0Form>`
        })
        const wrapper = mount(Host)
        const form = wrapper.findComponent(H0Form)

        await wrapper.findComponent(H0Checkbox).get('input').setValue(true)

        expect(form.emitted('update:modelValue')).toEqual([[{ accepted: true }]])
        expect(form.emitted('change')).toEqual([[{ accepted: true }]])

        await form.get('form').trigger('submit')

        expect(form.emitted('update:modelValue')).toHaveLength(1)
        expect(form.emitted('change')).toHaveLength(1)
        expect(form.emitted('submit')).toHaveLength(1)
    })

    it('keeps repeated registered names aggregated during field updates', async () => {
        const Host = defineComponent({
            components: { H0Form, H0Input },
            setup() {
                return {
                    first: ref('primary'),
                    second: ref('secondary'),
                    values: ref({})
                }
            },
            template: `
                <H0Form v-model="values">
                    <H0Input v-model="first" name="alias" />
                    <H0Input v-model="second" name="alias" />
                </H0Form>
            `
        })
        const wrapper = mount(Host)
        const inputs = wrapper.findAllComponents(H0Input)

        await inputs[1].get('input').setValue('updated')

        expect((wrapper.vm as unknown as { values: Record<string, unknown> }).values).toEqual({
            alias: ['primary', 'updated']
        })
    })

    it('prefers registered values, preserves arrays and adds only unregistered native controls', async () => {
        const Host = defineComponent({
            components: { H0CheckboxGroup, H0Form, H0Input, H0Select },
            setup() {
                return {
                    aliases: ref('primary'),
                    choices: ref<(string | number)[]>(['pro', 2]),
                    duplicate: ref('secondary'),
                    tags: ref(['vue', 'a11y']),
                    values: ref({})
                }
            },
            template: `
                <H0Form v-model="values">
                    <H0Input v-model="aliases" name="alias" />
                    <H0Input v-model="duplicate" name="alias" />
                    <H0CheckboxGroup v-model="tags" name="tags" :options="[{ label: 'Vue', value: 'vue' }, { label: 'A11y', value: 'a11y' }]" />
                    <H0Select v-model="choices" name="plans" multiple :options="[{ label: 'Pro', value: 'pro' }, { label: 'Team', value: 2 }]" />
                    <input name="native" value="browser-value" />
                    <H0Input model-value="ignored" name="disabled-field" disabled />
                </H0Form>
            `
        })
        const wrapper = mount(Host)
        const form = wrapper.findComponent(H0Form)

        await form.get('form').trigger('submit')

        const payload = form.emitted('submit')?.[0]?.[0] as { formData: FormData; values: Record<string, unknown> }
        expect(payload.values).toEqual({
            alias: ['primary', 'secondary'],
            native: 'browser-value',
            plans: ['pro', 2],
            tags: ['vue', 'a11y']
        })
        expect(payload.formData.getAll('plans')).toEqual(['pro', '2'])
        expect(payload.formData.getAll('tags')).toEqual(['vue', 'a11y'])
        expect(payload.formData.has('disabled-field')).toBe(false)
    })

    it('resets registered controls to their component defaults', async () => {
        const Host = defineComponent({
            components: { H0Form, H0Input },
            setup() {
                return { title: ref('Changed'), values: ref({}) }
            },
            template: `<H0Form v-model="values"><H0Input v-model="title" name="title" default-value="Initial" /></H0Form>`
        })
        const wrapper = mount(Host)
        const form = wrapper.findComponent(H0Form)

        await form.get('form').trigger('reset')
        await nextTick()

        expect((wrapper.vm as unknown as { title: string }).title).toBe('Initial')
        expect((wrapper.vm as unknown as { values: Record<string, unknown> }).values).toEqual({ title: 'Initial' })
    })

    it('includes unregistered native defaults in reset values', async () => {
        const Host = defineComponent({
            components: { H0Form },
            setup() {
                return { values: ref({}) }
            },
            template: `<H0Form v-model="values"><input name="native" value="Initial" /></H0Form>`
        })
        const wrapper = mount(Host)
        const form = wrapper.findComponent(H0Form)
        const input = form.get('input')

        await input.setValue('Changed')
        ;(form.get('form').element as HTMLFormElement).reset()
        await nextTick()

        expect((wrapper.vm as unknown as { values: Record<string, unknown> }).values).toEqual({ native: 'Initial' })
        expect(form.emitted('reset')).toHaveLength(1)
    })

    it('disables registered and native validation when validateOnSubmit is false', async () => {
        const wrapper = mount(H0Form, {
            props: { validateOnSubmit: false },
            slots: { default: `<H0Input name="required-field" label="Required field" required />` },
            global: { components: { H0Input } }
        })

        await wrapper.get('form').trigger('submit')

        expect(wrapper.emitted('invalid')).toBeUndefined()
        expect(wrapper.emitted('submit')).toHaveLength(1)
    })

    it('replaces stale generated validation errors on each submit', async () => {
        const wrapper = mount(H0Form, {
            props: { clearErrorOnInput: false },
            slots: { default: `<H0Input name="title" label="Title" required />` },
            global: { components: { H0Input } }
        })

        await wrapper.get('form').trigger('submit')
        expect(wrapper.emitted('invalid')).toHaveLength(1)

        await wrapper.get('input').setValue('Ready')
        await wrapper.get('form').trigger('submit')

        expect(wrapper.emitted('submit')).toHaveLength(1)
        expect(wrapper.emitted('submit')?.[0]?.[0]).toMatchObject({ errors: {}, valid: true })
    })

    it('focuses the first invalid registered field', async () => {
        const wrapper = mount(H0Form, {
            attachTo: document.body,
            slots: {
                default: `<H0Input model-value="" name="first" label="First" required /><H0Input model-value="" name="second" label="Second" required />`
            },
            global: { components: { H0Input } }
        })

        await wrapper.get('form').trigger('submit')

        expect(document.activeElement).toBe(wrapper.findAll('input')[0].element)
        wrapper.unmount()
    })

    it('returns File values semantically and emits standardized invalid errors', async () => {
        vi.stubGlobal('URL', {
            createObjectURL: vi.fn(() => 'blob:preview'),
            revokeObjectURL: vi.fn()
        })
        const Host = defineComponent({
            components: { H0Form, H0ImageUpload },
            setup() {
                return { image: ref<File | null>(null), values: ref({}) }
            },
            template: `<H0Form v-model="values"><H0ImageUpload v-model="image" name="image" accept="image/png" /></H0Form>`
        })
        const wrapper = mount(Host)
        const upload = wrapper.findComponent(H0ImageUpload)
        const input = upload.get('input[type="file"]')
        const file = new File(['image'], 'avatar.png', { type: 'image/png' })

        Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })
        await input.trigger('change')
        await wrapper.findComponent(H0Form).get('form').trigger('submit')

        const payload = wrapper.findComponent(H0Form).emitted('submit')?.[0]?.[0] as { values: Record<string, unknown> }
        expect(payload.values.image).toBe(file)
        expect(upload.emitted('invalid')).toBeUndefined()

        const invalidFile = new File(['text'], 'notes.txt', { type: 'text/plain' })
        Object.defineProperty(input.element, 'files', { configurable: true, value: [invalidFile] })
        await input.trigger('change')
        expect(upload.emitted('invalid')?.[0]?.[0]).toMatchObject({ code: 'format', file: invalidFile })

        const replacement = new File(['replacement'], 'replacement.png', { type: 'image/png' })
        Object.defineProperty(input.element, 'files', { configurable: true, value: [replacement] })
        await input.trigger('change')
        const revokedBeforeUnmount = vi.mocked(URL.revokeObjectURL).mock.calls.length
        expect(revokedBeforeUnmount).toBeGreaterThan(0)
        wrapper.unmount()
        expect(vi.mocked(URL.revokeObjectURL).mock.calls.length).toBeGreaterThan(revokedBeforeUnmount)
    })
})
