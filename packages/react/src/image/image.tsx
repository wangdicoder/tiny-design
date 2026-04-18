import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ImageProps } from './types';

type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error';
type ActiveSource = 'src' | 'fallback';

const canUseIntersectionObserver = (): boolean => {
  return typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function';
};

const isStringSource = (value: React.ReactNode): value is string => typeof value === 'string' && value.length > 0;

const Image = React.forwardRef<HTMLSpanElement, ImageProps>((props, ref): JSX.Element => {
  const {
    alt = '',
    objectFit = 'cover',
    round = false,
    lazy = false,
    src,
    placeholder,
    fallback,
    width,
    height,
    className,
    style,
    imageClassName,
    imageStyle,
    onLoad,
    onError,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', configContext.prefixCls, customisedCls);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => !lazy || !canUseIntersectionObserver());
  const [status, setStatus] = useState<ImageStatus>(() =>
    !lazy || !canUseIntersectionObserver() ? 'loading' : 'idle'
  );
  const [activeSource, setActiveSource] = useState<ActiveSource>(() =>
    isStringSource(src) ? 'src' : 'fallback'
  );

  const srcValue = isStringSource(src) ? src : undefined;
  const fallbackValue = isStringSource(fallback) ? fallback : undefined;
  const resolvedSrc = activeSource === 'fallback' ? fallbackValue : srcValue;
  const hasStringSource = Boolean(srcValue || fallbackValue);
  const isBounded = width !== undefined || height !== undefined;

  useEffect(() => {
    const visible = !lazy || !canUseIntersectionObserver();
    setIsVisible(visible);
    setActiveSource(srcValue ? 'src' : 'fallback');

    if (!visible) {
      setStatus('idle');
      return;
    }

    if (srcValue || fallbackValue) {
      setStatus('loading');
      return;
    }

    setStatus(fallback ? 'error' : 'idle');
  }, [fallback, fallbackValue, lazy, srcValue]);

  useEffect(() => {
    if (!lazy || !canUseIntersectionObserver() || !rootRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setStatus((currentStatus) => {
            if (currentStatus === 'loaded') return currentStatus;
            return hasStringSource ? 'loading' : fallback ? 'error' : 'idle';
          });
          obs.unobserve(entry.target);
        }
      });
    });

    observer.observe(rootRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fallback, hasStringSource, lazy]);

  useEffect(() => {
    if (!isVisible || !resolvedSrc || !imageRef.current || status === 'loaded' || status === 'error') {
      return;
    }

    const imageNode = imageRef.current;

    if (!imageNode.complete) {
      return;
    }

    if (imageNode.naturalWidth > 0) {
      setStatus('loaded');
      return;
    }

    setStatus('error');
  }, [isVisible, resolvedSrc, status]);

  const cls = classNames(prefixCls, className, `${prefixCls}_${status}`, {
    [`${prefixCls}_bounded`]: isBounded,
    [`${prefixCls}_round`]: round,
    [`${prefixCls}_lazy`]: lazy,
    [`${prefixCls}_fallback`]: activeSource === 'fallback' && status !== 'error',
  });

  const rootStyle: React.CSSProperties = {
    ...style,
    width,
    height,
  };

  const layerSizeStyle: React.CSSProperties = useMemo(() => {
    const nextStyle: React.CSSProperties = {};

    if (width !== undefined) {
      nextStyle.width = '100%';
    }

    if (height !== undefined) {
      nextStyle.height = '100%';
    }

    return nextStyle;
  }, [height, width]);

  const mergedImageStyle: React.CSSProperties = {
    ...layerSizeStyle,
    ...imageStyle,
    objectFit,
  };

  const renderLayer = (content: React.ReactNode, slot: 'placeholder' | 'fallback') => {
    if (!content) return null;

    if (isStringSource(content)) {
      return (
        <img
          aria-hidden
          alt=""
          className={`${prefixCls}__${slot}-image`}
          src={content}
          style={{ ...layerSizeStyle, objectFit }}
        />
      );
    }

    return <span className={`${prefixCls}__${slot}`}>{content}</span>;
  };

  const showPlaceholder = status !== 'loaded' && status !== 'error' && Boolean(placeholder);
  const showFallback = status === 'error' && Boolean(fallback);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    onError?.(event);

    if (activeSource === 'src' && fallbackValue && fallbackValue !== srcValue) {
      setActiveSource('fallback');
      setStatus('loading');
      return;
    }

    setStatus('error');
  };

  return (
    <span
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cls}
      style={rootStyle}
      data-status={status}
    >
      {showPlaceholder && renderLayer(placeholder, 'placeholder')}
      {showFallback && renderLayer(fallback, 'fallback')}
      {isVisible && resolvedSrc && (
        <img
          {...otherProps}
          alt={alt}
          className={classNames(`${prefixCls}__img`, imageClassName)}
          ref={imageRef}
          onError={handleError}
          onLoad={handleLoad}
          src={resolvedSrc}
          style={mergedImageStyle}
        />
      )}
    </span>
  );
});

Image.displayName = 'Image';

export default Image;
