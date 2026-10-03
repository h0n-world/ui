import type { ComponentAgentRecordV1 } from './schema.ts'

export const componentSelectionGuidance = `Select by semantics and interaction model. Search the supported component index before creating a native control or a custom replacement. In a project using H0N UI, prefer the supported component when it meets the requirement; keep native HTML when the product explicitly needs native behavior or the library lacks the capability. Do not replace existing native controls outside the requested scope.

| Requirement | Component to inspect |
| --- | --- |
| Known options, single or multiple choice | H0Select |
| Ordinary text / multiline text | H0Input / H0Textarea |
| Password / number / search / one-time code | H0PasswordInput / H0NumberInput / H0SearchField / H0InputOTP |
| Boolean / immediate setting / one of a few choices | H0Checkbox / H0Switch / H0RadioGroup |
| Action / navigation | H0Button / H0Link |
| Grouped content / field layout / form validation | H0Card / H0Field / H0Form |
| Presentation table / managed data interactions | H0Table / H0DataTable |

H0Select takes an options array and a controlled model; read its record for H0SelectOption and H0SelectValue instead of nesting native option elements. It is not a free-text combobox. Use the index for other needs and inspect useWhen, avoidWhen, props, slots, and examples before implementing. Do not invent planned components.`

export const surfaceCompositionGuidance = `Choose the background variant from the actual enclosing surface, not from the component name or nesting depth. Where a distinct card or control boundary is intended:

- On --h0n-ui-color-surface, use variant="secondary" for components listed below.
- On --h0n-ui-color-secondary, use variant="surface".
- On a page background or a custom background, inspect the actual tokens and rendered result before choosing. Transparent containers inherit the visible background behind them.
- A default H0Card is surface: its H0Input, H0Textarea, H0Select and other listed controls should normally be secondary. A secondary card normally uses surface controls. A card on a surface section should normally be secondary.
- H0InputOTP already defaults to secondary; retain it on surface and choose surface on secondary.
- For H0Checkbox and H0Radio this controls the unchecked indicator background; checked states retain their semantic color. For H0Select and H0Command it controls the trigger, not the popup. Alert tone is independent of its container variant.
- Preserve an explicitly requested flat appearance. Prefer the documented variant over overriding private background variables. These variants distinguish layers; they do not guarantee text contrast under custom theme overrides.
- Do not apply this rule to unrelated variant names such as H0Button primary/secondary or H0Typography variants. Teleported content has its own enclosing surface.

Example with a non-interactive card (name is a string model and country is a H0SelectValue or null):

~~~vue
<H0Card padding>
    <H0Input v-model="name" label="Name" variant="secondary" />
    <H0Select v-model="country" label="Country" variant="secondary"
        :options="[{ label: 'Ukraine', value: 'ua' }]" />
</H0Card>
~~~

Verify light and dark themes, focus, invalid and disabled states, and narrow layouts. Do not put form controls inside an interactive card.`

export function renderSurfaceTable(records: readonly ComponentAgentRecordV1[]) {
    return [
        '| Component | Default variant | surface background | secondary background |',
        '| --- | --- | --- | --- |',
        ...records.filter((record) => record.surface).sort((a, b) => a.component.localeCompare(b.component)).map((record) => {
            const surface = record.surface!
            return `| ${record.component} | ${surface.default} | ${surface.backgrounds.surface} | ${surface.backgrounds.secondary} |`
        }),
    ].join('\n')
}
