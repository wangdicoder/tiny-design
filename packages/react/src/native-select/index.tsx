import NativeSelect from './native-select';
import NativeOption from './native-option';
import NativeOptGroup from './native-opt-group';

type ISelect = typeof NativeSelect & {
  Option: typeof NativeOption;
  OptGroup: typeof NativeOptGroup;
};

const DefaultSelect = NativeSelect as ISelect;
DefaultSelect.Option = NativeOption;
DefaultSelect.OptGroup = NativeOptGroup;

export default DefaultSelect;
export type * from './types';
