---
title: Accordion
description: Reveal related sections progressively without leaving the current surface.
path: /components/accordion
group: Components
section: Content
order: 120
---

# Accordion

`H0Accordion` presents stacked disclosure sections for supporting information, settings, and frequently asked questions. It manages open panels internally and connects every trigger to its panel with accessible disclosure attributes.

## Import

:::component-api imports
:::

## Usage

Pass an `items` array with a concise `title` and the corresponding `content`. Only one panel remains open by default. `defaultOpen` contains zero-based item indexes and is read when the component is created; single mode uses only the first index.

:::example components/accordion/BasicExample
:::

## Multiple open panels

Enable `multiple` when users benefit from comparing two or more sections at once. Without it, opening a panel closes the previously open panel.

:::example components/accordion/MultipleExample
:::

> [!NOTE] Uncontrolled state
> `defaultOpen` initializes the component; changing the array later does not control the current panels. Accordion does not currently expose `v-model` or a change event. Recreate the component with a new `key` only when the entire disclosure state must be reset deliberately.

## Disabled items

Set an item's `disabled` field when its content is temporarily unavailable. The native trigger becomes disabled and does not change the open state.

:::example components/accordion/StatesExample
:::

> [!WARNING] Initially open disabled items
> Do not include a disabled item in `defaultOpen`. Its panel will open during initialization, but its disabled trigger cannot close it directly.

## Custom panel content

Use the `item` slot for lists, formatted descriptions, or other structured panel content. It receives the normalized item, its zero-based index, and the current `open` state. Closed panels are inert so focusable custom content cannot remain in the keyboard sequence while hidden.

:::example components/accordion/CustomContentExample
:::

## Types

`H0AccordionProps` represents the complete prop object documented below.

### H0AccordionItem

Prefer `title` and `content` for new code. The `question` and `answer` fields remain supported as compatibility aliases and are normalized to `title` and `content` before rendering or reaching the slot.

Every item must provide a non-empty `title` or `question` so its disclosure button has an accessible name.

:::component-api type H0AccordionItem
:::

## Stable IDs

Each instance generates a stable ID prefix with Vue `useId`, including during server rendering. Pass `id` when tests, analytics, or external relationships require a predictable prefix. Consumer-provided IDs must be unique on the page.

## Events

:::component-api events
:::

Open state is intentionally internal. Button clicks are not emitted as component events.

## Props

:::component-api props
:::

Template attributes may use kebab case, for example `default-open`.

## Slots

:::component-api slots
:::

The slot replaces only panel content. Item titles remain the visible disclosure button labels.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Every item title is rendered as a native button with `aria-expanded` and `aria-controls`.
- Every panel uses `role="region"` and `aria-labelledby` to reference its trigger.
- Disabled items use the native `disabled` attribute.
- Closed panels use both `aria-hidden` and `inert`, keeping hidden custom controls out of the accessibility tree and keyboard sequence.
- Provide a non-empty `title` or `question` for every item so each trigger has an accessible name.
- Keep titles concise and unique enough to identify their panels out of context.
- Avoid creating many landmark regions on one page. For long, always-visible content, use headings and sections instead.
- Place the Accordion under an appropriate page heading; item triggers do not create document heading levels themselves.

## Responsive behavior

Accordion fills the width supplied by its container and allows long titles to shrink before the icon. Keep surrounding containers fluid on small screens and avoid fixed widths. Rich slot content remains the consumer's responsibility and should wrap without horizontal scrolling.

## Performance

Keep the `items` array stable when its data has not changed. Panel content remains mounted while collapsed so reopening is immediate; avoid placing many expensive component trees in a large Accordion.

When the array becomes shorter, open indexes beyond the new length are removed. Reordering items while panels are open can associate an index with different content, so use Accordion for relatively stable ordered collections.

## Styling

The component uses public H0N surface, text, border, focus, spacing, duration, and easing tokens. Wrap it in a surface or card when the surrounding design requires a bordered container, as shown in the examples.

Treat `.h-accordion` and its element selectors as implementation details. Use public design tokens and styles on a wrapper instead of targeting internal classes.
