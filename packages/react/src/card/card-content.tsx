import React from 'react';
import { CARD_CONTENT_MARK, markComponent } from '../_utils/component-markers';
import { CardContentProps } from './types';

const CardContent = (props: CardContentProps): React.ReactElement => {
  const { prefixCls, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={`${prefixCls}__body`}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContent';
markComponent(CardContent, CARD_CONTENT_MARK);

export default CardContent;
