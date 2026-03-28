import React, { useState } from 'react';
import './header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import pkg from '../../../../../packages/react/package.json';
import { Link } from '@tiny-design/react';
import { IconGithub } from '@tiny-design/icons';
import { useSidebarToggle } from '../../context/sidebar-toggle-context';
import { useLocaleContext } from '../../context/locale-context';
import { ThemeToggle } from './theme-toggle';
import { LocaleToggle } from './locale-toggle';
import { CommandPalette } from '../command-palette';
import { SearchTrigger } from '../command-palette/search-trigger';
import logoSvg from '../../assets/logo/logo.svg';

const { version, repository } = pkg;

export const Header = (): React.ReactElement => {
  const { toggle } = useSidebarToggle();
  const { siteLocale: s } = useLocaleContext();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__menu-toggle"
          onClick={toggle}
          aria-label="Toggle menu"
          style={isHome ? { display: 'none' } : undefined}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <NavLink to="/" className="header__link">
          <div className="header__logo">
            <img src={logoSvg} alt="logo" width={32} />
            <span className="header__title">Tiny UI</span>
          </div>
        </NavLink>
      </div>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item header__home-link">
            <NavLink end to="/" className="header__link">
              {s.nav.home}
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/guide" className="header__link">
              {s.nav.guide}
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/theme" className="header__link">
              {s.nav.theme}
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/components" className="header__link">
              {s.nav.components}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__utils">
        <SearchTrigger onClick={() => setPaletteOpen(true)} />
        <a
          href={repository.url}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'none' }}>
          <span className="header__version">v{version}</span>
        </a>
        <Link href={repository.url} underline={false} rel="noreferrer noopener" className="header__github-link">
          <IconGithub color="currentColor" size={18} />
        </Link>
        <LocaleToggle />
        <ThemeToggle />
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
};
