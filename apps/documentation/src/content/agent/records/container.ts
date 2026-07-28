import type { ComponentAgentRecordV1 } from '../schema.ts'
import { polymorphicSlot, standardLayoutGuidance } from './layout-shared.ts'

export const containerAgentRecord = {
    schemaVersion: 1, component: 'H0Container', status: 'migrated', summary: 'Polymorphic full-width page container with a maximum width, optional centering, and responsive token gutters.',
    imports: { components: ['H0Container'], types: ['H0ContainerProps', 'H0ContainerSize', 'H0ResponsiveValue', 'H0Space'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'as', type: 'string | Component', default: "'div'", description: 'Semantic root element or Vue component.' }, { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", description: 'Maximum content width.' },
        { name: 'gutter', type: 'H0ResponsiveValue<H0Space>', default: "'lg'", description: 'Responsive inline padding.' }, { name: 'centered', type: 'boolean', default: 'true', description: 'Centers the bounded container.' },
    ], events: [], slots: polymorphicSlot, exposed: [], types: [
        { name: 'H0ContainerSize', fields: [{ name: 'H0ContainerSize', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", description: 'Supported maximum-width presets.' }] },
        { name: 'H0Space', fields: [{ name: 'H0Space', type: "'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'", description: 'Public spacing-token names.' }] },
        { name: 'H0ResponsiveValue', description: 'A direct value or an object of mobile-first breakpoint overrides.', fields: [
            { name: 'value', type: 'T', description: 'Direct value applied at every size.' },
            { name: 'base', type: 'T | undefined', description: 'Smallest-size value.' },
            { name: 'xs', type: 'T | undefined', description: 'Extra-small breakpoint override.' },
            { name: 'sm', type: 'T | undefined', description: 'Small breakpoint override.' },
            { name: 'md', type: 'T | undefined', description: 'Medium breakpoint override.' },
            { name: 'lg', type: 'T | undefined', description: 'Large breakpoint override.' },
            { name: 'xl', type: 'T | undefined', description: 'Extra-large breakpoint override.' },
        ] },
    ] },
    useWhen: ['Page content needs a consistent maximum width and responsive gutters.'], avoidWhen: ['A local wrapper needs spacing but no page-width constraint.'], ...standardLayoutGuidance,
    examples: [{ key: 'components/layout/BasicExample', purpose: 'Responsive spacing and semantic layout composition.' }, { key: 'components/layout/ContainerSizesExample', purpose: 'All maximum-width presets.' }, { key: 'components/layout/ContainerResponsiveExample', purpose: 'Semantic root and responsive gutters.' }], relatedComponents: ['H0Stack', 'H0Grid'],
} satisfies ComponentAgentRecordV1
