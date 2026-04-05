import Input from './input';
import InputGroup from './input-group';
import InputGroupAddon from './input-group-addon';

type IInput = typeof Input & {
  Group: typeof InputGroup;
  Addon: typeof InputGroupAddon;
};

const DefaultInput = Input as IInput;
DefaultInput.Group = InputGroup;
DefaultInput.Addon = InputGroupAddon;

export default DefaultInput;
export type * from './types';
