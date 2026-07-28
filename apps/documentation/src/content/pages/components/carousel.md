---
title: Carousel
description: Present draggable, keyboard-accessible collections with controlled navigation.
path: /components/carousel
group: Components
section: Content
order: 124
---

# Carousel

`H0Carousel` renders generic slide data through a scoped slot and supports controlled or uncontrolled selection, dragging, keyboard navigation, pagination, autoplay, and imperative controls.

## Import

:::component-api imports
:::

## Usage and peek layouts

`slideWidth` accepts any CSS size, making partial next-slide previews possible. `gap`, width, and height accept numbers in pixels or CSS strings.

:::example components/carousel/BasicExample
:::

## Controlled index, controls, and pagination

Use `v-model` for application-owned zero-based index. `change` reports user, autoplay, pagination, drag, keyboard, and imperative navigation changes.

:::example components/carousel/ControlledExample
:::

## Autoplay

Autoplay requires more than one slide and stops at the last slide unless `loop` is enabled. Keep both pause-on-hover and pause-on-focus enabled, and provide an explicit Play/Pause control so users can stop motion without maintaining hover or focus.

:::example components/carousel/AutoplayExample
:::

## Programmatic controls

The exposed API supports previous, next, indexed navigation, play, and pause.

:::example components/carousel/ProgrammaticExample
:::

## Custom controls and drag effect

The `previous-control` and `next-control` slots replace only the content inside the component's existing labeled buttons. Use `effect="static"` when the track should remain still during a drag and change slides only after the gesture crosses its threshold.

:::example components/carousel/CustomControlsExample
:::

## Drag and keyboard behavior

`draggable` ignores gestures starting on interactive descendants. `elastic` follows pointer movement while `static` waits until the gesture crosses its threshold. When `keyboard` is enabled, the focusable viewport responds to Left and Right Arrow.

## Events

`update:modelValue` and `change` are emitted only when navigation selects a different index.

:::component-api events
:::

## Props

:::component-api props
:::

`fullHeight` can fill only a height established by the parent layout. With zero or one item, controls, pagination, and the counter are omitted because there is no alternative slide to select.

## Types

`H0CarouselProps<Item extends H0CarouselItem = H0CarouselItem>` is the generic prop object documented above. Its `Item` parameter determines the type of `item` exposed by the default slot.

`H0CarouselEmits` maps both `update:modelValue` and `change` to the tuple `[index: number]`; their runtime behavior is documented in Events.

### H0CarouselItem

:::component-api type H0CarouselItem
:::

### H0CarouselEffect

:::component-api type H0CarouselEffect
:::

### H0CarouselControlsPosition

:::component-api type H0CarouselControlsPosition
:::

### H0CarouselPaginationVariant

:::component-api type H0CarouselPaginationVariant
:::

## Slots

:::component-api slots
:::

## Exposed API

:::component-api exposed
:::

## Accessibility

- Provide a specific `ariaLabel` for the carousel region.
- Slides expose localized position labels.
- Inactive slides are `aria-hidden` and inert by default so their controls cannot receive focus.
- Keep pause-on-focus enabled for autoplay, provide visible navigation, and add a persistent Play/Pause control.
- Custom control slots must preserve understandable previous and next labels supplied by the component buttons.

## Responsive behavior

Use `fullWidth` for fluid layouts and CSS functions in `slideWidth` for peek behavior. Avoid a fixed width wider than the preview or application container.

## Performance

Keep item arrays stable, use lightweight inactive slide trees, and avoid very short autoplay intervals. ResizeObserver recalculates track offsets when the viewport changes.

## Styling

Style slide content through the default slot. Use public layout and control props; internal track transforms and selectors are implementation details.
