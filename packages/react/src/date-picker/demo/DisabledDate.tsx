import { DatePicker } from '@tiny-design/react';

export default function DisabledDateDemo() {
  const disabledDate = (current: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };
  return (
    <DatePicker disabledDate={disabledDate} placeholder="No past dates" />
  );
}
