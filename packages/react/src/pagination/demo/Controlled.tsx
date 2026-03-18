import React from 'react';
import { Pagination } from '@tiny-design/react';

export default function ControlledDemo() {
  const [current, setCurrent] = React.useState(3);
  const onChange = (page: number) => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
}