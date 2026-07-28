---
title: Alert Dialog
description: Require an explicit decision before a consequential action continues.
path: /components/alertdialog
group: Components
section: Overlays
order: 200
---

# Alert Dialog

`H0AlertDialog` is a modal `alertdialog` for destructive or high-impact decisions that require confirmation. It owns focus containment, scroll locking, Escape handling, focus return, and controlled or uncontrolled open state.

## Import

:::component-api imports
:::

## Usage

Bind `v-model` when the parent needs to open and observe the dialog. `confirm` and `cancel` describe the decision; both actions close the dialog. The generic `close` event is emitted whenever the overlay closes.

:::example components/alert-dialog/BasicExample
:::

## Tones and content

Choose a semantic `tone` that matches the meaning and consequence of the decision:

- `info` is the default for neutral information that must be acknowledged before continuing.
- `success` confirms a positive action that is ready to complete.
- `warning` highlights a reversible but potentially disruptive consequence.
- `danger` is reserved for destructive or difficult-to-reverse actions.

:::example components/alert-dialog/TonesExample
:::

Use `title` and `text` for straightforward copy, or the `title`, default, and `actions` slots for structured content. The actions slot receives `confirm`, `cancel`, and `close` callbacks. Do not rely on tone alone: the title, description, and action label must state the outcome explicitly.

:::example components/alert-dialog/CustomActionsExample
:::

## Backdrop

Choose `opaque` for strong visual separation, `blur` to retain softened page context, or `transparent` when the backdrop must remain visually hidden. Backdrop appearance does not change the critical interaction model: clicking the backdrop never dismisses an Alert Dialog.

:::example components/alert-dialog/BackdropsExample
:::

## State and dismissal

Use `v-model` for controlled state or `defaultValue` for locally owned initial state. The backdrop intentionally cannot dismiss an alert dialog. Escape can be disabled with `closeOnEsc` only when another clear dismissal path remains available.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0AlertDialogProps` and `H0AlertDialogEmits` describe the complete public component contract.

### H0AlertDialogTone

:::component-api type H0AlertDialogTone
:::

### H0AlertDialogBackdrop

:::component-api type H0AlertDialogBackdrop
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- The panel uses `role="alertdialog"` and `aria-modal="true"`.
- Supply a concise `title`; otherwise provide `ariaLabel` when the localized fallback is not specific enough.
- Keep initial focus on the least destructive sensible action when confirmation is dangerous.
- Do not use Alert Dialog for ordinary informational feedback; use Alert or Toast instead.

## Responsive behavior

The panel is capped to the viewport with a fluid width. Keep action labels short enough to wrap cleanly on narrow screens and avoid large forms inside a blocking decision dialog.

## Styling

Semantic tones and overlay surfaces use public H0N tokens. Treat `.h-alert-dialog` selectors as implementation details.

## Performance

Dialog content mounts only while open. Keep expensive decision content small and let the component return focus rather than scheduling manual focus work.
