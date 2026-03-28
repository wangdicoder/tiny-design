import { Button, Card, Divider, Flex, Steps, Typography } from '@tiny-design/react';

const { Heading } = Typography;

export default function StepsBasic() {
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Heading level={5} style={{ marginBottom: 24 }}>Create New Project</Heading>
        <Steps current={1}>
          <Steps.Step title="Project Info" description="Name and description" />
          <Steps.Step title="Configuration" description="Settings and preferences" />
          <Steps.Step title="Team" description="Invite members" />
          <Steps.Step title="Review" description="Confirm and create" />
        </Steps>
        <Divider />
        <Flex justify="space-between">
          <Button btnType="outline">Previous</Button>
          <Button btnType="primary">Next Step</Button>
        </Flex>
      </Card>
    </div>
  );
}
