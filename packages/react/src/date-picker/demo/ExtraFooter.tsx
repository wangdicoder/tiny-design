import React from 'react';
import { DatePicker } from '@tiny-design/react';

export default function ExtraFooterDemo() {
  return (
    <DatePicker
      placeholder="With extra footer"
      renderExtraFooter={() => (
        <span style={{ fontSize: 12, color: '#999' }}>Select a business day</span>
      )}
    />
  );
}