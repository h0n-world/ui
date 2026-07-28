import type { ComponentApiEntry } from '../schema.ts'

export const fieldProps: ComponentApiEntry[] = [
    { name: 'id', type: 'string', default: "''", description: 'Explicit control identifier.' }, { name: 'name', type: 'string', default: "''", description: 'Native form field name.' },
    { name: 'label', type: 'string', default: "''", description: 'Visible field label.' }, { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables field interaction.' }, { name: 'error', type: 'string', default: "''", description: 'Visible validation error.' }, { name: 'hint', type: 'string', default: "''", description: 'Supporting field description.' },
]

export const attributeRoutingProps: ComponentApiEntry[] = [
    { name: 'rootAttrs', type: 'Record<string, unknown>', default: 'undefined', description: 'Attributes for the component root; explicit values override ordinary fallthrough attributes.' },
    { name: 'controlAttrs', type: 'Record<string, unknown>', default: 'undefined', description: 'Additional native and ARIA attributes for the actual form control.' },
]

export const focusBlurEvents: ComponentApiEntry[] = [
    { name: 'focus', type: 'FocusEvent', description: 'Reports control focus.' }, { name: 'blur', type: 'FocusEvent', description: 'Reports control blur.' },
]

export const standardFormGuidance = {
    accessibility: ['Provide a visible label and actionable error text.', 'Preserve native keyboard and focus behavior.', 'Do not communicate validation through color alone.'],
    styling: ['Use public state props and H0N tokens.', 'Treat native control and internal layout selectors as implementation details.'],
    responsive: ['Let the control fill a fluid container and allow labels and messages to wrap.'],
    performance: ['Keep option arrays and callback props stable when their values do not change.'],
}
