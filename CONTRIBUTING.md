# Contributing to H0N UI

H0N UI maintains `@h0nio/ui` as a stable Vue 3 library. Changes should preserve the supported 1.x API unless the release is explicitly planned as a new major version.

## Development setup

Requirements:

- Node.js 24 or newer;
- pnpm 11.15.1 through the repository `packageManager` declaration.

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run test
pnpm run build
```

The documentation application runs at `http://localhost:5201` with `pnpm run dev`.

## Scope

The maintained packages are:

- `packages/ui`;
- `apps/documentation`.

`apps/templates` is incubating and should not be used to establish library conventions or changed incidentally.

For a supported component change, synchronize implementation, family exports, the root API, manifest metadata, Markdown documentation, executable examples, typed agent records, generated artifacts, and the reviewed contract snapshot when applicable.

## Pull requests

- Keep changes focused and preserve unrelated work.
- Add or update behavior and contract tests for observable changes.
- Preserve accessibility, keyboard interaction, RTL, forced-colors, reduced-motion, SSR, and cleanup behavior where relevant.
- Do not hand-edit generated files under `apps/documentation/public`; run `pnpm run agents:generate`.
- Do not update the public contract snapshot mechanically. Review intentional API or stable-token changes first.
- Explain any user-facing API, behavior, accessibility, bundle-size, or documentation impact.

Bug fixes belong in patch releases. Backward-compatible additions belong in minor releases. Breaking supported API changes require a major release and a migration guide.

## Security

Do not disclose suspected vulnerabilities in a pull request or public issue. Follow [SECURITY.md](./SECURITY.md).
