import { Button, Divider, Flex, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function SectionHeaderSimple() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="start">
        <div>
          <Heading level={4} style={{ margin: 0 }}>Team Members</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
            Manage the members of your organization and their roles.
          </Text>
        </div>
        <Button btnType="primary">Add Member</Button>
      </Flex>
      <Divider />

      <Flex justify="space-between" align="start" style={{ marginTop: 32 }}>
        <div>
          <Heading level={4} style={{ margin: 0 }}>Billing</Heading>
          <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
            Manage your billing information and view invoices.
          </Text>
        </div>
        <Flex gap="sm">
          <Button btnType="outline">View Invoices</Button>
          <Button btnType="primary">Upgrade Plan</Button>
        </Flex>
      </Flex>
      <Divider />
    </div>
  );
}
