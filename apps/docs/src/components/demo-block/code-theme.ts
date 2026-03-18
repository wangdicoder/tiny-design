/* Light theme: based on https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css */
export const LightCodeTheme = {
  plain: {
    color: '#393A34',
    backgroundColor: '#f6f8fa',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#999988',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-name'],
      style: {
        color: '#0b8235',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#999',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#36acaa',
      },
    },
    {
      types: ['atrule', 'keyword', 'selector', 'attr-value'],
      style: {
        color: '#00a4db',
      },
    },
    {
      types: ['function', 'deleted', 'tag', 'function-variable', 'at-rule', 'class-name'],
      style: {
        color: '#f81d22',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#6f42c1',
      },
    },
  ],
};

/* Dark theme: based on VS Code Dark+ */
export const DarkCodeTheme = {
  plain: {
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6a9955',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-name'],
      style: {
        color: '#ce9178',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#808080',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#b5cea8',
      },
    },
    {
      types: ['atrule', 'keyword', 'selector', 'attr-value'],
      style: {
        color: '#569cd6',
      },
    },
    {
      types: ['function', 'deleted', 'tag', 'function-variable', 'at-rule', 'class-name'],
      style: {
        color: '#d7ba7d',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#dcdcaa',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#c586c0',
      },
    },
  ],
};

// Kept for backward compatibility
export const CodeTheme = LightCodeTheme;
