import Tag from './tag';
import CheckableTag from './checkable-tag';

type ITag = typeof Tag & {
  CheckableTag: typeof CheckableTag;
};

const DefaultTag = Tag as ITag;
DefaultTag.CheckableTag = CheckableTag;

export default DefaultTag;
export type * from './types';
