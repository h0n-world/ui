# Security Policy

## Supported versions

Security fixes are provided for the latest published `1.x` release of `@h0nio/ui`. Pre-1.0 versions and unreleased workspace experiments are not supported.

Applications should stay on the latest patch release. A fix may require upgrading when maintaining multiple patch lines would increase risk or delay disclosure.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability.

Report it privately through [GitHub Security Advisories](https://github.com/h0n-world/ui/security/advisories/new). Include:

- the affected package version and import path;
- impact and realistic attack conditions;
- reproduction steps or a minimal repository;
- any known workaround;
- whether the issue has already been disclosed elsewhere.

Maintainers will acknowledge the report, validate its scope, and coordinate remediation and disclosure through the private advisory. Please allow maintainers time to investigate before publishing details.

## Scope

Reports involving runtime behavior, generated markup, browser security boundaries, package contents, dependencies, or the documentation application are in scope. General support questions, accessibility defects without a security impact, and vulnerabilities solely in unsupported applications consuming the library should use the regular issue tracker.
