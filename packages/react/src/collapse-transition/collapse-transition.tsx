import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

type CollapseTransitionProps = {
  open?: boolean;
  isShow?: boolean;
  className?: string;
  children: React.ReactNode;
  onHidden?: () => void;
};

const CollapseTransition = ({
  open,
  isShow,
  className,
  children,
  onHidden,
}: CollapseTransitionProps): React.ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const visible = open ?? isShow ?? false;

  // Stash the latest onHidden so the animation effect can depend on `visible`
  // alone. Callers commonly pass an inline arrow (e.g. `() => setX(false)`),
  // and re-running the effect on every parent render restarts the animation.
  const onHiddenRef = useRef(onHidden);
  onHiddenRef.current = onHidden;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      node.style.display = visible ? 'block' : 'none';
      node.style.height = visible ? '' : '0px';
      return;
    }

    let frameA = 0;
    let frameB = 0;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== node || event.propertyName !== 'height') return;

      node.style.overflow = '';

      if (visible) {
        node.style.height = '';
      } else {
        node.style.display = 'none';
        onHiddenRef.current?.();
      }
    };

    node.addEventListener('transitionend', handleTransitionEnd);

    if (visible) {
      node.style.display = 'block';
      node.style.overflow = 'hidden';
      node.style.height = '0px';

      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(() => {
          node.style.height = `${node.scrollHeight}px`;
        });
      });
    } else {
      node.style.display = 'block';
      node.style.overflow = 'hidden';
      node.style.height = `${node.scrollHeight}px`;

      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(() => {
          node.style.height = '0px';
        });
      });
    }

    return () => {
      if (frameA) window.cancelAnimationFrame(frameA);
      if (frameB) window.cancelAnimationFrame(frameB);
      node.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [visible]);

  return (
    <div ref={ref} className={classNames('ty-collapse-transition', className)}>
      {children}
    </div>
  );
};

CollapseTransition.displayName = 'CollapseTransition';

export default CollapseTransition;
