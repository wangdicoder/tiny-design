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

  it('should preserve checked items outside the current search filter', () => {
    const { container } = render(<Transfer dataSource={dataSource} showSearch />);
    const sourcePanel = container.querySelectorAll('.ty-transfer-panel')[0];
    const searchInput = sourcePanel.querySelector('input') as HTMLInputElement;

    fireEvent.click(sourcePanel.querySelector('input[name="1"]') as HTMLInputElement);
    expect(sourcePanel.querySelector('input[name="1"]')).toBeChecked();

    fireEvent.change(searchInput, { target: { value: 'Item 2' } });

    fireEvent.click(sourcePanel.querySelector('input[name="2"]') as HTMLInputElement);

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(sourcePanel.querySelector('input[name="1"]')).toBeChecked();
    expect(sourcePanel.querySelector('input[name="2"]')).toBeChecked();
  });

  it('should keep hidden checked items when select-all is used under a search filter', () => {
    const { container } = render(<Transfer dataSource={dataSource} showSearch />);
    const sourcePanel = container.querySelectorAll('.ty-transfer-panel')[0];
    const searchInput = sourcePanel.querySelector('input') as HTMLInputElement;

    fireEvent.click(sourcePanel.querySelector('input[name="1"]') as HTMLInputElement);
    expect(sourcePanel.querySelector('input[name="1"]')).toBeChecked();

    fireEvent.change(searchInput, { target: { value: 'Item 2' } });

    fireEvent.click(
      sourcePanel.querySelector('.ty-transfer-panel__footer input[type="checkbox"]') as HTMLInputElement
    );

    fireEvent.change(searchInput, { target: { value: '' } });

    expect(sourcePanel.querySelector('input[name="1"]')).toBeChecked();
    expect(sourcePanel.querySelector('input[name="2"]')).toBeChecked();
  });
});
