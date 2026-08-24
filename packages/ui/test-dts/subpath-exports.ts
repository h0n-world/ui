import { H0Stack, type H0StackProps } from '@h0nio/ui/components/Layout'
import { H0ContentState, type H0ContentStateValue } from '@h0nio/ui/components/ContentState'
import { H0Tabs, type H0TabItem } from '@h0nio/ui/components/Tabs'
import { useH0RovingFocus } from '@h0nio/ui/composables/useH0RovingFocus'
import { closeIcon, type H0IconDefinition } from '@h0nio/ui/icons'

const stack: H0StackProps = { gap: { base: 'sm', md: 'lg' } }
const contentState: H0ContentStateValue = 'loading'
const tabs: H0TabItem<'details'>[] = [{ label: 'Details', value: 'details' }]
const customIcon = {
    name: 'custom',
    nodes: [['path', { d: 'M4 12h16' }]]
} as const satisfies H0IconDefinition

void [H0Stack, H0ContentState, H0Tabs, useH0RovingFocus, closeIcon, customIcon, stack, contentState, tabs]
