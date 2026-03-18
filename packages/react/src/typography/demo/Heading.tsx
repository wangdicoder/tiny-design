import React from 'react';
import { Typography } from '@tiny-design/react';

const { Heading } = Typography;

export default function HeadingDemo() {
  return (
    <>
      <Heading>H1.Heading</Heading>
      <Heading level={2}>H2.Heading</Heading>
      <Heading level={3}>H3.Heading</Heading>
      <Heading level={4}>H4.Heading</Heading>
      <Heading level={5}>H5.Heading</Heading>
      <Heading level={6}>H6.Heading</Heading>
    </>
  );
}