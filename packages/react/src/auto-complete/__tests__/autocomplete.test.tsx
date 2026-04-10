import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AutoComplete from '../index';

const options = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
];

// Popup uses Portal, so dropdown renders in document.body
const getOptions = () => document.querySelectorAll('.ty-auto-complete-option');

describe('<AutoComplete />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<AutoComplete options={options} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with custom class', () => {
    const { container } = render(<AutoComplete className="custom" options={options} />);
    expect(container.firstChild).toHaveClass('ty-auto-complete');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('should render an input', () => {
    const { container } = render(<AutoComplete options={options} />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should show dropdown on input change', () => {
    const { container } = render(<AutoComplete options={options} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'a' } });
    const items = getOptions();
    expect(items.length).toBeGreaterThan(0);
  });

  it('should filter options by input value', () => {
    const { container } = render(<AutoComplete options={options} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'ap' } });
    const items = getOptions();
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent('Apple');
  });

  it('should select option on click', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <AutoComplete options={options} onSelect={onSelect} onChange={onChange} defaultOpen />
    );
    const items = getOptions();
    fireEvent.click(items[1]);
    expect(onSelect).toHaveBeenCalledWith('Banana', { value: 'Banana' });
    expect(onChange).toHaveBeenCalledWith('Banana');
  });

  it('should navigate with keyboard and select with Enter', () => {
    const onChange = jest.fn();
    const { container } = render(<AutoComplete options={options} onChange={onChange} />);
    const wrapper = container.firstChild as HTMLElement;
    // Open dropdown
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
    // Move down once more
    fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
    // Enter to select
    fireEvent.keyDown(wrapper, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('Banana');
  });

  it('should expose combobox aria relationships when navigating options', () => {
    const { container } = render(<AutoComplete options={options} />);
    const input = container.querySelector('input') as HTMLInputElement;
    const wrapper = container.firstChild as HTMLElement;

    fireEvent.keyDown(wrapper, { key: 'ArrowDown' });

    const listboxId = input.getAttribute('aria-controls');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(listboxId).toBeTruthy();
    expect(input).toHaveAttribute('aria-activedescendant', `${listboxId}-option-0`);
    expect(document.getElementById(`${listboxId}-option-0`)).toHaveTextContent('Apple');
  });

  it('should close on Escape', () => {
    const { container } = render(<AutoComplete options={options} defaultOpen />);
    const wrapper = container.firstChild as HTMLElement;
    fireEvent.keyDown(wrapper, { key: 'Escape' });
    expect(wrapper).not.toHaveClass('ty-auto-complete_open');
  });

  it('should close on outside click', async () => {
    const { container } = render(
      <div>
        <AutoComplete options={options} defaultOpen />
        <button>Outside</button>
      </div>
    );

    expect(getOptions().length).toBeGreaterThan(0);
    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(container.querySelector('.ty-auto-complete')).not.toHaveClass('ty-auto-complete_open');
    });
  });

  it('should handle disabled state', () => {
    const { container } = render(<AutoComplete options={options} disabled />);
    expect(container.firstChild).toHaveClass('ty-auto-complete_disabled');
    const input = container.querySelector('input')!;
    expect(input).toBeDisabled();
  });

  it('should handle allowClear', () => {
    const { container } = render(
      <AutoComplete options={options} allowClear value="Apple" />
    );
    const clearBtn = container.querySelector('.ty-input__clear-btn');
    expect(clearBtn).toBeInTheDocument();
  });

  it('should support controlled value', () => {
    const { container, rerender } = render(
      <AutoComplete options={options} value="Apple" />
    );
    const input = container.querySelector('input')! as HTMLInputElement;
    expect(input.value).toBe('Apple');
    rerender(<AutoComplete options={options} value="Banana" />);
    expect(input.value).toBe('Banana');
  });

  it('should support controlled open', () => {
    const { container, rerender } = render(
      <AutoComplete options={options} open={false} />
    );
    expect(container.querySelector('.ty-auto-complete_open')).not.toBeInTheDocument();
    rerender(<AutoComplete options={options} open={true} />);
    expect(container.firstChild).toHaveClass('ty-auto-complete_open');
  });

  it('should call onOpenChange when focus opens and outside click closes the popup', async () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <div>
        <AutoComplete options={options} onOpenChange={onOpenChange} />
        <button>Outside</button>
      </div>
    );

    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.focus(input);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('should respect controlled open when Escape is pressed', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <AutoComplete options={options} open={true} onOpenChange={onOpenChange} />
    );

    const wrapper = container.firstChild as HTMLElement;
    fireEvent.keyDown(wrapper, { key: 'Escape' });

    expect(container.firstChild).toHaveClass('ty-auto-complete_open');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should call onSearch callback', () => {
    const onSearch = jest.fn();
    const { container } = render(<AutoComplete options={options} onSearch={onSearch} />);
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('should support custom filterOption', () => {
    const filterOption = (input: string, option: { value: string }) =>
      option.value.toLowerCase().startsWith(input.toLowerCase());
    const { container } = render(
      <AutoComplete options={options} filterOption={filterOption} />
    );
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'ch' } });
    const items = getOptions();
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent('Cherry');
  });

  it('should render empty content as a listbox option when no results match', () => {
    const { container } = render(
      <AutoComplete options={options} notFoundContent="No data" />
    );
    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: 'zzz' } });

    const listbox = document.querySelector('.ty-auto-complete__dropdown');
    const emptyItem = document.querySelector('.ty-auto-complete__empty');

    expect(listbox?.querySelector('li.ty-auto-complete__empty')).toBeInTheDocument();
    expect(emptyItem).toHaveAttribute('role', 'option');
    expect(emptyItem).toHaveAttribute('aria-disabled', 'true');
    expect(emptyItem).toHaveTextContent('No data');
  });

  it('should not select disabled option', () => {
    const onSelect = jest.fn();
    const disabledOptions = [
      { value: 'Apple' },
      { value: 'Banana', disabled: true },
    ];
    render(
      <AutoComplete options={disabledOptions} onSelect={onSelect} defaultOpen />
    );
    const items = getOptions();
    fireEvent.click(items[1]);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
