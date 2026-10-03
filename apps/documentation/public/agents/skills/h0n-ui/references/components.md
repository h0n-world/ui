# Supported H0N UI components (1.3.0)

Paths below are relative to the H0N UI documentation origin. Exact APIs are in /agent-data/components.v1.json.

## H0Accordion

Uncontrolled stack of accessible disclosure sections for progressively revealing related content.

- Documentation: /components/accordion
- Use: Related supporting content should be progressively disclosed. An FAQ or settings surface benefits from compact stacked sections. Users may need to compare multiple sections by enabling multiple mode.
- Avoid: Content is essential and should remain continuously visible. The interface requires externally controlled open state or change events. The content represents navigation between peer views; use H0Tabs instead.

## H0Alert

Persistent assertive inline feedback with semantic tones, compact and loading states, actions, dismissal, and rich content.

- Documentation: /components/alert
- Use: Important feedback should remain in the page flow. A warning or error needs context and an optional recovery action.
- Avoid: Feedback is transient and global; use H0Toast. The message requires a blocking decision; use H0AlertDialog. Routine background progress does not justify an assertive role=alert announcement.

## H0AlertDialog

Blocking alert dialog for explicit confirmation or cancellation of a consequential action.

- Documentation: /components/alertdialog
- Use: A destructive or consequential action requires an explicit decision. The user must acknowledge risk before a workflow continues.
- Avoid: Feedback is informational or non-blocking. The workflow is a general form better suited to H0Modal.

## H0Avatar

User or account image with skeleton loading, deterministic color, and initials fallback.

- Documentation: /components/avatar
- Use: A person, team, or account needs a compact visual identity. An image requires initials fallback and loading feedback.
- Avoid: The image is content rather than identity; use H0Image. A decorative shape does not need an image role.

## H0Badge

Compact non-interactive status, category, or metadata label.

- Documentation: /components/badge
- Use: A status, category, or count needs compact emphasis.
- Avoid: The label must be interactive. A filter must expose selected state; use H0Chip.

## H0Breadcrumbs

Ordered location trail with native or router-compatible ancestor links and current-page semantics.

- Documentation: /components/breadcrumbs
- Use: A page belongs to a meaningful navigable hierarchy.
- Avoid: The interface represents sequential progress rather than location; use H0Stepper.

## H0Button

Base action control for forms, toolbars, dialogs, command surfaces, and link-like actions.

- Documentation: /components/button
- Use: Triggering an action in a form, toolbar, dialog, or command surface. Rendering a visually button-like semantic link with as="a" and href.
- Avoid: Navigation should use a normal link when button styling is unnecessary. A set of adjacent related actions should use H0ButtonGroup. A selected state is required; use a selection control instead.

## H0ButtonGroup

Accessible group of adjacent H0Button controls for a short set of closely related actions.

- Documentation: /components/buttongroup
- Use: A short row of actions belongs to the same task or object. Actions need connected edges, shared appearance, and coordinated sizing.
- Avoid: Commands are unrelated. The control represents a single selected value; use H0Segment, radio controls, or another selection component. Only one action is present.

## H0Card

Composable surface for grouped content, metadata, and actions with optional interactivity.

- Documentation: /components/card
- Use: Related content and actions need one surface. A semantic article, section, aside, or navigational link needs card styling.
- Avoid: Content does not form a meaningful group. A simple action can use H0Button. The whole card performs an action; the current button-root markup limitation should be resolved first. Nested interactive controls would be placed inside an interactive card.

## H0Carousel

Generic controlled or uncontrolled carousel with drag, keyboard, pagination, autoplay, and imperative navigation.

- Documentation: /components/carousel
- Use: A compact viewport presents several peer cards, images, or panels. Users need drag, keyboard, pagination, autoplay, or imperative slide control.
- Avoid: All content should remain visible for scanning. The content is primary navigation between application views. Autoplay would distract from a task.

## H0CellColorPicker

Custom HEX color picker with standard or minimal triggers, controlled state, and keyboard-operable saturation, brightness, and hue controls.

