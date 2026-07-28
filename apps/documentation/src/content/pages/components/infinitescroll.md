---
title: InfiniteScroll
description: Request the next data chunk as a sentinel approaches a scroll boundary.
path: /components/infinitescroll
group: Components
section: Data
order: 142
---

# InfiniteScroll

`H0InfiniteScroll` observes a sentinel after its content and emits one `load` request when it enters the configured scroll area. It is presentation-agnostic and works with lists, cards, feeds, or custom collections.

## Import

:::component-api imports
:::

## Usage

Keep `loading` true for the complete asynchronous request. The component locks immediately after emitting `load` and unlocks only after `loading` transitions from true back to false or observer configuration changes. Appending content without a loading cycle does not unlock another request. Set `hasMore` to false when the source is exhausted.

When the initial collection is too short to move the sentinel outside the prefetch area, successive loading cycles can request several chunks automatically until the container fills or `hasMore` becomes false.

:::example components/infinite-scroll/BasicExample
:::

## Observer root and prefetch distance

The default `root="nearest"` searches the component's ancestors for the first element whose computed vertical overflow is `auto`, `scroll`, or `overlay`. It falls back to the page viewport when no such ancestor exists. `root="viewport"` always observes against the viewport.

`rootMargin` accepts the one-to-four-value CSS margin syntax supported by `IntersectionObserver`; its default `160px` bottom margin starts loading before the sentinel reaches the visible boundary. `threshold` is the required intersection ratio and must be between `0` and `1`. These values are passed directly to the browser and are not validated by the component.

The following page-level example uses the viewport, a percentage prefetch margin, and a custom threshold. Pause disables load requests without removing existing content.

:::example components/infinite-scroll/ViewportExample
:::

## Observer lifecycle

Automatic loading requires browser support for `IntersectionObserver`. When the API is unavailable, the component still renders its collection and states but does not emit `load`.

`disabled` prevents requests and reduces the opacity of the complete component. `hasMore=false` also prevents requests and displays completion content; it should represent a terminal data-source state rather than observer teardown.

Treat `observeOnMount` as a static mount-time setting. Setting it to false skips initial observer creation, but the component exposes no imperative start method and does not watch this prop directly. Changing only `observeOnMount` after mounting does not reliably start or stop observation.

## Loading and completion content

Localized defaults are available for both states. An empty `loadingText` uses the localized loading fallback rather than suppressing it.

The loading wrapper always owns `role="status"` and its accessible label. Set `loadingText` when using the `loading` slot and do not add another nested status region. Completion content is not a live region; add an announcement inside a custom `complete` slot only when the product requires it.

:::example components/infinite-scroll/CustomStatesExample
:::

## Events

:::component-api events
:::

## Props

:::component-api props
:::

Changes to `disabled`, `hasMore`, `root`, `rootMargin`, or `threshold` reset the request lock and recreate the observer. Native fallthrough attributes and listeners are applied to the root `div`.

## Types

`H0InfiniteScrollProps` represents the complete public prop object documented above. `H0InfiniteScrollEmits` maps `load` to an empty argument tuple.

### H0InfiniteScrollRoot

:::component-api type H0InfiniteScrollRoot
:::

## Slots

:::component-api slots
:::

The `default`, `loading`, and `complete` slots do not expose slot props. The sentinel is always rendered after the default content and before the current state content.

## Exposed API

:::component-api exposed
:::

## Accessibility

- Use `loadingText` to label the component-owned loading status; do not create a nested status region in the custom slot.
- Keep loaded items in a logical document order and retain keyboard focus when new items append.
- Give a custom overflow container `tabindex="0"` and a meaningful accessible label when keyboard users must scroll it directly.
- Provide another way to reach content beyond a very long feed when appropriate.
- Completion is not announced automatically. If adding a live announcement, emit it once when `hasMore` becomes false.

## Responsive behavior

The component follows its container width. The consumer owns the scroll container height and the responsive layout of loaded content.

## Performance

Append bounded chunks, keep `loading` true for the entire request, and retain a guard in the handler in addition to the component's request lock. For very large retained collections, combine the data source with a virtualized list rather than leaving every item mounted.

## Styling

Style collection content through the default slot and state content through named slots. The sentinel and observer geometry are implementation details.
