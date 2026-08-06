import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import H0Tooltip from '../src/components/Tooltip/H0Tooltip.vue'
import { autoUpdate } from '@floating-ui/dom'

vi.mock('@floating-ui/dom', async (importOriginal) => {
    const floatingUi = await importOriginal<typeof import('@floating-ui/dom')>()

    return {
        ...floatingUi,
        autoUpdate: vi.fn(() => () => undefined)
    }
})

afterEach(() => {
    document.body.innerHTML = ''
})

describe('Tooltip positioning', () => {
    it('positions against the actual trigger instead of its layout wrapper', async () => {
        const wrapper = mount(H0Tooltip, {
            props: {
                content: 'Hint',
                defaultValue: true,
                teleportDisabled: true
            },
            slots: {
                trigger: ({ triggerAttrs }: { triggerAttrs: Record<string, unknown> }) =>
                    h('button', { ...triggerAttrs, type: 'button' }, 'Target')
            }
        })

        await nextTick()
        await nextTick()

        const trigger = wrapper.get('button').element
        expect(vi.mocked(autoUpdate)).toHaveBeenCalledWith(trigger, expect.any(HTMLElement), expect.any(Function))

        wrapper.unmount()
    })
})
