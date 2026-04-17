import React from 'react';
import { Button, Card, Flex, Grid, Heading, Paragraph, Progress, Segmented, Tag, Text } from '@tiny-design/react';

export function PricingPreview(): React.ReactElement {
  return (
    <Flex vertical className="theme-studio__preview-stack">
      <Flex justify="space-between" align="flex-start" className="theme-studio__pricing-hero">
        <Flex vertical>
          <Text className="theme-studio__eyebrow">Pricing</Text>
          <Heading level={2}>Simple pricing for modern teams</Heading>
          <Paragraph>
            Choose a plan that scales from solo work to multi-product organizations.
          </Paragraph>
          <Flex className="theme-studio__pill-row">
            <Tag color="success">No setup fee</Tag>
            <Tag>Cancel anytime</Tag>
          </Flex>
        </Flex>
        <Segmented
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
          value="monthly"
        />
      </Flex>

      <Grid className="theme-studio__pricing-grid" minColumnWidth={240} gap="sm">
        {[
          {
            name: 'Starter',
            price: '$29',
            description: 'Perfect for small businesses.',
            features: ['1 workspace', 'Basic analytics', 'Community support'],
          },
          {
            name: 'Pro',
            price: '$89',
            description: 'More features and storage.',
            featured: true,
            features: ['5 workspaces', 'Advanced analytics', 'Priority support'],
          },
          {
            name: 'Scale',
            price: '$199',
            description: 'For larger teams and advanced reporting.',
            features: ['Unlimited workspaces', 'SSO + audit log', 'Dedicated onboarding'],
          },
        ].map((plan) => (
          <Card
            key={plan.name}
            className={`theme-studio__pricing-card${plan.featured ? ' theme-studio__pricing-card_featured' : ''}`}>
            <Card.Content>
              <Flex align="center" className="theme-studio__pricing-card-head">
                {plan.featured ? <Tag color="success">Popular</Tag> : null}
                <Text strong>{plan.name}</Text>
              </Flex>
              <Flex vertical className="theme-studio__pricing-price">
                <Heading level={2}>{plan.price}</Heading>
                <Text type="secondary">Per workspace / month</Text>
              </Flex>
              <Paragraph>{plan.description}</Paragraph>
              <Flex vertical className="theme-studio__pricing-feature-list">
                {plan.features.map((feature) => (
                  <Text key={feature}>{feature}</Text>
                ))}
              </Flex>
              <Flex className="theme-studio__pricing-card-footer">
                <Button variant="solid" color={plan.featured ? 'primary' : 'default'}>
                  {plan.featured ? 'Upgrade plan' : 'Choose plan'}
                </Button>
              </Flex>
            </Card.Content>
          </Card>
        ))}
      </Grid>

      <Grid className="theme-studio__preview-grid" minColumnWidth={280} gap="sm">
        <Card title="Frequently Asked Questions" className="theme-studio__preview-card">
          <Card.Content>
            <Flex vertical className="theme-studio__faq-list">
              <Flex vertical className="theme-studio__faq-item">
                <Text strong>Can I cancel anytime?</Text>
                <Text type="secondary">Yes. Plans can be changed or canceled without lock-in.</Text>
              </Flex>
              <Flex vertical className="theme-studio__faq-item">
                <Text strong>Do you offer team migration?</Text>
                <Text type="secondary">Pro and Scale include assisted import and onboarding.</Text>
              </Flex>
            </Flex>
          </Card.Content>
        </Card>
        <Card title="Usage Snapshot" className="theme-studio__preview-card">
          <Card.Content>
            <Flex vertical className="theme-studio__settings-list">
              <Flex vertical>
                <Text strong>Seats</Text>
                <Progress.Bar percent={68} />
              </Flex>
              <Flex vertical>
                <Text strong>Storage</Text>
                <Progress.Bar percent={42} />
              </Flex>
            </Flex>
          </Card.Content>
        </Card>
      </Grid>
    </Flex>
  );
}
