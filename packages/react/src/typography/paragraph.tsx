import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ParagraphProps } from './types';
import { extractTextContent, resolveEllipsisConfig } from './utils';

const Paragraph = React.forwardRef<HTMLElement, ParagraphProps>(
  (props: ParagraphProps, ref): JSX.Element => {
    const {
      as = 'p',
      className,
      children,
      prefixCls: customisedCls,
      ellipsis,
      style,
      title,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('typography', configContext.prefixCls, customisedCls);
    const ellipsisConfig = resolveEllipsisConfig(ellipsis);
    const rows = ellipsisConfig?.rows ?? 1;
    const textContent = extractTextContent(children);
    const ellipsisStyle =
      ellipsisConfig == null
        ? undefined
        : rows > 1
          ? {
              ...style,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical' as const,
              WebkitLineClamp: rows,
            }
          : {
              ...style,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap' as const,
            };
    const resolvedTitle =
      title ??
      (ellipsisConfig?.tooltip === true ? textContent : ellipsisConfig?.tooltip || undefined);
    const cls = classNames(className, prefixCls, {
      [`${prefixCls}_ellipsis`]: !!ellipsisConfig,
      [`${prefixCls}_ellipsis-multiline`]: !!ellipsisConfig && rows > 1,
    });
    const ParagraphTag = as;

    return React.createElement(
      ParagraphTag,
      {
        ...otherProps,
        ref,
        className: cls,
        style: ellipsisStyle ?? style,
        title: resolvedTitle,
      },
      children
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
