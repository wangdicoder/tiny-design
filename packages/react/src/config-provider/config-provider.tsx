import { useEffect, useMemo } from 'react';
import { ConfigContext, ThemeMode } from './config-context';
import { ConfigProviderProps } from './types';
import { buildCssVars, ThemeConfig } from './token-utils';
import IntlProvider from '../intl-provider';

function isThemeConfig(theme: unknown): theme is ThemeConfig {
  return typeof theme === 'object' && theme !== null;
}

const ConfigProvider = (props: ConfigProviderProps): JSX.Element => {
  const { children, theme, locale, ...otherProps } = props;

  const themeConfig = isThemeConfig(theme) ? theme : undefined;
  const mode = themeConfig ? themeConfig.mode : (theme as ThemeMode | undefined);
  const cssVars = useMemo(
    () => (themeConfig ? buildCssVars(themeConfig) : undefined),
    [themeConfig]
  );

  useEffect(() => {
    if (!mode) return;
    const html = document.documentElement;
    html.setAttribute('data-tiny-theme', mode);
  }, [mode]);

  const content = locale ? (
    <IntlProvider locale={locale}>{children}</IntlProvider>
  ) : (
    children
  );

  const wrapped = cssVars ? (
    <div className="ty-config-provider" style={cssVars}>
      {content}
    </div>
  ) : (
    content
  );

  return (
    <ConfigContext.Provider value={{ theme: mode, locale, ...otherProps }}>
      {wrapped}
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;
