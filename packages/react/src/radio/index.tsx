import Radio from './radio';
import RadioGroup from './radio-group';

type IRadio = typeof Radio & {
  Group: typeof RadioGroup;
};

const DefaultRadio = Radio as IRadio;
DefaultRadio.Group = RadioGroup;

export default DefaultRadio;
export type * from './types';
