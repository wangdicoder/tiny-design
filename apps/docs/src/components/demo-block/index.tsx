import React, { useState, useCallback, useRef } from 'react';
import { useRunner } from 'react-runner';
import { Highlight, themes } from 'prism-react-renderer';
import { LightCodeTheme, DarkCodeTheme } from '../code-block/code-theme';
import * as TinyDesign from '@tiny-design/react';
import * as TinyIcons from '@tiny-design/icons';
import CollapseTransition from '@tiny-design/react/collapse-transition';
import { useTheme, Tooltip } from '@tiny-design/react';
import { useLocaleContext } from '../../context/locale-context';
import { openInStackBlitz, openInCodeSandbox } from '../../utils/sandbox';
import './demo-block.scss';

/** StackBlitz logo icon (inline SVG) */
const StackBlitzIcon = () => (
  <svg viewBox="0 0 28 28" width="1em" height="1em" fill="currentColor">
    <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.672-10.227z" />
  </svg>
);

/** CodeSandbox logo icon (inline SVG) */
const CodeSandboxIcon = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.4 0.3L0 256v512l512 256 512-256V256L755 140.3zM512 59.2l205.3 115.5-205.3 115.5L306.7 174.7 512 59.2zM288 370.4V589l-224-112V265.8L288 370.4zm-224 263l224 112.4V962L64 850v-216.6zm256 226.8V632.5l224-112V291.7l224 111.7V633.4l-448 226.8zM960 589l-224 112V370.4l224-104.6V589z" />
  </svg>
);

/** Copy icon (inline SVG) */
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/** Reset icon (inline SVG) */
const ResetIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

// Build scope for react-runner to resolve imports
const scope = {
  import: {
    react: React,
    '@tiny-design/react': TinyDesign,
    '@tiny-design/icons': TinyIcons,
  },
};

type DemoBlockProps = {
  /** The rendered demo component */
  component: React.ComponentType;
  /** The raw source code string (from ?raw import) */
  source: string;
  /** Optional title for the demo */
  title?: string;
  /** Optional description for the demo */
  description?: string;
};

export const DemoBlock = ({ component: Component, source, title, description }: DemoBlockProps) => {
  const [showCode, setShowCode] = useState(false);
  const [editedCode, setEditedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { resolvedTheme } = useTheme();
  const { siteLocale: s } = useLocaleContext();
  const codeTheme = (resolvedTheme === 'dark' ? DarkCodeTheme : LightCodeTheme) as typeof themes.github;

  // Normalize source once: trim trailing whitespace from ?raw import
  const normalizedSource = React.useMemo(() => source.trim(), [source]);

  const isEditing = editedCode !== null;
  const displayCode = editedCode ?? normalizedSource;

  // react-runner: execute edited code with scope-based import resolution
  const { element: liveElement, error: runnerError } = useRunner({
    code: isEditing ? editedCode! : '',
    scope,
  });

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    if (newCode !== normalizedSource) {
      setEditedCode(newCode);
    } else {
      setEditedCode(null);
    }
  }, [normalizedSource]);

  const handleReset = useCallback(() => {
    setEditedCode(null);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: ignore
    }
  }, [displayCode]);

  // Handle Tab key in textarea to insert spaces instead of moving focus
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      textarea.value = newValue;
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      // Trigger React's onChange
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype, 'value'
      )?.set;
      nativeInputValueSetter?.call(textarea, newValue);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, []);

  return (
    <div className="demo-block__container" ref={containerRef}>
      {/* Preview area */}
      <div className="demo-block__previewer">
        {isEditing ? (
          runnerError ? (
            <pre className="demo-block__error">{runnerError}</pre>
          ) : (
            liveElement
          )
        ) : (
          <Component />
        )}
      </div>

      {/* Action bar */}
      <div className="demo-block__actions">
        <Tooltip title={s.codeBlock.openInCodeSandbox}>
          <button
            className="demo-block__action-btn"
            onClick={() => openInCodeSandbox(displayCode)}
            aria-label={s.codeBlock.openInCodeSandbox}>
            <CodeSandboxIcon />
          </button>
        </Tooltip>
        <Tooltip title={s.codeBlock.openInStackBlitz}>
          <button
            className="demo-block__action-btn"
            onClick={() => openInStackBlitz(displayCode)}
            aria-label={s.codeBlock.openInStackBlitz}>
            <StackBlitzIcon />
          </button>
        </Tooltip>
        <Tooltip title={copied ? s.codeBlock.copied : s.codeBlock.copyCode}>
          <button
            className="demo-block__action-btn"
            onClick={handleCopy}
            aria-label="Copy source code">
            <CopyIcon />
          </button>
        </Tooltip>
        {isEditing && (
          <Tooltip title={s.codeBlock.resetDemo}>
            <button
              className="demo-block__action-btn"
              onClick={handleReset}
              aria-label="Reset demo">
              <ResetIcon />
            </button>
          </Tooltip>
        )}
        <span
          className="demo-block__action-toggle"
          onClick={() => setShowCode(!showCode)}>
          {showCode ? s.codeBlock.hideCode : s.codeBlock.showCode}
        </span>
      </div>

      {/* Code panel: textarea overlay on syntax-highlighted pre */}
      <CollapseTransition isShow={showCode}>
        <div
          className="demo-block__editor-container"
          style={{
            maxWidth: containerRef.current ? containerRef.current.offsetWidth : undefined,
          }}>
          <div className="demo-block__editor-wrapper">
            <div className="demo-block__editor-overlay">
              {/* Syntax-highlighted background layer */}
              <Highlight code={displayCode} language="tsx" theme={codeTheme}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={className}
                    style={{ ...style, padding: '15px', margin: 0 }}
                    aria-hidden="true">
                    <code>
                      {tokens.map((line, i) => {
                        const { key: _lk, ...lineProps } = getLineProps({ line });
                        return (
                          <div key={i} {...lineProps}>
                            {line.map((token, j) => {
                              const { key: _tk, ...tokenProps } = getTokenProps({ token });
                              return <span key={j} {...tokenProps} />;
                            })}
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                )}
              </Highlight>
              {/* Transparent textarea on top for editing */}
              <textarea
                ref={textareaRef}
                className="demo-block__editor-textarea"
                value={displayCode}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                data-gramm="false"
              />
            </div>
          </div>
        </div>
      </CollapseTransition>
    </div>
  );
};
