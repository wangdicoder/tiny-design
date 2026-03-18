import React from 'react';
import { TimePicker } from '@tiny-design/react';

export default function DisabledDemo() {
  return (
    <TimePicker disabled defaultValue={new Date(2024, 0, 1, 8, 30, 0)} />
  );
}