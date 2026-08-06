import type { ComponentAgentRecordV1 } from '../schema.ts'
import { standardNavigationGuidance } from './navigation-shared.ts'

export const stepperAgentRecord = {
    schemaVersion: 1, component: 'H0Stepper', status: 'migrated', summary: 'Non-interactive progress indicator for a fixed sequence with completed, active, and pending states.',
    imports: { components: ['H0Stepper'], types: ['H0StepperColor', 'H0StepperItem', 'H0StepperOrientation', 'H0StepperProps', 'H0StepperSize'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'items', type: 'H0StepperItem[]', description: 'Ordered progress steps.' }, { name: 'step', type: 'number', default: '1', description: 'One-based current step, clamped to the item count.' }, { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Progress layout direction.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Marker and typography size.' }, { name: 'color', type: "'accent' | 'success' | 'danger' | 'warning' | 'inverted'", default: "'accent'", description: 'Completed and active semantic treatment.' }, { name: 'ariaLabel', type: 'string', default: "'Progress'", description: 'Accessible navigation name.' },
    ], events: [], slots: [], exposed: [], types: [
        { name: 'H0StepperOrientation', fields: [{ name: 'H0StepperOrientation', type: "'horizontal' | 'vertical'", description: 'Supported progress directions.' }] },
        { name: 'H0StepperSize', fields: [{ name: 'H0StepperSize', type: "'sm' | 'md' | 'lg'", description: 'Supported marker and typography sizes.' }] },
        { name: 'H0StepperColor', fields: [{ name: 'H0StepperColor', type: "'accent' | 'success' | 'danger' | 'warning' | 'inverted'", description: 'Supported progress treatments.' }] },
        { name: 'H0StepperItem', fields: [
            { name: 'label', type: 'string | undefined', description: 'Step label.' }, { name: 'description', type: 'string | undefined', description: 'Supporting status or instruction.' }, { name: 'icon', type: 'H0IconDefinition | undefined', description: 'Marker icon before completion.' },
        ] },
    ] },
    useWhen: ['A workflow has a known ordered sequence and users need progress context.'], avoidWhen: ['The control itself must navigate between panels; use H0Tabs or application buttons.'], ...standardNavigationGuidance,
    responsive: ['Horizontal steppers scroll when their readable minimum exceeds the container.', 'Use vertical orientation for long labels or narrow persistent layouts.'],
    examples: [{ key: 'components/stepper/BasicExample', purpose: 'Four-step workspace setup progress.' }, { key: 'components/stepper/ColorsExample', purpose: 'All semantic progress treatments at full width.' }, { key: 'components/stepper/SizesExample', purpose: 'Small, medium, and large marker and typography scales.' }, { key: 'components/stepper/VerticalExample', purpose: 'Vertical layout with descriptions and icons.' }], relatedComponents: ['H0Tabs'],
} satisfies ComponentAgentRecordV1
