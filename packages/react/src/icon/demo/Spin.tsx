import React from 'react';
import { withSpin } from '@tiny-design/react';
import {
  IconLoader,
  IconLoaderQuarter,
  IconLoader3quarter,
  IconLoaderCircle,
  IconSync,
} from '@tiny-design/icons';

const SpinLoader = withSpin(IconLoader);
const SpinLoaderQuarter = withSpin(IconLoaderQuarter);
const SpinLoader3quarter = withSpin(IconLoader3quarter);
const SpinLoaderCircle = withSpin(IconLoaderCircle);
const SpinSync = withSpin(IconSync);

export default function SpinDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 24 }}>
      <SpinLoader />
      <SpinLoaderQuarter />
      <SpinLoader3quarter />
      <SpinLoaderCircle />
      <SpinSync />
    </div>
  );
}