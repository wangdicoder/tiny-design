/**
 * @author Di Wang on 2019-11-11.
 */
import React from 'react';
import './md-tag.scss';
import { DemoBlock } from '../demo-block';
import { HighlightedCode } from '../highlighted-code';

const slugifyLink = (name) => {
  if (name.includes(' ')) {
    return name.toLowerCase().split(' ').join('-');
  }
  return typeof name === 'string' ? name.toLowerCase() : name;
};

export const components = {
  wrapper: (props) => <div {...props} className="markdown" />,
  h1: (props) => <h1 {...props} className="markdown__heading-1" />,
  h2: ({ children, ...props }) => (
    <h2 {...props} className="markdown__heading-2" id={slugifyLink(children)}>
      {children}
      <a className="markdown__h-link" href={`#${slugifyLink(children)}`}>
        #
      </a>
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="markdown__heading-3" id={slugifyLink(children)}>
      {children}
      <a className="markdown__h-link" href={`#${slugifyLink(children)}`}>
        #
      </a>
    </h3>
  ),
  h4: (props) => <h4 {...props} className="markdown__heading-4" />,
  h5: (props) => <h5 {...props} className="markdown__heading-5" />,
  h6: (props) => <h6 {...props} className="markdown__heading-6" />,
  table: (props) => (
    <div className="markdown__table-wrapper">
      <table {...props} className="markdown__table" />
    </div>
  ),
  p: (props) => <p {...props} className="markdown__p" />,
  ul: (props) => <ul {...props} className="markdown__list" />,
  li: (props) => <li {...props} className="markdown__list-item" />,
  blockquote: (props) => <blockquote {...props} className="markdown__blockquote" />,
  pre: ({ children, live, ...rest }) => {
    if (live && React.isValidElement(children)) {
      const { className, children: code } = children.props;
      return (
        <div className="markdown__pre-container">
          <HighlightedCode className={className}>{code}</HighlightedCode>
        </div>
      );
    }
    return <div {...rest} className="markdown__pre-container">{children}</div>;
  },
  code: ({ className, ...props }) =>
    className ? <HighlightedCode className={className} {...props} /> : <code {...props} className="markdown__inline-code" />,
  // Customised tags (PascalCase for MDX v3 provider resolution)
  Layout: (props) => <div {...props} className="markdown__layout" />,
  Column: (props) => <div {...props} className="markdown__column" />,
  Demo: (props) => <section {...props} className="markdown__demo" />,
  DemoBlock,
};
