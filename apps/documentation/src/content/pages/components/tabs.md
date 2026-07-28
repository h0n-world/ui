---
title: Tabs
description: Switch between related tab panels with complete keyboard and mounting behavior.
path: /components/tabs
group: Components
section: Navigation
order: 197
---
# Tabs

`H0Tabs` supports data-driven items or compound `H0TabList`, `H0Tab`, and `H0TabPanel` children. It manages IDs, selection, keyboard orientation, and panel mounting.

## Import

:::component-api imports
:::

## Usage

:::example components/tabs/BasicExample
:::

Do not combine `items` with compound children. Automatic activation selects a tab when it receives focus; manual activation waits for click, Enter, or Space.

## Data-driven tabs

Use `items` for uniform labels and panels. Generic string or number values are preserved through the model and change events.

:::example components/tabs/DataExample
:::

## Orientation and activation

Horizontal tabs use Left and Right arrows; vertical tabs use Up and Down. Manual activation moves focus without changing panels until Enter or Space.

:::example components/tabs/ModesExample
:::

## Panel mounting

`all` keeps every panel mounted, `lazy` mounts each panel on first visit and retains it, and `active` mounts only the current panel and resets inactive state.

:::example components/tabs/MountExample
:::

## Types

`H0TabsProps<Value>` preserves the generic tab value.

### H0TabValue

:::component-api type H0TabValue
:::

### H0TabsActivation

:::component-api type H0TabsActivation
:::

### H0TabsMountMode

:::component-api type H0TabsMountMode
:::

### H0TabItem

:::component-api type H0TabItem
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

## Slots

:::component-api slots
:::

## H0TabList

#### Import
:::component-api component H0TabList imports
:::
#### Props
:::component-api component H0TabList props
:::
#### Slots
:::component-api component H0TabList slots
:::

## H0Tab

#### Import
:::component-api component H0Tab imports
:::
#### Props
:::component-api component H0Tab props
:::
#### Slots
:::component-api component H0Tab slots
:::

## H0TabPanel

#### Import
:::component-api component H0TabPanel imports
:::
#### Props
:::component-api component H0TabPanel props
:::
#### Slots
:::component-api component H0TabPanel slots
:::

## Accessibility

Provide a specific tab-list label, keep tab and panel values unique, and preserve arrow, Home, and End navigation. Tab order must match panel order.

## Responsive behavior

Horizontal tab lists scroll on overflow. Vertical orientation uses a two-column layout and needs sufficient inline space.

## Performance

Use `mountMode="active"` for expensive panels that may reset, or `lazy` to mount a panel on first visit and retain it afterward.

## Styling

Use orientation, mounting behavior, and public tokens. Tab borders, panel visibility, and ID construction are implementation details.
