import React, { ChangeEvent, ReactNode, useContext, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/config-context';
import { getPrefixCls } from '../_utils/general';
import { BaseProps } from '../_utils/props';
import { TransferItem } from './types';
import Checkbox from '../checkbox/checkbox';
import CheckboxGroup from '../checkbox/checkbox-group';
import Empty from '../empty';
import Input from '../input/input';

export interface TransferPanelProps
  extends BaseProps,
    Omit<React.PropsWithRef<JSX.IntrinsicElements['div']>, 'title' | 'onChange'> {
  dataSource: TransferItem[];
  checkedKeys: string[];
  onChange: (checkedKeys: string[]) => void;
  disabled: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  placeholder?: string;
  showSearch?: boolean;
  renderItem?: (item: TransferItem) => ReactNode;
  filterOption?: (input: string, item: TransferItem) => boolean;
}

const TransferPanel = React.forwardRef<HTMLDivElement, TransferPanelProps>(
  (props: TransferPanelProps, ref): React.ReactElement => {
    const {
      dataSource,
      checkedKeys,
      title,
      placeholder,
      footer,
      showSearch,
      className,
      onChange,
      renderItem,
      filterOption,
      disabled: allDisabled,
      prefixCls: customisedCls,
      ...otherProps
    } = props;
    const configContext = useContext(ConfigContext);
    const prefixCls = getPrefixCls('transfer-panel', configContext.prefixCls, customisedCls);
    const cls = classNames(prefixCls, className);
    const [query, setQuery] = useState('');

    const getFilteredData = (): TransferItem[] => {
      return dataSource.filter((item) => {
        if (typeof filterOption === 'function') {
          return filterOption(query, item);
        } else if (query.trim().length > 0) {
          const label = item.label;
          return label.toLowerCase().includes(query.toLowerCase());
        } else {
          return true;
        }
      });
    };

    const filteredData = getFilteredData();
    const checkableData = filteredData.filter((item) => !item.disabled);
    const filteredKeySet = new Set(filteredData.map((item) => item.key));
    const filteredCheckedKeys = checkedKeys.filter((key) => filteredKeySet.has(key));
    const hiddenCheckedKeys = checkedKeys.filter((key) => !filteredKeySet.has(key));
    const disabledFilteredCheckedKeys = filteredData
      .filter((item) => item.disabled && checkedKeys.includes(item.key))
      .map((item) => item.key);
    const selectableFilteredCheckedKeys = filteredCheckedKeys.filter(
      (key) => !disabledFilteredCheckedKeys.includes(key)
    );
    const isAllChecked =
      checkableData.length > 0 && selectableFilteredCheckedKeys.length === checkableData.length;
    const isIndeterminate =
      selectableFilteredCheckedKeys.length > 0 && selectableFilteredCheckedKeys.length < checkableData.length;

    /**
     * Footer checkbox onChange event
     */
    const handleAllCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.currentTarget.checked;
      const nextCheckedKeys = isChecked
        ? [...hiddenCheckedKeys, ...disabledFilteredCheckedKeys, ...checkableData.map((item) => item.key)]
        : [...hiddenCheckedKeys, ...disabledFilteredCheckedKeys];
      onChange(nextCheckedKeys);
    };

    const checkedSummary = (): string => {
      if (isIndeterminate || isAllChecked) {
        return `${filteredCheckedKeys.length} / ${filteredData.length} checked`;
      }
      return `${filteredData.length} items`;
    };

    return (
      <div {...otherProps} className={cls} ref={ref}>
        {title && <div className={`${prefixCls}__header`}>{title}</div>}
        <div className={`${prefixCls}__body`}>
          {showSearch && (
            <div className={`${prefixCls}__input-container`}>
              <Input
                clearable
                size="sm"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                onClearClick={() => setQuery('')}
              />
            </div>
          )}
          <div className={`${prefixCls}__list-container`}>
            {filteredData.length > 0 ? (
              <CheckboxGroup
                value={filteredCheckedKeys}
                onChange={(values) => onChange([...hiddenCheckedKeys, ...disabledFilteredCheckedKeys, ...values])}
                className={`${prefixCls}__list`}>
                {filteredData.map((item) => {
                  const { key, label, disabled } = item;
                  return (
                    <Checkbox
                      key={key}
                      value={key}
                      disabled={allDisabled || disabled}
                      className={`${prefixCls}__list-item`}>
                      {renderItem ? renderItem(item) : label}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            ) : (
              <Empty className={`${prefixCls}__not-found`} />
            )}
          </div>
        </div>
        <div className={`${prefixCls}__footer`}>
          <Checkbox
            disabled={allDisabled}
            checked={isAllChecked}
            onChange={handleAllCheckedChange}
            indeterminate={isIndeterminate}>
            {checkedSummary()}
          </Checkbox>
          {footer}
        </div>
      </div>
    );
  }
);

TransferPanel.displayName = 'TransferPanel';

export default TransferPanel;
