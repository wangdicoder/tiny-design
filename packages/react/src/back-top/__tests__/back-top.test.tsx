import { fireEvent, render } from '@testing-library/react';
import BackTop from '../index';
import ConfigProvider from '../../config-provider';

describe('<BackTop />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<BackTop />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render null when not scrolled', () => {
    const { container } = render(<BackTop />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should use the configured target container by default', () => {
    const container = document.createElement('div');
    Object.defineProperty(container, 'scrollTop', {
      value: 400,
      writable: true,
    });
    document.body.appendChild(container);

    const { getByRole } = render(
      <ConfigProvider getTargetContainer={() => container}>
        <BackTop />
      </ConfigProvider>
    );

    expect(getByRole('button', { name: 'Back to top' })).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'Back to top' }));
    expect(container.scrollTop).toBeLessThanOrEqual(400);

    document.body.removeChild(container);
  });
});
