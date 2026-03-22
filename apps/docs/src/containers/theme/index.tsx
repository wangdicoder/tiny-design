import React, { Suspense, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getThemeMenu } from '../../routers';
import { SidebarMenu } from '../../components/sidebar-menu';
import { Layout, Loader, Divider } from '@tiny-design/react';
import { DocFooter } from '../../components/doc-footer';
import { useLocaleContext } from '../../context/locale-context';

const { Content } = Layout;

const ThemePage = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const themeMenu = useMemo(() => getThemeMenu(siteLocale), [siteLocale]);

  return (
    <Layout className="doc-container">
      <SidebarMenu routers={themeMenu} url="/theme" />
      <Layout className="doc-container__layout">
        <Content>
          <Suspense
            fallback={
              <div className="doc-container__fallback">
                <Loader />
                <div style={{ marginLeft: 8 }}>{siteLocale.common.loading}</div>
              </div>
            }>
            <Routes>
              {themeMenu.map((menu) => {
                const Component = menu.component;
                return (
                  <Route
                    key={menu.route}
                    path={menu.route}
                    element={<Component />}
                  />
                );
              })}
              <Route path="" element={<Navigate to={themeMenu[0].route!} replace />} />
            </Routes>
          </Suspense>
          <Divider className="doc-container__divider" />
          <DocFooter routers={themeMenu} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ThemePage;
