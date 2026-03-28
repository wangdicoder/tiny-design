import { Button, Card, Divider, Flex, Steps, Tag, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function StepsBasic() {
  return (
    <div style={{ padding: 24 }}>
      <Card variant="elevated" style={{ borderRadius: 14 }}>
        <div style={{ padding: 16 }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
          <div>
            <Flex align="center" gap="sm">
              <Heading level={4} style={{ margin: 0 }}>Create New Project</Heading>
              <Tag variant="soft" color="blue" style={{ borderRadius: 20, fontWeight: 600, fontSize: 11 }}>Step 2 of 4</Tag>
            </Flex>
            <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13, marginTop: 4, display: 'block' }}>
              Configure your project settings and preferences
            </Text>
          </div>
        </Flex>

        <Steps current={1}>
          <Steps.Step title="Project Info" description="Name and description" />
          <Steps.Step title="Configuration" description="Settings and preferences" />
          <Steps.Step title="Team" description="Invite members" />
          <Steps.Step title="Review" description="Confirm and create" />
        </Steps>

        <Card style={{ borderRadius: 12, marginTop: 24, background: 'var(--ty-color-bg-layout)' }}>
          <div style={{ padding: 16 }}>
            <Heading level={5} style={{ margin: 0 }}>Configuration</Heading>
            <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13, display: 'block', marginTop: 4 }}>
              Choose the framework, deployment target, and build options for your project.
            </Text>
            <Flex gap="sm" style={{ marginTop: 16 }}>
              {['React', 'Vercel', 'TypeScript'].map((item) => (
                <Tag key={item} variant="soft" color="purple" style={{ borderRadius: 20 }}>{item}</Tag>
              ))}
            </Flex>
          </div>
        </Card>

        <Divider />

        <Flex justify="space-between">
          <Button btnType="outline" style={{ borderRadius: 8, height: 40, paddingLeft: 20, paddingRight: 20 }}>
            Previous
          </Button>
          <Flex gap="sm">
            <Button btnType="ghost" style={{ borderRadius: 8, height: 40 }}>Save Draft</Button>
            <Button btnType="primary" style={{
              borderRadius: 8,
              height: 40,
              paddingLeft: 24,
              paddingRight: 24,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
            }}>
              Next Step
            </Button>
          </Flex>
        </Flex>
        </div>
      </Card>
    </div>
  );
}
