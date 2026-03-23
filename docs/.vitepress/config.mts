import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'advanced-react-role-guard',
  description: 'Declarative role, permission, and feature-flag guards for React apps',
  lang: 'en-US',
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started', activeMatch: '^/guide/' },
      { text: 'API', link: '/api/role-guard-provider', activeMatch: '^/api/' },
      { text: 'Examples', link: '/examples/basic-dashboard', activeMatch: '^/examples/' },
      { text: 'Security', link: '/security' },
      { text: 'Changelog', link: '/changelog' },
      {
        text: 'Live demo',
        link: 'https://advanced-react-role-guard-website.netlify.app/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/parsajiravand/react-role-guard',
      },
      {
        text: 'npm',
        link: 'https://www.npmjs.com/package/advanced-react-role-guard',
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Quick start', link: '/guide/quick-start' },
          { text: 'Permissions model', link: '/guide/permissions-model' },
          { text: 'Feature flags', link: '/guide/feature-flags' },
          { text: 'Route protection', link: '/guide/route-protection' },
          { text: 'Next.js', link: '/guide/nextjs' },
          { text: 'React Router', link: '/guide/react-router' },
          { text: 'FAQ', link: '/guide/faq' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'RoleGuardProvider', link: '/api/role-guard-provider' },
          { text: 'Can', link: '/api/can' },
          { text: 'Guard', link: '/api/guard' },
          { text: 'Feature', link: '/api/feature' },
          { text: 'useCan', link: '/api/use-can' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic dashboard', link: '/examples/basic-dashboard' },
          { text: 'Multi-role SaaS', link: '/examples/multi-role-saas' },
          { text: 'Feature flag rollout', link: '/examples/feature-flag-rollout' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/parsajiravand/react-role-guard',
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>npm</title><path fill="currentColor" d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019c.161 0 .292.14.292.311v11.52c0 .161-.13.291-.292.291h-3.701v-9.59h-3.3v9.59h-3.701V5.634h-3.135z"/></svg>',
        },
        link: 'https://www.npmjs.com/package/advanced-react-role-guard',
        ariaLabel: 'npm package',
      },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern:
        'https://github.com/parsajiravand/react-role-guard/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Parsa Jiravand',
    },
  },
});
