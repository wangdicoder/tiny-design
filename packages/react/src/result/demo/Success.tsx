import React from 'react';
import { Result, Button, Flex } from '@tiny-design/react';

export default function SuccessDemo() {
  return (
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subtitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={
        <Flex gap="sm" justify="center">
          <Button variant="solid" color="primary" key="console">
            Go Console
          </Button>
          <Button key="buy">Buy Again</Button>
        </Flex>
      }
    />
  );
}
