export interface BlockMeta {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  rawSource: () => Promise<{ default: string }>;
}

export interface CategoryMeta {
  slug: string;
  label: string;
  blocks: BlockMeta[];
}

function block(
  category: string,
  categoryLabel: string,
  id: string,
  title: string,
  rawSource: () => Promise<{ default: string }>
): BlockMeta {
  return { id: `${category}/${id}`, title, category, categoryLabel, rawSource };
}

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'authentication',
    label: 'Authentication',
    blocks: [
      block('authentication', 'Authentication', 'sign-in-simple', 'Simple Sign In',
        () => import('../blocks/authentication/sign-in-simple?raw')),
      block('authentication', 'Authentication', 'sign-up-simple', 'Simple Sign Up',
        () => import('../blocks/authentication/sign-up-simple?raw')),
    ],
  },
  {
    slug: 'banners',
    label: 'Banners',
    blocks: [
      block('banners', 'Banners', 'promo-banner', 'Promo Banner',
        () => import('../blocks/banners/promo-banner?raw')),
      block('banners', 'Banners', 'alert-banner', 'Alert Banner',
        () => import('../blocks/banners/alert-banner?raw')),
    ],
  },
  {
    slug: 'cards',
    label: 'Cards',
    blocks: [
      block('cards', 'Cards', 'stats-card', 'Stats Cards',
        () => import('../blocks/cards/stats-card?raw')),
      block('cards', 'Cards', 'profile-card', 'Profile Card',
        () => import('../blocks/cards/profile-card?raw')),
    ],
  },
  {
    slug: 'form-layouts',
    label: 'Form Layouts',
    blocks: [
      block('form-layouts', 'Form Layouts', 'contact-form', 'Contact Form',
        () => import('../blocks/form-layouts/contact-form?raw')),
    ],
  },
  {
    slug: 'lists',
    label: 'Lists',
    blocks: [
      block('lists', 'Lists', 'user-list', 'User List',
        () => import('../blocks/lists/user-list?raw')),
    ],
  },
  {
    slug: 'navbars',
    label: 'Navbars',
    blocks: [
      block('navbars', 'Navbars', 'navbar-simple', 'Simple Navbar',
        () => import('../blocks/navbars/navbar-simple?raw')),
      block('navbars', 'Navbars', 'navbar-with-search', 'Navbar with Search',
        () => import('../blocks/navbars/navbar-with-search?raw')),
    ],
  },
  {
    slug: 'notifications',
    label: 'Notifications',
    blocks: [
      block('notifications', 'Notifications', 'notification-list', 'Notification List',
        () => import('../blocks/notifications/notification-list?raw')),
    ],
  },
  {
    slug: 'page-headers',
    label: 'Page Headers',
    blocks: [
      block('page-headers', 'Page Headers', 'page-header-with-breadcrumb', 'Page Header with Breadcrumb',
        () => import('../blocks/page-headers/page-header-with-breadcrumb?raw')),
    ],
  },
  {
    slug: 'page-shells',
    label: 'Page Shells',
    blocks: [
      block('page-shells', 'Page Shells', 'dashboard-shell', 'Dashboard Shell',
        () => import('../blocks/page-shells/dashboard-shell?raw')),
    ],
  },
  {
    slug: 'progress-steps',
    label: 'Progress Steps',
    blocks: [
      block('progress-steps', 'Progress Steps', 'steps-basic', 'Basic Steps',
        () => import('../blocks/progress-steps/steps-basic?raw')),
    ],
  },
  {
    slug: 'sidebars',
    label: 'Sidebars',
    blocks: [
      block('sidebars', 'Sidebars', 'sidebar-with-groups', 'Sidebar with Groups',
        () => import('../blocks/sidebars/sidebar-with-groups?raw')),
    ],
  },
  {
    slug: 'stats',
    label: 'Stats',
    blocks: [
      block('stats', 'Stats', 'stat-with-icon', 'Stats with Progress',
        () => import('../blocks/stats/stat-with-icon?raw')),
    ],
  },
  {
    slug: 'tables',
    label: 'Tables',
    blocks: [
      block('tables', 'Tables', 'data-table', 'Data Table',
        () => import('../blocks/tables/data-table?raw')),
    ],
  },
  {
    slug: 'user-cards',
    label: 'User Cards',
    blocks: [
      block('user-cards', 'User Cards', 'user-card-simple', 'Simple User Cards',
        () => import('../blocks/user-cards/user-card-simple?raw')),
    ],
  },
];

export function getCategories(): CategoryMeta[] {
  return CATEGORIES;
}

export function getCategory(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}

export function getCategoryInfo(slug: string): { label: string; blockCount: number } | undefined {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return undefined;
  return { label: cat.label, blockCount: cat.blocks.length };
}
