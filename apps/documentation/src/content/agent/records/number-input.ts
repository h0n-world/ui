import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const numberInputAgentRecord = {
    schemaVersion: 1, component: 'H0NumberInput', status: 'migrated', summary: 'Localized numeric input with parsing, formatting, precision, bounds, step controls, and controlled null state.',
    imports: { components: ['H0NumberInput'], types: ['H0InputVariant', 'H0NumberFormatOptions', 'H0NumberFormatter', 'H0NumberInputEmits', 'H0NumberInputProps', 'H0NumberParser'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'number | null', default: 'undefined', description: 'Controlled number.' }, { name: 'defaultValue', type: 'number | null', default: 'null', description: 'Initial number.' },
        { name: 'min', type: 'number', default: 'undefined', description: 'Minimum value.' }, { name: 'max', type: 'number', default: 'undefined', description: 'Maximum value.' }, { name: 'step', type: 'number', default: '1', description: 'Increment size.' },
        { name: 'precision', type: 'number', default: 'undefined', description: 'Decimal precision.' }, { name: 'locale', type: 'string', default: "''", description: 'Intl locale override.' }, { name: 'formatOptions', type: 'Intl.NumberFormatOptions', default: '{}', description: 'Intl formatting options.' },
        { name: 'parse', type: 'H0NumberInputParser', default: 'undefined', description: 'Custom text parser.' }, { name: 'format', type: 'H0NumberInputFormatter', default: 'undefined', description: 'Custom display formatter.' },
        { name: 'clampOnBlur', type: 'boolean', default: 'true', description: 'Clamps to bounds after editing.' }, { name: 'wheel', type: 'boolean', default: 'false', description: 'Enables wheel stepping.' },
        { name: 'showSteps', type: 'boolean', default: 'true', description: 'Shows increment and decrement actions.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Uses the shared H0Input control size.' },
        { name: 'variant', type: "'surface' | 'secondary'", default: "'surface'", description: 'Uses the shared H0Input background treatment.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible name override.' }, { name: 'autocomplete', type: 'string', default: "''", description: 'Native autocomplete hint.' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents editing.' }, { name: 'placeholder', type: 'string', default: "''", description: 'Empty control copy.' }, ...fieldProps, ...attributeRoutingProps,
    ], events: [
        { name: 'update:modelValue', type: 'number | null', description: 'Requests value update.' }, { name: 'change', type: 'number | null', description: 'Reports a committed number.' }, { name: 'invalid', type: 'string', description: 'Reports unparseable text.' }, ...focusBlurEvents,
    ], slots: [], exposed: [], types: [
        { name: 'H0NumberParser', fields: [{ name: 'H0NumberParser', type: '(value: string, locale?: string) => number | null | undefined', description: 'Converts editable text into a number or empty value.' }] },
        { name: 'H0NumberFormatter', fields: [{ name: 'H0NumberFormatter', type: '(value: number, locale?: string) => string', description: 'Converts a committed number into display text.' }] },
        { name: 'H0NumberFormatOptions', fields: [{ name: 'H0NumberFormatOptions', type: 'Intl.NumberFormatOptions', description: 'Native Intl formatting options.' }] },
    ] },
    useWhen: ['A numeric value needs bounds, stepping, or localized formatting.'], avoidWhen: ['The interface requires choosing two endpoints from one numeric domain.'], ...standardFormGuidance,
    examples: [{ key: 'components/number-input/BasicExample', purpose: 'Bounded quantity control.' }, { key: 'components/number-input/VariantsExample', purpose: 'Shared surface and secondary variants.' }, { key: 'components/number-input/SizesExample', purpose: 'Small, medium, and large numeric fields.' }, { key: 'components/number-input/FormattingExample', purpose: 'Intl and custom number formatting.' }, { key: 'components/number-input/StatesExample', purpose: 'Stepper, read-only, invalid, and disabled states.' }], relatedComponents: ['H0Input', 'H0Form'],
} satisfies ComponentAgentRecordV1
