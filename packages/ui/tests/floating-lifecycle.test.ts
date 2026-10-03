import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { autoUpdate, computePosition } from '@floating-ui/dom'
import { useFloatingSurface } from '../src/components/_shared/useFloatingSurface'

vi.mock('@floating-ui/dom', () => ({
    computePosition: vi.fn(), autoUpdate: vi.fn(() => vi.fn()),
    offset: vi.fn(), flip: vi.fn(), shift: vi.fn(), arrow: vi.fn(), size: vi.fn(),
}))
const result = (x: number) => ({ x, y: x, placement: 'bottom-start', strategy: 'fixed', middlewareData: {} })
function harness() {
    const open = ref(true)
    const reference = ref<HTMLElement | null>(document.createElement('button'))
    const floating = ref<HTMLElement | null>(document.createElement('div'))
    const placement = ref<'bottom-start' | 'top-start'>('bottom-start')
    let surface!: ReturnType<typeof useFloatingSurface>
    const wrapper = mount(defineComponent({ setup() {
        surface = useFloatingSurface({ open, reference, floating, placement })
        return () => h('span')
    } }))
    return { open, reference, floating, placement, surface, wrapper }
}
describe('floating positioning lifecycle', () => {
    beforeEach(() => { vi.mocked(computePosition).mockReset() })
    it('ignores an older result finishing after a newer position', async () => {
        let finish!: (value: ReturnType<typeof result>) => void
        vi.mocked(computePosition).mockImplementationOnce(() => new Promise(resolve => { finish = resolve as typeof finish }))
        vi.mocked(computePosition).mockResolvedValueOnce(result(20) as any)
        const { surface, wrapper } = harness()
        const first = surface.update()
        await surface.update()
        finish(result(1))
        await first
        expect(surface.floatingStyles.value.left).toBe('20px')
        wrapper.unmount()
    })
    it('does not apply an in-flight result after close or unmount', async () => {
        let finish!: (value: ReturnType<typeof result>) => void
        vi.mocked(computePosition).mockImplementation(() => new Promise(resolve => { finish = resolve as typeof finish }))
        const { surface, open, wrapper } = harness()
        const pending = surface.update()
        open.value = false
        await flushPromises()
        wrapper.unmount()
        finish(result(50))
        await pending
        expect(surface.floatingStyles.value).toEqual({})
    })
    it('rebinds observers when an open anchor changes and positions when options change', async () => {
        const { reference, placement, wrapper } = harness()
        await flushPromises()
        const before = vi.mocked(autoUpdate).mock.calls.length
        reference.value = document.createElement('button')
        await flushPromises()
        expect(vi.mocked(autoUpdate).mock.calls.length).toBeGreaterThan(before)
        const after = vi.mocked(autoUpdate).mock.calls.length
        placement.value = 'top-start'
        await flushPromises()
        expect(vi.mocked(autoUpdate).mock.calls.length).toBeGreaterThan(after)
        wrapper.unmount()
    })
})
