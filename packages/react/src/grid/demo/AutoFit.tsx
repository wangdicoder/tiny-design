import React from 'react';
import { Card, Grid } from '@tiny-design/react';

export default function AutoFitDemo() {
  return (
    <Grid minColumnWidth={180} gap="sm">
      {['Analytics', 'Revenue', 'Orders', 'Retention', 'Conversion'].map((title) => (
        <Card key={title}>
          <Card.Content>
            <strong>{title}</strong>
            <div style={{ marginTop: 8, color: 'var(--ty-color-text-secondary)' }}>Auto-fit cards without manual breakpoints.</div>
          </Card.Content>
        </Card>
      ))}
    </Grid>
  );
}
