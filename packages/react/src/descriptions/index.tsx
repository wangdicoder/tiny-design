import Descriptions from './descriptions';
import DescriptionsItem from './descriptions-item';

type IDesc = typeof Descriptions & {
  Item: typeof DescriptionsItem;
};

const DefaultDesc = Descriptions as IDesc;
DefaultDesc.Item = DescriptionsItem;

export default DefaultDesc;
export type * from './types';
