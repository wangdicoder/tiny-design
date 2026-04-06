import type { ThemeDocument } from '@tiny-design/react';

export interface CommunityThemeRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  likes: number;
  swatches: string[];
  preview: {
    surface: string;
    accent: string;
    text: string;
  };
  themeDocument: ThemeDocument;
}

export const COMMUNITY_THEMES: CommunityThemeRecord[] = [
  {
    id: 'ocean-glass',
    slug: 'ocean-glass',
    name: 'Ocean Glass',
    description: 'Cool blue surfaces with soft card elevation and rounded controls.',
    author: 'tiny community',
    tags: ['light', 'blue', 'rounded'],
    likes: 128,
    swatches: ['#3b82f6', '#dbeafe', '#ffffff', '#0f172a'],
    preview: {
      surface: '#eff6ff',
      accent: '#3b82f6',
      text: '#0f172a',
    },
    themeDocument: {
      meta: {
        id: 'ocean-glass',
        name: 'Ocean Glass',
        author: 'tiny community',
        schemaVersion: 1,
      },
      mode: 'light',
      extends: 'tiny-light',
      tokens: {
        semantic: {
          'color-primary': '#3b82f6',
          'color-primary-hover': '#60a5fa',
          'color-primary-active': '#2563eb',
          'color-primary-bg': '#dbeafe',
          'color-primary-bg-hover': '#bfdbfe',
          'color-bg-container': '#ffffff',
          'color-fill': '#f8fbff',
          'color-border': '#cbdffb',
          'color-border-secondary': '#dbeafe',
          'color-text': 'rgba(15, 23, 42, 0.88)',
          'border-radius': '14px',
          'shadow-card': '0 10px 30px rgba(37, 99, 235, 0.08)',
          'shadow-focus': '0 0 0 3px rgba(59, 130, 246, 0.22)',
        },
        components: {
          'button.radius': '999px',
          'card.radius': '20px',
        },
      },
    },
  },
  {
    id: 'graphite-signal',
    slug: 'graphite-signal',
    name: 'Graphite Signal',
    description: 'A dark operational theme with cooler neutrals and bright status accents.',
    author: 'tiny community',
    tags: ['dark', 'dashboard', 'sharp'],
    likes: 94,
    swatches: ['#8b5cf6', '#111827', '#1f2937', '#f9fafb'],
    preview: {
      surface: '#111827',
      accent: '#8b5cf6',
      text: '#f9fafb',
    },
    themeDocument: {
      meta: {
        id: 'graphite-signal',
        name: 'Graphite Signal',
        author: 'tiny community',
        schemaVersion: 1,
      },
      mode: 'dark',
      extends: 'tiny-dark',
      tokens: {
        semantic: {
          'color-primary': '#8b5cf6',
          'color-primary-hover': '#a78bfa',
          'color-primary-active': '#7c3aed',
          'color-primary-bg': '#22163d',
          'color-primary-bg-hover': '#2e1d53',
          'color-bg-container': '#111827',
          'color-fill': '#1f2937',
          'color-border': '#374151',
          'color-border-secondary': '#273244',
          'color-text': 'rgba(249, 250, 251, 0.88)',
          'border-radius': '8px',
          'shadow-card': '0 12px 32px rgba(0, 0, 0, 0.35)',
          'shadow-focus': '0 0 0 3px rgba(139, 92, 246, 0.26)',
        },
        components: {
          'button.padding-inline-md': '16px',
          'card.header-padding': '18px 20px',
        },
      },
    },
  },
  {
    id: 'peach-sunset',
    slug: 'peach-sunset',
    name: 'Peach Sunset',
    description: 'Warm editorial surfaces with generous radius and softer contrast.',
    author: 'tiny community',
    tags: ['light', 'warm', 'editorial'],
    likes: 76,
    swatches: ['#ea580c', '#ffedd5', '#fff7ed', '#7c2d12'],
    preview: {
      surface: '#fff7ed',
      accent: '#ea580c',
      text: '#7c2d12',
    },
    themeDocument: {
      meta: {
        id: 'peach-sunset',
        name: 'Peach Sunset',
        author: 'tiny community',
        schemaVersion: 1,
      },
      mode: 'light',
      extends: 'tiny-light',
      tokens: {
        semantic: {
          'color-primary': '#ea580c',
          'color-primary-hover': '#f97316',
          'color-primary-active': '#c2410c',
          'color-primary-bg': '#ffedd5',
          'color-primary-bg-hover': '#fed7aa',
          'color-bg-container': '#fff7ed',
          'color-fill': '#fffbf6',
          'color-border': '#fdba74',
          'color-border-secondary': '#fed7aa',
          'color-text': 'rgba(124, 45, 18, 0.88)',
          'border-radius': '18px',
          'shadow-card': '0 12px 28px rgba(234, 88, 12, 0.08)',
          'shadow-focus': '0 0 0 3px rgba(234, 88, 12, 0.18)',
        },
        components: {
          'button.radius': '18px',
          'input.radius': '16px',
          'card.body-padding': '24px',
        },
      },
    },
  },
];
