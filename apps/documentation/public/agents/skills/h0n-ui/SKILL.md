---
name: h0n-ui
description: Build and edit Vue interfaces using @h0nio/ui, select supported H0 components, and compose nested surfaces with documented variants. Use when a project uses H0N UI or the user requests it.
---

# H0N UI

This skill targets @h0nio/ui 1.3.0. Respect the consuming repository's instructions, existing wrappers, package manager, and requested scope.

## Establish the contract

Inspect the installed package version and TypeScript declarations first. If the version differs, use matching resources or the installed declarations; do not silently upgrade. Inspect the existing plugin and stylesheet setup. For requested installation, use the version-matching installation prompt on the documentation site; preserve the existing Vue app and register styles and services once.

Read [references/components.md](references/components.md) to discover supported components and their use/avoid guidance. For exact imports, props, events, slots, and types, read the target record in /agent-data/components.v1.json and the linked component page, resolving paths against the H0N UI documentation origin recorded in the consuming project. If the origin is unknown, obtain it from the user or project configuration; do not guess a host or resolve paths against the consumer app. The bundled reference remains usable offline; installed declarations take precedence over remote metadata.

## Select and compose

Select by semantics and interaction model. Search the supported component index before creating a native control or a custom replacement. In a project using H0N UI, prefer the supported component when it meets the requirement; keep native HTML when the product explicitly needs native behavior or the library lacks the capability. Do not replace existing native controls outside the requested scope.

| Requirement | Component to inspect |
| --- | --- |
| Known options, single or multiple choice | H0Select |
| Ordinary text / multiline text | H0Input / H0Textarea |
| Password / number / search / one-time code | H0PasswordInput / H0NumberInput / H0SearchField / H0InputOTP |
| Boolean / immediate setting / one of a few choices | H0Checkbox / H0Switch / H0RadioGroup |
| Action / navigation | H0Button / H0Link |
| Grouped content / field layout / form validation | H0Card / H0Field / H0Form |
| Presentation table / managed data interactions | H0Table / H0DataTable |

H0Select takes an options array and a controlled model; read its record for H0SelectOption and H0SelectValue instead of nesting native option elements. It is not a free-text combobox. Use the index for other needs and inspect useWhen, avoidWhen, props, slots, and examples before implementing. Do not invent planned components.

## Choose nested backgrounds

Choose the background variant from the actual enclosing surface, not from the component name or nesting depth. Where a distinct card or control boundary is intended:

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

Verify light and dark themes, focus, invalid and disabled states, and narrow layouts. Do not put form controls inside an interactive card.

| Component | Default variant | surface background | secondary background |
| --- | --- | --- | --- |
| H0Alert | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Card | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0CellColorPicker | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Checkbox | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Command | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0FileUpload | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Input | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0InputOTP | secondary | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0NumberInput | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0PasswordInput | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Radio | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0SearchField | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Select | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |
| H0Textarea | surface | --h0n-ui-color-surface | --h0n-ui-color-secondary |

## Implement and verify

Use documented @h0nio/ui root or component-family imports and public --h0n-ui-* tokens. Never import src, _shared, generated chunks, or private selectors. Use individual @h0nio/icons/<name> imports with a direct dependency when application code needs icons.

Preserve modelValue/update:modelValue for controlled state and defaultValue for uncontrolled initialization. Check the exact component API before using change events, native/ARIA attribute routing, slots, or methods. Retain labels, hints/errors, keyboard interaction, and overlay focus behavior. Do not invent props or replace missing capabilities with imaginary components.

Run the consumer's relevant typecheck, build, and behavior checks. Inspect the composed surfaces in light/dark themes and narrow/wide layouts when feasible. Report which checks ran and any version, capability, or verification gaps.
