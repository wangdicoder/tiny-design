import { Divider, Pagination, Typography } from '@tiny-design/react';

const { Heading } = Typography;

export default function PaginationVariants() {
  return (
    <div style={{ padding: 24 }}>
      <Heading level={5}>Default</Heading>
      <Pagination total={100} />

      <Divider />

      <Heading level={5}>Small size</Heading>
      <Pagination total={50} size="sm" />

      <Divider />

      <Heading level={5}>Centered</Heading>
      <Pagination total={200} align="center" />

      <Divider />

      <Heading level={5}>Right aligned</Heading>
      <Pagination total={100} align="right" />
    </div>
  );
}
