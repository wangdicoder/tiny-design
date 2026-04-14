import React from 'react';
import { Button, Grid } from '@tiny-design/react';

export default function AlignmentGridDemo() {
  return (
    <Grid
      columns={3}
      gap="sm"
      align="center"
      justify="center"
      style={{
        minHeight: 180,
        padding: 16,
        border: '1px dashed var(--ty-color-border)',
        borderRadius: 12,
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--ty-color-primary) 6%, transparent), color-mix(in srgb, var(--ty-color-primary-bg) 45%, transparent))',
      }}>
      <Button variant="solid" color="primary">
        Primary
      </Button>
      <Button>Default</Button>
      <Button variant="outline" color="primary">
        Outline
      </Button>
    </Grid>
  );
}
