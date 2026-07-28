---
title: Modal
description: Focus a user on a self-contained task in a blocking dialog surface.
path: /components/modal
group: Components
section: Overlays
order: 203
---

# Modal

`H0Modal` presents a blocking task in a centered or edge-aligned dialog. It manages controlled or uncontrolled state, focus containment, focus return, scroll lock, backdrop dismissal, and Escape handling.

## Import

:::component-api imports
:::

## Usage

Use a visible `title` for most task dialogs and place completion actions in the footer slot.

:::example components/modal/BasicExample
:::

## Forms and dismissal

Compose forms from existing H0N controls and connect actions through the footer slot. For work that can lose user input, consider disabling backdrop dismissal while retaining explicit Cancel and Save actions. `initialFocus` accepts a selector or element when the first meaningful field should receive focus.

:::example components/modal/FormExample
:::

## Placement

The default `center` placement is appropriate for focused forms and decisions. Use `top`, `right`, `bottom`, or `left` to align the modal with a viewport edge and adapt it into a larger workflow surface while retaining modal semantics.

:::example components/modal/SidesExample
:::

## Backdrop

Choose `opaque` for strong visual separation, `blur` to retain softened page context, or `transparent` when the backdrop must remain visually hidden. All three variants still create a modal interaction layer; `closeOnBackdrop` independently controls whether clicking it closes the modal.

:::example components/modal/BackdropsExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Types

`H0ModalProps` and `H0ModalEmits` describe the complete public component contract.

### H0ModalSide

:::component-api type H0ModalSide
:::

### H0ModalBackdrop

:::component-api type H0ModalBackdrop
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- The panel uses `role="dialog"` and `aria-modal="true"`.
- Provide a specific visible title or `ariaLabel`.
- Keep a clear close or cancel action available when automatic dismissal is disabled.
- Use `initialFocus` only when the default panel focus is not appropriate.

## Responsive behavior

Centered modals preserve a viewport inset and scroll their content region. Edge variants fill the corresponding dimension and remain bounded on small screens.

## Styling

Use public overlay and surface tokens. Style content wrappers passed through slots instead of internal modal selectors.

## Performance

Modal content mounts only while open. Avoid expensive watchers that continue doing work after their modal subtree is removed.
