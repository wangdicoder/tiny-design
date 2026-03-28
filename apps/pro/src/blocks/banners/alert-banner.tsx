import { Alert, Button, Flex, Typography } from '@tiny-design/react';

const { Text } = Typography;

export default function AlertBanner() {
  return (
    <Flex vertical gap="md" style={{ padding: 24 }}>
      <Alert
        type="success"
        closable
        title={
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Flex align="center" gap="sm">
              <Text style={{ fontWeight: 600 }}>Deployment successful!</Text>
              <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
                Your app is live at production — all 24 checks passed.
              </Text>
            </Flex>
            <Button size="sm" btnType="link" style={{ flexShrink: 0 }}>View logs</Button>
          </Flex>
        }
      />

      <Alert
        type="info"
        closable
        title={
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Flex align="center" gap="sm">
              <Text style={{ fontWeight: 600 }}>Scheduled maintenance</Text>
              <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
                Systems will be briefly unavailable on March 30 from 2–4 AM UTC.
              </Text>
            </Flex>
            <Button size="sm" btnType="link" style={{ flexShrink: 0 }}>Learn more</Button>
          </Flex>
        }
      />

      <Alert
        type="warning"
        closable
        title={
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Flex align="center" gap="sm">
              <Text style={{ fontWeight: 600 }}>Usage limit approaching</Text>
              <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
                You've used 89% of your monthly API quota. Upgrade to avoid interruption.
              </Text>
            </Flex>
            <Button size="sm" btnType="primary" style={{ flexShrink: 0 }}>Upgrade plan</Button>
          </Flex>
        }
      />

      <Alert
        type="error"
        closable
        title={
          <Flex align="center" justify="space-between" style={{ width: '100%' }}>
            <Flex align="center" gap="sm">
              <Text style={{ fontWeight: 600 }}>Payment failed</Text>
              <Text style={{ color: 'var(--ty-color-text-secondary)' }}>
                We couldn't charge your card ending in 4242. Please update your billing info.
              </Text>
            </Flex>
            <Button size="sm" btnType="link" style={{ flexShrink: 0 }}>Update card</Button>
          </Flex>
        }
      />
    </Flex>
  );
}
