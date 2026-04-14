import React from 'react';
import { Button, Overlay } from '@tiny-design/react';

export default function CustomContentDemo() {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <>
      <Button variant="solid" color="primary" onClick={() => setIsShow(true)}>
        Custom Content
      </Button>
      <Overlay isShow={isShow} clickCallback={() => setIsShow(false)}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            borderRadius: 8,
            padding: '24px 32px',
            textAlign: 'center',
          }}
          onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 12px' }}>Custom Panel</h3>
          <p style={{ margin: '0 0 16px', color: '#666' }}>
            This content is rendered inside the overlay.
          </p>
          <Button variant="solid" color="primary" onClick={() => setIsShow(false)}>
            Close
          </Button>
        </div>
      </Overlay>
    </>
  );
}
