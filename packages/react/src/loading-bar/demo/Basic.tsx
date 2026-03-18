import React from 'react';
import { Button, LoadingBar } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <>
      <Button onClick={() => LoadingBar.start()}>Start</Button>
      <Button onClick={() => LoadingBar.succeed()} btnType="success">Success</Button>
      <Button onClick={() => LoadingBar.fail()} btnType="danger">Fail</Button>
    </>
  );
}