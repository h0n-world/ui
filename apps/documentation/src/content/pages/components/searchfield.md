---
title: SearchField
description: Capture search queries with localized icon, clearing, and compact variants.
path: /components/searchfield
group: Components
section: Forms
order: 174
---

# SearchField

`H0SearchField` composes `H0Input` into a purpose-specific search control with controlled or uncontrolled state, a localized clear action, Form integration, and imperative helpers.

## Import

:::component-api imports
:::

## Usage

Use SearchField for a query that filters or searches content. Update the visible model immediately and debounce only expensive remote work.

:::example components/search-field/BasicExample
:::

## Variants

`surface` is the default neutral container. Use `secondary` when the field sits on another surface and needs stronger separation.

:::example components/search-field/VariantsExample
:::

## Sizes

SearchField inherits the `sm`, `md`, and `lg` sizes from H0Input. The compact `sm` size is used by default.

:::example components/search-field/SizesExample
:::

## States

Use read-only state when the query must remain focusable and selectable, disabled state when search is unavailable, and `error` for validation feedback.

:::example components/search-field/StatesExample
:::

## Events and imperative API

`input` includes the normalized string and native event. The exposed `setValue`, `focus`, and `clear` methods support command surfaces and external search controls.

:::example components/search-field/ApiExample
:::

## Events

:::component-api events
:::

## Props

Ordinary fallthrough attributes target the `H0SearchField` root. Use `rootAttrs` for that wrapper and `controlAttrs` for native search or ARIA attributes forwarded to the underlying `H0Input`.

:::component-api props
:::

## Types

`H0SearchFieldProps` and `H0SearchFieldEmits` describe the prop and event contracts.

### H0SearchFieldVariant

:::component-api type H0SearchFieldVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide `ariaLabel` when the placeholder is not a durable accessible name.
- Use a specific label when several search fields appear on one page.
- Clearing returns focus to the search input.
- Do not delay the visible query while debouncing search results.

## Responsive behavior

SearchField fills the supplied width and keeps search and clear controls visible.

## Performance

Debounce remote requests in application code while updating the model immediately.

## Styling

Use surface or secondary variant and public tokens; native search and clear internals are implementation details.
