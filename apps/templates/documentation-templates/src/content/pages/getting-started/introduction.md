---
title: Introduction
description: A universal foundation for documentation that stays clear as your product grows.
path: /docs/introduction
group: Getting started
section: Overview
order: 10
---

# Introduction

This template gives you a polished documentation experience without locking your content into a proprietary format. Every page is written in Markdown, navigation is generated from front matter, and all interactive elements come from **@h0n/ui**.

> [!INFO]
> Start with content, not plumbing. The shell already handles responsive navigation, theme preferences, search, readable typography, and an automatically generated table of contents.

## Why this template?

Good documentation should feel calm. Readers need to understand where they are, scan a page quickly, and move to the next useful idea without fighting the interface.

- **Markdown first** — pages remain portable and pleasant to edit.
- **Structured by metadata** — change a page group or order in its front matter.
- **Accessible by default** — landmark regions, keyboard navigation, focus states, and reduced motion are included.
- **Powered by H0N UI** — buttons, fields, cards, icons, and theme tokens share one visual language.

## Project anatomy

The template separates content from presentation so writers and developers can work independently.

```text
src/
├── components/       # Documentation-specific composition
├── content/pages/    # Portable Markdown pages
├── layouts/          # Home and documentation shells
├── styles/           # SCSS using H0N UI tokens
└── views/            # Route-level pages
```

## What comes next

Continue with the quick start to add your first page, then customize `site.ts` with your product name and primary navigation.
