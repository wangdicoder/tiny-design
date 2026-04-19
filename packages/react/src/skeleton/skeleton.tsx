import React, { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import {
  SkeletonAnimation,
  SkeletonAvatarProps,
  SkeletonBlockProps,
  SkeletonProps,
  SkeletonSize,
  SkeletonTextProps,
} from './types';

const getAnimationName = (
  animation: SkeletonAnimation | undefined,
  configAnimation: SkeletonAnimation | undefined
): 'pulse' | 'shimmer' | null => {
  if (animation === false) {
    return null;
  }

  if (animation === 'pulse' || animation === 'shimmer') {
    return animation;
  }

  if (animation === true) {
    return 'shimmer';
  }

  if (configAnimation === 'pulse' || configAnimation === 'shimmer') {
    return configAnimation;
  }

  return null;
};

const getBlockStyle = (
  style: React.CSSProperties | undefined,
  width?: number | string,
  height?: number | string
): React.CSSProperties | undefined => {
  if (width === undefined && height === undefined) {
    return style;
  }

  return {
    ...style,
    ...(width !== undefined ? { width } : null),
    ...(height !== undefined ? { height } : null),
  };
};

const getAvatarSize = (size: SkeletonSize | undefined): number => {
  if (typeof size === 'number') {
    return size;
  }

  switch (size) {
    case 'sm':
      return 32;
    case 'lg':
      return 48;
    case 'md':
    default:
      return 40;
  }
};

const SkeletonBlock = React.memo(React.forwardRef<HTMLDivElement, SkeletonBlockProps>(
  (props: SkeletonBlockProps, ref): JSX.Element => {
    const {
      className,
      style,
      prefixCls: customisedCls,
      shape = 'round',
      width,
      height,
      animation,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton', configContext.prefixCls, customisedCls);
    const animationName = getAnimationName(animation, configContext.skeleton?.animation);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}_${shape}`]: shape !== 'rect',
      [`${prefixCls}_animated`]: Boolean(animationName),
      [`${prefixCls}_animated_${animationName}`]: Boolean(animationName),
    });

    return (
      <div
        ref={ref}
        {...otherProps}
        className={cls}
        style={getBlockStyle(style, width, height)}
        aria-hidden="true"
      />
    );
  }
));

SkeletonBlock.displayName = 'SkeletonBlock';

const SkeletonText = React.memo(React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (props: SkeletonTextProps, ref): JSX.Element => {
    const {
      rows = 1,
      widths,
      className,
      prefixCls: customisedCls,
      shape = 'round',
      width,
      height = '1em',
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton', configContext.prefixCls, customisedCls);
    const items = Array.from({ length: Math.max(1, rows) }, (_, index) => {
      const rowWidth = widths?.[index] ?? (index === rows - 1 && rows > 1 ? '61%' : width);

      return (
        <SkeletonBlock
          key={index}
          {...otherProps}
          shape={shape}
          width={rowWidth}
          height={height}
          className={`${prefixCls}__text-row`}
        />
      );
    });

    return (
      <div ref={ref} className={classNames(`${prefixCls}__text`, className)} aria-hidden="true">
        {items}
      </div>
    );
  }
));

SkeletonText.displayName = 'SkeletonText';

const SkeletonAvatar = React.memo(React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  (props: SkeletonAvatarProps, ref): JSX.Element => {
    const {
      size = 'md',
      shape = 'circle',
      className,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton', configContext.prefixCls, customisedCls);
    const dimension = getAvatarSize(size);

    return (
      <SkeletonBlock
        ref={ref}
        {...otherProps}
        prefixCls={customisedCls}
        width={dimension}
        height={dimension}
        shape={shape === 'square' ? 'round' : 'circle'}
        className={classNames(`${prefixCls}__avatar`, className)}
      />
    );
  }
));

SkeletonAvatar.displayName = 'SkeletonAvatar';

type SkeletonComponent = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>
> & {
  Block: typeof SkeletonBlock;
  Text: typeof SkeletonText;
  Avatar: typeof SkeletonAvatar;
};

const SkeletonBase = React.memo(React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props: SkeletonProps, ref): JSX.Element | null => {
    const {
      loading = true,
      avatar = false,
      title = false,
      paragraph = false,
      children,
      className,
      prefixCls: customisedCls,
      shape = 'round',
      width,
      height,
      animation,
      style,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('skeleton', configContext.prefixCls, customisedCls);

    if (!loading) {
      return children ? <>{children}</> : null;
    }

    const hasStructuredContent = avatar || title || paragraph;

    if (!hasStructuredContent) {
      return (
        <div ref={ref} {...otherProps} role="status" aria-busy="true">
          <SkeletonBlock
            prefixCls={customisedCls}
            shape={shape}
            width={width}
            height={height}
            animation={animation}
            style={style}
            className={className}
          />
        </div>
      );
    }

    const avatarConfig = avatar && typeof avatar === 'object' ? avatar : undefined;
    const titleConfig = title && typeof title === 'object' ? title : undefined;
    const paragraphConfig = paragraph && typeof paragraph === 'object' ? paragraph : undefined;
    const rows = paragraph === false ? 0 : paragraphConfig?.rows ?? 3;

    return (
      <div
        ref={ref}
        {...otherProps}
        className={classNames(`${prefixCls}__group`, className, {
          [`${prefixCls}__group_with-avatar`]: avatar,
        })}
        style={style}
        role="status"
        aria-busy="true"
      >
        {avatar && (
          <SkeletonAvatar
            prefixCls={customisedCls}
            animation={animation}
            size={avatarConfig?.size}
            shape={avatarConfig?.shape}
          />
        )}
        <div className={`${prefixCls}__content`}>
          {title && (
            <SkeletonText
              prefixCls={customisedCls}
              animation={animation}
              rows={1}
              width={titleConfig?.width ?? '38%'}
              className={`${prefixCls}__title`}
            />
          )}
          {rows > 0 && (
            <SkeletonText
              prefixCls={customisedCls}
              animation={animation}
              rows={rows}
              widths={paragraphConfig?.widths}
              className={`${prefixCls}__paragraph`}
            />
          )}
        </div>
      </div>
    );
  }
));

SkeletonBase.displayName = 'Skeleton';

const Skeleton = Object.assign(SkeletonBase, {
  Block: SkeletonBlock,
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
}) as SkeletonComponent;

export default Skeleton;
