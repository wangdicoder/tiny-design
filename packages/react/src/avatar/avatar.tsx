import React, { useRef, useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { AVATAR_MARK, markComponent } from '../_utils/component-markers';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { AvatarProps } from './types';

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const {
    size = 38,
    shape = 'circle',
    presence = undefined,
    alt = 'avatar',
    icon,
    src,
    children,
    className,
    style,
    onClick,
    prefixCls: customisedCls,
    ...otherProps
  } = props;
  const outerEl = useRef<HTMLSpanElement | null>(null);
  const textEl = useRef<HTMLSpanElement | null>(null);
  const [scale, setScale] = useState(1);
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('avatar', configContext.prefixCls, customisedCls);

  const cls = classNames(prefixCls, className, `${prefixCls}_${shape}`, {
    [`${prefixCls}_clickable`]: onClick,
  });

  const renderChildren = () => {
    if (typeof children === 'string') {
      let textStyle: React.CSSProperties = {};
      if (textEl.current) {
        const transformString = `scale(${scale}) translateX(-50%)`;
        textStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
        };
      }
      return (
        <span ref={textEl} className={`${prefixCls}__text`} style={textStyle}>
          {children}
        </span>
      );
    } else {
      return children;
    }
  };

  const renderItem = (): React.ReactNode => {
    if (children) {
      return renderChildren();
    } else if (src) {
      return <img src={src} alt={alt} className={`${prefixCls}__img`} />;
    } else {
      return icon;
    }
  };

  const renderPresence = (): React.ReactElement => {
    return <i className={`${prefixCls}__presence ${prefixCls}__presence_${presence}`} />;
  };

  const styles: React.CSSProperties = {
    width: size,
    height: size,
    fontSize: size / 2,
    lineHeight: `${size - 4}px`,
    ...style,
  };

  useEffect(() => {
    if (outerEl.current && textEl.current && textEl.current!.className === `${prefixCls}__text`) {
      const textElWidth = textEl.current!.offsetWidth;
      const outerElWidth = outerEl.current!.offsetWidth;
      // leave 4px padding for left and right side
      if (outerElWidth - 8 < textElWidth) {
        setScale((outerElWidth - 8) / textElWidth);
      } else {
        setScale(1);
      }
    }
  });

  return (
    <span {...otherProps} ref={(node) => {
      outerEl.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }} className={cls} style={styles}>
      {renderItem()}
      {presence && renderPresence()}
    </span>
  );
});

Avatar.displayName = 'Avatar';
markComponent(Avatar, AVATAR_MARK);

export default Avatar;