- Documentation: /components/cellcolorpicker
- Use: A compact H0N-styled control should edit a single opaque color.
- Avoid: The value requires alpha, gradients, named colors, or a multi-stop palette editor.

## H0Checkbox

Controlled or uncontrolled native boolean checkbox with surface variants, indeterminate, validation, sizing, and Form integration.

- Documentation: /components/checkbox
- Use: One independent boolean choice is required.
- Avoid: A setting takes effect immediately; consider H0Switch.

## H0CheckboxGroup

Labeled multi-choice checkbox set backed by an array of string option values.

- Documentation: /components/checkbox#h0checkboxgroup
- Use: Several independent values share one question.
- Avoid: Only one option may be chosen; use H0RadioGroup.

## H0Chip

Selectable and optionally removable token with separate primary and remove actions.

- Documentation: /components/chip
- Use: A filter or token needs selected state. A token can be removed from a collection.
- Avoid: The label is purely informational; use H0Badge. Only one binary setting exists; use H0Switch. Exactly one option must remain selected; use H0RadioGroup or H0Segment.

## H0Command

Modal command menu with a configurable trigger, hotkey opening, searchable grouped items, and keyboard selection.

- Documentation: /components/command
- Use: Users need fast keyboard access to application actions or navigation. A searchable grouped action list should open in a modal surface.
- Avoid: A standard select field represents form data. Only one immediate button action is available.

## H0Container

Polymorphic full-width page container with a maximum width, optional centering, and responsive token gutters.

- Documentation: /components/layout
- Use: Page content needs a consistent maximum width and responsive gutters.
- Avoid: A local wrapper needs spacing but no page-width constraint.

## H0ContentState

Controlled state region that transitions between loading, error, empty, and resolved content slots.

- Documentation: /components/contentstate
- Use: One region replaces request feedback with an empty result or resolved content. The parent already owns the asynchronous or application state.
- Avoid: Multiple states need to remain visible simultaneously. Inactive stateful content must remain mounted without lifting its state to the parent.

## H0DataTable

Data-driven table with client or server state, filters, sorting, selection, pagination, infinite loading, and fixed-row virtualization.

- Documentation: /components/datatable
- Use: A dataset needs built-in sorting, filtering, selection, pagination, infinite loading, or virtualization. Client and server data flows should share one table interface.
- Avoid: A simple presentational table is enough; use H0Table. Rows have variable height but virtualization is required.

## H0Description

Muted regular-weight supporting text preset for fields, cards, and metadata.

- Documentation: /components/description
- Use: Secondary copy supports a field, card, or value.
- Avoid: Text is a heading or primary body content. The text is a validation error.

## H0Divider

Horizontal or vertical separator with optional label content, responsive inset, and decorative mode.

- Documentation: /components/layout#h0divider
- Use: Adjacent content groups need a meaningful or visual boundary.
- Avoid: Spacing alone already communicates the grouping.

## H0Drawer

Modal edge panel for navigation, filters, and supporting workflows.

- Documentation: /components/drawer
- Use: Navigation or filters need a full-height supporting surface. A secondary workflow should enter from a viewport edge.
- Avoid: The task needs a compact centered dialog. The content is short contextual help.

## H0Dropdown

Floating disclosure with a consumer-owned trigger and arbitrary interactive content.

- Documentation: /components/dropdown
- Use: A button, image or other control reveals custom actions or a compact form. Content needs a floating container without a built-in trigger or item layout.
- Avoid: Selecting a value from options requires H0Select. A modal task requires focus containment and background scroll locking.

## H0EmptyState

Centered empty-content explanation with visual, description, actions, and inline, surface, or page layout.

- Documentation: /components/emptystate
- Use: A collection or page has no content and needs explanation. Users can take a clear next step.
- Avoid: Data is still loading; use H0Skeleton or H0Spinner. A request failed; use an error alert with recovery guidance.

## H0ErrorMessage

Danger-colored text preset for persistent validation and action errors.

