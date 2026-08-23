export const siteConfig = {
    name: 'H0N UI Docs',
    description: 'A thoughtfully engineered foundation for product documentation.',
    version: 'v1.2.0',
    repositoryUrl: 'https://github.com/',
    headerLinks: [
        { group: 'Getting started', label: 'Getting started', path: '/docs/introduction' },
        { group: 'Components', label: 'Components', path: '/components/overview' },
        { group: 'Icons', label: 'Icons', path: '/icons/overview' },
        { group: 'Releases', label: 'Releases', path: '/releases/changelog' },
    ],
}

export type SiteConfig = typeof siteConfig
