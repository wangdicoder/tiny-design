import SpeedDial from './speed-dial';
import SpeedDialAction from './speed-dial-action';

type ISpeedDial = typeof SpeedDial & {
  Action: typeof SpeedDialAction;
};

const DefaultSpeedDial = SpeedDial as ISpeedDial;
DefaultSpeedDial.Action = SpeedDialAction;

export default DefaultSpeedDial;
export type * from './types';
