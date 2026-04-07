import React from 'react';
import { Card, Grid, Typography } from '@tiny-design/react';

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
          <Typography.Text strong>Hero</Typography.Text>
          <Typography.Text type="secondary">grid-area: hero</Typography.Text>
        </Card>
      </Grid.Item>
      <Grid.Item area="side">
        <Card style={panelStyle}>
          <Typography.Text strong>Sidebar</Typography.Text>
          <Typography.Text type="secondary">grid-area: side</Typography.Text>
        </Card>
      </Grid.Item>
      <Grid.Item area="content">
        <Card style={panelStyle}>
          <Typography.Text strong>Content</Typography.Text>
          <Typography.Text type="secondary">grid-area: content</Typography.Text>
        </Card>
      </Grid.Item>
    </Grid>
  );
}
