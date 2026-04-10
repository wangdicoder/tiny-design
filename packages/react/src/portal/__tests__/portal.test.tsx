import React from 'react';
import { render } from '@testing-library/react';
import Portal from '../index';

describe('<Portal />', () => {
  it('should render children into body', () => {
    const { baseElement } = render(
      <Portal><div data-testid="portal-content">Portal Content</div></Portal>
    );
    expect(baseElement.querySelector('[data-testid="portal-content"]')).toBeTruthy();
  });

  it('should render children into custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div data-testid="portal-custom">Portal Custom</div>
      </Portal>
    );

    expect(container.querySelector('[data-testid="portal-custom"]')).toBeTruthy();
    document.body.removeChild(container);
  });
});
