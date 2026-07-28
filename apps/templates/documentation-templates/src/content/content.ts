import MarkdownIt from 'markdown-it'
import type { H0AlertTone, H0TableColumn, H0TableColumnAlign, H0TableRow } from '@h0n/ui'

export type DocumentationSection = {
    title: string
    items: DocumentationPage[]
}

export type DocumentationPage = {
    description: string
    file: string
    group: string
    order: number
    path: string
    section: string
    title: string
}

export type TableOfContentsItem = {
    id: string
    level: number
    title: string
}

export type RenderedDocumentationPage = DocumentationPage & {
    alerts: DocumentationAlert[]
    html: string
    source: string
    tables: DocumentationTable[]
    toc: TableOfContentsItem[]
}

export type DocumentationAlert = {
    html: string
    id: string
    title: string
    tone: H0AlertTone
}

export type DocumentationTableRow = H0TableRow & Record<string, string>

export type DocumentationTable = {
    ariaLabel: string
    columns: H0TableColumn<DocumentationTableRow>[]
    id: string
    minWidth: number
    rows: DocumentationTableRow[]
}

const sourceFiles = import.meta.glob('./pages/**/*.md', {
    eager: true,
    import: 'default',
    query: '?raw',
}) as Record<string, string>

function parseFrontMatter(source: string) {
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
    const attributes: Record<string, string | number> = {}

    if (!match) {
        return { attributes, body: source }
    }

    for (const line of match[1]?.split(/\r?\n/) ?? []) {
        const separator = line.indexOf(':')

        if (separator < 0) continue

        const key = line.slice(0, separator).trim()
        const rawValue = line
            .slice(separator + 1)
            .trim()
            .replace(/^['"]|['"]$/g, '')
        attributes[key] = /^\d+$/.test(rawValue) ? Number(rawValue) : rawValue
    }

    return { attributes, body: source.slice(match[0].length) }
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

function escapeHtml(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
}

function createRenderer(toc: TableOfContentsItem[]) {
    const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true })
    const defaultFence = markdown.renderer.rules.fence!

    markdown.renderer.rules.heading_open = (tokens, index) => {
        const token = tokens[index]
        const inline = tokens[index + 1]
        const level = Number(token?.tag.slice(1) ?? 2)
        const title = inline?.content ?? ''
        const baseId = slugify(title)
        const id = toc.some((item) => item.id === baseId) ? `${baseId}-${toc.length}` : baseId

        token?.attrSet('id', id)
        if (level >= 2 && level <= 3) toc.push({ id, level, title })

        return `<${token?.tag} id="${id}" tabindex="-1"><a class="heading-anchor" href="#${id}" aria-label="Link to ${escapeHtml(title)}">#</a>`
    }
    markdown.renderer.rules.heading_close = (tokens, index) => `</${tokens[index]?.tag}>`
    markdown.renderer.rules.fence = (tokens, index, options, environment, renderer) => {
        const language = tokens[index]?.info.trim() || 'text'
        return `<div class="code-block"><div class="code-block__bar"><span>${escapeHtml(language)}</span><button type="button" data-copy-code aria-label="Copy code">Copy</button></div>${defaultFence(tokens, index, options, environment, renderer)}</div>`
    }

    return markdown
}

const alertToneMap: Record<string, H0AlertTone> = {
    CAUTION: 'danger',
    DANGER: 'danger',
    DEFAULT: 'default',
    ERROR: 'danger',
    IMPORTANT: 'info',
    INFO: 'info',
    NOTE: 'info',
    SUCCESS: 'success',
    TIP: 'success',
    WARNING: 'warning',
}

function extractAlerts(source: string, markdown: MarkdownIt, pagePath: string) {
    const alerts: DocumentationAlert[] = []
    const output: string[] = []
    const lines = source.split(/\r?\n/)
    const pageSlug = slugify(pagePath) || 'page'

    for (let index = 0; index < lines.length; index += 1) {
        const firstLine = lines[index]
        const firstMatch = firstLine?.match(/^\s*>\s?(.*)$/)

        if (!firstMatch) {
            output.push(firstLine ?? '')
            continue
        }

        const quoteLines: string[] = [firstMatch[1] ?? '']

        while (index + 1 < lines.length) {
            const nextMatch = lines[index + 1]?.match(/^\s*>\s?(.*)$/)
            if (!nextMatch) break

            quoteLines.push(nextMatch[1] ?? '')
            index += 1
        }

        const marker = quoteLines[0]?.match(
            /^\[!(NOTE|INFO|TIP|SUCCESS|IMPORTANT|WARNING|CAUTION|ERROR|DANGER|DEFAULT)\](?:\s+(.+))?$/i,
        )
        const markerName = marker?.[1]?.toUpperCase()
        const tone = markerName ? (alertToneMap[markerName] ?? 'default') : 'default'
        const title = marker?.[2]?.trim() ?? ''
        const contentLines = marker ? quoteLines.slice(1) : quoteLines
        const content = contentLines.join('\n').trim()
        const id = `markdown-alert-${pageSlug}-${alerts.length + 1}`

        alerts.push({
            html: markdown.render(content),
            id,
            title,
            tone,
        })
        output.push('', `<div id="${id}" class="markdown-alert-slot"></div>`, '')
    }

    return {
        alerts,
        source: output.join('\n'),
    }
}

function splitTableRow(line: string) {
    const value = line.trim().replace(/^\|/, '').replace(/\|$/, '')
    const cells: string[] = []
    let cell = ''
    let escaped = false

    for (const character of value) {
        if (escaped) {
            cell += character
            escaped = false
            continue
        }

        if (character === '\\') {
            escaped = true
            continue
        }

        if (character === '|') {
            cells.push(cell.trim())
            cell = ''
            continue
        }

        cell += character
    }

    cells.push(cell.trim())
    return cells
}

function getTableAlignment(separator: string): H0TableColumnAlign {
    const value = separator.trim()
    if (value.startsWith(':') && value.endsWith(':')) return 'center'
    if (value.endsWith(':')) return 'right'
    return 'left'
}

function isTableSeparator(line: string) {
    const cells = splitTableRow(line)
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

function extractTables(source: string, markdown: MarkdownIt, pagePath: string) {
    const tables: DocumentationTable[] = []
    const output: string[] = []
    const lines = source.split(/\r?\n/)
    const pageSlug = slugify(pagePath) || 'page'
    let insideFence = false

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index] ?? ''

        if (/^\s*(```|~~~)/.test(line)) {
            insideFence = !insideFence
            output.push(line)
            continue
        }

        const separatorLine = lines[index + 1]
        const isTableStart =
            !insideFence &&
            line.includes('|') &&
            separatorLine !== undefined &&
            isTableSeparator(separatorLine)

        if (!isTableStart) {
            output.push(line)
            continue
        }

        const headers = splitTableRow(line)
        const separators = splitTableRow(separatorLine)
        if (headers.length !== separators.length) {
            output.push(line)
            continue
        }

        const usedKeys = new Set<string>()
        const columns: H0TableColumn<DocumentationTableRow>[] = headers.map(
            (header, columnIndex) => {
                const baseKey = slugify(header) || `column-${columnIndex + 1}`
                let key = baseKey
                let duplicateIndex = 2

                while (usedKeys.has(key)) {
                    key = `${baseKey}-${duplicateIndex}`
                    duplicateIndex += 1
                }

                usedKeys.add(key)
                const align = getTableAlignment(separators[columnIndex] ?? '')
                return { align, headerAlign: align, key, label: header }
            },
        )
        const rows: DocumentationTableRow[] = []
        index += 2

        while (index < lines.length && (lines[index]?.includes('|') ?? false)) {
            const cells = splitTableRow(lines[index] ?? '')
            const row: DocumentationTableRow = {}

            columns.forEach((column, columnIndex) => {
                row[column.key] = markdown.renderInline(cells[columnIndex] ?? '')
            })
            rows.push(row)
            index += 1
        }

        index -= 1
        const id = `markdown-table-${pageSlug}-${tables.length + 1}`
        tables.push({
            ariaLabel: headers.join(', '),
            columns,
            id,
            minWidth: Math.max(420, columns.length * 180),
            rows,
        })
        output.push('', `<div id="${id}" class="markdown-table-slot"></div>`, '')
    }

    return {
        source: output.join('\n'),
        tables,
    }
}

const pageRecords = Object.entries(sourceFiles).map(([file, source]) => {
    const { attributes, body } = parseFrontMatter(source)
    const page: DocumentationPage = {
        description: String(attributes.description ?? ''),
        file,
        group: String(attributes.group ?? 'Documentation'),
        order: Number(attributes.order ?? 0),
        path: String(attributes.path ?? '/docs'),
        section: String(attributes.section ?? 'Overview'),
        title: String(attributes.title ?? 'Untitled'),
    }

    return { body, page }
})

export const documentationPages = pageRecords
    .map(({ page }) => page)
    .sort((first, second) => first.order - second.order)

export const documentationGroups = [...new Set(documentationPages.map((page) => page.group))]

export function getDocumentationSections(group: string): DocumentationSection[] {
    const pages = documentationPages.filter((page) => page.group === group)

    return [...new Set(pages.map((page) => page.section))].map((title) => ({
        title,
        items: pages.filter((page) => page.section === title),
    }))
}

export function renderDocumentationPage(path: string): RenderedDocumentationPage | undefined {
    const record = pageRecords.find(({ page }) => page.path === path)
    if (!record) return undefined

    const toc: TableOfContentsItem[] = []
    const markdown = createRenderer(toc)
    const alertResult = extractAlerts(record.body, markdown, record.page.path)
    const tableResult = extractTables(alertResult.source, markdown, record.page.path)

    return {
        ...record.page,
        alerts: alertResult.alerts,
        html: markdown.render(tableResult.source),
        source: record.body,
        tables: tableResult.tables,
        toc,
    }
}
