import type { IconDefinition, RenderIconOptions } from './types.js';

const escapeAttribute = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

const escapeText = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderIcon(icon: IconDefinition, options: RenderIconOptions = {}): string {
  const size = String(options.size ?? '1em');
  const title = options.title ? `<title>${escapeText(options.title)}</title>` : '';
  const label = options.label ?? options.title;
  const accessibility = label
    ? `role="img" aria-label="${escapeAttribute(label)}"`
    : 'aria-hidden="true"';
  const className = options.class ? ` class="${escapeAttribute(options.class)}"` : '';
  const color = options.color ? ` color="${escapeAttribute(options.color)}"` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${escapeAttribute(icon.viewBox)}" width="${escapeAttribute(size)}" height="${escapeAttribute(size)}"${className}${color} ${accessibility}>${title}${icon.body}</svg>`;
}

export function iconToDataUri(icon: IconDefinition, options: RenderIconOptions = {}): string {
  return `data:image/svg+xml,${encodeURIComponent(renderIcon(icon, options))}`;
}

export type { IconDefinition, RenderIconOptions } from './types.js';
