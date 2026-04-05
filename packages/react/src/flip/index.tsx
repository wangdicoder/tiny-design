import Flip from './flip';
import FlipItem from './flip-item';

type IFlip = typeof Flip & {
  Item: typeof FlipItem;
};

const DefaultFlip = Flip as IFlip;
DefaultFlip.Item = FlipItem;

export default DefaultFlip;
export type * from './types';
