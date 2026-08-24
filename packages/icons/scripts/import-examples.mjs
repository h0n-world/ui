import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { resolveImportSource } from './import-source.mjs';

const packageRoot = resolve(import.meta.dirname, '..');
const sourceDir = await resolveImportSource();
const targetDir = resolve(packageRoot, 'src/svg');
const excluded = new Set([
  'IconFriends.vue',
  'IconItemBooster.vue',
  'IconMedal.vue',
  'IconTest.vue',
]);

const kebabCase = (value) =>
  value
    .replace(/^Icon/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.vue')).sort();
await mkdir(targetDir, { recursive: true });

for (const file of files) {
  if (excluded.has(file)) continue;

  const component = await readFile(resolve(sourceDir, file), 'utf8');
  const svgMatch = component.match(/<svg\b[\s\S]*?<\/svg>/i);
  if (!svgMatch) continue;

  let svg = svgMatch[0]
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+:[\w-]+="[^"]*"/g, (attribute) => {
      if (/:(width|height)="size"/.test(attribute)) {
        return attribute.includes('width') ? ' width="1em"' : ' height="1em"';
      }
      if (/:(fill|stroke)="color"/.test(attribute)) {
        return attribute.replace(/^\s+:/, ' ').replace('="color"', '="currentColor"');
      }
      return '';
    })
    .replace(/\s+v-(?:if|else-if|else)(?:="[^"]*")?/g, '')
    .replace(/\s+xmlns:xlink="[^"]*"/g, '')
    .replace(/\s+(?:width|height)="(?:768|160)"/g, (attribute) =>
      attribute.includes('width') ? ' width="1em"' : ' height="1em"',
    )
    .replace(/(fill|stroke)="(?!none|currentColor)[^"]+"/gi, '$1="currentColor"');

  if (!/\bviewBox=/i.test(svg)) {
    const width = svgMatch[0].match(/\bwidth="(\d+)"/)?.[1];
    const height = svgMatch[0].match(/\bheight="(\d+)"/)?.[1];
    if (!width || !height) throw new Error(`${file}: SVG has no viewBox or numeric dimensions`);
    svg = svg.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`);
  }

  svg = svg.replace(/<svg\b([^>]*)>/, (_match, attributes) => {
    const clean = attributes
      .replace(/\s+width="[^"]*"/g, '')
      .replace(/\s+height="[^"]*"/g, '')
      .replace(/\s+xmlns="[^"]*"/g, '')
      .trim();
    return `<svg xmlns="http://www.w3.org/2000/svg" ${clean}>`;
  });

  await writeFile(resolve(targetDir, `${kebabCase(basename(file, '.vue'))}.svg`), `${svg}\n`);
}

console.log(`Imported ${files.length - excluded.size} SVG icons from example/.`);
