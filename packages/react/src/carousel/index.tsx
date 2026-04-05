import Carousel from './carousel';
import CarouselItem from './carousel-item';

export type * from './types';
export type { CarouselItemProps } from './carousel-item';

type ICarousel = typeof Carousel & {
  Item: typeof CarouselItem;
};

const DefaultCarousel = Carousel as unknown as ICarousel;
DefaultCarousel.Item = CarouselItem;

export default DefaultCarousel;
