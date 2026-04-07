import React from 'react';
import { Card, Grid, Typography, Button, Progress, Tag, Divider } from '@tiny-design/react';

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
  background: 'linear-gradient(180deg, rgba(110,65,191,0.1), rgba(110,65,191,0.02))',
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
              <Typography.Text strong>Dashboard Header</Typography.Text>
              <div style={{ marginTop: 8 }}>
                <Typography.Text type="secondary">Top-level shell area using `grid-template-areas`.</Typography.Text>
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
                <Typography.Text strong>Revenue</Typography.Text>
                <Tag color="success" variant="soft">+12%</Tag>
              </div>
              <div>
                <Typography.Text type="secondary">$182,400</Typography.Text>
                <div style={{ marginTop: 8 }}>
                  <Progress.Bar percent={72} showInfo={false} strokeWidth={6} />
                </div>
              </div>
            </Card>
          </Grid.Item>
          <Grid.Item size={1}>
            <Card style={metricStyle}>
              <div style={sectionLabelStyle}>
                <Typography.Text strong>Conversion</Typography.Text>
                <Tag color="info" variant="soft">+1.8%</Tag>
              </div>
              <div>
                <Typography.Text type="secondary">18.4%</Typography.Text>
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
          <Typography.Text strong>Filters</Typography.Text>
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
            <Typography.Text strong>Chart Area</Typography.Text>
            <Typography.Text type="secondary">Last 7 days</Typography.Text>
          </div>
          <Grid columns={6} gap={8} align="end" style={{ minHeight: 84 }}>
            <div style={{ height: 42, borderRadius: 8, background: 'rgba(110,65,191,0.18)' }} />
            <div style={{ height: 68, borderRadius: 8, background: 'rgba(110,65,191,0.24)' }} />
            <div style={{ height: 54, borderRadius: 8, background: 'rgba(110,65,191,0.2)' }} />
            <div style={{ height: 88, borderRadius: 8, background: 'rgba(110,65,191,0.28)' }} />
            <div style={{ height: 60, borderRadius: 8, background: 'rgba(110,65,191,0.22)' }} />
            <div style={{ height: 76, borderRadius: 8, background: 'rgba(110,65,191,0.26)' }} />
          </Grid>
          <Typography.Text type="secondary">Wide content region spanning two columns on desktop.</Typography.Text>
        </Card>
      </Grid.Item>

      <Grid.Item area="activity">
        <Card style={{ ...shellCardStyle, minHeight: 180 }}>
          <Typography.Text strong>Activity</Typography.Text>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Typography.Text>New signups</Typography.Text>
              <Typography.Text type="secondary">128</Typography.Text>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Typography.Text>Trial started</Typography.Text>
              <Typography.Text type="secondary">42</Typography.Text>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <Typography.Text>Churn risk</Typography.Text>
              <Typography.Text type="secondary">9</Typography.Text>
            </div>
          </div>
        </Card>
      </Grid.Item>
    </Grid>
  );
}
