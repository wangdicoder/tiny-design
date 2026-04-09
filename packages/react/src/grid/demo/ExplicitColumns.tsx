import React from 'react';
import { Card, Grid, Text } from '@tiny-design/react';

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
        <Text strong>Sidebar</Text>
        <Text type="secondary">Fixed 220px track</Text>
      </Card>
      <Card style={panelStyle}>
        <Text strong>Main content</Text>
        <Text type="secondary">Fluid `minmax(0, 1fr)` track</Text>
      </Card>
      <Card style={panelStyle}>
        <Text strong>Inspector</Text>
        <Text type="secondary">Fixed 180px track</Text>
      </Card>
    </Grid>
  );
}
