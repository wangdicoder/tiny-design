import { useEffect, useMemo } from 'react';
import { ConfigContext, ThemeMode } from './config-context';
import { ConfigProviderProps } from './types';
import { buildCssVars, ThemeConfig } from './token-utils';
import { acquireMode, releaseMode, acquireProps, releaseProps } from './global-style-registry';
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
    acquireMode(mode);
    return () => {
      releaseMode();
    };
  }, [mode]);

  useEffect(() => {
    if (!cssVars) return;
    const vars = cssVars as Record<string, string>;
    acquireProps(vars);
    const keys = Object.keys(vars);
    return () => {
      releaseProps(keys);
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
