import React from 'react';
import { Card, Grid, Typography } from '@tiny-design/react';

const panelStyle: React.CSSProperties = {
  minHeight: 104,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: 'linear-gradient(180deg, rgba(110,65,191,0.12), rgba(110,65,191,0.02))',
};

export default function ExplicitColumnsDemo() {
  return (
    <Grid columns="220px minmax(0, 1fr) 180px" gap="sm">
      <Card style={panelStyle}>
        <Typography.Text strong>Sidebar</Typography.Text>
        <Typography.Text type="secondary">Fixed 220px track</Typography.Text>
      </Card>
      <Card style={panelStyle}>
        <Typography.Text strong>Main content</Typography.Text>
        <Typography.Text type="secondary">Fluid `minmax(0, 1fr)` track</Typography.Text>
      </Card>
      <Card style={panelStyle}>
        <Typography.Text strong>Inspector</Typography.Text>
        <Typography.Text type="secondary">Fixed 180px track</Typography.Text>
      </Card>
    </Grid>
  );
}
