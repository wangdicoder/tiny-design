import { CSSProperties, useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { resolveTargetContainer } from '../config-provider/container-utils';
import { getPrefixCls } from '../_utils/general';
import { getRect, getScroll, getNodeHeight } from '../_utils/dom';
import { StickyProps } from './types';

const Sticky = (props: StickyProps): JSX.Element => {
  const {
    offsetTop,
    offsetBottom,
    container,
    onChange,
    className,
    style,
    children,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('sticky', configContext.prefixCls, customisedCls);
  const cls = classNames(prefixCls, className);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [stickyStyle, setStickyStyle] = useState<CSSProperties>({});
  const [placeholderStyle, setPlaceholderStyle] = useState<CSSProperties>({});
  const resolvedContainer = useCallback(
    () => resolveTargetContainer(configContext, container),
    [configContext, container]
  );
  const [stickyContainer, setStickyContainer] = useState(resolvedContainer());

  const getStickyMode = () => {
    const mode = {
      top: false,
      bottom: false,
      offset: 0,
    };

    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      mode.top = true;
    } else if (typeof offsetTop === 'number') {
      mode.top = true;
      mode.bottom = false;
      mode.offset = offsetTop || 0;
    } else if (typeof offsetBottom === 'number') {
      mode.bottom = true;
      mode.top = false;
      mode.offset = offsetBottom || 0;
    }

    return mode;
  };
  const [stickyMode] = useState(getStickyMode());

  const getOffset = useCallback((placeholderNode: HTMLElement, stickyContainer: HTMLElement | Window): {
    top: number;
    left: number;
    width: number;
    height: number;
  } => {
    const rect = placeholderNode.getBoundingClientRect();
    const containerRect = getRect(stickyContainer);
    const containerScrollTop = getScroll(stickyContainer, true);
    const containerScrollLeft = getScroll(stickyContainer, false);

    return {
      top: rect.top - containerRect.top + containerScrollTop,
      left: rect.left - containerRect.left + containerScrollLeft,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  const updateStickyStyle = useCallback(
    (stickyStyle: CSSProperties, stuck = false) => {
      setStickyStyle({ ...stickyStyle });

      if (stuck) {
        onChange && onChange(true);
      } else if (!stickyStyle) {
        onChange && onChange(false);
      }
    },
    [onChange]
  );

  const updatePlaceholderStyle = (placeholderStyle: CSSProperties) => {
    setPlaceholderStyle({ ...placeholderStyle });
  };

  const updateNodePosition = useCallback(() => {
    const placeholderNode = placeholderRef.current;
    const stickyNode = stickyRef.current;
    if (!placeholderNode || !stickyContainer || !stickyNode) {
      return;
    }

    const containerScrollTop = getScroll(stickyContainer, true);
    const placeholderOffset = getOffset(placeholderNode, stickyContainer);
    const containerHeight = getNodeHeight(stickyContainer);
    const placeholderHeight = placeholderNode.offsetHeight;
    const containerRect = getRect(stickyContainer);
    const stickyHeight = stickyNode.offsetHeight;

    const stickyStyle: CSSProperties = {
      width: placeholderOffset.width,
    };
    const placeholderStyle: CSSProperties = {
      width: placeholderOffset.width,
      height: stickyHeight,
    };
    if (stickyMode.top && containerScrollTop > placeholderOffset.top - stickyMode.offset) {
      // sticky top
      stickyStyle.position = 'fixed';
      stickyStyle.top = stickyMode.offset + containerRect.top;
      updateStickyStyle(stickyStyle, true);
      updatePlaceholderStyle(placeholderStyle);
    } else if (
      stickyMode.bottom &&
      containerScrollTop <
        placeholderOffset.top + placeholderHeight + stickyMode.offset - containerHeight
    ) {
      // sticky bottom
      stickyStyle.height = placeholderHeight;
      stickyStyle.position = 'fixed';
      stickyStyle.bottom = stickyMode.offset;

      updateStickyStyle(stickyStyle, true);
      updatePlaceholderStyle(placeholderStyle);
    } else {
      updateStickyStyle({});
      updatePlaceholderStyle({});
    }
  }, [stickyContainer, updateStickyStyle, stickyMode, getOffset]);

  /**
   * If the container is changed, update the listeners
   */
  useEffect(() => {
    const stickyContainer = resolvedContainer();
    if (!stickyContainer) {
      return;
    }
    setStickyContainer(stickyContainer);

    const placeholderNode = placeholderRef.current;
    const stickyNode = stickyRef.current;
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateNodePosition();
          })
        : null;

    stickyContainer.addEventListener('scroll', updateNodePosition);
    window.addEventListener('resize', updateNodePosition);

    if (resizeObserver) {
      placeholderNode && resizeObserver.observe(placeholderNode);
      stickyNode && resizeObserver.observe(stickyNode);

      if (stickyContainer !== window) {
        resizeObserver.observe(stickyContainer as HTMLElement);
      }
    }

    return () => {
      stickyContainer.removeEventListener('scroll', updateNodePosition);
      window.removeEventListener('resize', updateNodePosition);
      resizeObserver?.disconnect();
    };
  }, [updateNodePosition, resolvedContainer]);

  useEffect(() => {
    updateNodePosition();
  }, [updateNodePosition]);

  return (
    <div ref={placeholderRef} style={placeholderStyle}>
      <div {...otherProps} className={cls} ref={stickyRef} style={{ ...stickyStyle, ...style }}>
        {children}
      </div>
    </div>
  );
};

Sticky.displayName = 'Sticky';

export default Sticky;
