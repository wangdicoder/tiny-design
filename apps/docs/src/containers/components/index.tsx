import React, { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getComponentMenu, RouterItem } from '../../routers';
import { SidebarMenu } from '../../components/sidebar-menu';
import { Layout, Loader, Divider } from '@tiny-design/react';
import { DocFooter } from '../../components/doc-footer';
import { TableOfContents } from '../../components/table-of-contents';
import { useLocaleContext } from '../../context/locale-context';
import ComponentOverview from './overview';

const { Content } = Layout;

const flattenRouters = (routers: RouterItem[]): RouterItem[] => {
  return routers.reduce((res: RouterItem[], router) => {
    router.children?.forEach((child) => {
      res.push(child);
    });
    return res;
  }, []);
};

const ComponentsPage = (): React.ReactElement => {
  const { siteLocale } = useLocaleContext();
  const componentMenu = useMemo(() => getComponentMenu(siteLocale), [siteLocale]);
  const flattenedRouters = useMemo(() => flattenRouters(componentMenu), [componentMenu]);

  return (
    <Layout className="doc-container">
      <SidebarMenu routers={componentMenu} url="/components" />
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
              <Route index element={<ComponentOverview />} />
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

export default ComponentsPage;
