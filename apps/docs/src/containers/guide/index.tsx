import React, { Suspense, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getGuideMenu, RouterItem } from '../../routers';
import { SidebarMenu } from '../../components/sidebar-menu';
import { Layout, Loader, Divider } from '@tiny-design/react';
import { DocFooter } from '../../components/doc-footer';
import { TableOfContents } from '../../components/table-of-contents';
import { useLocaleContext } from '../../context/locale-context';

const { Content } = Layout;

const flattenRouters = (routers: RouterItem[]): RouterItem[] => {
  return routers.reduce((res: RouterItem[], router) => {
    if (router.children) {
      router.children.forEach((child) => res.push(child));
    } else {
      res.push(router);
    }
    return res;
  }, []);
};

const GuidePage = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const guideMenu = useMemo(() => getGuideMenu(siteLocale), [siteLocale]);
  const flattenedRouters = useMemo(() => flattenRouters(guideMenu), [guideMenu]);

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
              {flattenedRouters.map((menu) => {
                const Component = menu.component;
                return (
                  <Route
                    key={menu.route}
                    path={menu.route}
                    element={<Component />}
                  />
                );
              })}
              <Route path="" element={<Navigate to={flattenedRouters[0].route!} replace />} />
            </Routes>
          </Suspense>
          <Divider className="doc-container__divider" />
          <DocFooter routers={flattenedRouters} />
        </Content>
        <TableOfContents />
      </Layout>
    </Layout>
  );
};

export default GuidePage;
