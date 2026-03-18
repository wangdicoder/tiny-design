export type SiteLocale = {
  locale: string;
  nav: {
    home: string;
    guide: string;
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
    customiseTheme: string;
    colors: string;
    changelog: string;
    faq: string;
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
    openInStackBlitz: string;
    openInCodeSandbox: string;
  };
  common: {
    loading: string;
  };
};
