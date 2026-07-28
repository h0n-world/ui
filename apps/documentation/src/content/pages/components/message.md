---
title: Message
description: Pair compact status text with an optional tone-specific decorative icon.
path: /components/message
group: Components
section: Content
order: 134
---

# Message

`H0Message` renders compact informational or status text with a tone-specific icon.

## Import

:::component-api imports
:::

## Tones

Tone selects both color and the built-in decorative icon: `default` uses info, `success` uses success, `warning` uses warning, and `error` uses error. The `icon` prop only shows or hides this mapping; it does not accept a custom definition.

:::example components/message/TonesExample
:::

## Dynamic announcements

Persistent content usually needs no live-region role. Use `role="status"` for a dynamic non-urgent result and reserve `role="alert"` for an urgent error that must be announced immediately.

:::example components/message/AnnouncementsExample
:::

## Props

:::component-api props
:::

`text` accepts a string or number, while default-slot content takes precedence. The component always renders a `<p>` root; native attributes such as `role`, `aria-live`, and `id` are forwarded to it.

## Types

`H0MessageProps` represents the complete public prop object documented above.

### H0MessageTone

:::component-api type H0MessageTone
:::

## Slots

:::component-api slots
:::

## Events

:::component-api events
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- The icon is decorative because visible text carries the meaning.
- Persistent messages have no live-region role by default.
- Use `role="status"` for non-urgent dynamic feedback and `role="alert"` only for urgent newly rendered errors.
- Avoid recreating an alert on every input change.
- Use `H0ErrorMessage` for field validation text.

## Styling

Use `tone` and `icon`. For custom typography without a status icon, use `H0Typography` or `H0Description`.
