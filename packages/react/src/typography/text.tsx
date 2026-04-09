import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IconCheckmark, IconDocument } from '@tiny-design/icons';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { TextProps, TextType } from './types';
import { copyText } from '../copy-to-clipboard/clipboard';
import { extractTextContent, resolveCopyableConfig, resolveEllipsisConfig } from './utils';

const tagGenerator = (
  isRequired: boolean,
  tag: string,
  element: React.ReactNode
): React.ReactNode => {
  if (!isRequired) return element;
  return React.createElement(tag, {}, element);
};

const TEXT_TYPES: TextType[] = ['default', 'secondary', 'success', 'warning', 'danger', 'info'];

const Text = React.forwardRef<HTMLElement, TextProps>(
  (props, ref) => {
    const {
      as = 'span',
      type = 'default',
      copyable,
      ellipsis,
      code = false,
      del = false,
      underline = false,
      strong = false,
      italic = false,
      mark = false,
      sub = false,
      sup = false,
      className,
      children,
      prefixCls: customisedCls,
      style,
      title,
      ...otherProps
    } = props;

    const [copied, setCopied] = useState(false);
    const resetTimerRef = useRef<number | null>(null);
    const copyableConfig = resolveCopyableConfig(copyable);
    const ellipsisConfig = resolveEllipsisConfig(ellipsis);
    const rows = ellipsisConfig?.rows ?? 1;
    const textContent = extractTextContent(children);
    const copyValue = copyableConfig?.text ?? textContent;
    const isSub = sub && !sup;

    let Node = tagGenerator(code, 'code', children);
    Node = tagGenerator(del, 'del', Node);
    Node = tagGenerator(underline, 'u', Node);
    Node = tagGenerator(strong, 'strong', Node);
    Node = tagGenerator(italic, 'i', Node);
    Node = tagGenerator(mark, 'mark', Node);
    Node = tagGenerator(isSub, 'sub', Node);
    Node = tagGenerator(sup, 'sup', Node);

    useEffect(() => {
      return () => {
        if (resetTimerRef.current) {
          window.clearTimeout(resetTimerRef.current);
        }
      };
    }, []);

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('typography', configContext.prefixCls, customisedCls);
    const contentStyle =
      ellipsisConfig == null
        ? undefined
        : rows > 1
          ? {
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical' as const,
              WebkitLineClamp: rows,
            }
          : {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap' as const,
            };
    const resolvedTitle =
      title ??
      (ellipsisConfig?.tooltip === true ? textContent : ellipsisConfig?.tooltip || undefined);
    const cls = classNames(
      className,
      prefixCls,
      TEXT_TYPES.includes(type) && `${prefixCls}_${type}`,
      {
        [`${prefixCls}_copyable`]: !!copyableConfig,
        [`${prefixCls}_ellipsis`]: !!ellipsisConfig,
        [`${prefixCls}_ellipsis-multiline`]: !!ellipsisConfig && rows > 1,
      }
    );
    const TextTag = as;

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      e.preventDefault();
      e.stopPropagation();

      if (!copyValue) {
        return;
      }

      const isCopied = await copyText(copyValue);
      copyableConfig?.onCopy?.(isCopied, copyValue);

      if (!isCopied) {
        return;
      }

      setCopied(true);

      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, copyableConfig?.resetDuration ?? 1500);
    };

    return React.createElement(
      TextTag,
      {
        ...otherProps,
        ref,
        className: cls,
        style,
        title: resolvedTitle,
      },
      <>
        <span className={`${prefixCls}__content`} style={contentStyle}>
          {Node}
        </span>
        {copyableConfig && (
          <button
            type="button"
            className={`${prefixCls}__copy`}
            aria-label={copied ? 'Copied text' : 'Copy text'}
            title={copied ? 'Copied' : 'Copy'}
            onClick={handleCopy}>
            {copied
              ? copyableConfig.copiedIcon ?? <IconCheckmark width={14} height={14} />
              : copyableConfig.icon ?? <IconDocument width={14} height={14} />}
          </button>
        )}
      </>
    );
  }
);

Text.displayName = 'Text';

export default Text;
