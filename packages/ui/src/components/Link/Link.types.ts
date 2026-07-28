import type { Component } from 'vue'
import type { H0SemanticTone, H0Size } from '../../types'
export type H0LinkTone = Extract<H0SemanticTone, 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'>
export type H0LinkVariant = 'default' | 'subtle' | 'standalone'
export type H0LinkProps = { as?: string | Component; href?: string; to?: unknown; external?: boolean; externalText?: string; download?: boolean | string; target?: string; rel?: string; tone?: H0LinkTone; variant?: H0LinkVariant; size?: H0Size; disabled?: boolean; ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | true; rootAttrs?: Record<string, unknown> }