- Documentation: /components/errormessage
- Use: A field or action needs concise dedicated error text.
- Avoid: A broader status message with an icon is needed. The message is not an error.

## H0Field

Form layout primitive that connects a label, control, hint, and validation error through accessible attributes.

- Documentation: /components/field
- Use: A custom control needs the same label, hint, and error contract as built-in fields.
- Avoid: A built-in H0N form control already provides the complete field shell.

## H0FileUpload

Accessible file picker and drop zone with validation, upload queue state, progress, retry, cancellation, and optional reordering.

- Documentation: /components/fileupload
- Use: Users select or upload one or more files with visible validation and progress.
- Avoid: Only one image preview is needed; use H0ImageUpload.

## H0Form

Form coordinator for H0N fields with shared values, validation errors, reset behavior, and typed submit payloads.

- Documentation: /components/form
- Use: Several H0N controls need coordinated validation, reset, and submit state.
- Avoid: A native form without coordinated state is sufficient.

## H0Grid

Polymorphic CSS grid with common page and collection presets plus explicit column and row templates.

- Documentation: /components/grid
- Use: Content needs two-dimensional alignment or a reusable page-shell template.
- Avoid: Only one row or column relationship exists; use H0Inline or H0Stack.

## H0Icon

SVG renderer for legacy node definitions and trusted tree-shakeable body definitions from @h0nio/icons.

- Documentation: /components/icon
- Use: A system SVG icon is needed inside text or a control.
- Avoid: A bitmap or content image is required. Visible text already communicates the information and no decorative icon is needed.

## H0Image

Responsive image with intersection-based lazy loading, skeleton state, sizing, and fallback content.

- Documentation: /components/image
- Use: Media needs lazy loading, reserved sizing, skeleton, or fallback behavior.
- Avoid: A user identity image needs initials fallback; use H0Avatar. A CSS background is purely decorative.

## H0ImageUpload

Single-image picker with preview, drag and drop, preset dimensions, validation, and removable controlled state.

- Documentation: /components/imageupload
- Use: A form accepts one image and should preview it before upload.
- Avoid: Multiple arbitrary files or upload progress are needed; use H0FileUpload.

## H0InfiniteScroll

IntersectionObserver sentinel that requests bounded chunks in a page viewport or nearest scrollable ancestor.

- Documentation: /components/infinitescroll
- Use: A list or feed should append data near its scroll boundary. The collection layout is owned by another component.
- Avoid: Users need numbered navigation or stable URLs for pages. A huge retained collection lacks virtualization or another DOM-bounding strategy. IntersectionObserver is unavailable and no separate loading control exists.

## H0Inline

Polymorphic horizontal flex layout with responsive gap, alignment, distribution, and wrapping.

- Documentation: /components/layout#h0inline
- Use: Sibling elements form a horizontal row that may wrap.
- Avoid: Children form a vertical sequence; use H0Stack.

## H0Input

General-purpose single-line input with adornments, clear action, native attributes, and shared H0N field feedback.

- Documentation: /components/input
- Use: A form needs a standard single-line native input.
- Avoid: The value needs domain-specific parsing such as dates or numbers.

## H0InputOTP

Segmented one-time-code input with paste distribution, validation, completion events, and accessible grouped semantics.

- Documentation: /components/inputotp
- Use: A verification flow requests a short one-time code.
- Avoid: The value is an ordinary password or arbitrary text.

## H0Label

Consistent form label preset supporting label, legend, and span semantics.

- Documentation: /components/label
- Use: A form control or fieldset needs a visible label. A component-owned relationship needs consistent label typography.
- Avoid: Text is a page heading or arbitrary caption.

## H0Link

Polymorphic navigation link with semantic tones, external disclosure, disabled behavior, and attribute forwarding.

- Documentation: /components/link
- Use: Activating text navigates to another location or resource.
- Avoid: Activation performs an action without navigation; use H0Button.

## H0List

Grouped collection wrapper with optional accessible label, spacing, and item separators.

