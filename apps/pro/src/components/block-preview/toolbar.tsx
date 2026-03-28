'use client';

import styles from './block-preview.module.scss';

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const DesktopIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const TabletIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface ToolbarProps {
  viewport: ViewportSize;
  onViewportChange: (v: ViewportSize) => void;
  showCode: boolean;
  onToggleCode: () => void;
  onCopy: () => void;
  copied: boolean;
}

export function Toolbar({
  viewport,
  onViewportChange,
  showCode,
  onToggleCode,
  onCopy,
  copied,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.viewportGroup}>
        {([
          ['desktop', DesktopIcon],
          ['tablet', TabletIcon],
          ['mobile', MobileIcon],
        ] as const).map(([size, Icon]) => (
          <button
            key={size}
            className={`${styles.toolbarBtn} ${viewport === size ? styles.toolbarBtnActive : ''}`}
            onClick={() => onViewportChange(size)}
            aria-label={`${size} view`}
          >
            <Icon />
          </button>
        ))}
      </div>
      <div className={styles.actionGroup}>
        <button
          className={`${styles.toolbarBtn} ${showCode ? styles.toolbarBtnActive : ''}`}
          onClick={onToggleCode}
          aria-label="Toggle code"
        >
          <CodeIcon />
        </button>
        <button className={styles.toolbarBtn} onClick={onCopy} aria-label="Copy code">
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}
