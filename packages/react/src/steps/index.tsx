import Steps from './steps';
import StepsItem from './steps-item';

type ISteps = typeof Steps & {
  Step: typeof StepsItem;
};

const DefaultSteps = Steps as ISteps;
DefaultSteps.Step = StepsItem;

export default DefaultSteps;
export type * from './types';
