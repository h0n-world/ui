---
title: Layout
description: Compose semantic, responsive page structure from token-driven layout primitives.
path: /components/layout
group: Components
section: Layout
order: 181
---
# Layout

The Layout family provides small CSS-driven primitives for page width, vertical and horizontal flow, separators, and intentional empty space. They own structural relationships while product-specific colors, borders, and surfaces remain in application styles.

Responsive values use `{ base, xs, sm, md, lg, xl }` and are resolved entirely through CSS without resize listeners.

## Import

:::component-api imports
:::

## Choosing a primitive

| Need | Component | What it owns |
| --- | --- | --- |
| Bound and center page content | `H0Container` | Maximum width and inline gutters |
| Arrange siblings vertically | `H0Stack` | Column direction, gap, alignment, and distribution |
| Arrange siblings horizontally | `H0Inline` | Row direction, gap, alignment, distribution, and wrapping |
| Mark a boundary between groups | `H0Divider` | Horizontal or vertical separator semantics |
| Add exceptional empty space | `H0Spacer` | One explicit horizontal or vertical gap |

Prefer a parent `gap` over margins on individual children. Use `H0Spacer` only when the empty space is not a repeated sibling relationship.

## Composing a layout

Layout primitives are designed to nest. A common page section uses Container for the outer width, Stack for vertical rhythm, Inline for toolbars or rows, and Divider for meaningful boundaries.

:::example components/layout/BasicExample
:::

## H0Container

`H0Container` remains full width until it reaches its selected maximum. It can center that bounded area and add logical inline padding, so the same component works in both left-to-right and right-to-left interfaces.

Use one Container near a page or major section boundary. It does not add vertical padding, background, border, or elevation.

### Width presets

Choose the smallest maximum width that comfortably fits the content. `full` removes the maximum width while preserving gutter behavior.

:::example components/layout/ContainerSizesExample
:::

### Responsive gutters and semantic roots

`gutter` accepts one spacing token or mobile-first breakpoint overrides. Use `as` to select the correct landmark or section element. Set `centered` to `false` when the bounded content must stay aligned to one side of its parent.

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

`H0Stack` creates a vertical flex flow. Its `gap` owns the repeated space between children, avoiding first- and last-child margin exceptions.

- `align` controls the horizontal cross axis. The default `stretch` lets children fill the available width.
- `justify` distributes children vertically when the Stack has extra height.
- `wrap` is normally unnecessary for a column, but is available for constrained multi-column flows.
- `as` lets the same layout render as `section`, `form`, `ul`, or another semantic root.

:::example components/layout/StackExample
:::

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

`H0Inline` creates a horizontal flex flow and wraps by default. It is suited to action rows, metadata, filters, badges, and compact groups whose items may move onto another line.

- `justify="between"` separates leading and trailing groups.
- `align="baseline"` aligns mixed typography by its text baseline.
- Set `wrap` to `false` only when overflow or compression is intentionally managed by the surrounding UI.
- Group related items in nested Inline components before distributing those groups.

:::example components/layout/InlineExample
:::

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

`H0Divider` draws a horizontal or vertical boundary. By default it exposes `role="separator"`; set `decorative` when the line is visual repetition and the surrounding structure already communicates the grouping.

The default slot places a label between two line segments. `inset` adds logical margin to the line. A vertical Divider should be placed in a flex row with a defined or content-driven height so it can stretch along that row.

:::example components/layout/DividerExample
:::

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

`H0Spacer` occupies one token-sized dimension and is always hidden from assistive technology. Its default axis is vertical; `axis="horizontal"` reserves inline space inside a row.

The example colors the otherwise invisible Spacer so its occupied area is easy to inspect. In production it renders no visual fill.

:::example components/layout/SpacerExample
:::

Use Spacer for an exceptional break, such as separating two regions more strongly than the surrounding rhythm. Prefer Stack, Inline, or Grid `gap` for repeated sibling spacing.

#### Import

:::component-api component H0Spacer imports
:::

#### Props

:::component-api component H0Spacer props
:::

#### Slots

:::component-api component H0Spacer slots
:::

## Responsive values and types

A direct value applies at every viewport size. An object starts with `base` and overrides it at named min-width breakpoints. Omitted breakpoints inherit the nearest earlier value.

```ts
const responsiveGap = { base: 'sm', md: 'lg' } as const
```

Start with the smallest useful `base` value and add only overrides that materially improve the layout.

### H0ContainerSize

:::component-api type H0ContainerSize
:::

### H0Space

:::component-api type H0Space
:::

### H0ResponsiveValue

:::component-api type H0ResponsiveValue
:::

## Accessibility

- Choose semantic roots through `as`; layout direction does not replace document semantics.
- Keep visual and DOM order aligned.
- Keep meaningful dividers semantic and mark purely visual dividers decorative.
- Do not use spacing alone to communicate a relationship or status.

## Responsive behavior

Responsive props generate CSS custom properties for named breakpoints. Test both narrow containers and viewport breakpoints, because a component may be rendered inside a sidebar or split pane on a wide screen.

## Performance

All responsive behavior is CSS-driven. Avoid deeply nesting primitives when one Stack, Inline, or Grid already expresses the relationship.

## Styling

Use public spacing tokens and component props for structure. Layout primitives intentionally do not add surface colors, borders, or shadows.
