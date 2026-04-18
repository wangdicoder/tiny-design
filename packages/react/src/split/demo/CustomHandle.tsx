import React from 'react';
import { Split } from '@tiny-design/react';

export default function CustomHandleDemo() {
  return (
    <Split
      defaultSize="36%"
      min="120px"
      separatorSize={4}
      separatorHitAreaSize={24}
      separatorRender={({ orientation, dragging, collapsed }) => (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                width: orientation === 'horizontal' ? 2 : '100%',
                height: orientation === 'vertical' ? 2 : '100%',
                background: dragging ? '#94a3b8' : '#cbd5e1',
              }}
            />
          </div>
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              minWidth: orientation === 'horizontal' ? 20 : 36,
              minHeight: orientation === 'vertical' ? 20 : 36,
              borderRadius: 999,
              background: collapsed ? '#e2e8f0' : '#ffffff',
              border: `1px solid ${dragging ? '#94a3b8' : '#cbd5e1'}`,
              boxShadow: dragging ? '0 0 0 4px rgba(148, 163, 184, 0.12)' : '0 1px 3px rgba(15, 23, 42, 0.12)',
              display: 'flex',
              flexDirection: orientation === 'horizontal' ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: 6,
            }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: collapsed ? '#64748b' : '#94a3b8',
                }}
              />
            ))}
          </div>
        </div>
      )}
      style={{ height: 220, border: '1px solid #dcdee2', background: '#f8fafc' }}>
      <Split.Pane style={{ padding: 16, background: '#fff' }}>
        Navigation
      </Split.Pane>
      <Split.Pane min="160px" style={{ padding: 16 }}>
        Workspace
      </Split.Pane>
    </Split>
  );
}
