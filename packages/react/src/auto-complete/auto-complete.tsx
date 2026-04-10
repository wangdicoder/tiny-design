import React, { useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';
import { useCombobox } from '../_utils/useCombobox';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { AutoCompleteOption, AutoCompleteProps } from './types';
import Input from '../input/input';
import Popup from '../popup';

const AutoComplete = React.forwardRef<HTMLDivElement, AutoCompleteProps>(
  (props, ref) => {
    const {
      options = [],
      defaultValue = '',
      placeholder,
      disabled = false,
      allowClear = false,
      defaultActiveFirstOption = true,
      defaultOpen = false,
      notFoundContent,
      size,
      filterOption = true,
      onChange,
      onSelect,
      onOpenChange,
      onSearch,
      onFocus,
      onBlur,
      className,
      style,
      prefixCls: customisedCls,
    } = props;

    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('auto-complete', configContext.prefixCls, customisedCls);
    const autoCompleteSize = size || configContext.componentSize || 'md';

    const [inputValue, setInputValue] = useState(
      'value' in props ? (props.value as string) : defaultValue
    );

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxId = useId();

    const handleOptionSelect = useCallback(
      (opt: AutoCompleteOption) => {
        if (opt.disabled) return;
        if (!('value' in props)) setInputValue(opt.value);
        onChange?.(opt.value);
        onSelect?.(opt.value, opt);
        combo.closeDropdown();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onChange, onSelect, props]
    );

    const combo = useCombobox<AutoCompleteOption>({
      items: options,
      searchValue: inputValue,
      filterOption,
      isOpen: 'open' in props ? (props.open as boolean) : undefined,
      defaultOpen,
      disabled,
      defaultActiveFirstOption,
      onOpenChange,
      onSelect: handleOptionSelect,
    });

    // Merge refs
    const setWrapperRef = useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const cls = classNames(prefixCls, className, {
      [`${prefixCls}_disabled`]: disabled,
      [`${prefixCls}_open`]: combo.isOpen,
    });

    // Controlled value
    useEffect(() => {
      if ('value' in props) setInputValue(props.value as string);
    }, [props.value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!('value' in props)) setInputValue(val);
      onChange?.(val);
      onSearch?.(val);
      combo.openDropdown();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      combo.openDropdown();
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const handleClear = () => {
      if (!('value' in props)) setInputValue('');
      onChange?.('');
      onSearch?.('');
    };

    const renderDropdown = () => {
      if (combo.filteredItems.length === 0) {
        if (notFoundContent) {
          return (
            <li className={`${prefixCls}__empty`} role="option" aria-disabled="true">
              {notFoundContent}
            </li>
          );
        }
        return null;
      }

      return combo.filteredItems.map((opt, index) => {
        const optCls = classNames(`${prefixCls}-option`, {
          [`${prefixCls}-option_active`]: index === combo.focusedIndex,
          [`${prefixCls}-option_disabled`]: opt.disabled,
        });
        return (
          <li
            key={opt.value}
            id={`${listboxId}-option-${index}`}
            role="option"
            className={optCls}
            aria-selected={index === combo.focusedIndex}
            aria-disabled={opt.disabled}
            onClick={() => handleOptionSelect(opt)}
            onMouseEnter={() => combo.setFocusedIndex(index)}>
            {opt.label ?? opt.value}
          </li>
        );
      });
    };

    const dropdownContent = renderDropdown();
    const showDropdown = combo.isOpen && dropdownContent !== null;

    const renderOverlay = () => {
      const selectorWidth = wrapperRef.current?.offsetWidth;
      return (
        <ul
          className={`${prefixCls}__dropdown`}
          style={{ minWidth: selectorWidth || undefined }}
          id={listboxId}
          role="listbox">
          {dropdownContent}
        </ul>
      );
    };

    return (
      <div
        ref={setWrapperRef}
        className={cls}
        style={style}
        onKeyDown={combo.handleKeyDown}>
        <Popup
          trigger="manual"
          placement="bottom"
          arrow={false}
          visible={showDropdown}
          onVisibleChange={(nextOpen) => {
            if (nextOpen) {
              combo.openDropdown();
              return;
            }

            combo.closeDropdown();
          }}
          content={renderOverlay()}>
          <Input
            ref={inputRef}
            size={autoCompleteSize}
            placeholder={placeholder}
            disabled={disabled}
            value={inputValue}
            role="combobox"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-controls={showDropdown ? listboxId : undefined}
            aria-activedescendant={
              showDropdown && combo.focusedIndex >= 0
                ? `${listboxId}-option-${combo.focusedIndex}`
                : undefined
            }
            clearable={allowClear}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClearClick={handleClear}
          />
        </Popup>
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;
