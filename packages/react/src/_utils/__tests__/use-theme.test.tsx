import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { useTheme } from '../use-theme';

const ThemeConsumer = () => {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setMode('dark')}>
        Set dark
      </button>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-tiny-theme');
  });

  it('should initialize from the current DOM theme attribute', () => {
    document.documentElement.setAttribute('data-tiny-theme', 'dark');

    render(<ThemeConsumer />);

    expect(screen.getByTestId('mode').textContent).toBe('dark');
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
  });

  it('should persist theme updates to localStorage and html attribute', () => {
    render(<ThemeConsumer />);

    act(() => {
      screen.getByText('Set dark').click();
    });

    expect(screen.getByTestId('mode').textContent).toBe('dark');
    expect(localStorage.getItem('ty-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-tiny-theme')).toBe('dark');
  });

  it('should react to storage events from other tabs', () => {
    render(<ThemeConsumer />);

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'ty-theme',
        newValue: 'dark',
      }));
    });

    expect(screen.getByTestId('mode').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-tiny-theme')).toBe('dark');
  });
});
