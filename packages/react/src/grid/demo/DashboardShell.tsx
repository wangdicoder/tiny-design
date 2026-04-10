import React from 'react';
import { Button, Card, Divider, Grid, Progress, Tag, Text } from '@tiny-design/react';

const shellCardStyle: React.CSSProperties = {
  padding: 16,
  minHeight: 96,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const metricStyle: React.CSSProperties = {
  ...shellCardStyle,
  minHeight: 144,
  background: 'linear-gradient(180deg, color-mix(in srgb, var(--ty-color-primary) 10%, transparent), color-mix(in srgb, var(--ty-color-primary-bg) 70%, transparent))',
};

const sectionLabelStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
};

export default function DashboardShellDemo() {
  return (
    <Grid
      areas={{
        xs: [
          'header header',
          'metrics filters',
          'chart activity',
        ],
        md: [
          'header header header',
          'metrics metrics filters',
          'chart chart activity',
        ],
      }}
      columns={{ xs: 2, md: 3 }}
      gap={{ xs: 8, md: 16 }}>
      <Grid.Item area="header">
        <Card style={{ ...shellCardStyle, minHeight: 144 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <Text strong>Dashboard Header</Text>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">Top-level shell area using `grid-template-areas`.</Text>
              </div>
            </div>
            <Button btnType="primary" size="sm">Refresh</Button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag color="success" variant="soft">Healthy</Tag>
            <Tag color="info" variant="soft">24h window</Tag>
            <Tag color="warning" variant="soft">3 alerts</Tag>
          </div>
        </Card>
      </Grid.Item>

      <Grid.Item area="metrics">
        <Grid columns={2} gap="sm">
          <Grid.Item size={1}>
            <Card style={metricStyle}>
              <div style={sectionLabelStyle}>
                <Text strong>Revenue</Text>
                <Tag color="success" variant="soft">+12%</Tag>
              </div>
              <div>
                <Text type="secondary">$182,400</Text>
                <div style={{ marginTop: 8 }}>
                  <Progress.Bar percent={72} showInfo={false} strokeWidth={6} />
                </div>
              </div>
            </Card>
          </Grid.Item>
          <Grid.Item size={1}>
            <Card style={metricStyle}>
              <div style={sectionLabelStyle}>
                <Text strong>Conversion</Text>
                <Tag color="info" variant="soft">+1.8%</Tag>
              </div>
              <div>
                <Text type="secondary">18.4%</Text>
                <div style={{ marginTop: 8 }}>
                  <Progress.Bar percent={54} showInfo={false} strokeWidth={6} />
                </div>
              </div>
            </Card>
          </Grid.Item>
        </Grid>
      </Grid.Item>

      <Grid.Item area="filters">
        <Card style={{ ...shellCardStyle, minHeight: 144 }}>
          <Text strong>Filters</Text>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag variant="soft">Region: APAC</Tag>
            <Tag variant="soft">Plan: Pro</Tag>
            <Tag variant="soft">Channel: Web</Tag>
          </div>
        </Card>
      </Grid.Item>

      <Grid.Item area="chart">
        <Card style={{ ...shellCardStyle, minHeight: 180 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <Text strong>Chart Area</Text>
            <Text type="secondary">Last 7 days</Text>
          </div>
          <Grid columns={6} gap={8} align="end" style={{ minHeight: 84 }}>
            <div style={{ height: 42, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 18%, transparent)' }} />
            <div style={{ height: 68, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 24%, transparent)' }} />
            <div style={{ height: 54, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 20%, transparent)' }} />
            <div style={{ height: 88, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 28%, transparent)' }} />
            <div style={{ height: 60, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 22%, transparent)' }} />
            <div style={{ height: 76, borderRadius: 8, background: 'color-mix(in srgb, var(--ty-color-primary) 26%, transparent)' }} />
          </Grid>
          <Text type="secondary">Wide content region spanning two columns on desktop.</Text>
        </Card>
      </Grid.Item>

      <Grid.Item area="activity">
        <Card style={{ ...shellCardStyle, minHeight: 180 }}>
          <Text strong>Activity</Text>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Text>New signups</Text>
              <Text type="secondary">128</Text>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Text>Trial started</Text>
              <Text type="secondary">42</Text>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Text>Churn risk</Text>
              <Text type="secondary">9</Text>
            </div>
          </div>
        </Card>
      </Grid.Item>
    </Grid>
  );
}
