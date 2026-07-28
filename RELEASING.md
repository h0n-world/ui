# Releasing `@h0nio/ui`

Only maintainers authorized for the `@h0nio` npm scope and `h0n-world/ui` repository may publish a release.

## Prepare

1. Select the version using semantic versioning.
2. Update `packages/ui/package.json`.
3. Update `apps/documentation/src/content/pages/releases/changelog.md`.
4. Regenerate agent artifacts because they embed the package version:

    ```bash
    pnpm run agents:generate
    ```

5. Review intentional public API or stable CSS-token changes and update the contract snapshot only when required.

## Verify

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run test:visual
pnpm --filter @h0nio/ui verify:package
```

Inspect the dry-run archive when the package surface or build configuration changed:

```bash
pnpm --dir packages/ui pack --dry-run --json
```

The archive must contain only `dist`, `README.md`, `LICENSE`, and its publication `package.json`. Every declared export target must exist.

## Publish

1. Merge the reviewed release changes into `main`.
2. Confirm the npm account uses the organization-required authentication and publishing controls.
3. From `packages/ui`, publish the exact reviewed version:

    ```bash
    pnpm publish --access public
    ```

    `prepublishOnly` reruns tests, the complete build, consumer fixtures, size budgets, and package-content verification.

4. Verify the published version and export metadata:

    ```bash
    pnpm view @h0nio/ui@<version>
    ```

5. Create the matching `v<version>` Git tag and GitHub release from the reviewed commit. Release notes should summarize user-facing changes and link a migration guide only for an actual breaking release.

Automated registry publication should be added only after npm trusted publishing is configured for `h0n-world/ui`.