- Documentation: /components/list
- Use: Actions, navigation, or rich rows form a visual group.
- Avoid: Label/value metadata belongs in a semantic definition list. Native ordered or unordered prose lists are sufficient.

## H0ListItem

Interactive or static polymorphic row with structured text, start/end slots, state, and sizing.

- Documentation: /components/list#h0listitem
- Use: A collection row needs interaction or structured content. A polymorphic button, link, or static row needs shared visuals.
- Avoid: A standalone button is sufficient. Definition metadata belongs in a semantic definition list.

## H0Message

Compact supporting or status text with an optional tone-specific decorative icon.

- Documentation: /components/message
- Use: Compact status or informational copy benefits from an icon.
- Avoid: A field validation error needs the dedicated H0ErrorMessage preset. A full alert surface is required.

## H0Modal

Blocking dialog surface for a self-contained task or workflow.

- Documentation: /components/modal
- Use: A focused task must temporarily block the underlying page. A form needs a dedicated dialog surface.
- Avoid: Only a short confirmation is needed. Content should remain non-modal and anchored to a trigger.

## H0NumberInput

Localized numeric input with parsing, formatting, precision, bounds, step controls, and controlled null state.

- Documentation: /components/numberinput
- Use: A numeric value needs bounds, stepping, or localized formatting.
- Avoid: The interface requires choosing two endpoints from one numeric domain.

## H0Pagination

Numbered page navigation with derived totals, boundary and sibling items, ellipses, sizes, and optional result summary.

- Documentation: /components/pagination
- Use: Users navigate a known finite number of result pages.
- Avoid: The API exposes only opaque cursors. Content should append continuously; use H0InfiniteScroll.

## H0PasswordInput

Password field with controlled visibility, optional strength feedback, autocomplete guidance, and H0N validation messaging.

- Documentation: /components/passwordinput
- Use: A form requests a password and should offer a reveal action or strength feedback.
- Avoid: A one-time verification code is requested; use H0InputOTP.

## H0Radio

Standalone native radio control with surface variants, label, description, validation, and programmatic focus.

- Documentation: /components/radio
- Use: A radio participates in a custom composition not driven by an options array.
- Avoid: Several choices form one field; prefer H0RadioGroup.

## H0RadioGroup

Single-choice fieldset generated from options with responsive layout, validation, and custom option rendering.

- Documentation: /components/radio#h0radiogroup
- Use: A field offers one choice from a known option list.
- Avoid: A single boolean setting should use H0Switch or H0Checkbox.

## H0Ripple

Low-level pointer-origin animation for custom positioned interactive surfaces.

- Documentation: /components/ripple
- Use: A custom interactive surface needs optional pointer-origin feedback.
- Avoid: A library control already provides its own feedback. The effect would be the only activation or focus signal.

## H0ScrollArea

Focusable native scroll region with shared scrollbar styling, bounded axes, stable gutter, edge fades, and boundary events.

- Documentation: /components/scrollarea
- Use: Content needs a bounded, explicitly labeled scroll region. Code needs boundary events or imperative native scrolling.
- Avoid: The document itself can scroll naturally. A large collection needs virtualization rather than only overflow.

## H0SearchField

Compact native search control with clear action, controlled value, icon customization, and imperative focus helpers.

- Documentation: /components/searchfield
- Use: Users filter or search content with a compact query field.
- Avoid: A fixed option selection is required; use H0Select.

## H0Segment

Controlled or uncontrolled radiogroup for a compact set of mutually exclusive modes with an animated indicator.

- Documentation: /components/segment
- Use: A small set of peer views or modes needs compact immediate selection.
- Avoid: Each choice controls a semantic tabpanel; use H0Tabs. The choices are form data better represented by H0RadioGroup.

## H0Select

Accessible single or multiple option picker with custom rendering, virtualization, loading state, and teleported listbox.

- Documentation: /components/select
- Use: Users choose from a known option list without free-text creation.
- Avoid: Free-text creation or remote filtering is central.

