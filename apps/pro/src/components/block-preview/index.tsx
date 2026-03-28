'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRunner } from 'react-runner';
import * as TinyDesign from '@tiny-design/react';
import * as TinyIcons from '@tiny-design/icons';
import { Toolbar, type ViewportSize } from './toolbar';
import { PreviewFrame } from './preview-frame';
import { CodePanel } from './code-panel';
import type { BlockMeta } from '@/lib/blocks';
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
        <Toolbar
          viewport={viewport}
          onViewportChange={setViewport}
          showCode={showCode}
          onToggleCode={() => setShowCode((v) => !v)}
          onCopy={handleCopy}
          copied={copied}
        />
      </div>
      <PreviewFrame viewport={viewport}>
        {error ? (
          <pre style={{ color: 'red', padding: 16, fontSize: 13 }}>{error}</pre>
        ) : (
          element
        )}
      </PreviewFrame>
      {showCode && <CodePanel source={sourceCode} />}
    </div>
  );
}
