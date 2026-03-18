import React from 'react';
import { Steps, withSpin } from '@tiny-design/react';
import { IconUser, IconViewFile, IconSync, IconCheckCircle1 } from '@tiny-design/icons';

const SpinningSync = withSpin(IconSync);

export default function IconDemo() {
  return (
    <Steps current={2}>
      <Steps.Step title="Login" icon={<IconUser size={32} />} />
      <Steps.Step title="Verification" icon={<IconViewFile size={32} />} />
      <Steps.Step title="Pay" icon={<SpinningSync size={32} />} />
      <Steps.Step title="Done" icon={<IconCheckCircle1 size={32} />} />
    </Steps>
  );
}