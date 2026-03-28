import Link from 'next/link';
import { getCategories } from '@/lib/categories';
import styles from './page.module.scss';

export default function HomePage() {
  const categories = getCategories();

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Tiny Design Pro</h1>
        <p className={styles.subtitle}>
          Beautiful, production-ready UI blocks built with Tiny Design components.
          <br />
          Copy and paste into your projects.
        </p>
      </div>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/blocks/${cat.slug}/`} className={styles.card}>
            <h3 className={styles.cardTitle}>{cat.label}</h3>
            <p className={styles.cardCount}>
              {cat.blockCount} {cat.blockCount === 1 ? 'block' : 'blocks'}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
