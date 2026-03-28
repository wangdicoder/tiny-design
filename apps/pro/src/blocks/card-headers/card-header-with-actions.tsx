import { Button, Card, Flex, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function CardHeaderWithActions() {
  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Team Members"
        extra={
          <Flex gap="sm">
            <Button size="sm" btnType="outline">Export</Button>
            <Button size="sm" btnType="primary">Invite</Button>
          </Flex>
        }
      >
        <Text>Manage your team members and their roles.</Text>
      </Card>
    </div>
  );
}
