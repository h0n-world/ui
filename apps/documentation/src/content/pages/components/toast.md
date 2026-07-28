---
title: Toast
description: Deliver transient global feedback through a managed notification stack.
path: /components/toast
group: Components
section: Feedback
order: 156
---

# Toast

The Toast family combines `H0Toast`, the visual notification, with `H0Toasts`, the teleported stack, and a toast service that owns lifecycle, placement, updates, and dismissal. Use it for brief global feedback that should not interrupt the current task.

## Import

:::component-api imports
:::

## Tones and static toasts

Use `H0Toast` directly for previews or application-owned placement. Tone selects the default icon and accent, but text must communicate the actual result. `description` is preferred; `text` remains a compatibility alias and is ignored when `description` is present.

:::example components/toast/StaticExample
:::

## Custom content and icons

The `title` slot replaces title text and the default slot replaces the resolved description. `icon` overrides the tone icon. Keep content concise; a toast is not a container for forms or multi-step actions.

:::example components/toast/ContentExample
:::

## Toast service

Install the H0N plugin to provide the default service, render one `H0Toasts` near the application root, and call `useH0Toast()` from descendants. A service can also be created explicitly and passed to `H0Toasts`; call `dispose()` when that manually created service is no longer needed.

:::example components/toast/ServiceExample
:::

## Input and updates

`duration` is required; use `0` for a persistent notification. Tone helpers call `show` with a predefined tone. `show` returns an ID that can be passed to `update` or `dismiss`. Supplying a new duration to `update` reschedules dismissal.

## Close modes

`button` keeps an explicit close control, `toast` dismisses when the toast surface is clicked, and `container` makes the surface dismissible without rendering the close button.

:::example components/toast/CloseModesExample
:::

## Placement

Placement belongs to the service, not an individual `H0Toast`. Passing `placement` to `show` or `update` changes the placement for the complete stack. Use `configure` when placement changes independently of a notification.

:::example components/toast/PlacementExample
:::

## Events

:::component-api events
:::

`close` has no payload and does not remove an application-owned standalone toast automatically.

## Props

:::component-api props
:::

Native attributes and listeners fall through to the root toast `div`. `closable` controls only the component-owned close button.

## Types

`H0ToastProps` and `H0ToastEmits` describe the standalone visual component.

### H0ToastTone

:::component-api type H0ToastTone
:::

### H0ToastInput

:::component-api type H0ToastInput
:::

### H0ToastPlacement

:::component-api type H0ToastPlacement
:::

### H0ToastCloseMode

:::component-api type H0ToastCloseMode
:::

### H0ToastConfig

:::component-api type H0ToastConfig
:::

### H0ToastId

:::component-api type H0ToastId
:::

### H0ToastItem

:::component-api type H0ToastItem
:::

### H0ToastState

:::component-api type H0ToastState
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## H0Toasts

`H0Toasts` teleports the visible stack to `body`, applies service placement, limits visible notifications, and delegates dismissal to its service.

#### Import

:::component-api component H0Toasts imports
:::

#### Props

:::component-api component H0Toasts props
:::

#### Events

:::component-api component H0Toasts events
:::

#### Slots

:::component-api component H0Toasts slots
:::

#### Exposed API

:::component-api component H0Toasts exposed
:::

## Service API

:::component-api type H0ToastService
:::

The service state is reactive. Application code should normally use service methods instead of mutating `state.toasts` directly.

## Accessibility

- Toasts use polite status announcements; reserve alerts and dialogs for urgent decisions.
- Keep messages concise and include recovery actions elsewhere for failures that require work.
- Use persistent duration cautiously and keep an explicit dismissal path.
- Do not rely on tone or icon alone to communicate meaning.
- Avoid rapidly announcing several messages for one operation; update an existing toast when state progresses.

## Responsive behavior

Stacks stay within the viewport and use full available width on small screens. Toast content wraps independently of the placement edge.

## Performance

Render one stack per service, set a reasonable `maxVisible`, dismiss obsolete notifications, and call `dispose` for manually created services that outlive their view.

## Styling

Use tone and public tokens. Placement belongs to the service; stack transforms, transition classes, and toast selectors are implementation details.
