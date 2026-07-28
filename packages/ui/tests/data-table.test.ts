import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import H0DataTable from '../src/components/DataTable/H0DataTable.vue'
import type { H0DataTableColumn } from '../src/components/DataTable/DataTable.types'

const columns: H0DataTableColumn[] = [
    { key: 'name', label: 'Name', sortable: true, filter: { type: 'text' } },
    { key: 'score', label: 'Score', sortable: true }
]
const getRowKey = (row: Record<string, unknown>) => String(row.id)

function renderedNames(wrapper: ReturnType<typeof mount>) {
    return wrapper.findAll('.h-table__row').map((row) => row.findAll('td')[0]?.text())
}

describe('H0DataTable', () => {
    it('runs filter, stable sort and page in order while keeping null values last', () => {
        const rows = [
            { id: 'a', name: 'Alpha', score: 2 },
            { id: 'b', name: 'Beta', score: null },
            { id: 'c', name: 'Gamma', score: 10 },
            { id: 'd', name: 'Delta', score: 2 }
        ]
        const wrapper = mount(H0DataTable, {
            props: {
                columns,
                filters: { name: 'a' },
                getRowKey,
                page: 1,
                pageSize: 3,
                paginationMode: 'page',
                rows,
                sort: { key: 'score', direction: 'desc' }
            }
        })

        expect(renderedNames(wrapper)).toEqual(['Gamma', 'Alpha', 'Delta'])
        expect(wrapper.get('th:nth-child(2)').attributes('aria-sort')).toBe('descending')
    })

    it('does not transform rows in server mode', () => {
        const wrapper = mount(H0DataTable, {
            props: {
                columns,
                filters: { name: 'missing' },
                getRowKey,
                mode: 'server',
                page: 4,
                pageSize: 1,
                paginationMode: 'page',
                rows: [
                    { id: 1, name: 'Server B', score: 2 },
                    { id: 2, name: 'Server A', score: 1 }
                ],
                sort: { key: 'name', direction: 'asc' },
                totalItems: 20
            }
        })

        expect(renderedNames(wrapper)).toEqual(['Server B', 'Server A'])
    })

    it('selects only the current client page and emits accessible sort/filter models', async () => {
        const wrapper = mount(H0DataTable, {
            props: {
                columns,
                getRowKey,
                pageSize: 2,
                paginationMode: 'page',
                rows: [
                    { id: 1, name: 'One', score: 1 },
                    { id: 2, name: 'Two', score: 2 },
                    { id: 3, name: 'Three', score: 3 }
                ],
                selectionMode: 'multiple'
            }
        })

        await wrapper.findAll('input[type="checkbox"]')[0].trigger('change')
        await wrapper.get('button[aria-label="Sort by Name"]').trigger('click')
        await wrapper.get('input[aria-label="Filter Name"]').setValue('tw')

        expect(wrapper.emitted('update:selection')?.[0]).toEqual([['1', '2']])
        expect(wrapper.emitted('update:sort')?.[0]).toEqual([{ key: 'name', direction: 'asc' }])
        expect(wrapper.emitted('update:filters')?.[0]).toEqual([{ name: 'tw' }])
        expect(wrapper.emitted('update:page')).toEqual([[1], [1]])
    })

    it('composes selection and filters from public form controls', () => {
        const wrapper = mount(H0DataTable, {
            props: {
                columns: [
                    ...columns,
                    { key: 'team', label: 'Team', filter: { type: 'select', options: [{ label: 'Core', value: 'core' }] } }
                ],
                getRowKey,
                rows: [{ id: 1, name: 'One', score: 1, team: 'core' }],
                selectionMode: 'multiple'
            }
        })

        expect(wrapper.findAll('[data-h0n-component="checkbox"]')).toHaveLength(2)
        expect(wrapper.find('[data-h0n-component="search-field"]').exists()).toBe(true)
        expect(wrapper.find('[data-h0n-component="select"]').exists()).toBe(true)
        expect(wrapper.find('.h-data-table__filter').exists()).toBe(false)
    })

    it('locks infinite loading until loading completes or rows append', async () => {
        const wrapper = mount(H0DataTable, {
            props: {
                columns,
                getRowKey,
                hasMore: true,
                paginationMode: 'infinite',
                rows: [{ id: 1, name: 'One', score: 1 }]
            }
        })
        const viewport = wrapper.get('.h-table__viewport').element as HTMLElement
        Object.defineProperties(viewport, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 200 },
            scrollTop: { configurable: true, writable: true, value: 100 }
        })

        await wrapper.get('.h-table__viewport').trigger('scroll')
        await wrapper.get('.h-table__viewport').trigger('scroll')
        expect(wrapper.emitted('load-more')).toHaveLength(1)

        await wrapper.setProps({ rows: [{ id: 1, name: 'One', score: 1 }, { id: 2, name: 'Two', score: 2 }] })
        await wrapper.get('.h-table__viewport').trigger('scroll')
        expect(wrapper.emitted('load-more')).toHaveLength(2)
    })

    it('keeps the DOM bounded for 10,000 virtual rows and preserves selection after recycling', async () => {
        const rows = Array.from({ length: 10_000 }, (_, index) => ({ id: index, name: `Row ${index}`, score: index }))
        const wrapper = mount(H0DataTable, {
            props: {
                columns,
                getRowKey,
                overscan: 5,
                rowHeight: 24,
                rows,
                scrollHeight: 240,
                selection: ['5000'],
                selectionMode: 'multiple',
                virtual: true
            }
        })
        const viewport = wrapper.get('.h-table__viewport').element as HTMLElement
        Object.defineProperties(viewport, {
            clientHeight: { configurable: true, value: 240 },
            scrollHeight: { configurable: true, value: 240_000 },
            scrollTop: { configurable: true, writable: true, value: 5000 * 24 }
        })

        expect(wrapper.findAll('.h-table__row').length).toBeLessThanOrEqual(20)
        await wrapper.get('.h-table__viewport').trigger('scroll')

        expect(wrapper.text()).toContain('Row 5000')
        const recycledRow = wrapper.findAll('.h-table__row').find((row) => row.text().includes('Row 5000'))
        expect((recycledRow?.get('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true)
    })

    it('warns for duplicate row keys', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

        mount(H0DataTable, { props: { columns, getRowKey, rows: [{ id: 1, name: 'A' }, { id: 1, name: 'B' }] } })

        expect(warn).toHaveBeenCalledWith('[H0N UI] DataTable row keys must be unique and stable.')
    })
})
