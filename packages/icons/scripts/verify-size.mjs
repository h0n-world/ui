import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));

async function measure(name, source, limits, options = {}) {
  const result = await build({
    stdin: {
      contents: source,
      loader: 'ts',
      resolveDir: packageRoot,
      sourcefile: `${name}.ts`,
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    minify: true,
    metafile: true,
    write: false,
    loader: { '.svg': 'text' },
    ...options,
  });
  const output = result.outputFiles[0].contents;
  const raw = output.byteLength;
  const gzip = gzipSync(output).byteLength;
  const inputs = Object.keys(result.metafile.inputs).length;

  assert(raw <= limits.raw, `${name} is ${raw} B raw; budget is ${limits.raw} B.`);
  assert(gzip <= limits.gzip, `${name} is ${gzip} B gzip; budget is ${limits.gzip} B.`);
  if (limits.inputs) {
    assert(inputs <= limits.inputs, `${name} reads ${inputs} modules; budget is ${limits.inputs}.`);
  }
  console.log(`PASS ${name}: ${raw} B raw, ${gzip} B gzip, ${inputs} inputs.`);
}

await measure(
  'individual icon',
  `import icon from '@h0nio/icons/accessibility-duotone'; console.log(icon);`,
  { raw: 1_100, gzip: 650, inputs: 2 },
);
await measure(
  'lightweight root',
  `import { renderIcon } from '@h0nio/icons'; console.log(renderIcon);`,
  { raw: 800, gzip: 500, inputs: 3 },
);
await measure(
  'catalog',
  `import { iconCatalog } from '@h0nio/icons/catalog'; console.log(iconCatalog);`,
  { raw: 350_000, gzip: 35_000, inputs: 2 },
);
await measure(
  'named icon from all',
  `import { AccessibilityDuotoneIcon } from '@h0nio/icons/all'; console.log(AccessibilityDuotoneIcon);`,
  { raw: 1_100, gzip: 650 },
);
await measure(
  'full all registry',
  `import { icons } from '@h0nio/icons/all'; console.log(icons);`,
  { raw: 4_300_000, gzip: 900_000 },
);
await measure(
  'raw SVG',
  `import svg from '@h0nio/icons/svg/accessibility-duotone'; console.log(svg);`,
  { raw: 1_000, gzip: 600, inputs: 2 },
);
