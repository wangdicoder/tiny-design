import React from 'react';
import { Alert } from '@tiny-design/react';

export default function ClosableDemo() {
  return (
    <>
      <Alert closable>Info alert</Alert>
      <Alert closable type="success">Success alert</Alert>
      <Alert closable type="warning">Warning alert</Alert>
      <Alert closable type="error">Error alert</Alert>
    </>
  );
}