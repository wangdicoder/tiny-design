import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Collapse from '../index';

const items = [
  { key: 'a', label: 'Header A', children: 'Content A' },
  { key: 'b', label: 'Header B', children: 'Content B' },
];

describe('<Collapse />', () => {
  it('should render correctly', () => {
    const { container } = render(<Collapse items={items} />);
    expect(container.firstChild).toHaveClass('ty-collapse');
  });

  it('should open from defaultValue using item keys', () => {
    render(<Collapse items={items} defaultValue={['b']} />);
    const trigger = screen.getByRole('button', { name: 'Header B' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('should toggle panels in uncontrolled mode', () => {
    render(<Collapse items={items} />);
    const trigger = screen.getByRole('button', { name: 'Header A' });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should only emit changes in controlled mode', () => {
    const onValueChange = jest.fn();

    render(<Collapse items={items} value={['a']} onValueChange={onValueChange} />);

    const triggerA = screen.getByRole('button', { name: 'Header A' });
    const triggerB = screen.getByRole('button', { name: 'Header B' });

    fireEvent.click(triggerB);

    expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
    expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    expect(triggerB).toHaveAttribute('aria-expanded', 'false');
  });

  it('should keep only one expanded item when multiple is false', () => {
    const onValueChange = jest.fn();

    render(
      <Collapse
        items={items}
        multiple={false}
        defaultValue={['a']}
        onValueChange={onValueChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Header B' }));

    expect(onValueChange).toHaveBeenCalledWith(['b']);
  });

  it('should respect disabled panels', () => {
    render(
      <Collapse
        items={[
          { key: 'a', label: 'Header A', children: 'Content A', disabled: true },
        ]}
      />
    );

    expect(screen.getByRole('button', { name: 'Header A' })).toBeDisabled();
  });

  it('should support icon-only collapsible panels', () => {
    render(
      <Collapse
        items={[
          {
            key: 'a',
            label: 'Header A',
            children: 'Content A',
            collapsible: 'icon',
          },
        ]}
      />
    );

    expect(screen.getByText('Header A').closest('button')).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('should call onItemClick before toggling', () => {
    const onItemClick = jest.fn();

    render(<Collapse items={items} onItemClick={onItemClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Header A' }));
    expect(onItemClick).toHaveBeenCalledWith('a', expect.any(Object));
  });
});
