import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Transfer from '../index';

describe('<Transfer />', () => {
  const dataSource = [
    { key: '1', label: 'Item 1', disabled: false },
    { key: '2', label: 'Item 2', disabled: false },
    { key: '3', label: 'Item 3', disabled: false },
  ];

  it('should match the snapshot', () => {
    const { asFragment } = render(<Transfer dataSource={dataSource} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Transfer dataSource={dataSource} />);
    expect(container.firstChild).toHaveClass('ty-transfer');
  });

  it('should render two panels', () => {
    const { container } = render(<Transfer dataSource={dataSource} />);
    expect(container.querySelectorAll('.ty-transfer-panel').length).toBe(2);
  });

  it('should not clear panel selection on unrelated parent rerenders in controlled mode', () => {
    const ControlledTransfer = () => {
      const [tick, setTick] = React.useState(0);
      return (
        <>
          <Transfer dataSource={dataSource} value={['3']} />
          <button onClick={() => setTick((n) => n + 1)}>rerender-{tick}</button>
        </>
      );
    };

    const { container, getByText } = render(<ControlledTransfer />);
    const checkboxes = container.querySelectorAll('.ty-transfer-panel input[type="checkbox"]');

    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();

    fireEvent.click(getByText('rerender-0'));

    expect(container.querySelectorAll('.ty-transfer-panel input[type="checkbox"]')[1]).toBeChecked();
  });
});
