import QuickActionsRoot from './quick-actions';
import QuickActionsAction from './quick-actions-action';

type IQuickActions = typeof QuickActionsRoot & {
  Action: typeof QuickActionsAction;
};

const QuickActions = QuickActionsRoot as IQuickActions;
QuickActions.Action = QuickActionsAction;

export default QuickActions;
export type * from './types';
