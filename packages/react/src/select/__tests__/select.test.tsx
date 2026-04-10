import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import Select from '../index';

const { Option, OptGroup } = Select;

// Popup uses Portal, so dropdown content is in document.body
const getOptions = () => document.querySelectorAll('.ty-select-option');

describe('<Select />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Select>
        <Option value="a">A</Option>
        <Option value="b">B</Option>
      </Select>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with default class', () => {
    const { container } = render(
      <Select>
        <Option value="a">A</Option>
      </Select>
    );
    expect(container.firstChild).toHaveClass('ty-select');
  });

  // Single select
  it('should select an option and display its label', () => {
    const onChange = jest.fn();
    render(
      <Select onChange={onChange} defaultOpen>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[1]);
    expect(onChange).toHaveBeenCalledWith('b', expect.objectContaining({ value: 'b' }));
  });

  it('should close dropdown after single select', () => {
    const { container } = render(
      <Select defaultOpen>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[0]);
    expect(container.querySelector('.ty-select')).not.toHaveClass('ty-select_open');
  });

  it('should show placeholder when no value', () => {
    const { container } = render(
      <Select placeholder="Select...">
        <Option value="a">A</Option>
      </Select>
    );
    expect(container.querySelector('.ty-select__placeholder')).toHaveTextContent('Select...');
  });

  // Multi-select
  it('should support multi-select mode with tags', () => {
    const onChange = jest.fn();
    render(
      <Select mode="multiple" onChange={onChange} defaultOpen>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
        <Option value="c">Cherry</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[0]);
    expect(onChange).toHaveBeenCalledWith(['a'], expect.any(Array));

    fireEvent.click(options[1]);
    expect(onChange).toHaveBeenCalledWith(['a', 'b'], expect.any(Array));
  });

  it('should deselect in multi-select mode', () => {
    const onChange = jest.fn();
    render(
      <Select mode="multiple" defaultValue={['a', 'b']} onChange={onChange} defaultOpen>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[0]);
    expect(onChange).toHaveBeenCalledWith(['b'], expect.any(Array));
  });

  it('should render tags and support tag removal', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select mode="multiple" defaultValue={['a', 'b']} onChange={onChange}>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const tags = container.querySelectorAll('.ty-select__tag');
    expect(tags.length).toBe(2);

    const closeBtn = tags[0].querySelector('.ty-select__tag-close') as HTMLElement;
    fireEvent.click(closeBtn);
    expect(onChange).toHaveBeenCalledWith(['b'], expect.any(Array));
  });

  it('should limit displayed tags with maxTagCount', () => {
    const { container } = render(
      <Select mode="multiple" defaultValue={['a', 'b', 'c']} maxTagCount={1}>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
        <Option value="c">Cherry</Option>
      </Select>
    );
    const tags = container.querySelectorAll('.ty-select__tag');
    // 1 visible tag + 1 "+N..." tag
    expect(tags.length).toBe(2);
    expect(tags[1]).toHaveTextContent('+2');
  });

  // Search
  it('should filter options when showSearch is enabled', () => {
    const { container } = render(
      <Select showSearch defaultOpen>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
        <Option value="c">Cherry</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'ban' } });

    const options = getOptions();
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent('Banana');
  });

  it('should call onSearch callback', () => {
    const onSearch = jest.fn();
    const { container } = render(
      <Select showSearch onSearch={onSearch} defaultOpen>
        <Option value="a">Apple</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('should focus the search input after opening', () => {
    const { container } = render(
      <Select showSearch>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );

    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    act(() => {
      jest.runAllTimers();
    });

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    expect(searchInput).toHaveFocus();

    fireEvent.change(searchInput, { target: { value: 'ban' } });

    const options = getOptions();
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent('Banana');
  });

  it('should start searching when typing immediately after opening', () => {
    const { container } = render(
      <Select showSearch>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
        <Option value="c">Cherry</Option>
      </Select>
    );

    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    const selectEl = container.firstChild as HTMLElement;

    fireEvent.click(selector);
    fireEvent.keyDown(selectEl, { key: 'b' });

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    expect(searchInput.value).toBe('b');

    const options = getOptions();
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent('Banana');
  });

  // Keyboard
  it('should navigate with arrow keys and select with Enter', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select onChange={onChange}>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const selectEl = container.firstChild as HTMLElement;
    fireEvent.keyDown(selectEl, { key: 'ArrowDown' });
    fireEvent.keyDown(selectEl, { key: 'ArrowDown' });
    fireEvent.keyDown(selectEl, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('b', expect.objectContaining({ value: 'b' }));
  });

  it('should expose combobox aria relationships when navigating options', () => {
    const { container } = render(
      <Select
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />
    );

    const selectEl = container.firstChild as HTMLElement;
    fireEvent.keyDown(selectEl, { key: 'ArrowDown' });

    const listboxId = selectEl.getAttribute('aria-controls');
    expect(listboxId).toBeTruthy();
    expect(selectEl).toHaveAttribute('aria-haspopup', 'listbox');
    expect(selectEl).toHaveAttribute('aria-expanded', 'true');
    expect(selectEl).toHaveAttribute('aria-activedescendant', `${listboxId}-option-0`);
    expect(document.getElementById(`${listboxId}-option-0`)).toHaveTextContent('Apple');
  });

  it('should close on Escape', () => {
    const { container } = render(
      <Select defaultOpen>
        <Option value="a">Apple</Option>
      </Select>
    );
    const selectEl = container.firstChild as HTMLElement;
    fireEvent.keyDown(selectEl, { key: 'Escape' });
    expect(container.querySelector('.ty-select')).not.toHaveClass('ty-select_open');
  });

  it('should close on outside click', async () => {
    const { container } = render(
      <div>
        <Select defaultOpen>
          <Option value="a">Apple</Option>
        </Select>
        <button>Outside</button>
      </div>
    );

    expect(getOptions().length).toBe(1);
    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(container.querySelector('.ty-select')).not.toHaveClass('ty-select_open');
    });
  });

  // Disabled
  it('should not open dropdown when disabled', () => {
    const { container } = render(
      <Select disabled>
        <Option value="a">Apple</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);
    expect(container.querySelector('.ty-select')).not.toHaveClass('ty-select_open');
    expect(container.querySelector('.ty-select')).toHaveClass('ty-select_disabled');
  });

  it('should not select disabled option', () => {
    const onChange = jest.fn();
    render(
      <Select onChange={onChange} defaultOpen>
        <Option value="a" disabled>Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[0]);
    expect(onChange).not.toHaveBeenCalled();
  });

  // allowClear
  it('should clear value when allowClear is clicked', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select allowClear defaultValue="a" onChange={onChange}>
        <Option value="a">Apple</Option>
      </Select>
    );
    const clearBtn = container.querySelector('.ty-select__clear') as HTMLElement;
    expect(clearBtn).toBeTruthy();
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
  });

  // Options prop
  it('should render options from options prop', () => {
    render(
      <Select
        defaultOpen
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
          { value: 'c', label: 'Cherry', disabled: true },
        ]}
      />
    );
    const options = getOptions();
    expect(options.length).toBe(3);
    expect(options[2]).toHaveClass('ty-select-option_disabled');
  });

  it('should filter options prop with search', () => {
    const { container } = render(
      <Select
        showSearch
        defaultOpen
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'app' } });

    const options = getOptions();
    expect(options.length).toBe(1);
  });

  // Empty state
  it('should show empty content when no options match', () => {
    const { container } = render(
      <Select showSearch defaultOpen notFoundContent="Nothing found">
        <Option value="a">Apple</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    expect(document.querySelector('.ty-select__empty')).toHaveTextContent('Nothing found');
  });

  it('should preserve search text after closing without selecting', () => {
    const { container } = render(
      <Select showSearch notFoundContent="Nothing found">
        <Option value="a">Apple</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    const selectEl = container.querySelector('.ty-select') as HTMLElement;

    fireEvent.click(selector);
    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'xyz' } });
    expect(document.querySelector('.ty-select__empty')).toHaveTextContent('Nothing found');

    fireEvent.click(document.body);
    expect(selectEl).not.toHaveClass('ty-select_open');
    expect(container.querySelector('.ty-select__search')).toHaveValue('xyz');

    fireEvent.click(selector);
    expect(document.querySelector('.ty-select__empty')).toHaveTextContent('Nothing found');
  });

  it('should show the selected option label when reopening searchable single select', () => {
    const { container } = render(
      <Select showSearch>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;

    fireEvent.click(selector);
    fireEvent.click(getOptions()[1]);
    expect(container.querySelector('.ty-select__selection-text')).toHaveTextContent('Banana');

    fireEvent.click(selector);
    expect(container.querySelector('.ty-select__search')).toHaveValue('Banana');
  });

  // Sizes
  it('should apply size classes', () => {
    const { container: smContainer } = render(
      <Select size="sm"><Option value="a">A</Option></Select>
    );
    expect(smContainer.firstChild).toHaveClass('ty-select_sm');

    const { container: lgContainer } = render(
      <Select size="lg"><Option value="a">A</Option></Select>
    );
    expect(lgContainer.firstChild).toHaveClass('ty-select_lg');
  });

  // Loading
  it('should show loading spinner', () => {
    render(
      <Select loading defaultOpen>
        <Option value="a">A</Option>
      </Select>
    );
    expect(document.querySelector('.ty-select__loading')).toBeTruthy();
  });

  // Controlled
  it('should work in controlled mode', () => {
    const { container, rerender } = render(
      <Select value="a">
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    expect(container.querySelector('.ty-select__selection-text')).toHaveTextContent('Apple');

    rerender(
      <Select value="b">
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>
    );
    expect(container.querySelector('.ty-select__selection-text')).toHaveTextContent('Banana');
  });

  it('should call onDropdownVisibleChange when outside click closes the popup', async () => {
    const onDropdownVisibleChange = jest.fn();

    render(
      <div>
        <Select defaultOpen onDropdownVisibleChange={onDropdownVisibleChange}>
          <Option value="a">Apple</Option>
        </Select>
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
    });
  });

  // OptGroup
  it('should render OptGroup', () => {
    render(
      <Select defaultOpen>
        <OptGroup label="Fruits">
          <Option value="a">Apple</Option>
        </OptGroup>
        <OptGroup label="Vegetables">
          <Option value="b">Broccoli</Option>
        </OptGroup>
      </Select>
    );
    const groups = document.querySelectorAll('.ty-select-group__title');
    expect(groups.length).toBe(2);
  });

  // onSelect backward compat
  it('should call onSelect callback', () => {
    const onSelect = jest.fn();
    render(
      <Select onSelect={onSelect} defaultOpen>
        <Option value="a">Apple</Option>
      </Select>
    );
    const options = getOptions();
    fireEvent.click(options[0]);
    expect(onSelect).toHaveBeenCalledWith('a');
  });

  // scrollToSelected
  it('should set scrollTop when dropdown opens with a selected value', () => {
    const options = Array.from({ length: 50 }, (_, i) => ({
      value: `opt-${i}`,
      label: `Option ${i}`,
    }));

    const { container } = render(<Select options={options} defaultValue="opt-40" />);
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;

    // Mock offsetTop on selected option before opening
    const origDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetTop');
    Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
      configurable: true,
      get() {
        if (this.getAttribute?.('aria-selected') === 'true') return 400;
        return 0;
      },
    });

    fireEvent.click(selector);
    act(() => {
      jest.runAllTimers();
    });

    const dropdown = document.querySelector('.ty-select__dropdown') as HTMLElement;
    expect(dropdown.scrollTop).toBe(400);

    if (origDescriptor) {
      Object.defineProperty(HTMLElement.prototype, 'offsetTop', origDescriptor);
    }
  });

  it('should not scroll when scrollToSelected is false', () => {
    const options = Array.from({ length: 50 }, (_, i) => ({
      value: `opt-${i}`,
      label: `Option ${i}`,
    }));

    const { container } = render(
      <Select options={options} defaultValue="opt-40" scrollToSelected={false} />
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    act(() => {
      jest.runAllTimers();
    });

    const dropdown = document.querySelector('.ty-select__dropdown') as HTMLElement;
    expect(dropdown.scrollTop).toBe(0);
  });

  // Custom filter function
  it('should support custom filterOption function', () => {
    const { container } = render(
      <Select
        showSearch
        defaultOpen
        filterOption={(input, option) => option.value.startsWith(input)}>
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
      </Select>
    );
    const selector = container.querySelector('.ty-select__selector') as HTMLElement;
    fireEvent.click(selector);

    const searchInput = container.querySelector('.ty-select__search') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'b' } });

    const options = getOptions();
    expect(options.length).toBe(1);
    expect(options[0]).toHaveTextContent('Banana');
  });
});
