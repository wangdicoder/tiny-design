import { SiteLocale } from './types';

const en_US: SiteLocale = {
  locale: 'en_US',
  nav: {
    home: 'Home',
    guide: 'Guide',
    theme: 'Theme',
    components: 'Components',
  },
  home: {
    subtitle: 'A Friendly UI Component Set for React',
    getStarted: 'Get Started',
    github: 'GitHub',
    designPrinciple: 'Design Principle',
    componentCategories: 'Component Categories',
    nComponents: (count) => `${count} components`,
    features: {
      themeable: 'Themeable',
      themeableDesc:
        'Quickly and easily reference values from your theme throughout your entire application with any components.',
      elegant: 'Elegant',
      elegantDesc: 'Thanks for React Hook, the source code is more light weight.',
      composable: 'Composable',
      composableDesc:
        'Completely customisable for all components. You can leverage any component to create new things.',
      accessible: 'Accessible',
      accessibleDesc:
        'Strictly follows WAI-ARIA standards. All components come with proper attributes and keyboard interactions.',
    },
    stats: {
      components: 'Components',
      categories: 'Categories',
      typescript: 'TypeScript',
      license: 'License',
    },
    themeShowcase: 'Make It Yours',
    themeShowcaseDesc: 'Choose a preset theme and watch the entire site transform instantly.',
    themeShowcaseCustomize: 'Customize in Theme Editor',
  },
  overview: {
    title: 'Component Overview',
    desc: (count) =>
      `There is an overview of all components. Currently Tiny-UI provides ${count} components.`,
  },
  categories: {
    foundation: 'Foundation',
    layout: 'Layout',
    navigation: 'Navigation',
    dataDisplay: 'Data Display',
    formItem: 'Form Item',
    feedback: 'Feedback',
    miscellany: 'Miscellany',
  },
  guideMenu: {
    introduction: 'Introduction',
    getStarted: 'Get Started',
    useWithVite: 'Use with Vite',
    changelog: 'Changelog',
    faq: 'FAQ',
    mcpServer: 'MCP Server',
  },
  themeMenu: {
    customiseTheme: 'Customise Theme',
    colors: 'Colors',
    themeEditor: 'Theme Editor',
  },
  color: {
    title: 'Color',
    intro:
      'Tiny UI uses a specific set of palettes to specify colors to provide a consistent look and feel for the products you build.',
    primaryTitle: 'Primary colors',
    primaryDesc:
      'Semantic colours used across all components. These map to CSS custom properties (e.g. --ty-color-primary) and update automatically when you apply a theme preset.',
    neutralsTitle: 'Light neutrals',
    neutralsDesc:
      'Light neutrals are helpful for offsetting content in a primarily white layout without losing warmth and cleanliness, and are therefore often used as a background color for web components.',
    nameLabel: 'NAME',
    hexLabel: 'HEX',
    defaultColor: 'Default',
    primary: 'Primary',
    secondary: 'Secondary',
    info: 'Info',
    success: 'Success',
    danger: 'Danger',
    warning: 'Warning',
  },
  codeBlock: {
    showCode: 'Show Code',
    hideCode: 'Hide Code',
    copyCode: 'Copy Code',
    resetDemo: 'Reset Demo',
    copied: 'Copied',
    openInStackBlitz: 'Open in StackBlitz',
    openInCodeSandbox: 'Open in CodeSandbox',
  },
  commandPalette: {
    placeholder: 'Search docs...',
    noResults: 'No results found.',
  },
  common: {
    loading: 'Loading...',
  },
};

export default en_US;
