'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRunner } from 'react-runner';
import * as TinyDesign from '@tiny-design/react';
import * as TinyIcons from '@tiny-design/icons';
import { Toolbar, CodeIcon, CopyIcon, CheckIcon, type ViewportSize } from './toolbar';
import { PreviewFrame } from './preview-frame';
import { CodePanel } from './code-panel';
import type { BlockMeta } from '../../utils/blocks';
import styles from './block-preview.module.scss';

// In dev mode, Next.js appends HMR code (import.meta.webpackHot...) to
// asset/source modules. Strip it so react-runner only sees the TSX source.
function stripHmr(raw: string): string {
  const marker = '\n\n;\n    // Wrapped in an IIFE';
  const idx = raw.indexOf(marker);
  return idx !== -1 ? raw.substring(0, idx).trim() : raw.trim();
}

const scope = {
  import: {
    react: React,
    '@tiny-design/react': TinyDesign,
    '@tiny-design/icons': TinyIcons,
  },
};

interface BlockPreviewProps {
  meta: BlockMeta;
}

export function BlockPreview({ meta }: BlockPreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [sourceCode, setSourceCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    meta.rawSource().then((m) => setSourceCode(stripHmr(m.default)));
  }, [meta]);

  const { element, error } = useRunner({ code: sourceCode, scope });

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [sourceCode]);

  return (
    <div className={styles.blockPreview}>
      <div className={styles.header}>
        <h3 className={styles.title}>{meta.title}</h3>
        <Toolbar viewport={viewport} onViewportChange={setViewport} />
      </div>

      <PreviewFrame viewport={viewport}>
        {error ? (
          <div className={styles.errorDisplay}>{error}</div>
        ) : (
          element
        )}
      </PreviewFrame>

      {/* Docs-inspired action bar */}
      <div className={styles.actionBar}>
        <button
          className={`${styles.actionBarBtn} ${showCode ? styles.actionBarBtnActive : ''}`}
          onClick={() => setShowCode((v) => !v)}
        >
          <CodeIcon />
          <span className={styles.actionBarLabel}>
            {showCode ? 'Hide Code' : 'Show Code'}
          </span>
        </button>
        <span className={styles.actionBarDivider} />
        <button className={styles.actionBarBtn} onClick={handleCopy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className={styles.actionBarLabel}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>

      {/* Animated code panel */}
      <div className={`${styles.codePanelWrapper} ${showCode ? styles.codePanelWrapperOpen : ''}`}>
        <div className={styles.codePanelInner}>
          <CodePanel source={sourceCode} />
        </div>
      </div>
    </div>
  );
}
