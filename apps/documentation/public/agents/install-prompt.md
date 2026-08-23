# Install and configure H0N UI 1.2.0

You are working in an existing Vue project. Install and configure **@h0nio/ui@1.2.0** without replacing the project's architecture or introducing a second package manager.

## Your task

1. Read the repository's **AGENTS.md**, contribution instructions, and package scripts before editing.
2. Inspect the existing package-manager lockfile, Vue version, application bootstrap, router/store/plugin chain, stylesheet entry, SSR framework (if any), and current theme, locale, and toast setup.
3. Require Vue 3.5 or newer. If the project is incompatible, explain the conflict and stop instead of forcing a framework upgrade.
4. Use the package manager already selected by the repository. Install exactly **@h0nio/ui@1.2.0**; do not create another lockfile and do not install **@h0n/icon**.
5. For the standard integration, import the default **H0Nui** plugin from **@h0nio/ui**, import **@h0nio/ui/style.css** exactly once, and add **app.use(H0Nui)** to the existing Vue application chain. Do not create a second app instance or discard existing plugins.
6. Preserve existing product decisions. Add plugin options for theme, animation, density, radius, typography, locale, or toast only when they are already defined by the project or explicitly requested. Otherwise keep the minimal default registration.
7. Use selective imports only when the project explicitly requires them. Import components from **@h0nio/ui/components/Family** and load either the global stylesheet once or the matching **@h0nio/ui/components/Family/style.css**.
8. Use system icons from **@h0nio/ui/icons**. Never import package **src**, **_shared**, Vue implementation files, generated chunks, or undeclared deep paths.
9. Do not modify product UI merely to add a demo unless requested. If a smoke example is requested, use public components and remove any temporary test surface that should not ship.
10. Run the repository's real typecheck and production build, plus relevant tests. Verify that the package version is correct, the stylesheet is loaded once, the existing plugin chain remains intact, and no unrelated lockfile or formatting churn was introduced.

## Expected standard bootstrap shape

Adapt this to the existing application entry; do not recreate working bootstrap code:

~~~ts
import H0Nui from '@h0nio/ui'
import '@h0nio/ui/style.css'

// Keep the existing createApp instance and all existing plugins.
app.use(H0Nui)
~~~

If the application already has explicit appearance or service requirements, pass only those known values:

~~~ts
app.use(H0Nui, {
    animation: 'high',
    density: 'default',
    radiusSize: 'lg',
    theme: 'system',
    typographySize: 'md',
})
~~~

## Public references

When you know the H0N UI documentation origin, resolve these paths against that origin rather than the consumer application:

- **/llms.txt** — compact versioned index and supported package boundaries.
- **/agent-data/components.v1.json** — exact component APIs and implementation guidance.
- **/agents/AGENTS.md** — reusable rules for future H0N UI work in the project.
- **/docs/quick-start** — human-readable setup and plugin options.

The installed package's TypeScript declarations are the executable contract. If documentation and the installed version differ, follow the installed version or align the package version deliberately before implementation.

## Completion report

Report:

- the package manager and installed H0N UI version;
- every file changed and why;
- where the plugin and stylesheet are registered;
- any plugin options selected and the project requirement that justified them;
- every validation command and its result;
- any incompatibility or decision still requiring the developer.

Do not claim completion when typecheck or build fails. Distinguish pre-existing failures from failures caused by your changes.
