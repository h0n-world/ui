---
title: Layout
description: Compose semantic, responsive page structure from token-driven layout primitives.
path: /components/layout
group: Components
section: Layout
order: 181
---
# Layout

The Layout family contains small CSS-driven primitives for bounded content, flex composition, separators, and token spacing. Responsive values use `{ base, xs, sm, md, lg, xl }` without JavaScript resize listeners.

## Import

:::component-api imports
:::

## Usage

:::example components/layout/BasicExample
:::

Prefer these primitives for recurring structural relationships. Product-specific visual styling belongs on a wrapper class using public H0N tokens.

## Types

`H0ContainerProps` describes the complete Container prop object.

### H0ContainerSize

:::component-api type H0ContainerSize
:::

### H0Space

:::component-api type H0Space
:::

### H0ResponsiveValue

:::component-api type H0ResponsiveValue
:::

## Props

:::component-api props
:::

## Slots

:::component-api slots
:::

## H0Container

`H0Container` constrains page width and applies responsive inline gutters.

### Width presets

Choose the smallest maximum width that comfortably fits the page content. `full` removes the maximum while preserving gutter behavior.

:::example components/layout/ContainerSizesExample
:::

### Responsive gutters and semantic roots

`gutter` accepts one token or mobile-first breakpoint overrides. Use `as` to match the page landmark or section semantics; `centered` controls automatic inline margins.

:::example components/layout/ContainerResponsiveExample
:::

#### Import
:::component-api component H0Container imports
:::
#### Props
:::component-api component H0Container props
:::
#### Slots
:::component-api component H0Container slots
:::

## H0Stack

`H0Stack` arranges children vertically with responsive gap, alignment, justification, and wrapping.

#### Import
:::component-api component H0Stack imports
:::
#### Props
:::component-api component H0Stack props
:::
#### Slots
:::component-api component H0Stack slots
:::

## H0Inline

`H0Inline` arranges children horizontally and wraps by default.

#### Import
:::component-api component H0Inline imports
:::
#### Props
:::component-api component H0Inline props
:::
#### Slots
:::component-api component H0Inline slots
:::

## H0Divider

`H0Divider` is a semantic separator unless `decorative` is enabled. Optional slot content divides the line around a label.

#### Import
:::component-api component H0Divider imports
:::
#### Props
:::component-api component H0Divider props
:::
#### Slots
:::component-api component H0Divider slots
:::

## H0Spacer

`H0Spacer` creates an intentionally empty token-sized gap and is always hidden from assistive technology.

#### Import
:::component-api component H0Spacer imports
:::
#### Props
:::component-api component H0Spacer props
:::
#### Slots
:::component-api component H0Spacer slots
:::

## Accessibility

Choose semantic roots through `as`. Keep meaningful dividers semantic and mark purely visual dividers decorative.

## Responsive behavior

Responsive props generate CSS custom properties for named breakpoints. Start with the smallest useful `base` value and add only necessary overrides.

## Performance

All responsive behavior is CSS-driven. Avoid deeply nesting primitives when one Grid or Stack expresses the relationship.

## Styling

Use public spacing tokens and component props for structure. Layout primitives intentionally do not add surface colors, borders, or shadows.
