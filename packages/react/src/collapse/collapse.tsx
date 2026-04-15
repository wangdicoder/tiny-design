import React, { useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import CollapsePanel from './collapse-panel';
import { CollapseProps, CollapseValue } from './types';

const normalizeValue = (value: string[] | undefined, multiple: boolean): CollapseValue => {
  if (!value || value.length === 0) return [];
  return multiple ? [...new Set(value)] : [value[0]];
};

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref): React.ReactElement => {
  const {
    items,
    value,
    defaultValue,
    onValueChange,
    multiple = true,
    bordered = true,
    size = 'md',
    showArrow = true,
    expandIcon,
    expandIconPosition = 'start',
    disabled = false,
    collapsible = 'header',
    destroyOnHidden = false,
    forceRender = false,
    itemClassName,
    itemStyle,
    headerClassName,
    bodyClassName,
    onItemClick,
    prefixCls: customisedCls,
    className,
    ...otherProps
  } = props;
  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('collapse', configContext.prefixCls, customisedCls);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<CollapseValue>(() =>
    normalizeValue(defaultValue, multiple)
  );

  useEffect(() => {
    if (!isControlled) return;
    setInnerValue(normalizeValue(value, multiple));
  }, [isControlled, value, multiple]);

  const currentValue = isControlled ? normalizeValue(value, multiple) : innerValue;

  const itemMap = useMemo(() => new Set(items.map((item) => item.key)), [items]);
  const activeValue = useMemo(
    () => currentValue.filter((key) => itemMap.has(key)),
    [currentValue, itemMap]
  );

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_borderless`]: !bordered,
    [`${prefixCls}_${size}`]: size,
  });

  const updateValue = (nextValue: CollapseValue) => {
    const normalized = normalizeValue(nextValue, multiple);

    if (!isControlled) {
      setInnerValue(normalized);
    }

    onValueChange?.(normalized);
  };

  const handleToggle = (key: string) => {
    const isActive = activeValue.includes(key);

    if (multiple) {
      updateValue(
        isActive
          ? activeValue.filter((activeKey) => activeKey !== key)
          : [...activeValue, key]
      );
      return;
    }

    updateValue(isActive ? [] : [key]);
  };

  return (
    <div {...otherProps} ref={ref} className={cls}>
      {items.map((item) => (
        <CollapsePanel
          key={item.key}
          prefixCls={prefixCls}
          item={item}
          active={activeValue.includes(item.key)}
          disabled={disabled}
          collapsible={item.collapsible ?? collapsible}
          showArrow={showArrow}
          expandIcon={expandIcon}
          expandIconPosition={expandIconPosition}
          forceRender={item.forceRender ?? forceRender}
          destroyOnHidden={item.destroyOnHidden ?? destroyOnHidden}
          itemClassName={itemClassName}
          itemStyle={itemStyle}
          headerClassName={headerClassName}
          bodyClassName={bodyClassName}
          onItemClick={onItemClick}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
