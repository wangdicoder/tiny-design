import React from 'react';
import { Avatar, Button, Card, Flex, Grid, Heading, Input, Tag, Text, Textarea } from '@tiny-design/react';

export function MailPreview(): React.ReactElement {
  return (
    <Grid className="theme-studio__mail-shell">
      <Card className="theme-studio__mail-sidebar">
        <Card.Content>
          <Flex vertical className="theme-studio__mail-sidebar-head">
            <Flex vertical>
              <Text className="theme-studio__eyebrow">Mailbox</Text>
              <Heading level={4}>Studio Mail</Heading>
            </Flex>
            <Button variant="solid" color="primary" style={{ width: '100%' }}>
              Compose
            </Button>
          </Flex>

          <Flex vertical className="theme-studio__mail-folder-list">
            {[
              ['Inbox', '128'],
              ['Drafts', '9'],
              ['Sent', '24'],
              ['Junk', '3'],
              ['Trash', '0'],
            ].map(([item, count], index) => (
              <Button
                key={item}
                className={`theme-studio__mail-nav-item${index === 0 ? ' theme-studio__mail-nav-item_active' : ''}`}
                variant={index === 0 ? 'solid' : 'ghost'}
                color="primary">
                <span>{item}</span>
                <small>{count}</small>
              </Button>
            ))}
          </Flex>

          <Flex vertical className="theme-studio__mail-labels">
            <Text strong>Labels</Text>
            <Flex gap="sm" wrap>
              <Tag color="info">Design</Tag>
              <Tag color="success">Work</Tag>
              <Tag color="warning">Personal</Tag>
            </Flex>
          </Flex>
        </Card.Content>
      </Card>

      <Card className="theme-studio__mail-panel">
        <Card.Content>
          <Flex className="theme-studio__mail-panel-head">
            <Input placeholder="Search mail" />
            <Button>Filter</Button>
          </Flex>
          <Flex className="theme-studio__mail-toolbar">
            <Tag color="info">All mail</Tag>
            <Tag>Unread</Tag>
            <Tag>Assigned</Tag>
          </Flex>

          <Flex vertical className="theme-studio__mail-thread-list">
            {[
              ['Sofia Davis', 'New message', 'Hi, how can I help you today?', '12m', true],
              ['Jackson Lee', 'Billing issue', 'I cannot update my card.', '1h', false],
              [
                'Olivia Martin',
                'Access request',
                'Can you grant me editor permissions?',
                '3h',
                false,
              ],
              [
                'William Kim',
                'Design review',
                'Please review the new dashboard polish.',
                'Yesterday',
                false,
              ],
            ].map(([sender, subject, preview, time, unread], index) => (
              <Card
                key={sender}
                className={`theme-studio__mail-item${index === 0 ? ' theme-studio__mail-item_active' : ''}`}
                active={index === 0}
                hoverable>
                <Card.Content>
                  <div className="theme-studio__mail-item-head">
                    <strong>{sender}</strong>
                    <span>{time}</span>
                  </div>
                  <span className="theme-studio__mail-item-subject">
                    {subject}
                    {unread ? <i className="theme-studio__mail-item-dot" /> : null}
                  </span>
                  <small>{preview}</small>
                </Card.Content>
              </Card>
            ))}
          </Flex>
        </Card.Content>
      </Card>

      <Card className="theme-studio__mail-detail">
        <Card.Content>
          <Flex className="theme-studio__mail-message-head">
            <Flex align="center" className="theme-studio__mail-message-meta">
              <Avatar>S</Avatar>
              <div>
                <Text strong>Re: New message</Text>
                <Text type="secondary">support@tiny.design</Text>
              </div>
            </Flex>
            <Flex className="theme-studio__mail-message-actions">
              <Tag color="info">Unread</Tag>
              <Button variant="outline" color="primary">
                Archive
              </Button>
            </Flex>
          </Flex>

          <Flex vertical className="theme-studio__chat-thread">
            <Card
              bordered={false}
              className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
              <Card.Content>Hi, how can I help you today?</Card.Content>
            </Card>
            <Card
              bordered={false}
              className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
              <Card.Content>Hey, I&apos;m having trouble with my account.</Card.Content>
            </Card>
            <Card
              bordered={false}
              className="theme-studio__chat-bubble theme-studio__chat-bubble_in">
              <Card.Content>What seems to be the problem?</Card.Content>
            </Card>
            <Card
              bordered={false}
              className="theme-studio__chat-bubble theme-studio__chat-bubble_out">
              <Card.Content>I can&apos;t log in after resetting my password.</Card.Content>
            </Card>
          </Flex>

          <Textarea rows={5} resizable={false} placeholder="Reply Sofia Davis..." />
          <Flex className="theme-studio__mail-compose">
            <Button>Save Draft</Button>
            <Button variant="solid" color="primary">
              Send
            </Button>
          </Flex>
        </Card.Content>
      </Card>
    </Grid>
  );
}
