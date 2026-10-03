import codeIcon from '@h0nio/icons/code-stroke'
import type { H0IconSource } from '@h0nio/ui'
import type { H0ComponentManifestEntry } from '../../../../packages/ui/src/manifest'

import { getManifestMetadata, type ComponentAgentRecordV1 } from './agent/schema'

export type DocumentationResourceLink = {
    label: string
    href: string
    icon?: H0IconSource
}

export function resolveComponentResourceLinks(
    record: ComponentAgentRecordV1 | undefined,
    manifest: readonly H0ComponentManifestEntry[],
): DocumentationResourceLink[] {
    if (!record) return []

    const { family } = getManifestMetadata(record, manifest)
    return [{
        label: 'Source',
        href: `https://github.com/h0n-world/ui/tree/main/packages/ui/src/components/${encodeURIComponent(family)}`,
        icon: codeIcon,
    }]
}
