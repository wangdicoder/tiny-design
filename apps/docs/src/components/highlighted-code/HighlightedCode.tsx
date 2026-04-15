import { Highlight, Prism, PrismTheme } from 'prism-react-renderer';
import { DarkCodeTheme, LightCodeTheme } from '../demo-block/code-theme';
import { useTheme } from '@tiny-design/react';

// Register bash/shell grammar (not included in prism-react-renderer's default bundle)
Prism.languages.bash = Prism.languages.shell = {
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: true },
    'shell-symbol': { pattern: /^\$(?=\s)/m, alias: 'punctuation' },
    string: [
      { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: true },
      { pattern: /(^|[^\\])"(?:[^"\\]|\\.)*"/, lookbehind: true, greedy: true },
      { pattern: /(^|[^\\])'[^']*'/, lookbehind: true, greedy: true },
    ],
    variable: [/\$\{[^}]+\}/, /\$\([^)]+\)/, /\$(?:\w+|[!#?*@_])/],
    keyword: /\b(?:if|then|else|elif|fi|for|do|done|case|esac|while|until|function|in|select|return|exit)\b/,
    function:
      /\b(?:npm|npx|node|yarn|pnpm|bun|git|curl|wget|mkdir|cp|mv|rm|ls|cat|grep|sed|awk|chmod|chown|sudo|apt|brew|pip|python|ruby|go|cargo|make|docker|cd|echo|export|source|touch)\b/,
    'flag': { pattern: /(^|\s)--?[\w-]+/, lookbehind: true, alias: 'keyword' },
    number: /\b\d+\b/,
    operator: /&&|\|\||[|;]/,
    punctuation: /[{}[\]()]/,
  };
  
  export const HighlightedCode = ({ className, children }: { className: string, children: string }) => {
    const { resolvedTheme } = useTheme();
    const codeTheme = resolvedTheme === 'dark' ? DarkCodeTheme : LightCodeTheme;
  
    let language = 'markup';
    if (className != null) {
      language = className.replace(/language-/, '');
    }
  
    const code = String(children ?? '').trim();
  
    return (
      <Highlight code={code} language={language} theme={codeTheme as PrismTheme}>
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={preClassName} style={{ ...style, padding: '10px 12px' }}>
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
    );
  };
