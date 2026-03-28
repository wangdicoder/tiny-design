import { Card, Tabs, Typography } from '@tiny-design/react';

const { Heading, Text } = Typography;

export default function TabsWithContent() {
  return (
    <div style={{ padding: 24 }}>
      <Card variant="elevated">
        <Tabs defaultActiveKey="profile">
          <Tabs.Panel tab="Profile" tabKey="profile">
            <div style={{ padding: '16px 0' }}>
              <Heading level={5}>Profile Settings</Heading>
              <Text>Update your photo and personal details here.</Text>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tab="Account" tabKey="account">
            <div style={{ padding: '16px 0' }}>
              <Heading level={5}>Account Settings</Heading>
              <Text>Manage your account preferences and security.</Text>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tab="Notifications" tabKey="notifications">
            <div style={{ padding: '16px 0' }}>
              <Heading level={5}>Notification Preferences</Heading>
              <Text>Choose how and when you want to be notified.</Text>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tab="Billing" tabKey="billing">
            <div style={{ padding: '16px 0' }}>
              <Heading level={5}>Billing Information</Heading>
              <Text>View your invoices and manage your payment methods.</Text>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
