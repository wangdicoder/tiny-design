import React from 'react';
import { Button, Overlay } from '@tiny-design/react';

export default function BlurredDemo() {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <>
      <Button btnType="primary" onClick={() => setIsShow(true)}>Blurred Overlay</Button>
      <Overlay isShow={isShow} blurred clickCallback={() => setIsShow(false)}>
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: 20 }}>
          Blurred backdrop overlay
        </div>
      </Overlay>
    </>
  );
}