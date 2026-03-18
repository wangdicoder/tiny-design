import React from 'react';
import { Loader, withSpin } from '@tiny-design/react';
import { IconSync } from '@tiny-design/icons';

export default function IndicatorDemo() {
  const SpinningSync = withSpin(IconSync);
  return <Loader indicator={<SpinningSync size={25} />} />;
}