## H0Sheet

Compact inset modal surface positioned near a viewport edge.

- Documentation: /components/sheet
- Use: A short modal workflow should float near a viewport edge. Mobile-first quick actions need a bottom surface.
- Avoid: A full-height navigation surface needs H0Drawer. A centered form needs H0Modal.

## H0SideNav

Grouped sidebar navigation surface with configurable group spacing and animated item indicators.

- Documentation: /components/sidenav
- Use: A persistent sidebar contains related groups of page destinations.
- Avoid: Destinations belong in the global top navigation or a compact tab set.

## H0SideNavGroup

Labeled list grouping for related destinations inside H0SideNav.

- Documentation: /components/sidenav#h0sidenavgroup
- Use: Sidebar destinations form a meaningful labeled subset.
- Avoid: A wrapper would not communicate a real grouping.

## H0SideNavItem

Polymorphic sidebar destination with explicit or router-derived active state and optional trailing indicator.

- Documentation: /components/sidenav#h0sidenavitem
- Use: A destination belongs inside H0SideNav and may use native or router navigation.
- Avoid: The row performs a non-navigation action.

## H0Skeleton

Decorative loading placeholder with block, text, and circular geometry and reduced-motion shimmer handling.

- Documentation: /components/skeleton
- Use: The shape of loading content is known and layout should remain stable.
- Avoid: The content shape is unknown and one concise H0Spinner is enough.

## H0Spacer

Non-semantic horizontal or vertical token-sized space with responsive sizing.

- Documentation: /components/layout#h0spacer
- Use: An intentional empty gap cannot be expressed by a parent gap or wrapper padding.
- Avoid: Stack, Inline, or Grid gap can own the relationship.

## H0Spinner

Compact indeterminate status indicator with CSS sizing, current-color styling, and accessible label.

- Documentation: /components/spinner
- Use: A short operation has no measurable completion value. A compact control needs an inline loading indicator.
- Avoid: Content geometry should remain stable; use H0Skeleton. Completion can be measured; use determinate progress.

## H0Stack

Polymorphic vertical flex layout with responsive gap, cross-axis alignment, distribution, and wrapping.

- Documentation: /components/layout#h0stack
- Use: Sibling elements form a vertical sequence with consistent spacing.
- Avoid: Children should flow horizontally; use H0Inline.

## H0Stepper

Non-interactive progress indicator for a fixed sequence with completed, active, and pending states.

- Documentation: /components/stepper
- Use: A workflow has a known ordered sequence and users need progress context.
- Avoid: The control itself must navigate between panels; use H0Tabs or application buttons.

## H0Switch

Immediate boolean setting control with native checkbox semantics, switch role, label, hint, and validation state.

- Documentation: /components/switch
- Use: A boolean setting takes effect immediately.
- Avoid: Users select items for later submission; use H0Checkbox.

## H0Tab

Compound tab control linked to one H0TabPanel through the shared H0Tabs value and generated IDs.

- Documentation: /components/tabs#h0tab
- Use: Compound H0Tabs needs explicitly authored tab content.
- Avoid: Items mode can generate uniform tabs.

## H0Table

Semantic presentational table with typed columns, custom cells, density variants, and managed scroll geometry.

- Documentation: /components/table
- Use: Semantic tabular markup is required. Sorting, filtering, and paging are handled by application logic.
- Avoid: Built-in data manipulation or selection is required; use H0DataTable. The content is better understood as cards or a key-value list on every viewport.

## H0TabList

Compound tablist that applies orientation-aware arrow, Home, End, loop, and RTL keyboard navigation.

- Documentation: /components/tabs#h0tablist
- Use: Compound H0Tabs needs an explicitly authored tab list.
- Avoid: H0Tabs items mode generates the tab list automatically.

## H0TabPanel

Focusable compound tabpanel whose visibility and mount lifecycle follow H0Tabs state.

- Documentation: /components/tabs#h0tabpanel
- Use: Compound H0Tabs needs explicitly authored panel content or component state.
- Avoid: Items mode with one panel slot is sufficient.

