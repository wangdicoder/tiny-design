import { Alert, Flex, Tag, Typography } from '@tiny-design/react';
import {
  IconCheckCircle,
  IconCalendar,
  IconWarning,
  IconCreditCard,
  IconArrowRight,
} from '@tiny-design/icons';

const { Text } = Typography;

const iconBox = (gradient: string, shadow: string): React.CSSProperties => ({
  width: 36,
  height: 36,
  borderRadius: 10,
  marginRight: 12,
  background: gradient,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 3px 10px ${shadow}`,
  flexShrink: 0,
});

const linkStyle = (color: string): React.CSSProperties => ({
  color,
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 3,
  textDecoration: 'none',
});

export default function AlertBanner() {
  return (
    <Flex vertical gap="md" style={{ padding: 24 }}>
      <Alert
        type="success"
        closable
        icon={
          <span style={iconBox('linear-gradient(135deg, #059669, #34d399)', 'rgba(5,150,105,0.3)')}>
            <IconCheckCircle style={{ fontSize: 18, color: '#fff' }} />
          </span>
        }
        title={
          <Flex align="center" gap="sm">
            <Text style={{ fontWeight: 700, fontSize: 14 }}>Deployment successful</Text>
            <Tag color="green" variant="soft" style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Live
            </Tag>
          </Flex>
        }
      >
        <Flex align="center" gap="sm" wrap="wrap">
          <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>
            All 24 checks passed — your app is now live at production.
          </Text>
          <a style={linkStyle('#059669')}>
            View logs <IconArrowRight style={{ fontSize: 11 }} />
          </a>
        </Flex>
      </Alert>

      <Alert
        type="info"
        closable
        icon={
          <span style={iconBox('linear-gradient(135deg, #2563eb, #60a5fa)', 'rgba(37,99,235,0.3)')}>
            <IconCalendar style={{ fontSize: 18, color: '#fff' }} />
          </span>
        }
        title={
          <Text style={{ fontWeight: 700, fontSize: 14 }}>Scheduled maintenance</Text>
        }
      >
        <Flex align="center" gap="sm" wrap="wrap">
          <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>
            Systems will be briefly unavailable on March 30, 2:00–4:00 AM UTC.
          </Text>
          <a style={linkStyle('#2563eb')}>
            View details <IconArrowRight style={{ fontSize: 11 }} />
          </a>
        </Flex>
      </Alert>

      <Alert
        type="warning"
        closable
        icon={
          <span style={iconBox('linear-gradient(135deg, #d97706, #fbbf24)', 'rgba(217,119,6,0.3)')}>
            <IconWarning style={{ fontSize: 18, color: '#fff' }} />
          </span>
        }
        title={
          <Flex align="center" gap="sm">
            <Text style={{ fontWeight: 700, fontSize: 14 }}>Usage limit approaching</Text>
            <Tag color="orange" variant="soft" style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              89%
            </Tag>
          </Flex>
        }
      >
        <Flex align="center" gap="sm" wrap="wrap">
          <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>
            You've consumed 89% of your monthly API quota. Upgrade to avoid interruption.
          </Text>
          <a style={linkStyle('#d97706')}>
            Upgrade plan <IconArrowRight style={{ fontSize: 11 }} />
          </a>
        </Flex>
      </Alert>

      <Alert
        type="error"
        closable
        icon={
          <span style={iconBox('linear-gradient(135deg, #dc2626, #f87171)', 'rgba(220,38,38,0.3)')}>
            <IconCreditCard style={{ fontSize: 18, color: '#fff' }} />
          </span>
        }
        title={
          <Flex align="center" gap="sm">
            <Text style={{ fontWeight: 700, fontSize: 14 }}>Payment failed</Text>
            <Tag color="red" variant="soft" style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Action required
            </Tag>
          </Flex>
        }
      >
        <Flex align="center" gap="sm" wrap="wrap">
          <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 13 }}>
            We couldn't charge your Visa ending in 4242. Please update your billing info.
          </Text>
          <a style={linkStyle('#dc2626')}>
            Update card <IconArrowRight style={{ fontSize: 11 }} />
          </a>
        </Flex>
      </Alert>
    </Flex>
  );
}
