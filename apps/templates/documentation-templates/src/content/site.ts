export const siteConfig = {
    name: 'H0N Docs',
    description: 'A thoughtfully engineered foundation for product documentation.',
    version: 'v0.5',
    repositoryUrl: 'https://github.com/',
    headerLinks: [
        { group: 'Getting started', label: 'Getting started', path: '/docs/introduction' },
        { group: 'Components', label: 'Components', path: '/components/overview' },
        { group: 'Releases', label: 'Releases', path: '/releases/changelog' },
        { group: 'Migration', label: 'Migration', path: '/migration/overview' }
    ]
}

export type SiteConfig = typeof siteConfig
