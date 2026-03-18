import React from 'react';
import { DatePicker } from '@tiny-design/react';

export default function DisabledDemo() {
  return <DatePicker disabled defaultValue={new Date(2024, 0, 15)} />;
}