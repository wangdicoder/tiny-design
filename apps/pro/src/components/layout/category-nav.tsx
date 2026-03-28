'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';
import styles from './category-nav.module.scss';

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.title}>Application</div>
      {CATEGORIES.map((cat) => {
        const href = `/blocks/${cat.slug}/`;
        const isActive = pathname?.includes(`/blocks/${cat.slug}`);
        return (
          <Link
            key={cat.slug}
            href={href}
            className={`${styles.link} ${isActive ? styles.active : ''}`}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
