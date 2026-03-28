import { Button, Flex, Tag, Typography } from '@tiny-design/react';
import { IconFire } from '@tiny-design/icons';

const { Text } = Typography;

export default function PromoBanner() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #312e81, #6d28d9, #a855f7)',
      padding: '14px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -30,
        left: '30%',
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />
      <Flex align="center" justify="center" gap="md" style={{ position: 'relative' }}>
        <Tag color="orange" variant="filled" style={{ borderRadius: 20, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Flex align="center" gap="sm">
            <IconFire style={{ fontSize: 12 }} />
            <span>New</span>
          </Flex>
        </Tag>
        <Text style={{ color: '#fff', fontWeight: 500 }}>
          Tiny Design v2.0 is here — redesigned components, dark mode, and 40+ new blocks.
        </Text>
        <Button size="sm" style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          borderRadius: 8,
          fontWeight: 600,
          backdropFilter: 'blur(8px)',
          flexShrink: 0,
        }}>
          Explore now
        </Button>
      </Flex>
    </div>
  );
}
