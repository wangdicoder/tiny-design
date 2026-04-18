import Split from './split';
import SplitPane from './split-pane';

export type * from './types';

type SplitComponent = typeof Split & {
  Pane: typeof SplitPane;
};

const DefaultSplit = Split as SplitComponent;
DefaultSplit.Pane = SplitPane;

export default DefaultSplit;
