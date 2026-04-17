import React from 'react';
import { IconArrowRight, IconCheckCircle } from '@tiny-design/icons';
import { Button, Card, Flex, Switch, Text } from '@tiny-design/react';

type BillingCycle = 'monthly' | 'yearly';

type Plan = {
  name: string;
  caption: string;
  monthlyPrice: string;
  yearlyPrice: string;
  monthlyNote: string;
  yearlyNote: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: 'Plus',
    caption: 'For personal use',
    monthlyPrice: '$24',
    yearlyPrice: '$19',
    monthlyNote: 'Billed monthly',
    yearlyNote: 'Billed $228 annually',
    features: [
      'Up to 5 team members',
      'Basic components library',
      'Community support',
      '1GB storage space',
    ],
  },
  {
    name: 'Pro',
    caption: 'For professionals',
    monthlyPrice: '$59',
    yearlyPrice: '$49',
    monthlyNote: 'Billed monthly',
    yearlyNote: 'Billed $588 annually',
    features: [
      'Everything in Plus, and:',
      'Unlimited team members',
      'Advanced components',
      'Priority support',
      'Unlimited storage',
    ],
  },
];

export function PricingPreview(): React.ReactElement {
  const [billing, setBilling] = React.useState<BillingCycle>('yearly');

  return (
    <div className="theme-studio__pricing-shell">
      <Flex vertical className="theme-studio__pricing-stage">
        <Flex vertical align="center" className="theme-studio__pricing-intro">
          <h2 className="theme-studio__pricing-title">Pricing</h2>
          <Text className="theme-studio__pricing-subtitle">Check out our affordable pricing plans</Text>
          <Flex gap="sm" align='center'>
            <span className={billing === 'monthly' ? 'theme-studio__pricing-switch-label theme-studio__pricing-switch-label_active' : 'theme-studio__pricing-switch-label'}>
              Monthly
            </span>
            <Switch
              checked={billing === 'yearly'}
              onChange={(checked) => setBilling(checked ? 'yearly' : 'monthly')}
            />
            <span className={billing === 'yearly' ? 'theme-studio__pricing-switch-label theme-studio__pricing-switch-label_active' : 'theme-studio__pricing-switch-label'}>
              Yearly
            </span>
          </Flex>
        </Flex>

        <div className="theme-studio__pricing-grid">
          {plans.map((plan) => {
            const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const note = billing === 'yearly' ? plan.yearlyNote : plan.monthlyNote;

            return (
              <Card key={plan.name} className="theme-studio__pricing-card">
                <Card.Content>
                  <Flex vertical className="theme-studio__pricing-card-content">
                    <div>
                      <h3 className="theme-studio__pricing-plan">{plan.name}</h3>
                      <Text className="theme-studio__pricing-caption">{plan.caption}</Text>
                    </div>

                    <div className="theme-studio__pricing-price-block">
                      <div className="theme-studio__pricing-price">{price}</div>
                      <Text className="theme-studio__pricing-note">{note}</Text>
                    </div>

                    <div className="theme-studio__pricing-divider" />

                    <ul className="theme-studio__pricing-features">
                      {plan.features.map((feature) => (
                        <li key={feature} className="theme-studio__pricing-feature">
                          <IconCheckCircle size={16} className="theme-studio__pricing-feature-icon" />
                          <Text className={feature === 'Everything in Plus, and:' ? 'theme-studio__pricing-feature-text theme-studio__pricing-feature-text_strong' : 'theme-studio__pricing-feature-text'}>
                            {feature}
                          </Text>
                        </li>
                      ))}
                    </ul>

                    <Button variant="solid" color="primary" size="lg" className="theme-studio__pricing-action">
                      Purchase
                      <IconArrowRight size={16} />
                    </Button>
                  </Flex>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </Flex>
    </div>
  );
}
