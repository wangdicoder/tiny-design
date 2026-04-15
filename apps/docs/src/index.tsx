import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import '@tiny-design/react/style/index.scss';
import '@tiny-design/charts/style/index.scss';
import { IntlProvider, Loader } from '@tiny-design/react';
import './index.scss';
import './utils/theme-persistence';

import { components } from './components/markdown-tag';
import { Header } from './components/header';
import { SidebarToggleProvider } from './context/sidebar-toggle-context';
import { LocaleProvider, useLocaleContext } from './context/locale-context';

const HomePage = lazy(() => import('./containers/home'));
const GuidePage = lazy(() => import('./containers/guide'));
const ThemePage = lazy(() => import('./containers/theme'));
const ComponentsPage = lazy(() => import('./containers/components'));

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

const AppInner = (): React.ReactElement => {
  const { locale } = useLocaleContext();
  return (
    <IntlProvider locale={locale}>
      <Header />
      <Suspense
        fallback={
          <div className="doc-container__fallback">
            <Loader />
          </div>
        }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide/*" element={<GuidePage />} />
          <Route path="/theme/*" element={<ThemePage />} />
          <Route path="/components/*" element={<ComponentsPage />} />
        </Routes>
      </Suspense>
    </IntlProvider>
  );
};

const App = (): React.ReactElement => (
  <BrowserRouter basename={basename} future={{ v7_startTransition: true }}>
    <LocaleProvider>
      <SidebarToggleProvider>
        <AppInner />
      </SidebarToggleProvider>
    </LocaleProvider>
  </BrowserRouter>
);

const root = createRoot(document.getElementById('root')!);
root.render(
  <MDXProvider components={components}>
    <App />
  </MDXProvider>
);
