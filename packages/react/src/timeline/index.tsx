import Timeline from './timeline';
import TimelineItem from './timeline-item';

type ITimeline = typeof Timeline & {
  Item: typeof TimelineItem;
};

const DefaultTimeline = Timeline as ITimeline;
DefaultTimeline.Item = TimelineItem;

export default DefaultTimeline;
export type * from './types';
