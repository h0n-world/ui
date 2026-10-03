---
title: Dropdown
description: Reveal arbitrary floating content from your own button, image, or other trigger.
path: /components/dropdown
group: Components
section: Overlays
order: 207
---

# Dropdown

`H0Dropdown` provides a floating container without creating a button or prescribing
its content. Place exactly one trigger in the default slot and your layout in
`content`. Trigger attributes, click interaction, and ARIA are applied automatically.

## Import

:::component-api imports
:::

## Usage

```vue
<H0Dropdown>
    <H0Button>Actions</H0Button>
    <template #content="{ close }">
        <H0Button @click="close">New file</H0Button>
    </template>
</H0Dropdown>
```

The content can contain ordinary markup or library components. It stays open
while you interact with it. Call the content slot's `close()` after a completed
action when appropriate.

:::example components/dropdown/BasicExample
:::

## Custom triggers and content

Native images and other non-interactive elements receive `role="button"` and a
keyboard tab stop. Give them an accessible name, such as an image's `alt`.
Custom Vue trigger components must forward the supplied attributes and listeners
to one focusable DOM root, as `H0Button` does. Avoid multiple trigger roots or
putting several independent controls inside the trigger.

Use `v-model` for controlled state, `defaultValue` for initial uncontrolled state,
or a component ref's `open()`, `close()`, and `toggle()` methods. A controlled
owner must apply `update:modelValue` requests.

:::example components/dropdown/CustomExample
:::

## Position and dimensions

The default placement is `bottom-start`, with a six-pixel gap. Placement flips
and shifts when there is insufficient room. Start/end alignment follows RTL.
Scrolling and resizing update the position.

`minWidth`, `maxWidth`, `minHeight`, and `maxHeight` accept pixels as numbers or
CSS lengths as strings. Defaults are 160, 360, 0, and 320 pixels. Maximum limits
and available viewport space take priority over minimum limits. Overflow scrolls
within the container. Use valid non-negative CSS lengths.

Content teleports to `body` by default and inherits the enclosing library overlay
layer when used inside a modal. With `teleportDisabled`, ancestor clipping and
stacking contexts apply. For a theme applied to a custom target, teleport into
that target so its tokens are inherited.

:::example components/dropdown/OverlayExample
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

:::component-api type H0DropdownProps
:::

:::component-api type H0DropdownExpose
:::

## Accessibility

The default content role is a non-modal `dialog`, named by the trigger or
`ariaLabel`. The trigger exposes `aria-haspopup`, `aria-expanded`, and
`aria-controls`. Enter/Space activate the trigger; ArrowDown opens the panel.
Initial focus enters the first enabled control, or the panel for plain content.
Escape closes and restores focus. Tab traverses the content and exits at its
boundary. Clicking or focusing outside closes without taking focus back.

This component does not lock page scrolling or trap focus. Use `H0Modal` for a
modal workflow. `disabled` prevents opening and hides content; disable the trigger
itself too if its unrelated actions must be disabled.

An arbitrary action layout does not automatically become an ARIA menu. If you
assign `role="menu"` through `contentAttrs`, implement menuitem semantics and the
complete keyboard navigation yourself. Use `H0Select` for choosing a value.

## Styling

The container uses the active palette and shared spacing, radius, shadow, and
animation tokens. Use `contentAttrs` for container classes/styles and your own
markup for action styling. Internal selectors are implementation details.

## Performance

Closed content is unmounted. Position observers and dismissal listeners are
removed on close/unmount. Motion follows the library animation profile and
system reduced-motion preference.
