import React, { Suspense, useMemo } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { getThemeMenu } from '../../routers';
import { SidebarMenu } from '../../components/sidebar-menu';
import { Layout, Loader, Divider } from '@tiny-design/react';
import { DocFooter } from '../../components/doc-footer';
import { TableOfContents } from '../../components/table-of-contents';
import { useLocaleContext } from '../../context/locale-context';

const { Content } = Layout;

const ThemePage = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const themeMenu = useMemo(() => getThemeMenu(siteLocale), [siteLocale]);
  const location = useLocation();
  const isStudioRoute =
    location.pathname.startsWith('/theme/theme-studio') ||
    location.pathname.startsWith('/theme/theme-community');

  return (
    <Layout className="doc-container">
      <SidebarMenu routers={themeMenu} url="/theme" />
      <Layout className={`doc-container__layout${isStudioRoute ? ' doc-container__layout_wide' : ''}`}>
        <Content className={isStudioRoute ? 'doc-container__content doc-container__content_wide' : 'doc-container__content'}>
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
                const routePath = ['theme-studio', 'theme-community'].includes(menu.route ?? '')
                  ? `${menu.route}/*`
                  : menu.route;
                return (
                  <Route
                    key={menu.route}
                    path={routePath}
                    element={<Component />}
                  />
                );
              })}
              <Route path="" element={<Navigate to={themeMenu[0].route!} replace />} />
            </Routes>
          </Suspense>
          {!isStudioRoute ? (
            <>
              <Divider className="doc-container__divider" />
              <DocFooter routers={themeMenu} />
            </>
          ) : null}
        </Content>
        {!isStudioRoute ? <TableOfContents /> : null}
      </Layout>
    </Layout>
  );
};

export default ThemePage;
