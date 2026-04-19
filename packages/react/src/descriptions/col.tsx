import React from 'react';
import classNames from 'classnames';
import { DescriptionsItemProps } from './types';

type Props = {
  index: number;
  bordered: boolean;
  colon: boolean;
  type: 'label' | 'content' | 'item';
  prefixCls: string;
  item: React.ReactElement<DescriptionsItemProps>;
};

const Col = (props: Props): React.ReactElement => {
  const { item, colon, type, bordered, prefixCls } = props;

  const { label, children, span = 1 } = item.props;
  const resolvedSpan = typeof span === 'number' ? span : 1;
  switch (type) {
    case 'item': {
      const labelCls = classNames(`${prefixCls}__item-label`, {
        [`${prefixCls}__item_colon`]: colon,
      });
      if (bordered) {
        return (
          <>
            <th className={labelCls} colSpan={1}>
              {label}
            </th>
            <td className={`${prefixCls}__item-content`} colSpan={resolvedSpan * 2 - 1}>
              {children}
            </td>
          </>
        );
      } else {
        return (
          <td className={`${prefixCls}__item`} colSpan={resolvedSpan}>
            <span className={labelCls}>{label}</span>
            <span className={`${prefixCls}__item-content`}>{children}</span>
          </td>
        );
      }
    }
    case 'label': {
      const cls = classNames(
        { [`${prefixCls}__item`]: !bordered, [`${prefixCls}__item_colon`]: colon },
        `${prefixCls}__item-label`
      );
      return (
        <th className={cls} colSpan={resolvedSpan}>
          {label}
        </th>
      );
    }
    case 'content': {
      const cls = classNames({ [`${prefixCls}__item`]: !bordered }, `${prefixCls}__item-content`);
      return (
        <td className={cls} colSpan={resolvedSpan}>
          {children}
        </td>
      );
    }
  }
};

export default Col;
