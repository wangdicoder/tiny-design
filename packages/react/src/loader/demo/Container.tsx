import React from 'react';
import { Loader } from '@tiny-design/react';

export default function ContainerDemo() {
  const style = {
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0',
  };

  return (
    <div style={style}>
      <Loader />
    </div>
  );
}