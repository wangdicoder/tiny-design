import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
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

const createSyntheticImageEvent = (
  imageNode: HTMLImageElement,
  type: 'load' | 'error'
): React.SyntheticEvent<HTMLImageElement> => {
  const nativeEvent = new Event(type);

  return {
    bubbles: nativeEvent.bubbles,
    cancelable: nativeEvent.cancelable,
    currentTarget: imageNode,
    defaultPrevented: nativeEvent.defaultPrevented,
    eventPhase: nativeEvent.eventPhase,
    isDefaultPrevented: () => nativeEvent.defaultPrevented,
    isPropagationStopped: () => false,
    isTrusted: nativeEvent.isTrusted,
    nativeEvent,
    persist: () => undefined,
    preventDefault: () => nativeEvent.preventDefault(),
    stopPropagation: () => nativeEvent.stopPropagation(),
    target: imageNode,
    timeStamp: nativeEvent.timeStamp,
    type,
  } as React.SyntheticEvent<HTMLImageElement>;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref): JSX.Element => {
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
  const isBounded = width !== undefined && height !== undefined;

  useEffect(() => {
    const visible = isVisible || !lazy || !canUseIntersectionObserver();

    if (visible !== isVisible) {
      setIsVisible(visible);
    }

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
  }, [fallback, fallbackValue, isVisible, lazy, srcValue]);

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
      if (slot === 'fallback' && content === resolvedSrc && status === 'error') {
        return null;
      }

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

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(event);
  }, [onLoad]);

  const handleResolvedError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    onError?.(event);

    if (activeSource === 'src' && fallbackValue && fallbackValue !== srcValue) {
      setActiveSource('fallback');
      setStatus('loading');
      return;
    }

    setStatus('error');
  }, [activeSource, fallbackValue, onError, srcValue]);

  useEffect(() => {
    if (!isVisible || !resolvedSrc || !imageRef.current || status === 'loaded' || status === 'error') {
      return;
    }

    const imageNode = imageRef.current;

    if (!imageNode.complete) {
      return;
    }

    if (imageNode.naturalWidth > 0) {
      handleLoad(createSyntheticImageEvent(imageNode, 'load'));
      return;
    }

    handleResolvedError(createSyntheticImageEvent(imageNode, 'error'));
  }, [handleLoad, handleResolvedError, isVisible, resolvedSrc, status]);

  return (
    <span
      ref={rootRef}
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
          ref={(node) => {
            imageRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          onError={handleResolvedError}
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
