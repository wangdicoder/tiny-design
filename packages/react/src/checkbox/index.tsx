import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';

type ICheckbox = typeof Checkbox & {
  Group: typeof CheckboxGroup;
};

const DefaultCheckbox = Checkbox as ICheckbox;
DefaultCheckbox.Group = CheckboxGroup;

export default DefaultCheckbox;
export type * from './types';
