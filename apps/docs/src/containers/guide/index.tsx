import React, { Suspense, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getGuideMenu } from '../../routers';
import { SidebarMenu } from '../../components/sidebar-menu';
import { Layout, Loader, Divider } from '@tiny-design/react';
import { DocFooter } from '../../components/doc-footer';
import { TableOfContents } from '../../components/table-of-contents';
import { useLocaleContext } from '../../context/locale-context';

const { Content } = Layout;

const GuidePage = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const guideMenu = useMemo(() => getGuideMenu(siteLocale), [siteLocale]);

  return (
    <Layout className="doc-container">
      <SidebarMenu routers={guideMenu} url="/guide" />
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
              {guideMenu.map((menu) => {
                const Component = menu.component;
                return (
                  <Route
                    key={menu.route}
                    path={menu.route}
                    element={<Component />}
                  />
                );
              })}
              <Route path="" element={<Navigate to={guideMenu[0].route!} replace />} />
            </Routes>
          </Suspense>
          <Divider className="doc-container__divider" />
          <DocFooter routers={guideMenu} />
        </Content>
        <TableOfContents />
      </Layout>
    </Layout>
  );
};

export default GuidePage;
