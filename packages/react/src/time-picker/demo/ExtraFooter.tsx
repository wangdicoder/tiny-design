import React from 'react';
import { TimePicker, Button } from '@tiny-design/react';

export default function ExtraFooterDemo() {
  const [time, setTime] = React.useState<Date | null>(null);
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="With footer"
      renderExtraFooter={() => (
        <Button
          size="sm"
          btnType="link"
          onClick={() => setTime(new Date())}>
          Now
        </Button>
      )}
    />
  );
}