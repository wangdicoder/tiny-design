import Button from './button';
import ButtonGroup from './button-group';

type IButton = typeof Button & {
  Group: typeof ButtonGroup;
};

const DefaultButton = Button as IButton;
DefaultButton.Group = ButtonGroup;

export default DefaultButton;
export type * from './types';
