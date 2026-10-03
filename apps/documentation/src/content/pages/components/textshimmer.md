---
title: Text Shimmer
description: Display readable status text with a subtle animated highlight.
path: /components/textshimmer
group: Components
section: Feedback
order: 208
---

# Text Shimmer

`H0TextShimmer` adds a moving highlight to short labels such as “Thinking…”,
“Processing”, “Loading”, or “Streaming”. The text stays in the document once and
remains readable when the effect is disabled.

## Import

:::component-api imports
:::

## Usage

```vue
<H0TextShimmer>Thinking...</H0TextShimmer>
```

Shimmer is a decorative effect, so it follows the same policy as Skeleton shimmer:
it runs in effective **High** and stays static in Off, Low, and Medium. Recommended
uses its resolved quality. The library default is Low. Select High in the Header
or this example to preview the effect. System reduced motion always takes priority.

:::example components/text-shimmer/BasicExample
:::

## Duration, activation, and typography

`duration` sets one sweep in milliseconds; the default is 2000. Non-positive or
non-finite input uses the default. Set `active` to false when the operation ends.
The text remains visible and unchanged.

The component inherits font size, weight, and line height. Use `as` to choose a
`span`, `p`, or `div`; use normal attributes, classes, and styles to compose it.
Slot content should be text or simple inline markup inheriting the text color.
Place buttons, independently styled text, icons, and other controls alongside it.

:::example components/text-shimmer/CustomExample
:::

## Props

:::component-api props
:::

## Events

:::component-api events
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Public types

:::component-api type H0TextShimmerElement
:::

:::component-api type H0TextShimmerProps
:::

## Accessibility

The component does not add `role="status"` or a live region automatically.
For a status whose text changes, add `role="status"` or configure an appropriate
live region in the enclosing workflow. Animation itself does not change text
and does not generate announcements.

Reduced motion, forced colors, unsupported text clipping, and inactive animation
profiles all use readable static text. Never convey completion solely through
shimmer. Replace the label with the actual result.

## Styling

Base text and highlight use the current palette's secondary and primary text
tokens. Typography inherits from the parent. The effect wraps without changing
layout dimensions and works with RTL text. Internal selectors and local effect
variables are implementation details.

## Performance

The effect uses CSS background movement, without timers, device probes, or text
duplication. Avoid animating long passages or large numbers of simultaneous
labels. It respects the library's global animation policy.
