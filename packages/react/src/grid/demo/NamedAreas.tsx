import React from 'react';
import { Card, Grid, Text } from '@tiny-design/react';

const panelStyle: React.CSSProperties = {
  padding: 16,
  minHeight: 96,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export default function NamedAreasDemo() {
  return (
    <Grid
      areas={{
        xs: ['hero', 'side', 'content'],
        md: ['hero hero side', 'content content side'],
      }}
      columns={{ xs: 1, md: 3 }}
      gap="md">
      <Grid.Item area="hero">
        <Card style={panelStyle}>
          <Text strong>Hero</Text>
          <Text type="secondary">grid-area: hero</Text>
        </Card>
      </Grid.Item>
      <Grid.Item area="side">
        <Card style={panelStyle}>
          <Text strong>Sidebar</Text>
          <Text type="secondary">grid-area: side</Text>
        </Card>
      </Grid.Item>
      <Grid.Item area="content">
        <Card style={panelStyle}>
          <Text strong>Content</Text>
          <Text type="secondary">grid-area: content</Text>
        </Card>
      </Grid.Item>
    </Grid>
  );
}
