import { FlipItemProps } from './types';
import { FLIP_ITEM_MARK, markComponent } from '../_utils/component-markers';

const FlipItem = (props: FlipItemProps): JSX.Element => {
  const { className, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={className}>
      {children}
    </div>
  );
};

FlipItem.displayName = 'FlipItem';
markComponent(FlipItem, FLIP_ITEM_MARK);

export default FlipItem;
