import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import H0Nui from '../src'
import H0ButtonGroup from '../src/components/ButtonGroup/H0ButtonGroup.vue'
import H0Form from '../src/components/Form/H0Form.vue'
import H0Input from '../src/components/Input/H0Input.vue'
import H0Pagination from '../src/components/Pagination/H0Pagination.vue'

describe('plugin-level public contracts', () => {
    it('emits the canonical button-click event', async () => {
        const wrapper = mount(H0ButtonGroup, {
            props: {
                buttons: [{ label: 'Save' }]
            }
        })

        await wrapper.get('button').trigger('click')

        expect(wrapper.emitted('button-click')).toEqual([[{ label: 'Save' }, 0]])
    })

    it('uses plugin locale messages in Pagination and Form', async () => {
        const global = {
            plugins: [
                [
                    H0Nui,
                    {
                        locale: {
                            form: {
                                required: (label?: string) => `Required: ${label ?? 'field'}`
                            },
                            pagination: {
                                label: 'Pages',
                                next: 'Forward',
                                page: (page: number) => `Open page ${page}`,
                                previous: 'Back',
                                summary: (start: number, end: number, total: number) => `${start}/${end}/${total}`
                            }
                        }
                    }
                ]
            ]
        }
        const pagination = mount(H0Pagination, {
            global,
            props: {
                showSummary: true,
                totalItems: 20
            }
        })

        expect(pagination.get('nav').attributes('aria-label')).toBe('Pages')
        expect(pagination.text()).toContain('Back')
        expect(pagination.text()).toContain('Forward')
        expect(pagination.text()).toContain('1/10/20')
        expect(pagination.get('[aria-label="Open page 1"]').exists()).toBe(true)

        const form = mount(H0Form, {
            global,
            slots: {
                default: () => h(H0Input, { label: 'Email', modelValue: '', name: 'email', required: true })
            }
        })

        await form.get('form').trigger('submit')
        expect((form.emitted('invalid')?.[0]?.[0] as { errors: Record<string, string> }).errors).toEqual({ email: 'Required: Email' })
    })
})
