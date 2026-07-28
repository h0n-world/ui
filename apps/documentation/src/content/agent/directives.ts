import type { ComponentAgentRecordV1, ComponentApiEntry } from './schema.ts'

const directivePattern = /^\s*:::component-api\s+(.+?)\s*$/

function escapeCell(value: string) {
    return value.replaceAll('|', '\\|').replaceAll('\n', ' ')
}

function code(value: string) {
    return `\`${escapeCell(value)}\``
}

function renderTable(entries: readonly ComponentApiEntry[], nameHeader: string, typeHeader: string, includeDefault: boolean) {
    const headers = includeDefault ? `| ${nameHeader} | ${typeHeader} | Default | Description |` : `| ${nameHeader} | ${typeHeader} | Description |`
    const separators = includeDefault ? '| --- | --- | --- | --- |' : '| --- | --- | --- |'
    const rows = entries.map((entry) => {
        const cells = [code(entry.name), code(entry.type)]
        if (includeDefault) cells.push(entry.default === undefined ? '—' : code(entry.default))
        cells.push(escapeCell(entry.description))
        return `| ${cells.join(' | ')} |`
    })

    return [headers, separators, ...rows].join('\n')
}

function renderImports(record: ComponentAgentRecordV1) {
    const lines = ['```ts']
    if (record.imports.components.length) lines.push(`import { ${record.imports.components.join(', ')} } from '@h0nio/ui'`)
    if (record.imports.types.length) lines.push('', `import type { ${record.imports.types.join(', ')} } from '@h0nio/ui'`)
    for (const style of record.imports.styles) lines.push(`import '${style}'`)
    lines.push('```')
    return lines.join('\n')
}

function renderEntriesOrEmpty(record: ComponentAgentRecordV1, section: 'props' | 'events' | 'slots') {
    const entries = record.api[section]
    if (!entries.length) return `No public ${section} are defined.`
    if (section === 'props') return renderTable(entries, 'Name', 'Type', true)
    if (section === 'events') return renderTable(entries, 'Event', 'Payload', false)
    return renderTable(entries, 'Name', 'Props', false)
}

export function renderComponentApiSection(record: ComponentAgentRecordV1, section: string) {
    if (section === 'imports') return renderImports(record)
    if (section === 'props' || section === 'events' || section === 'slots') return renderEntriesOrEmpty(record, section)
    if (section === 'exposed') return record.api.exposed.length ? renderTable(record.api.exposed, 'Name', 'Type', false) : 'No public imperative API is exposed.'

    const typeMatch = section.match(/^type\s+([A-Za-z_$][\w$]*)$/)
    if (typeMatch) {
        const typeName = typeMatch[1] ?? ''
        const table = record.api.types.find((candidate) => candidate.name === typeName)
        if (!table) throw new Error(`[documentation] Unknown type table "${typeName}" for ${record.component}.`)
        return renderTable(table.fields, 'Field', 'Type', true)
    }

    throw new Error(`[documentation] Unknown component-api section "${section}" for ${record.component}.`)
}

export function expandComponentApiDirectives(source: string, pagePath: string, record?: ComponentAgentRecordV1, pageRecords: readonly ComponentAgentRecordV1[] = record ? [record] : []) {
    const lines = source.split(/\r?\n/)
    const output: string[] = []
    let insideFence = false

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? ''
        if (/^\s*(```|~~~)/.test(line)) {
            insideFence = !insideFence
            output.push(line)
            continue
        }

        const match = insideFence ? undefined : line.match(directivePattern)
        if (!match) {
            output.push(line)
            continue
        }

        const directive = match[1] ?? ''
        const componentMatch = directive.match(/^component\s+(H0[A-Za-z0-9_$]+)\s+(.+)$/)
        const targetRecord = componentMatch ? pageRecords.find((candidate) => candidate.component === componentMatch[1]) : record
        const section = componentMatch?.[2] ?? directive

        if (!targetRecord) {
            if (componentMatch) throw new Error(`[documentation] Unknown family component "${componentMatch[1]}" on "${pagePath}".`)
            throw new Error(`[documentation] Component API directive on "${pagePath}" has no typed component record.`)
        }
        if (!/^\s*:::\s*$/.test(lines[index + 1] ?? '')) throw new Error(`[documentation] Component API directive on "${pagePath}" must be closed with :::.`)

        output.push('', renderComponentApiSection(targetRecord, section), '')
        index += 1
    }

    return output.join('\n')
}
