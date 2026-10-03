# UI for Agents update

## Scope

Keep component runtime and public API unchanged. Preserve existing user edits.
Use typed records and the existing deterministic artifact generator as the source
of truth; publish a portable h0n-ui skill through documentation static assets.

## Implementation

1. Audit surface/secondary implementations and record defaults, including OTP's
   secondary default. Add optional typed surface metadata with validation.
2. Share component-selection and contextual surface guidance across llms.txt,
   consumer AGENTS.md, the installation prompt, and the new skill.
3. Generate SKILL.md plus a local component discovery reference. Keep exact APIs
   in the existing versioned catalog; explain version and documentation-origin
   resolution, installation, and limitations on the Agent Skills page.
4. Update architecture and documentation contributor instructions.
5. Regenerate and verify artifacts, test metadata/generation invariants, run
   documentation typecheck/build, and inspect the documentation route if feasible.

## Findings

- H0Card, H0Input, H0Textarea, H0Select, H0PasswordInput, H0NumberInput,
  H0SearchField, H0FileUpload, and H0CellColorPicker default to surface.
- H0InputOTP defaults to secondary; do not generalize surface defaults to OTP.
- Use the actual enclosing background, including transparent ancestors and
  application overrides. Alternation is appropriate when separation is desired;
  variant names on unrelated components do not share background semantics.
- Existing validation checks catalog coverage and links, not every API against
  implementation source. Report verification limits accurately.

## Verification result

- Generated all six artifacts; freshness and nine agent-foundation tests pass.
- Surface metadata covers 14 supported components; runtime defaults, invalid
  metadata rejection, catalog serialization, local skill links, and complete
  discovery-reference coverage are checked.
- Skill YAML and references validated with the installed YAML parser. The bundled
  Python validator could not run because its environment lacks PyYAML.
- Inspected `/docs/agents/skills` in the browser; both raw skill files return
  HTTP 200 and match the generated contents exactly.
- Documentation build/typecheck is blocked by pre-existing Vue macro import
  conflicts in the user's modified H0Dropdown.vue. Direct Vite build encounters
  the same issue through the editor declaration-generation plugin. No successful
  production build is claimed, and that unrelated component was not edited.
