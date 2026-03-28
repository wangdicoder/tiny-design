'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toolbar, type ViewportSize } from './toolbar';
import { PreviewFrame } from './preview-frame';
import { CodePanel } from './code-panel';
import type { BlockMeta } from '@/lib/blocks';
import styles from './block-preview.module.scss';

interface BlockPreviewProps {
  meta: BlockMeta;
}

export function BlockPreview({ meta }: BlockPreviewProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [BlockComponent, setBlockComponent] = useState<React.ComponentType | null>(null);
  const [sourceCode, setSourceCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    meta.component().then((m) => setBlockComponent(() => m.default));
    meta.rawSource().then((m) => setSourceCode(m.default));
  }, [meta]);

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
        {BlockComponent ? <BlockComponent /> : null}
      </PreviewFrame>
      {showCode && <CodePanel source={sourceCode} />}
    </div>
  );
}
