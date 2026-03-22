export type SiteLocale = {
  locale: string;
  nav: {
    home: string;
    guide: string;
    theme: string;
    components: string;
  };
  home: {
    subtitle: string;
    getStarted: string;
    github: string;
    designPrinciple: string;
    componentCategories: string;
    nComponents: (count: number) => string;
    features: {
      themeable: string;
      themeableDesc: string;
      elegant: string;
      elegantDesc: string;
      composable: string;
      composableDesc: string;
      accessible: string;
      accessibleDesc: string;
    };
    stats: {
      components: string;
      categories: string;
      typescript: string;
      license: string;
    };
    themeShowcase: string;
    themeShowcaseDesc: string;
    themeShowcaseCustomize: string;
  };
  overview: {
    title: string;
    desc: (count: number) => string;
  };
  categories: {
    foundation: string;
    layout: string;
    navigation: string;
    dataDisplay: string;
    formItem: string;
    feedback: string;
    miscellany: string;
  };
  guideMenu: {
    introduction: string;
    getStarted: string;
    useWithVite: string;
    changelog: string;
    faq: string;
  };
  themeMenu: {
    customiseTheme: string;
    colors: string;
    themeEditor: string;
  };
  color: {
    title: string;
    intro: string;
    primaryTitle: string;
    primaryDesc: string;
    neutralsTitle: string;
    neutralsDesc: string;
    nameLabel: string;
    hexLabel: string;
    defaultColor: string;
    primary: string;
    secondary: string;
    info: string;
    success: string;
    danger: string;
    warning: string;
  };
  codeBlock: {
    showCode: string;
    hideCode: string;
    copyCode: string;
    resetDemo: string;
    copied: string;
    openInStackBlitz: string;
    openInCodeSandbox: string;
  };
  common: {
    loading: string;
  };
};
