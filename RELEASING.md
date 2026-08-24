# Releasing workspace packages

Only maintainers authorized for the `@h0nio` npm scope and the
`h0n-world/ui` repository may publish a release. Registry publication is a
manual maintainer action; CI quality workflows do not publish packages.

## Independent versions and tags

`@h0nio/ui` and `@h0nio/icons` follow semantic versioning independently. A
release of one package does not change the version of the other package unless
that package also has a user-facing change.

Use package-specific Git tags and matching GitHub Releases:

```text
ui-v1.2.0
icons-v1.0.0
```

Documentation-only and workspace-only changes do not require a package version
change. Publish and verify `@h0nio/icons` before adding or updating it as a
registry dependency in a later `@h0nio/ui` release.

## Manual authentication

Manual releases use a short-lived npm access token created specifically for the
release. Provide it through approved local npm configuration outside the
repository immediately before publishing. Never commit a token or place it in
a tracked `.npmrc`, command argument, release log, or documentation. Revoke or
allow the token to expire after registry verification completes.

The maintainer's token-creation flow replaces interactive `pnpm whoami` and
organization-access checks. Trusted publishing and npm provenance may be added
later, but they are not blockers for the documented short-lived-token flow.

## Release `@h0nio/ui`

### Prepare

1. Select the version using semantic versioning.
2. Update `packages/ui/package.json`.
3. Update `apps/documentation/src/content/pages/releases/changelog.md`.
4. Regenerate agent artifacts because they embed the package version:

    ```bash
    pnpm run agents:generate
    ```

5. Review intentional public API or stable CSS-token changes and update the
   contract snapshot only when required.

### Verify

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run test:visual
pnpm --filter @h0nio/ui verify:package
pnpm --dir packages/ui pack --dry-run --json
```

The archive must contain only the intentional `dist`, `README.md`, `LICENSE`,
and publication `package.json` files. Every declared export target must exist.
Commit the reviewed release change and confirm `git status --short` is empty
before publishing.

### Publish and verify

1. Merge the reviewed release commit into `main`.
2. Configure the short-lived npm token outside the repository.
3. Publish the exact reviewed version from the package directory:

    ```bash
    pnpm --dir packages/ui publish --access public
    ```

4. Verify the registry metadata:

    ```bash
    pnpm view @h0nio/ui@<version>
    ```

5. Revoke the token after verification.
6. Create `ui-v<version>` from the published commit and create the matching
   GitHub Release. Link a migration guide only for an actual breaking release.

## Release `@h0nio/icons`

### Prepare

1. Select the version using semantic versioning and update
   `packages/icons/package.json`.
2. Review the public icon names, entry points, raw SVG policy, license notices,
   README, and documentation catalog for the selected version.
3. Keep `private: true` during ordinary development. Remove it only in the
   reviewed release change; a package that has been released remains public in
   subsequent development.

### Verify

Run from the repository root:

```bash
pnpm --filter @h0nio/icons check
pnpm --filter @h0nio/icons test
pnpm --filter @h0nio/icons build
pnpm --filter @h0nio/icons verify:package
pnpm --filter @h0nio/icons verify:consumer
pnpm --filter @h0nio/icons verify:size
pnpm --filter @h0nio/icons verify:tarball
pnpm --dir packages/icons pack --dry-run --json
```

The archive must contain both license notices, the lightweight runtime entries,
all declared icon and raw SVG subpaths, and no private source, tests, maps, or
temporary files. The installed-tarball fixture must pass. Build, test, and pack
must not create an unreviewed diff; commit the release change and confirm
`git status --short` is empty before publishing.

### Publish and verify

1. Merge the reviewed release commit with `private` removed into `main`.
2. Configure the short-lived npm token outside the repository.
3. Publish the exact reviewed version:

    ```bash
    pnpm --dir packages/icons publish --access public
    ```

   `prepublishOnly` and `prepack` rerun the package checks and build gates.

4. Verify the published version and export metadata:

    ```bash
    pnpm view @h0nio/icons@<version>
    ```

5. Install the exact registry version in a clean temporary consumer and verify
   the lightweight root, one individual icon, `all`, `catalog`, and one raw SVG
   subpath.
6. Revoke the token after verification.
7. Create `icons-v<version>` from the published commit and create the matching
   GitHub Release with user-facing notes about the collection and public API.
