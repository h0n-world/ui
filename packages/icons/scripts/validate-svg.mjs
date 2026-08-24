import { readFile, readdir } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const svgDirectory = resolve(packageRoot, 'src/svg');
const metadata = JSON.parse(await readFile(resolve(packageRoot, 'src/metadata.json'), 'utf8'));
const namingExceptions = JSON.parse(
  await readFile(resolve(packageRoot, 'src/naming-exceptions.json'), 'utf8'),
);
const allowedTags = new Set([
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'g',
  'path',
  'rect',
  'svg',
  'text',
]);
const allowedAttributes = new Set([
  'aria-hidden',
  'clip-path',
  'clip-rule',
  'cx',
  'cy',
  'd',
  'dominant-baseline',
  'fill',
  'fill-rule',
  'font-family',
  'font-size',
  'font-weight',
  'height',
  'id',
  'opacity',
  'r',
  'rx',
  'ry',
  'stroke',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-width',
  'text-anchor',
  'transform',
  'viewBox',
  'width',
  'x',
  'xmlns',
  'y',
]);
const safePaintValues = new Set(['none', 'currentColor']);
const globalIds = new Map();
const files = (await readdir(svgDirectory)).filter((file) => file.endsWith('.svg')).sort();

if (namingExceptions.policy !== 'preserve-source-identifiers') {
  throw new Error(`Unsupported naming policy: ${namingExceptions.policy}.`);
}
for (const [legacyPattern, correctedPattern] of Object.entries(namingExceptions.patterns ?? {})) {
  if (!files.some((file) => file.slice(0, -4).includes(legacyPattern))) {
    throw new Error(`Naming exception does not match an SVG: ${legacyPattern}.`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(correctedPattern)) {
    throw new Error(`Invalid corrected naming pattern: ${correctedPattern}.`);
  }
}

function fail(file, message) {
  throw new Error(`${file}: ${message}`);
}

for (const file of files) {
  const name = basename(file, '.svg');
  const svg = await readFile(resolve(svgDirectory, file), 'utf8');
  const root = svg.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>\n?$/);
  if (!root) fail(file, 'must contain exactly one SVG root.');
  if (!metadata.icons[name]) fail(file, 'is missing metadata.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) fail(file, 'name must use kebab-case.');
  if (/<(?:script|foreignObject|iframe|image|use)\b/i.test(svg)) {
    fail(file, 'contains an unsafe or externally-resolved element.');
  }
  if (/\son[a-z]+\s*=/i.test(svg)) fail(file, 'contains an event-handler attribute.');
  if (/\b(?:href|xlink:href)="(?!#)/i.test(svg)) fail(file, 'contains an external href.');
  if (/url\((?!#)/i.test(svg)) fail(file, 'contains an external URL reference.');

  const viewBox = root[1].match(/\bviewBox="([^"]+)"/)?.[1];
  const dimensions = viewBox?.trim().split(/[ ,]+/).map(Number);
  if (
    !dimensions ||
    dimensions.length !== 4 ||
    dimensions.some((value) => !Number.isFinite(value)) ||
    dimensions[2] <= 0 ||
    dimensions[3] <= 0
  ) {
    fail(file, 'viewBox must contain four finite values with positive width and height.');
  }

  for (const match of svg.matchAll(/<\/?([A-Za-z][\w:-]*)\b/g)) {
    if (!allowedTags.has(match[1])) fail(file, `contains unsupported <${match[1]}> element.`);
  }
  for (const match of svg.matchAll(/\s([A-Za-z_:][\w:.-]*)=/g)) {
    if (!allowedAttributes.has(match[1])) fail(file, `contains unsupported ${match[1]} attribute.`);
  }
  for (const match of svg.matchAll(/\b(fill|stroke|color)="([^"]+)"/g)) {
    if (!safePaintValues.has(match[2])) fail(file, `contains fixed ${match[1]}="${match[2]}".`);
  }

  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) fail(file, 'contains duplicate local ids.');
  for (const id of ids) {
    if (!id.startsWith(`${name}-`)) fail(file, `id "${id}" is not prefixed with its icon name.`);
    if (globalIds.has(id)) fail(file, `id "${id}" is also used by ${globalIds.get(id)}.`);
    globalIds.set(id, file);
  }
  const references = [
    ...svg.matchAll(/url\(#([^)]+)\)/g),
    ...svg.matchAll(/(?:href|xlink:href)="#([^"]+)"/g),
  ].map((match) => match[1]);
  for (const reference of references) {
    if (!ids.includes(reference)) fail(file, `references missing local id "${reference}".`);
  }
}

const metadataNames = Object.keys(metadata.icons).sort();
const svgNames = files.map((file) => basename(file, '.svg'));
const missingMetadata = svgNames.filter((name) => !metadataNames.includes(name));
const missingSvg = metadataNames.filter((name) => !svgNames.includes(name));
if (missingMetadata.length > 0 || missingSvg.length > 0) {
  throw new Error(
    `SVG and metadata icon names do not match. Missing metadata: ${missingMetadata.join(', ') || 'none'}. Missing SVG: ${missingSvg.join(', ') || 'none'}.`,
  );
}

console.log(`Validated SVG safety and rendering invariants for ${files.length} icons.`);
