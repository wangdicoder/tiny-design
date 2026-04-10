import React from 'react';
import { render } from '@testing-library/react';
import Overlay from '../index';
import ConfigProvider from '../../config-provider';

describe('<Overlay />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Overlay isShow>Content</Overlay>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when visible', () => {
    const { getByText } = render(<Overlay isShow>Overlay Content</Overlay>);
    expect(getByText('Overlay Content')).toBeInTheDocument();
  });

  it('should render blurred', () => {
    const { baseElement } = render(<Overlay isShow blurred>Content</Overlay>);
    expect(baseElement.querySelector('.ty-overlay_blurred')).toBeInTheDocument();
  });

  it('should lock and restore the configured target container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { unmount } = render(
      <ConfigProvider getTargetContainer={() => container}>
        <Overlay isShow>Content</Overlay>
      </ConfigProvider>
    );

    expect(container.style.overflow).toBe('hidden');
    expect(document.body.style.overflow).toBe('');

    unmount();

    expect(container.style.overflow).toBe('');
    document.body.removeChild(container);
  });

  it('should render into configured popup container', () => {
    const popupContainer = document.createElement('div');
    document.body.appendChild(popupContainer);

    render(
      <ConfigProvider getPopupContainer={() => popupContainer}>
        <Overlay isShow>Popup Container Content</Overlay>
      </ConfigProvider>
    );

    expect(popupContainer.textContent).toContain('Popup Container Content');
    document.body.removeChild(popupContainer);
  });
});
