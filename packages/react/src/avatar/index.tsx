import Avatar from './avatar';
import AvatarGroup from './avatar-group';

type IAvatar = typeof Avatar & {
  Group: typeof AvatarGroup;
};

const DefaultAvatar = Avatar as IAvatar;
DefaultAvatar.Group = AvatarGroup;

export default DefaultAvatar;
export type * from './types';
