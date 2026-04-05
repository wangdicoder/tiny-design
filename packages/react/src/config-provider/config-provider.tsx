import React, { Fragment, useCallback, useContext, useMemo, useState } from 'react';
import { ConfigContext, ThemeMode, useConfig } from './config-context';
import { ConfigProviderComponent, ConfigProviderProps } from './types';
import { buildCssVars, ThemeConfig } from './token-utils';
import { setStaticConfig } from './static-config';
import IntlProvider from '../intl-provider';

function isThemeConfig(theme: unknown): theme is ThemeConfig {
  return typeof theme === 'object' && theme !== null;
}

const ConfigProviderImpl = (props: ConfigProviderProps): React.ReactElement => {
  const {
    children,
    theme,
    locale,
    prefixCls,
    componentSize,
    shimmer,
    space,
    getPopupContainer,
    getTargetContainer,
  } = props;
  const parentConfig = useContext(ConfigContext);
  const [holderElement, setHolderElement] = useState<HTMLDivElement | null>(null);

  const themeConfig = isThemeConfig(theme) ? theme : undefined;
  const mode = themeConfig ? themeConfig.mode : (theme as ThemeMode | undefined);
  const cssVars = useMemo(
    () => (themeConfig ? buildCssVars(themeConfig) : undefined),
    [themeConfig]
  );
  const requiresScope = Boolean(mode || cssVars);

  const mergedGetPopupContainer = useCallback(
    (trigger?: HTMLElement | null) =>
      getPopupContainer?.(trigger) ??
      (requiresScope ? holderElement : null) ??
      parentConfig.getPopupContainer?.(trigger) ??
      document.body,
    [getPopupContainer, holderElement, parentConfig, requiresScope]
  );

  const popupHolderRef = useCallback((node: HTMLDivElement | null) => {
    setHolderElement(node);
  }, []);

  const mergedConfig = useMemo(
    () => ({
      prefixCls: prefixCls ?? parentConfig.prefixCls,
      componentSize: componentSize ?? parentConfig.componentSize,
      shimmer: shimmer ?? parentConfig.shimmer,
      space: space ?? parentConfig.space,
      theme: mode ?? parentConfig.theme,
      themeConfig: themeConfig ?? parentConfig.themeConfig,
      locale: locale ?? parentConfig.locale,
      getPopupContainer: mergedGetPopupContainer,
      getTargetContainer: getTargetContainer ?? parentConfig.getTargetContainer,
    }),
    [
      componentSize,
      getTargetContainer,
      locale,
      mergedGetPopupContainer,
      mode,
      parentConfig,
      prefixCls,
      shimmer,
      space,
      themeConfig,
    ]
  );

  const content = mergedConfig.locale ? (
    <IntlProvider locale={mergedConfig.locale}>{children}</IntlProvider>
  ) : (
    children
  );

  const popupHolder = requiresScope ? (
    <div
      ref={popupHolderRef}
      className={`${mergedConfig.prefixCls}-config-provider__popup-holder`}
    />
  ) : null;

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {requiresScope ? (
        <div
          className={`${mergedConfig.prefixCls}-config-provider`}
          data-tiny-theme={mode}
          style={{ display: 'contents', ...(cssVars ?? {}) }}
        >
          {content}
          {popupHolder}
        </div>
      ) : (
        <Fragment>{content}</Fragment>
      )}
    </ConfigContext.Provider>
  );
};

ConfigProviderImpl.displayName = 'ConfigProvider';

const ConfigProvider = ConfigProviderImpl as ConfigProviderComponent;

ConfigProvider.config = setStaticConfig;
ConfigProvider.useConfig = useConfig;

export default ConfigProvider;
