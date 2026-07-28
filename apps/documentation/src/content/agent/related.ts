import type { H0ComponentManifestEntry } from '../../../../../packages/ui/src/manifest.ts'

import { getManifestMetadata, type ComponentAgentRecordV1 } from './schema.ts'

export type DocumentationComponentLink = {
    component: `H0${string}`
    name: string
    path: string
}

export function resolveRelatedComponentLinks(
    record: ComponentAgentRecordV1 | undefined,
    records: readonly ComponentAgentRecordV1[],
    manifest: readonly H0ComponentManifestEntry[],
): DocumentationComponentLink[] {
    if (!record) return []

    return record.relatedComponents.map((component) => {
        const relatedRecord = records.find((candidate) => candidate.component === component)
        if (!relatedRecord) throw new Error(`[documentation] ${record.component} references related component "${component}" without an agent record.`)

        const metadata = getManifestMetadata(relatedRecord, manifest)
        return {
            component,
            name: component.replace(/^H0/, ''),
            path: `${metadata.docsPath}${metadata.docsAnchor ? `#${metadata.docsAnchor}` : ''}`,
        }
    })
}
