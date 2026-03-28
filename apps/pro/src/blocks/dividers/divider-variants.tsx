import { Divider, Flex, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function DividerVariants() {
  return (
    <div style={{ padding: 24 }}>
      <Heading level={5}>Horizontal dividers</Heading>
      <Text>Section above the divider</Text>
      <Divider />
      <Text>Default divider above</Text>
      <Divider>With Text</Divider>
      <Text>Divider with centered text above</Text>
      <Divider align="left">Left Text</Divider>
      <Text>Divider with left-aligned text above</Text>
      <Divider align="right">Right Text</Divider>
      <Text>Divider with right-aligned text above</Text>
      <Divider dashed>Dashed</Divider>
      <Text>Dashed divider above</Text>

      <Heading level={5} style={{ marginTop: 32 }}>Vertical dividers</Heading>
      <Flex align="center">
        <a href="#">Home</a>
        <Divider type="vertical" />
        <a href="#">Products</a>
        <Divider type="vertical" />
        <a href="#">About</a>
        <Divider type="vertical" />
        <a href="#">Contact</a>
      </Flex>
    </div>
  );
}
