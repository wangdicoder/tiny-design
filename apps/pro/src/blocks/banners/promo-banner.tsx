import { Alert, Button, Flex, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function PromoBanner() {
  return (
    <Alert
      type="info"
      closable
      title={
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Text>
            Tiny Design v2.0 is here! Check out the new features and improvements.
          </Text>
          <Button size="sm" btnType="primary" style={{ flexShrink: 0, marginLeft: 16 }}>
            Learn more
          </Button>
        </Flex>
      }
    />
  );
}
