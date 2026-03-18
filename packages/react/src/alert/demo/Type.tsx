import React from 'react';
import { Alert } from '@tiny-design/react';

export default function TypeDemo() {
  return (
    <>
      <Alert>Info alert</Alert>
      <Alert type="success">Success alert</Alert>
      <Alert type="warning">Warning alert</Alert>
      <Alert type="error">Error alert</Alert>
    </>
  );
}