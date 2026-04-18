import React from 'react';
import { Button, Flex, Image, Skeleton } from '@tiny-design/react';

export default function PlaceholderDemo() {
  const [requestId, setRequestId] = React.useState(0);
  const [src, setSrc] = React.useState<string>();
  const [isReloading, setIsReloading] = React.useState(true);

  React.useEffect(() => {
    setIsReloading(true);
    setSrc(undefined);

    const timer = window.setTimeout(() => {
      setSrc(
        `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80&reload=${requestId}`
      );
      setIsReloading(false);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [requestId]);

  return (
    <Flex vertical gap={12}>
      <Flex justify="space-between" align="center" gap={12}>
        <div style={{ fontSize: 12, color: '#64748b' }}>Replay the loading state to inspect the custom placeholder.</div>
        <Button size="sm" onClick={() => setRequestId((id) => id + 1)}>
          {isReloading ? 'Loading...' : 'Reload'}
        </Button>
      </Flex>
      <Image
        key={requestId}
        width={320}
        height={180}
        src={src}
        alt="Mountain lake"
        placeholder={<Skeleton active style={{ width: '100%', height: '100%' }} />}
      />
    </Flex>
  );
}