## H0Tabs

Controlled or uncontrolled tabs coordinator with data-driven and compound composition, keyboard modes, and panel mount strategies.

- Documentation: /components/tabs
- Use: Several peer content panels share one region and only one is active.
- Avoid: Choices change a compact mode without semantic panels; use H0Segment. Destinations navigate to separate pages; use links.

## H0Textarea

Multiline text control with automatic height, optional manual resizing, character count, and shared H0N form feedback.

- Documentation: /components/textarea
- Use: A form accepts free-form multiline text.
- Avoid: A single short value fits H0Input.

## H0TextShimmer

Readable status text with a subtle moving highlight in the High animation profile.

- Documentation: /components/textshimmer
- Use: A short label describes ongoing loading, thinking, processing, or streaming. Text should remain readable when motion is disabled.
- Avoid: Progress needs a numerical value or completion estimate. Content contains interactive controls. Essential information would be communicated by animation alone.

## H0Toast

Visual transient notification with semantic tone, icon, content slots, localized close control, and polite status announcement.

- Documentation: /components/toast
- Use: Transient global feedback should not interrupt the task. An operation changes state and needs brief confirmation.
- Avoid: Feedback must remain next to its source; use H0Alert. A user decision is required; use a dialog. Critical failure details must remain available.

## H0Toasts

Teleported toast stack that renders recent service items with placement, stacking, transitions, and dismissal delegation.

- Documentation: /components/toast#h0toasts
- Use: A toast service needs one application-level visual stack. An isolated subtree supplies an explicit toast service.
- Avoid: Rendering an individual application-owned preview; use H0Toast. Several stacks would consume the same service.

## H0Toolbar

Keyboard-navigable command surface for a compact set of related actions.

- Documentation: /components/toolbar
- Use: A compact set of commands belongs to one task or editor surface. Users should enter the command set with one Tab stop and move within it using arrow keys. Actions need data-driven or explicitly grouped compound composition.
- Avoid: Actions are unrelated or distributed across a layout. The interface represents one selected value; use H0Segment or radio controls. A single action can use H0Button. Commands need menu-style disclosure rather than remaining directly available.

## H0ToolbarGroup

Accessible subgroup for related compound toolbar commands.

- Documentation: /components/toolbar#h0toolbargroup
- Use: A compound toolbar contains distinct subsets of related commands. A subset benefits from its own accessible name.
- Avoid: The toolbar has one undivided set of actions. The group would be rendered outside H0Toolbar.

## H0ToolbarItem

Compound toolbar command participating in the parent toolbar roving-focus sequence.

- Documentation: /components/toolbar#h0toolbaritem
- Use: A compound toolbar command needs its own markup, state, or event handler. Commands are organized with H0ToolbarGroup or H0ToolbarSeparator.
- Avoid: Uniform commands can be expressed more simply with the H0Toolbar items prop. The control is rendered outside H0Toolbar. The interaction represents one selected value rather than a command.

## H0ToolbarSeparator

Orientation-aware visual and semantic separator between compound toolbar command groups.

- Documentation: /components/toolbar#h0toolbarseparator
- Use: A compound toolbar needs a boundary between meaningful command groups.
- Avoid: Commands already form one coherent group. Spacing alone provides sufficient grouping.

## H0Tooltip

Concise non-interactive description shown on hover or keyboard focus.

- Documentation: /components/tooltip
- Use: A control benefits from a short supplementary description. An icon needs concise hover and focus help in addition to its accessible name.
- Avoid: Information is essential and should remain visible. Content contains interactive controls. A control lacks an accessible name.

## H0Typography

Semantic text primitive with H0N type variants, alignment, color, weight, line-height, letter-spacing, text-transform overrides, and truncation.

- Documentation: /components/typography
- Use: Text needs the H0N scale with explicit semantics. Visual type style differs from required HTML hierarchy.
- Avoid: A constrained Description, Label, ErrorMessage, or Message preset is more specific.
