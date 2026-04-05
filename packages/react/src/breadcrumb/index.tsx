import Breadcrumb from './breadcrumb';
import BreadcrumbItem from './breadcrumb-item';

type IBreadcrumb = typeof Breadcrumb & {
  Item: typeof BreadcrumbItem;
};

const DefaultBreadcrumb = Breadcrumb as IBreadcrumb;
DefaultBreadcrumb.Item = BreadcrumbItem;

export default DefaultBreadcrumb;
export type * from './types';
