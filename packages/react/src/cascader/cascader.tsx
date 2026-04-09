import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { ArrowDown } from '../_utils/components';
import Popup from '../popup';
import { CascaderProps, CascaderOption, CascaderValue } from './types';

const getOptionsByValue = (
  options: CascaderOption[],
  value: CascaderValue
): CascaderOption[] => {
  const result: CascaderOption[] = [];
  let current = options;
  for (const v of value) {
    const found = current.find((opt) => opt.value === v);
    if (!found) break;
    result.push(found);
    current = found.children ?? [];
  }
  return result;
};

const Cascader = React.forwardRef<HTMLDivElement, CascaderProps>((props, ref) => {
  const {
    options,
    defaultValue,
    placeholder = 'Please select',
    disabled = false,
    allowClear = true,
    size,
    expandTrigger = 'click',
    displayRender,
    changeOnSelect = false,
    notFoundContent = 'No Data',
    prefixCls: customisedCls,
    className,
    style,
    onChange,
    onDropdownVisibleChange,
    ...otherProps
  } = props;

  const configContext = useContext(ConfigContext);
  const prefixCls = getPrefixCls('cascader', configContext.prefixCls, customisedCls);
  const cascaderSize = size || configContext.componentSize || 'md';
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<CascaderValue>(
    'value' in props ? (props.value ?? []) : (defaultValue ?? [])
  );
  const [activeColumns, setActiveColumns] = useState<CascaderOption[][]>([options]);
  const [hoveredPath, setHoveredPath] = useState<CascaderValue>([]);

  useEffect(() => {
    if ('value' in props) {
      setSelectedValue(props.value ?? []);
    }
  }, [props.value]);

  useEffect(() => {
    if ('open' in props) {
      setOpen(props.open as boolean);
    }
  }, [props.open]);

  // Build columns from selected value on mount
  useEffect(() => {
    const cols: CascaderOption[][] = [options];
    let current = options;
    const path = selectedValue.length > 0 ? selectedValue : hoveredPath;
    for (const v of path) {
      const found = current.find((opt) => opt.value === v);
      if (found?.children?.length) {
        cols.push(found.children);
        current = found.children;
      } else {
        break;
      }
    }
    setActiveColumns(cols);
  }, [options, selectedValue]);

  const setDropdownOpen = useCallback((nextOpen: boolean) => {
    if (!('open' in props)) {
      setOpen(nextOpen);
    }
    onDropdownVisibleChange?.(nextOpen);
    if (!nextOpen) {
      setHoveredPath([]);
    }
  }, [onDropdownVisibleChange, props]);

  const toggleOpen = () => {
    if (disabled) return;
    const next = !open;
    setDropdownOpen(next);
  };

  const handleOptionSelect = (option: CascaderOption, level: number) => {
    if (option.disabled) return;

    const newPath = [...hoveredPath.slice(0, level), option.value];
    setHoveredPath(newPath);

    // Update columns
    const cols = activeColumns.slice(0, level + 1);
    if (option.children?.length) {
      cols.push(option.children);
    }
    setActiveColumns(cols);

    // If leaf node or changeOnSelect
    const isLeaf = option.isLeaf !== undefined ? option.isLeaf : !option.children?.length;
    if (isLeaf || changeOnSelect) {
      if (!('value' in props)) {
        setSelectedValue(newPath);
      }
      const selectedOptions = getOptionsByValue(options, newPath);
      onChange?.(newPath, selectedOptions);
      if (isLeaf) {
        setDropdownOpen(false);
      }
    }
  };

  const handleOptionHover = (option: CascaderOption, level: number) => {
    if (expandTrigger !== 'hover' || option.disabled) return;
    const newPath = [...hoveredPath.slice(0, level), option.value];
    setHoveredPath(newPath);

    const cols = activeColumns.slice(0, level + 1);
    if (option.children?.length) {
      cols.push(option.children);
    }
    setActiveColumns(cols);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('value' in props)) {
      setSelectedValue([]);
    }
    onChange?.([], []);
    setActiveColumns([options]);
    setHoveredPath([]);
  };

  const selectedOptions = useMemo(
    () => getOptionsByValue(options, selectedValue),
    [options, selectedValue]
  );

  const labels = selectedOptions.map((opt) => opt.label);

  const displayText = useMemo(() => {
    if (selectedValue.length === 0) return '';
    if (displayRender) return displayRender(labels, selectedOptions);
    return labels.join(' / ');
  }, [selectedValue, selectedOptions, displayRender]);

  const cls = classNames(prefixCls, className, {
    [`${prefixCls}_${cascaderSize}`]: cascaderSize,
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_open`]: open,
  });

  const dropdown = open
    ? (
        <div className={`${prefixCls}__dropdown`}>
          <div className={`${prefixCls}__menus`}>
            {activeColumns.map((columnOptions, level) => (
              <ul key={level} className={`${prefixCls}__menu`} role="listbox">
                {columnOptions.length === 0 ? (
                  <li className={`${prefixCls}__menu-empty`}>{notFoundContent}</li>
                ) : (
                  columnOptions.map((option) => {
                    const isActive =
                      (selectedValue[level] === option.value) ||
                      (hoveredPath[level] === option.value);
                    const hasChildren = !!(option.children?.length);
                    const itemCls = classNames(`${prefixCls}__menu-item`, {
                      [`${prefixCls}__menu-item_active`]: isActive,
                      [`${prefixCls}__menu-item_disabled`]: option.disabled,
                    });
                    return (
                      <li
                        key={option.value}
                        className={itemCls}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => handleOptionSelect(option, level)}
                        onMouseEnter={() => handleOptionHover(option, level)}
                      >
                        <span className={`${prefixCls}__menu-item-label`}>{option.label}</span>
                        {hasChildren && (
                          <span className={`${prefixCls}__menu-item-arrow`}>›</span>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            ))}
          </div>
        </div>
    )
    : null;

  return (
    <div {...otherProps} ref={wrapperRef} className={cls} style={style}>
      <Popup
        trigger="manual"
        placement="bottom-start"
        arrow={false}
        visible={open}
        onVisibleChange={setDropdownOpen}
        content={dropdown}
      >
        <div className={`${prefixCls}__selector`} onClick={toggleOpen}>
          {displayText ? (
            <span className={`${prefixCls}__display`}>{displayText}</span>
          ) : (
            <span className={`${prefixCls}__placeholder`}>{placeholder}</span>
          )}
          {allowClear && selectedValue.length > 0 && (
            <span className={`${prefixCls}__clear`} onClick={handleClear}>
              ✕
            </span>
          )}
          <span className={`${prefixCls}__arrow`}><ArrowDown size={10} /></span>
        </div>
      </Popup>
    </div>
  );
});

Cascader.displayName = 'Cascader';
export default Cascader;
