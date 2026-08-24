---
title: ContentState
description: Transition one content region between loading, error, empty, and resolved states.
path: /components/contentstate
group: Components
section: Feedback
order: 152
---

# ContentState

`H0ContentState` coordinates the mutually exclusive states of one content region. The parent owns the request or application logic and passes `loading`, `error`, `empty`, or `content`; the component mounts the matching slot and animates the replacement.

## Import

:::component-api imports
:::

## States

Provide the visual appropriate for each state. `H0Skeleton` works well for loading, `H0Alert` for a recoverable failure, and `H0EmptyState` when a successful result contains no records.

:::example components/content-state/StatesExample
:::

## Asynchronous flow

Derive `state` from application data rather than duplicating the request lifecycle inside the component. A request usually begins with `loading`, resolves to `content` or `empty`, and moves to `error` when it fails.

:::example components/content-state/AsyncExample
:::

## Lifecycle and transitions

Only the active slot remains mounted after its transition completes. Changing `state` therefore resets local component state in the slot being left; keep state that must survive the transition in the parent. During the short crossfade, the leaving view is removed from pointer interaction and clipped to the bounds of the entering view.

When states have substantially different heights and surrounding layout must remain fixed, set an application-appropriate `min-block-size` on `H0ContentState`, as demonstrated by the examples. The component does not guess a fixed height or delay the entering state to animate intrinsic dimensions.

The transition uses the shared fast duration and standard easing tokens. It becomes instantaneous when the operating system requests reduced motion.

## Events

:::component-api events
:::

## Props

:::component-api props
:::

`H0ContentStateProps` represents the complete public prop object.

## Types

### H0ContentStateValue

:::component-api type H0ContentStateValue
:::

## Slots

:::component-api slots
:::

The default slot is used only as a fallback when `state` is `content` and no `content` slot was provided.

## Exposed API

:::component-api exposed
:::

## Accessibility

- The root automatically exposes `aria-busy="true"` while `state` is `loading` and resets it for every other state.
- Give a loading placeholder one concise accessible name instead of announcing every skeleton shape.
- Use an alert role inside `error` only when the failure must be announced immediately. Do not make the complete content region a live region.
- Explain why a result is empty and provide a useful next step when one exists.
- Move focus only when the product workflow requires it; a visual state transition alone should not steal focus.

## Responsive behavior

The state region and each active view use the available inline width. Responsive layout remains the responsibility of the slotted content.

## Performance

Inactive slots are unmounted. Avoid placing persistent editors, media playback, or expensive stateful trees in a slot when they need to survive state changes; lift that state to the parent or preserve it explicitly.

## Styling

Compose each state from public H0N components and tokens. Transition selectors and component-local variables are implementation details.
