---
title: Alert
description: Communicate persistent inline status, warnings, and actionable feedback.
path: /components/alert
group: Components
section: Feedback
order: 150
---

# Alert

`H0Alert` presents important inline feedback that remains in the page flow. It supports semantic tones, compact messages, rich descriptions, actions, dismissal, and a loading state.

## Import

:::component-api imports
:::

## Variants

Use `surface` for the standard alert container, `secondary` for a stronger filled surface, and `outline` for a transparent container with a border. Variant controls the container appearance independently from the semantic `tone`.

:::example components/alert/VariantsExample
:::

## Tones

Choose tone from the meaning of the message, not decoration. `default` and `info` use the same information icon with different color treatment. Tone is visual and is not announced by assistive technology, so communicate the status explicitly in text.

:::example components/alert/TonesExample
:::

## Actions and dismissal

Use `actionText` for a simple action. The `action` slot replaces only the content inside the component-owned `H0Button`; use it for text, an icon, or other non-interactive content and handle activation through `action`. Do not place another button or link inside this slot.

`closable` only emits `close`; the parent decides whether the alert is removed. If focus was on the close button, move it to a logical surviving control after removal. The default English `closeAriaLabel` is not locale-driven, so provide a localized, contextual label in product interfaces.

:::example components/alert/ActionsExample
:::

## Loading

`loading` replaces the tone CSS class with the loading visual treatment but does not disable the action or close controls. With `default` or `info`, it uses the loading icon; `success`, `warning`, and `danger` retain their semantic icons while receiving the loading animation. The animation runs only in global `high` mode and stops when the user prefers reduced motion.

All alerts retain `role="alert"` while loading. Use this state only for an important bounded operation; prefer a non-assertive status pattern for routine background activity.

## Content and layout states

The title slot replaces `title`, the default slot replaces `text`, and the action slot replaces `actionText` content. A title-only alert becomes compact when the `text` and `actionText` props are empty. Slot presence is not considered by the compact calculation, so provide meaningful fallback `text` and `actionText` props when using rich description or action slots that need the regular layout.

The `icon` slot replaces the default icon. Use [`H0Icon`](/components/icon) or another decorative element with appropriate `aria-hidden` behavior when the visible text already communicates the status.

:::example components/alert/ContentStatesExample
:::

## Events

:::component-api events
:::

`action` and `close` have no payload. Neither event changes parent-owned state automatically.

## Props

:::component-api props
:::

Native fallthrough attributes and listeners apply to the root alert `div`.

## Types

`H0AlertProps` represents the complete public prop object documented above. `H0AlertEmits` maps `action` and `close` to empty argument tuples.

### H0AlertTone

:::component-api type H0AlertTone
:::

### H0AlertVariant

:::component-api type H0AlertVariant
:::

## Slots

:::component-api slots
:::

Slots expose no slot props. `title`, default, and `action` content is rendered inside component-owned typography or button elements; avoid interactive descendants inside `action`.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Alerts use `role="alert"`; do not mount them repeatedly for routine, non-urgent updates.
- Keep titles concise and pair every tone with explicit text.
- Provide a contextual `closeAriaLabel` when several alerts can be dismissed.
- After dismissal, restore focus when removing the focused close control would otherwise send focus to the document body.
- Ensure custom actions explain the recovery or next step.

## Responsive behavior

On narrow screens actions and the close button move below the content. Keep labels short and allow the alert to fill a fluid container.

## Performance

Use one alert for a related message rather than mounting a separate alert for every validation detail. Keep rich slot content lightweight.

## Styling

Use tones and public tokens. Customize content through slots; internal alert grid and state selectors are implementation details.
