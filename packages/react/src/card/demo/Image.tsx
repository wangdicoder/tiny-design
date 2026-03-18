import React from 'react';
import { Card, Image } from '@tiny-design/react';

export default function ImageDemo() {
  return (
    <Card
      actions={[
        <a key={1} href="">Learn more</a>
      ]}
    >
      <Image width="100%" src="../avatar/plants.jpg" />
      <Card.Content>
        <h2 style={{ margin: 0 }}>Koala</h2>
        <p style={{ marginBottom: 0 }}>
          The koala is an arboreal herbivorous marsupial native to Australia. It is
          the only extant representative of the family Phascolarctidae and its closest
          living relatives are the wombats, which comprise the family Vombatidae.
        </p>
      </Card.Content>
    </Card>
  );
}