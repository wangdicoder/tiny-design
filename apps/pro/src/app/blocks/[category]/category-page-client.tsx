'use client';

import { CategoryNav } from '@/components/layout/category-nav';
import { BlockPreview } from '@/components/block-preview';
import { getCategory } from '@/lib/blocks';
import styles from './category-page.module.scss';

interface CategoryPageClientProps {
  slug: string;
  label: string;
}

export function CategoryPageClient({ slug, label }: CategoryPageClientProps) {
  const category = getCategory(slug);
  const blocks = category?.blocks ?? [];

  return (
    <div className={styles.layout}>
      <CategoryNav />
      <main className={styles.content}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>{label}</h1>
          <p className={styles.count}>
            {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
          </p>
        </div>
        {blocks.map((block) => (
          <BlockPreview key={block.id} meta={block} />
        ))}
      </main>
    </div>
  );
}
