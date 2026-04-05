import Card from './card';
import CardContent from './card-content';

type ICard = typeof Card & {
  Content: typeof CardContent;
};

const DefaultCard = Card as ICard;
DefaultCard.Content = CardContent;

export default DefaultCard;
export type * from './types';
