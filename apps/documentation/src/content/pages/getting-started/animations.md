---
title: Animations
description: Configure motion quality and share the recommended animation policy with your application.
path: /docs/animations
group: Getting started
section: Handbook
order: 35
---

# Animations

Animation is an app-scoped preference, separate from theme and accent. Choose
a profile in the Header or configure it when installing the plugin:

```ts
app.use(H0Nui, { animation: 'recommended' })
```

The default remains `low`. `H0AnimationLevel` accepts `off`, `low`, `medium`,
`high`, and `recommended`. The concrete `H0AnimationQuality` never includes
`recommended`.

| Preference | Behavior |
| --- | --- |
| `off` | No library transitions or keyframes, no ripple or carousel autoplay. Controls and static loading status remain usable. |
| `low` | Short color/opacity feedback, instant position changes, static loading indicators. |
| `medium` | Standard transitions and simple loading rotations; no ripple, skeleton shimmer, or animated backdrop blur. |
| `high` | Full transitions, ripple, shimmer, and rich overlay motion. |
| `recommended` | Uses the recommendation from available device/browser signals and a short foreground frame sample. |

**System reduced motion takes priority in every mode**, including manual `high`.
It resolves motion to `off`, retaining the requested preference so it can resume
when the system setting changes. The CSS media-query fallback also removes motion
before JavaScript initialization. See [MDN's system settings guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Live motion policy

:::example getting-started/AnimationExample
:::

## Share the policy with application code

Use the same app-scoped decision that H0N UI uses, rather than independently
guessing whether motion is allowed:

```ts
import { useH0Animation } from '@h0nio/ui'
// Also available from @h0nio/ui/composables/useH0Animation.

const motion = useH0Animation()

motion.quality.value              // 'off' | 'low' | 'medium' | 'high'
motion.preference.value           // Requested setting, including 'recommended'
motion.recommendedQuality.value   // Recommendation, even in a manual mode
motion.recommendationReason.value // Why that recommendation was selected
motion.isEvaluating.value         // A foreground frame sample is running
motion.enabled.value              // Any motion allowed
motion.reducedMotion.value        // Off or Low: avoid spatial/decorative motion
motion.continuous.value           // Medium or High: simple continuous feedback
motion.rich.value                 // High: expensive/decorative effects allowed

motion.setPreference('recommended')
motion.refreshRecommendation()    // Request another bounded sample
```

All exposed refs are readonly. Changing the preference also updates the library.
`useH0ReducedMotion()` remains available and returns the same off/low decision.
It does not mean that Low disables every brief feedback transition; use
`motion.enabled` when an effect must be disabled only in Off.

For your own CSS transitions, use `--h0n-ui-duration-fast`,
`--h0n-ui-duration-normal`, and `--h0n-ui-duration-slow`. For custom keyframes,
Web Animations, or animation libraries, react to the quality and cancel existing
animations when it changes. H0N UI's CSS suppression targets library surfaces;
it does not automatically manage unrelated application animations.

## How Recommended works

The policy starts conservatively at Low and evaluates after mount. It uses:

1. `prefers-reduced-motion`: Off, overriding all other signals.
2. Available CPU/memory hints and Save-Data: limited resources cap quality at
   Low or Medium. Missing hints are not interpreted as a powerful device.
3. A temporary WebGL context: software renderer or a major performance caveat
   selects Low. Unavailable graphics selects Low; hidden or unknown renderer
   information caps at Medium. The context is released immediately.
4. Up to 48 foreground frame intervals, with warm-up and a 1.6-second absolute
   deadline. Slow cadence or frequent long frames lower quality. High requires
   both healthy frame cadence and usable graphics information without a resource cap.

The frame sample stops in hidden tabs. Recommendation is refreshed when the tab
returns, the system motion preference changes, or Save-Data changes. Application
code can request another sample after a significant workload change. The policy
does not run a permanent frame monitor.

The WebGL check is a heuristic, not a definitive read of the browser's GPU setting.
CSS compositing can behave differently from WebGL. Frame cadence on a quiet page
cannot guarantee smoothness under every future workload. Hardware hints may be
missing or deliberately reduced for privacy. Restricted APIs use the conservative
fallback rather than throwing or preventing controls from working. See the
[WebGL context specification](https://registry.khronos.org/webgl/specs/latest/1.0/#WEBGLCONTEXTATTRIBUTES),
[deviceMemory](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory),
and [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame).

The policy exposes coarse reasons such as `limited-resources`, `software-rendering`,
`graphics-caveat`, `unknown-graphics`, `slow-frames`, or `smooth-frames`. It does not
expose, log, persist, or transmit renderer strings or device measurements. Animation
preference is not persisted by the library; projects own any preference persistence.

## Targets, SSR, and lifecycle

`data-h0n-animation-preference` records the requested setting.
`data-h0n-animation` always records the effective quality. Both are written on
the configured appearance target, alongside theme and accent.

SSR does not probe browser APIs or schedule measurements. Recommended starts at
Low on the server and on the client without a reduced-motion request, then evaluates
after mount. A client-side system request can resolve to Off immediately. Keep
SSR markup and semantics independent of browser-only quality; choose optional
effects after mount. For a custom target, keep teleported overlays within that same scope.
Unmounting the plugin's app removes media/visibility/connection listeners and
cancels pending sampling. Standalone services must be disposed explicitly.
