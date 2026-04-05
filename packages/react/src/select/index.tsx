import Select from './select';
import SelectOption from './option';
import SelectOptGroup from './opt-group';

type ISelect = typeof Select & {
  Option: typeof SelectOption;
  OptGroup: typeof SelectOptGroup;
};

const DefaultSelect = Select as ISelect;
DefaultSelect.Option = SelectOption;
DefaultSelect.OptGroup = SelectOptGroup;

export default DefaultSelect;
export type * from './types';
