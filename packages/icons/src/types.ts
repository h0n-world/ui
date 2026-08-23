export interface IconDefinition {
  readonly name: string;
  readonly viewBox: string;
  readonly body: string;
}

export type IconStyle = 'solid' | 'stroke' | 'duotone';

export type IconCategory =
  | 'actions'
  | 'analytics'
  | 'astronomy'
  | 'brand'
  | 'commerce'
  | 'communication'
  | 'data'
  | 'design'
  | 'development'
  | 'devices'
  | 'education'
  | 'finance'
  | 'food'
  | 'gaming'
  | 'home'
  | 'infrastructure'
  | 'interface'
  | 'maps'
  | 'media'
  | 'medical'
  | 'navigation'
  | 'notifications'
  | 'productivity'
  | 'security'
  | 'settings'
  | 'social'
  | 'sports'
  | 'status'
  | 'text-editing'
  | 'time'
  | 'transport'
  | 'travel'
  | 'users'
  | 'weather';

export interface IconMetadata {
  readonly style: IconStyle;
  readonly categories: readonly IconCategory[];
  readonly tags: readonly string[];
}

export interface RenderIconOptions {
  readonly size?: number | string;
  readonly color?: string;
  readonly title?: string;
  readonly label?: string;
  readonly class?: string;
}
