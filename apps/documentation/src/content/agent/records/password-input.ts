import type { ComponentAgentRecordV1 } from '../schema.ts'
import { attributeRoutingProps, fieldProps, focusBlurEvents, standardFormGuidance } from './forms-shared.ts'

export const passwordInputAgentRecord = {
    schemaVersion: 1, component: 'H0PasswordInput', status: 'migrated', summary: 'Password field with controlled visibility, optional strength feedback, autocomplete guidance, and H0N validation messaging.',
    imports: { components: ['H0PasswordInput'], types: ['H0InputVariant', 'H0PasswordInputEmits', 'H0PasswordInputProps', 'H0PasswordStrength'], styles: ['@h0nio/ui/style.css'] },
    api: { props: [
        { name: 'modelValue', type: 'string', default: 'undefined', description: 'Controlled password.' }, { name: 'defaultValue', type: 'string', default: "''", description: 'Initial password.' },
        { name: 'visible', type: 'boolean', default: 'undefined', description: 'Controlled reveal state.' }, { name: 'defaultVisible', type: 'boolean', default: 'false', description: 'Initial reveal state.' },
        { name: 'strength', type: 'H0PasswordStrength', default: 'undefined', description: 'Strength indicator from zero to four.' }, { name: 'strengthLabels', type: 'readonly string[]', default: 'Localized', description: 'Five strength labels from zero to four.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Uses the shared H0Input control size.' }, { name: 'variant', type: "'surface' | 'secondary'", default: "'surface'", description: 'Uses the shared H0Input background treatment.' }, { name: 'ariaLabel', type: 'string', default: "''", description: 'Accessible name override.' },
        { name: 'placeholder', type: 'string', default: "''", description: 'Empty control copy.' }, { name: 'autocomplete', type: 'string', default: "'current-password'", description: 'Password manager hint.' }, { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents editing.' }, ...fieldProps, ...attributeRoutingProps,
    ], events: [
        { name: 'update:modelValue', type: 'string', description: 'Requests password update.' }, { name: 'change', type: 'string', description: 'Reports a committed password.' },
        { name: 'update:visible', type: 'boolean', description: 'Requests reveal-state update.' }, { name: 'visibility-change', type: 'boolean', description: 'Reports reveal-state change.' }, ...focusBlurEvents,
    ], slots: [], exposed: [], types: [{ name: 'H0PasswordStrength', fields: [{ name: 'value', type: '0 | 1 | 2 | 3 | 4', description: 'Application-supplied strength level.' }] }] },
    useWhen: ['A form requests a password and should offer a reveal action or strength feedback.'], avoidWhen: ['A one-time verification code is requested; use H0InputOTP.'], ...standardFormGuidance,
    examples: [{ key: 'components/password-input/BasicExample', purpose: 'Password visibility and computed strength.' }, { key: 'components/password-input/VariantsExample', purpose: 'Shared surface and secondary variants.' }, { key: 'components/password-input/VisibilityExample', purpose: 'Controlled reveal state.' }, { key: 'components/password-input/StatesExample', purpose: 'Strength labels, validation, and disabled state.' }], relatedComponents: ['H0Input', 'H0InputOTP', 'H0Form'],
} satisfies ComponentAgentRecordV1
