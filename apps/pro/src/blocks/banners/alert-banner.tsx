import { Alert, Flex } from '@tiny-design/react';

export default function AlertBanner() {
  return (
    <Flex vertical gap="sm" style={{ padding: 16 }}>
      <Alert type="info" closable title="A new software update is available. Update for bug fixes and performance improvements." />
      <Alert type="success" closable title="Payment successful! Your payment of $29.99 has been processed." />
      <Alert type="warning" closable title="Your trial expires in 3 days. Upgrade now to keep access to all features." />
      <Alert type="error" closable title="Unable to connect to server. Please check your network connection and try again." />
    </Flex>
  );
}
