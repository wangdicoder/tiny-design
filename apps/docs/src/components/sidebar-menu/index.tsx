import React from 'react';
import './sidebar-menu.scss';
import { NavLink } from 'react-router-dom';
import { RouterItem } from '../../routers';
import { Layout, Link } from '@tiny-design/react';
import { IconGithub } from '@tiny-design/icons';
import { useSidebarToggle } from '../../context/sidebar-toggle-context';
import { useLocaleContext } from '../../context/locale-context';
import { ThemeToggle } from '../header/theme-toggle';
import pkg from '../../../../../packages/react/package.json';

const { Sidebar } = Layout;
const { version, repository } = pkg;

type Props = {
  routers: RouterItem[];
  url: string;
};

export const SidebarMenu = (props: Props): React.ReactElement => {
  const { routers, url } = props;
  const { isOpen, close } = useSidebarToggle();
  const { locale, toggle: toggleLocale } = useLocaleContext();
  const isZh = locale.locale === 'zh_CN';

  return (
    <>
      {isOpen && <div className="sidebar-menu__backdrop" onClick={close} />}
      <Sidebar
        theme="light"
        width={250}
        className={`sidebar-menu${isOpen ? ' sidebar-menu_open' : ''}`}>
        <ul className="sidebar-menu__menu">
          {routers.map((router) => {
            if (router.children) {
              return (
                <li key={router.title}>
                  <div className="sidebar-menu__group-title">{router.title}</div>
                  <ul className="sidebar-menu__group-list">
                    {router.children.map((item) => (
                      <li key={item.title} className="sidebar-menu__menu-item">
                        <NavLink
                          to={`${url}/${item.route}`}
                          onClick={close}
                          className={({ isActive }) =>
                            isActive ? 'sidebar-menu__menu-item_active' : ''
                          }>
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return (
                <li key={router.title} className="sidebar-menu__menu-item">
                  <NavLink
                    to={`${url}/${router.route}`}
                    onClick={close}
                    className={({ isActive }) =>
                      isActive ? 'sidebar-menu__menu-item_active' : ''
                    }>
                    {router.title}
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
        <div className="sidebar-menu__toolbar">
          <span className="sidebar-menu__toolbar-version">v{version}</span>
          <Link href={repository.url} underline={false} rel="noreferrer noopener">
            <IconGithub color="currentColor" size={18} />
          </Link>
          <button
            className="sidebar-menu__toolbar-btn"
            onClick={toggleLocale}
            aria-label={isZh ? 'Switch to English' : '切换到中文'}>
            {isZh ? 'EN' : '中文'}
          </button>
          <ThemeToggle />
        </div>
      </Sidebar>
    </>
  );
};
