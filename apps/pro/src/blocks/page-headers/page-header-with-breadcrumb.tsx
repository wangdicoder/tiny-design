import { Avatar, Breadcrumb, Button, Divider, Flex, Tag, Typography } from '@tiny-design/react';
import { IconSetting, IconBranch, IconCheckCircle } from '@tiny-design/icons';

const { Heading, Text } = Typography;

export default function PageHeaderWithBreadcrumb() {
  return (
    <div style={{ padding: '20px 24px 0', background: 'var(--ty-color-bg-container)' }}>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Tiny Design</Breadcrumb.Item>
      </Breadcrumb>

      <Flex justify="space-between" align="start" style={{ marginTop: 16 }}>
        <Flex align="start" gap="md">
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Text style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>T</Text>
          </div>
          <div>
            <Flex align="center" gap="sm">
              <Heading level={3} style={{ margin: 0 }}>Tiny Design</Heading>
              <Tag color="green" variant="soft" style={{ borderRadius: 20, fontWeight: 600, fontSize: 11 }}>
                <Flex align="center" gap="sm">
                  <IconCheckCircle style={{ fontSize: 12 }} />
                  <span>Active</span>
                </Flex>
              </Tag>
            </Flex>
            <Flex align="center" gap="md" style={{ marginTop: 6 }}>
              <Text style={{ color: 'var(--ty-color-text-secondary)', fontSize: 14 }}>
                A friendly UI component set for React
              </Text>
              <Flex align="center" gap="sm">
                <IconBranch style={{ fontSize: 13, color: 'var(--ty-color-text-tertiary)' }} />
                <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)' }}>main</Text>
              </Flex>
            </Flex>

            <Flex gap="sm" style={{ marginTop: 12 }}>
              <Flex align="center">
                {['JD', 'AJ', 'BS'].map((initials, i) => (
                  <Avatar
                    key={initials}
                    size={28}
                    style={{
                      backgroundColor: ['#6366f1', '#e11d48', '#0891b2'][i],
                      fontSize: 11,
                      fontWeight: 600,
                      border: '2px solid var(--ty-color-bg-container)',
                      marginLeft: i > 0 ? -8 : 0,
                    }}
                  >
                    {initials}
                  </Avatar>
                ))}
                <Avatar
                  size={28}
                  style={{
                    backgroundColor: 'var(--ty-color-bg-layout)',
                    color: 'var(--ty-color-text-secondary)',
                    fontSize: 10,
                    fontWeight: 600,
                    border: '2px solid var(--ty-color-bg-container)',
                    marginLeft: -8,
                  }}
                >
                  +5
                </Avatar>
              </Flex>
              <Text style={{ fontSize: 12, color: 'var(--ty-color-text-tertiary)', alignSelf: 'center' }}>
                8 contributors
              </Text>
            </Flex>
          </div>
        </Flex>

        <Flex gap="sm">
          <Button btnType="outline" style={{ borderRadius: 12 }}>
            <Flex align="center" gap="sm">
              <IconSetting style={{ fontSize: 16 }} />
              <span>Settings</span>
            </Flex>
          </Button>
          <Button btnType="primary" style={{
            borderRadius: 12,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
          }}>
            Deploy
          </Button>
        </Flex>
      </Flex>

      <Divider style={{ marginTop: 20, marginBottom: 0 }} />
    </div>
  );
}
