import Anchor from './anchor';
import AnchorLink from './anchor-link';

type IAnchor = typeof Anchor & {
  Link: typeof AnchorLink;
};

const DefaultAnchor = Anchor as IAnchor;
DefaultAnchor.Link = AnchorLink;

export default DefaultAnchor;
export type * from './types';
