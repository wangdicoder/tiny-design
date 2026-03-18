import React from 'react';
import { Link } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <span>This is a disabled <Link disabled href="https://tiny-design.dev/">link</Link>.</span>
  );
}