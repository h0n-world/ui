import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0FileUpload from '../src/components/FileUpload/H0FileUpload.vue'
import type { H0UploadAdapterContext, H0UploadItem } from '../src/types'

const files = (count: number) => Array.from({ length: count }, (_, i) => new File(['x'], `${i}.txt`))
function deferredUploads() {
    const pending: { context: H0UploadAdapterContext; resolve: (value: unknown) => void }[] = []
    const upload = vi.fn((_file: File, context: H0UploadAdapterContext) => new Promise(resolve => pending.push({ context, resolve })))
    return { pending, upload }
}
type UploadVM = { start: () => Promise<void>; retry: (id: string) => void; cancel: (id: string) => void; clear: () => void; remove: (id: string) => void; queue: H0UploadItem[] }
async function select(wrapper: ReturnType<typeof mount>, incoming: File[]) {
    Object.defineProperty(wrapper.get('input').element, 'files', { configurable: true, value: incoming })
    await wrapper.get('input').trigger('change')
}

describe('FileUpload lifecycle', () => {
    it('does not start more jobs when concurrency drops below the number running', async () => {
        const { upload, pending } = deferredUploads()
        const wrapper = mount(H0FileUpload, { props: { multiple: true, defaultValue: files(8), upload, concurrency: 3 } })
        const vm = wrapper.vm as unknown as UploadVM
        void vm.start()
        expect(upload).toHaveBeenCalledTimes(3)
        await wrapper.setProps({ concurrency: 1 })
        void vm.start()
        expect(upload).toHaveBeenCalledTimes(3)
        pending[0].resolve(null)
        await flushPromises()
        expect(upload).toHaveBeenCalledTimes(3)
        wrapper.unmount()
    })
    it('ignores retry of a running job', () => {
        const { upload } = deferredUploads()
        const wrapper = mount(H0FileUpload, { props: { defaultValue: files(1), upload } })
        const vm = wrapper.vm as unknown as UploadVM
        void vm.start()
        vm.retry(vm.queue[0].id)
        expect(upload).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })
    it('does not emit progress or success, or start pending jobs, after unmount', async () => {
        const { upload, pending } = deferredUploads()
        const onProgress = vi.fn()
        const onSuccess = vi.fn()
        const wrapper = mount(H0FileUpload, { props: { multiple: true, defaultValue: files(2), upload, concurrency: 1, onProgress, onSuccess } })
        void (wrapper.vm as unknown as UploadVM).start()
        wrapper.unmount()
        expect(pending[0].context.signal.aborted).toBe(true)
        pending[0].context.onProgress(50)
        pending[0].resolve(null)
        await flushPromises()
        expect(onProgress).not.toHaveBeenCalled()
        expect(onSuccess).not.toHaveBeenCalled()
        expect(upload).toHaveBeenCalledTimes(1)
    })
    it('does not report aborted adapters that resolve successfully as success', async () => {
        const { upload, pending } = deferredUploads()
        const wrapper = mount(H0FileUpload, { props: { defaultValue: files(1), upload } })
        const vm = wrapper.vm as unknown as UploadVM
        const done = vm.start()
        vm.cancel(vm.queue[0].id)
        pending[0].context.onProgress(80)
        pending[0].resolve(null)
        await done
        expect(wrapper.emitted('success')).toBeUndefined()
        expect(wrapper.emitted('progress')).toBeUndefined()
        expect(wrapper.emitted('cancel')).toHaveLength(1)
        expect(vm.queue[0].status).toBe('cancelled')
        wrapper.unmount()
    })
    it('keeps newly started jobs accounted for after clearing an old queue', async () => {
        const { upload, pending } = deferredUploads()
        const wrapper = mount(H0FileUpload, { props: { multiple: true, defaultValue: files(1), upload, concurrency: 1 } })
        const vm = wrapper.vm as unknown as UploadVM
        void vm.start()
        vm.clear()
        await wrapper.setProps({ modelValue: files(3) })
        void vm.start()
        expect(upload).toHaveBeenCalledTimes(2)
        pending[0].resolve(null)
        await flushPromises()
        expect(upload).toHaveBeenCalledTimes(2)
        expect(wrapper.emitted('success')).toBeUndefined()
        wrapper.unmount()
    })
    it.each([Number.NaN, Number.POSITIVE_INFINITY, 0, -1])('normalizes invalid concurrency %s to a usable bound', concurrency => {
        const { upload } = deferredUploads()
        const wrapper = mount(H0FileUpload, { props: { multiple: true, defaultValue: files(5), upload, concurrency } })
        void (wrapper.vm as unknown as UploadVM).start()
        expect(upload).toHaveBeenCalledTimes(1)
        wrapper.unmount()
    })
    it('serializes overlapping selections and validates the current file count', async () => {
        let finish!: (value: null) => void
        const validator = vi.fn().mockImplementationOnce(() => new Promise<null>(resolve => { finish = resolve })).mockResolvedValue(null)
        const wrapper = mount(H0FileUpload, { props: { multiple: true, maxFiles: 1, validator } })
        const [first, second] = files(2)
        await select(wrapper, [first])
        await select(wrapper, [second])
        finish(null)
        await flushPromises()
        expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([first])
        expect(wrapper.emitted('invalid')?.[0]?.[0]).toMatchObject({ code: 'count', file: second })
        wrapper.unmount()
    })
    it('does not resurrect cleared files when async validation finishes', async () => {
        let finish!: (value: null) => void
        const validator = () => new Promise<null>(resolve => { finish = resolve })
        const wrapper = mount(H0FileUpload, { props: { multiple: true, validator } })
        await select(wrapper, files(1))
        ;(wrapper.vm as unknown as UploadVM).clear()
        finish(null)
        await flushPromises()
        expect(wrapper.emitted('add')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[]])
        wrapper.unmount()
    })
    it('converts validator rejection to a validation error and connects the input to its message', async () => {
        const wrapper = mount(H0FileUpload, { props: { validator: async () => { throw new Error('Unavailable') } } })
        await select(wrapper, files(1))
        await flushPromises()
        expect(wrapper.emitted('invalid')?.[0]?.[0]).toMatchObject({ code: 'custom' })
        expect(wrapper.emitted('add')).toBeUndefined()
        expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
        const id = wrapper.get('input').attributes('aria-describedby')
        expect(wrapper.get(`[id="${id}"]`).text()).not.toBe('')
        wrapper.unmount()
    })
    it('ignores dropped files while disabled', async () => {
        const wrapper = mount(H0FileUpload, { props: { disabled: true } })
        await wrapper.get('.h-file-upload__drop').trigger('drop', { dataTransfer: { files: files(1) } })
        await flushPromises()
        expect(wrapper.emitted('add')).toBeUndefined()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        wrapper.unmount()
    })
})
