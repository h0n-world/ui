---
title: Error Message
description: Render concise validation and action errors with consistent typography.
path: /components/errormessage
group: Components
section: Content
order: 128
---

# Error Message

`H0ErrorMessage` is an icon-free danger text preset. It has no live-region role by default.

## Import

:::component-api imports
:::

## Usage and announcements

Use `p` for a standalone message, `span` for inline integration, and `div` as a neutral block container. The `text` prop accepts strings or numbers, while default-slot content takes precedence when both are provided. Add `role="alert"` only when a newly rendered error must be announced immediately.

:::example components/error-message/BasicExample
:::

## Field validation

Persistent validation errors should be referenced by their field. Form controls such as `H0Input` render their `error` through `H0ErrorMessage` and automatically manage `aria-invalid`, `aria-describedby`, `aria-errormessage`, and the live alert role.

:::example components/error-message/InputIntegrationExample
:::

## Props

:::component-api props
:::

Native attributes such as `id`, `role`, and `aria-live` are forwarded to the rendered element.

## Types

`H0ErrorMessageProps` represents the complete public prop object documented above.

### H0ErrorMessageElement

:::component-api type H0ErrorMessageElement
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

Connect persistent field errors with `aria-describedby` or `aria-errormessage`. Use `aria-errormessage` together with `aria-invalid="true"`. Reserve `role="alert"` for errors that appear dynamically, avoid recreating the alert on every keystroke, and use concise recovery-oriented language.

## Styling

Danger color, body-small size, and medium weight are fixed by the preset. Use `H0Message` for status text with an icon or `H0Typography` for custom presentation.
