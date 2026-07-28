import { createApp, defineComponent, h, ref } from 'vue'
import H0Nui, { H0Button, H0DataTable, H0Field, H0FileUpload, H0Form, H0Input, H0NumberInput, H0Select, H0Stack, H0Toolbar, createH0LocaleService, useH0Theme } from '@h0nio/ui'
import type { H0SelectValue, H0TableRow, H0TableRowKey } from '@h0nio/ui'
import '@h0nio/ui/components/Button/style.css'
import '@h0nio/ui/components/DataTable/style.css'
import '@h0nio/ui/components/Field/style.css'
import '@h0nio/ui/components/Form/style.css'
import '@h0nio/ui/components/Input/style.css'
import '@h0nio/ui/components/Layout/style.css'
import '@h0nio/ui/components/FileUpload/style.css'
import '@h0nio/ui/components/NumberInput/style.css'
import '@h0nio/ui/components/Toolbar/style.css'
import '@h0nio/ui/components/Select/style.css'
import './integration-app.css'

const rows = Array.from({ length: 1_000 }, (_, index) => ({ id: index, name: `Project ${index + 1}`, status: index % 2 ? 'Active' : 'Draft' }))
const columns = [{ key: 'name', label: 'Project', sortable: true }, { key: 'status', label: 'Status', sortable: true }]

const IntegrationApp = defineComponent({
    setup() {
        const name = ref('')
        const framework = ref<H0SelectValue | null>(null)
        const budget = ref<number | null>(2500)
        const attachments = ref<File[]>([])
        const theme = useH0Theme()
        return () => h('main', { class: 'integration-shell' }, [
            h(H0Stack, { gap: { base: 'md', lg: 'xl' } }, () => [
                h('header', { class: 'integration-toolbar' }, [
                    h('h1', 'Consumer integration fixture'),
                    h(H0Button, { variant: 'soft', onClick: () => theme.setTheme(theme.theme.value === 'dark' ? 'light' : 'dark') }, () => 'Switch theme')
                ]),
                h(H0Form, { onSubmit: () => undefined }, () => [
                    h(H0Field, { label: 'Project name', required: true }, () => h(H0Input, { modelValue: name.value, 'onUpdate:modelValue': (value: string) => { name.value = value } })),
                    h(H0Select, {
                        label: 'Framework',
                        modelValue: framework.value,
                        options: [{ value: 'vue', label: 'Vue' }, { value: 'react', label: 'React' }],
                        'onUpdate:modelValue': (value: H0SelectValue | H0SelectValue[] | null) => {
                            framework.value = Array.isArray(value) ? value[0] ?? null : value
                        },
                    }),
                    h(H0NumberInput, { label: 'Budget', modelValue: budget.value, 'onUpdate:modelValue': (value: number | null) => { budget.value = value } }),
                    h(H0FileUpload, { label: 'Attachments', multiple: true, modelValue: attachments.value, 'onUpdate:modelValue': (value: File[]) => { attachments.value = value } }),
                ]),
                h(H0Toolbar, { items: [{ value: 'refresh', label: 'Refresh' }, { value: 'export', label: 'Export' }] }),
                h(H0DataTable, {
                    columns,
                    rows,
                    getRowKey: (row: H0TableRow): H0TableRowKey => typeof row.id === 'string' || typeof row.id === 'number' ? row.id : 0,
                    paginationMode: 'page',
                    defaultPageSize: 20,
                }),
            ])
        ])
    }
})

const locale = createH0LocaleService({ common: { loading: 'Loading projects' }, dataTable: { label: 'Integration projects' } })
createApp(IntegrationApp).use(H0Nui, { locale }).mount('#app')
