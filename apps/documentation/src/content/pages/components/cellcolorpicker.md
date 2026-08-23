---
title: CellColorPicker
description: Choose a HEX color with a compact custom trigger and accessible saturation, brightness, and hue controls.
path: /components/cellcolorpicker
group: Components
section: Forms
order: 160
---

# CellColorPicker

`H0CellColorPicker` replaces the browser color input with a consistent H0N trigger and a custom HSV picker. Values use normalized, uppercase six-digit HEX notation.

## Import

:::component-api imports
:::

## Usage

Use `v-model` for a controlled color or `defaultValue` for uncontrolled initialization.

:::example components/cell-color-picker/BasicExample
:::

## Trigger displays

The `standard` display shows a label, code, and swatch. The `minimal` display keeps only the code and swatch. Move the swatch with `swatchPosition`; it is on the right by default.

:::example components/cell-color-picker/DisplaysExample
:::

## Variants

Use `surface` for the default raised field treatment, `secondary` for a quieter background, or `ghost` when the trigger should blend into its container.

:::example components/cell-color-picker/VariantsExample
:::

## Sizes

The shared `sm`, `md`, and `lg` sizes change the trigger height, padding, typography, and swatch size. `md` is used by default.

:::example components/cell-color-picker/SizesExample
:::

## Disabled

Set `disabled` to keep the selected color visible while preventing the trigger from opening the picker.

:::example components/cell-color-picker/DisabledExample
:::

## Controlled value

Changing the bound HEX value updates the trigger and picker without opening the popover.

:::example components/cell-color-picker/ControlledExample
:::

## Props

Ordinary fallthrough attributes target the root. Use `controlAttrs` for native or ARIA attributes on the trigger button.

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

## Types

### H0CellColorPickerDisplay

:::component-api type H0CellColorPickerDisplay
:::

### H0CellColorPickerSwatchPosition

:::component-api type H0CellColorPickerSwatchPosition
:::

### H0CellColorPickerVariant

:::component-api type H0CellColorPickerVariant
:::

## Accessibility

- The trigger exposes its expanded state and popup relationship.
- The saturation/brightness plane and hue strip support arrow keys; hold Shift for larger steps.
- Escape closes the picker and restores focus to the trigger.
- Give minimal triggers an `ariaLabel` that identifies the color's purpose.

## Responsive behavior

The popup shifts and flips within the viewport, while the standard trigger can shrink with its container.

## Performance

Color conversion and popup positioning are local and synchronous; no native picker or external color package is loaded.

## Styling

Use variants, sizes, and H0N theme tokens. Picker geometry and internal selectors are implementation details.
