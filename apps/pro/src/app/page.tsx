import Link from 'next/link';
import { getCategories } from '../utils/blocks';
import styles from './page.module.scss';

const CATEGORY_ICONS: Record<string, string> = {
  authentication: '🔐',
  banners: '📢',
  cards: '🃏',
  'form-layouts': '📝',
  lists: '📋',
  navbars: '🧭',
  notifications: '🔔',
  'page-headers': '📄',
  'page-shells': '🏗',
  'progress-steps': '📊',
  sidebars: '📑',
  stats: '📈',
  tables: '🗃',
  'user-cards': '👤',
};

export default function HomePage() {
  const categories = getCategories();
  const totalBlocks = categories.reduce((sum, cat) => sum + cat.blocks.length, 0);

  return (
    <main className={styles.main}>
      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroDots} />
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Open Source &middot; Copy & Paste &middot; Free
          </div>
          <h1 className={styles.title}>
            Production-Ready
            <br />
            <span className={styles.titleAccent}>UI Blocks</span>
          </h1>
          <p className={styles.subtitle}>
            Beautifully crafted, ready-to-use interface blocks built entirely with
            Tiny Design components. Browse, preview, and copy into your projects.
          </p>
          <div className={styles.heroActions}>
            <Link href="/blocks/authentication/" className={styles.btnPrimary}>
              Browse Blocks
              <span className={styles.btnArrow}>→</span>
            </Link>
            <a
              href="https://github.com/wangdicoder/tiny-design"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className={styles.stats}>
        {[
          { value: String(totalBlocks), label: 'UI Blocks' },
          { value: String(categories.length), label: 'Categories' },
          { value: '80+', label: 'Components Used' },
          { value: '100%', label: 'TypeScript' },
        ].map((stat, i) => (
          <div key={stat.label} className={styles.stat} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Categories section */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore by Category</h2>
          <p className={styles.sectionDesc}>
            Each block is a self-contained, composable UI pattern you can drop into any React project.
          </p>
        </div>
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/blocks/${cat.slug}/`}
              className={styles.card}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className={styles.cardIcon}>
                {CATEGORY_ICONS[cat.slug] || '📦'}
              </span>
              <div>
                <h3 className={styles.cardTitle}>{cat.label}</h3>
                <p className={styles.cardCount}>
                  {cat.blocks.length} {cat.blocks.length === 1 ? 'block' : 'blocks'}
                </p>
              </div>
              <span className={styles.cardArrow}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Start Building Beautiful Interfaces</h2>
        <p className={styles.ctaDesc}>
          Every block uses only Tiny Design components — no extra dependencies.
          Just copy, paste, and customize.
        </p>
        <div className={styles.ctaActions}>
          <Link href="/blocks/authentication/" className={styles.btnPrimary}>
            Get Started
            <span className={styles.btnArrow}>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Built with{' '}
          <a href="https://wangdicoder.github.io/tiny-design" target="_blank" rel="noopener noreferrer">
            Tiny Design
          </a>
        </p>
      </footer>
    </main>
  );
}
