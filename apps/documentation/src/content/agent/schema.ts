import type { H0ComponentManifestEntry } from '../../../../../packages/ui/src/manifest.ts'

export type ComponentAgentStatus = 'migrated'

export type ComponentApiEntry = {
    name: string
    type: string
    default?: string
    description: string
}

export type ComponentApiTypeTable = {
    name: string
    description?: string
    fields: ComponentApiEntry[]
}

export type ComponentAgentRecordV1 = {
    schemaVersion: 1
    component: `H0${string}`
    status: ComponentAgentStatus
    summary: string
    imports: {
        components: string[]
        types: string[]
        styles: string[]
    }
    api: {
        props: ComponentApiEntry[]
        events: ComponentApiEntry[]
        slots: ComponentApiEntry[]
        exposed: ComponentApiEntry[]
        types: ComponentApiTypeTable[]
    }
    useWhen: string[]
    avoidWhen: string[]
    accessibility: string[]
    styling: string[]
    responsive: string[]
    performance: string[]
    examples: Array<{
        key: string
        purpose: string
    }>
    relatedComponents: Array<`H0${string}`>
}

export type ComponentAgentRecordWithManifestV1 = ComponentAgentRecordV1 & {
    manifest: {
        family: string
        familyRole: 'root' | 'member'
        category: H0ComponentManifestEntry['category']
        docsPath: string
        docsAnchor?: string
        styleEntry: string
        localeSection?: string
    }
}

export type AgentValidationContext = {
    manifest: readonly H0ComponentManifestEntry[]
    pagePaths: readonly string[]
    exampleKeys: readonly string[]
}

function assertUnique(values: readonly string[], label: string) {
    const seen = new Set<string>()

    for (const value of values) {
        if (seen.has(value)) throw new Error(`[agents] Duplicate ${label} "${value}".`)
        seen.add(value)
    }
}

function validateGuidance(record: ComponentAgentRecordV1, values: readonly string[], section: string) {
    if (values.length === 0) throw new Error(`[agents] ${record.component} is missing ${section} guidance.`)
    assertUnique(values, `${record.component} ${section} guidance`)

    for (const value of values) {
        if (!value.trim()) throw new Error(`[agents] ${record.component} has empty ${section} guidance.`)
    }
}

function validateApiEntries(record: ComponentAgentRecordV1, entries: readonly ComponentApiEntry[], section: string) {
    assertUnique(
        entries.map((entry) => entry.name),
        `${record.component} ${section} entry`,
    )

    for (const entry of entries) {
        if (!entry.name.trim() || !entry.type.trim() || !entry.description.trim()) {
            throw new Error(`[agents] ${record.component} has an incomplete ${section} entry.`)
        }
    }
}

export function getManifestMetadata(record: ComponentAgentRecordV1, manifest: readonly H0ComponentManifestEntry[]): ComponentAgentRecordWithManifestV1['manifest'] {
    const entry = manifest.find((candidate) => candidate.name === record.component)
    if (!entry) throw new Error(`[agents] ${record.component} is missing from h0ComponentManifest.`)
    const familyRoot = entry.familyRoot ?? entry.docsSlug === entry.slug

    return {
        family: entry.family,
        familyRole: familyRoot ? 'root' : 'member',
        category: entry.category,
        docsPath: `/components/${entry.docsSlug}`,
        ...(familyRoot ? {} : { docsAnchor: `h0${entry.slug}` }),
        styleEntry: entry.styleEntry,
        ...(entry.localeSection ? { localeSection: entry.localeSection } : {}),
    }
}

export function validateComponentAgentRecords(records: readonly ComponentAgentRecordV1[], context: AgentValidationContext) {
    assertUnique(
        records.map((record) => record.component),
        'component record',
    )

    const manifestNames = new Set(context.manifest.map((entry) => entry.name))
    const recordNames = new Set(records.map((record) => record.component))
    const recordsByPath = new Map<string, ComponentAgentRecordV1[]>()
    const exampleKeys = new Set(context.exampleKeys)

    for (const entry of context.manifest) {
        if (!recordNames.has(entry.name)) throw new Error(`[agents] Manifest component "${entry.name}" has no typed agent record.`)
    }

    for (const record of records) {
        if (record.schemaVersion !== 1) throw new Error(`[agents] ${record.component} uses an unsupported schema version.`)
        if (record.status !== 'migrated') throw new Error(`[agents] ${record.component} uses an unsupported agent record status.`)
        if (!record.summary.trim()) throw new Error(`[agents] ${record.component} is missing a summary.`)
        if (!record.imports.components.includes(record.component)) throw new Error(`[agents] ${record.component} must list itself in imports.components.`)

        for (const [section, imports] of Object.entries(record.imports)) {
            assertUnique(imports, `${record.component} ${section} import`)
            for (const importedName of imports) {
                if (!importedName.trim()) throw new Error(`[agents] ${record.component} has an empty ${section} import.`)
            }
        }
        if (record.imports.styles.length === 0) throw new Error(`[agents] ${record.component} must declare its stylesheet import.`)

        validateGuidance(record, record.useWhen, 'useWhen')
        validateGuidance(record, record.avoidWhen, 'avoidWhen')
        validateGuidance(record, record.accessibility, 'accessibility')
        validateGuidance(record, record.styling, 'styling')
        validateGuidance(record, record.responsive, 'responsive')
        validateGuidance(record, record.performance, 'performance')

        const metadata = getManifestMetadata(record, context.manifest)
        if (!context.pagePaths.includes(metadata.docsPath)) throw new Error(`[agents] Documentation route "${metadata.docsPath}" for ${record.component} does not exist.`)
        recordsByPath.set(metadata.docsPath, [...(recordsByPath.get(metadata.docsPath) ?? []), record])

        for (const relatedComponent of record.relatedComponents) {
            if (!manifestNames.has(relatedComponent)) throw new Error(`[agents] ${record.component} references unknown related component "${relatedComponent}".`)
            if (relatedComponent === record.component) throw new Error(`[agents] ${record.component} cannot reference itself as a related component.`)
        }
        assertUnique(record.relatedComponents, `${record.component} related component`)

        assertUnique(
            record.examples.map((example) => example.key),
            `${record.component} example`,
        )
        for (const example of record.examples) {
            if (!exampleKeys.has(example.key)) throw new Error(`[agents] ${record.component} references unknown example "${example.key}".`)
            if (!example.purpose.trim()) throw new Error(`[agents] ${record.component} example "${example.key}" is missing its purpose.`)
        }

        validateApiEntries(record, record.api.props, 'props')
        validateApiEntries(record, record.api.events, 'events')
        validateApiEntries(record, record.api.slots, 'slots')
        validateApiEntries(record, record.api.exposed, 'exposed')
        assertUnique(
            record.api.types.map((table) => table.name),
            `${record.component} type table`,
        )
        for (const table of record.api.types) validateApiEntries(record, table.fields, `type ${table.name}`)
    }

    for (const [path, routeRecords] of recordsByPath) {
        const rootRecords = routeRecords.filter((record) => !getManifestMetadata(record, context.manifest).docsAnchor)
        if (rootRecords.length !== 1) throw new Error(`[agents] Documentation route "${path}" must have exactly one root component record.`)
    }

    const migratedComponentPaths = context.pagePaths.filter((path) => path.startsWith('/components/') && path !== '/components/overview' && path !== '/components/all')
    for (const path of migratedComponentPaths) {
        if (!recordsByPath.has(path)) throw new Error(`[agents] Migrated component page "${path}" has no typed agent record.`)
    }
}
