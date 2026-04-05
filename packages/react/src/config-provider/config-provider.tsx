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

  // Apply theme mode to <html> attribute, clean up when mode is removed
  useEffect(() => {
    const html = document.documentElement;
    if (mode) {
      html.setAttribute('data-tiny-theme', mode);
    }
    return () => {
      html.removeAttribute('data-tiny-theme');
    };
  }, [mode]);

  // Apply token overrides as inline styles on <html>, clean up on unmount/change
  useEffect(() => {
    if (!cssVars) return;
    const html = document.documentElement;
    const keys = Object.keys(cssVars);
    for (const key of keys) {
      html.style.setProperty(key, (cssVars as Record<string, string>)[key]);
    }
    return () => {
      for (const key of keys) {
        html.style.removeProperty(key);
      }
    };
  }, [cssVars]);

  const content = locale ? (
    <IntlProvider locale={locale}>{children}</IntlProvider>
  ) : (
    children
  );

  return (
    <ConfigContext.Provider value={{ theme: mode, locale, ...otherProps }}>
      {content}
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;
