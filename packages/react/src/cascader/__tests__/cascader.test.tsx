import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Cascader from '../index';
import ConfigProvider from '../../config-provider';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
];

describe('<Cascader />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Cascader options={options} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Cascader options={options} />);
    expect(container.firstChild).toHaveClass('ty-cascader');
  });

  it('should render placeholder', () => {
    const { getByText } = render(<Cascader options={options} placeholder="Select location" />);
    expect(getByText('Select location')).toBeInTheDocument();
  });

  it('should open dropdown on click', () => {
    const { container } = render(<Cascader options={options} />);
    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    expect(document.body.querySelector('.ty-cascader__dropdown')).toBeTruthy();
  });

  it('should open on ArrowDown and close on Escape from the selector', async () => {
    const { container } = render(<Cascader options={options} />);
    const selector = container.querySelector('.ty-cascader__selector') as HTMLElement;

    fireEvent.keyDown(selector, { key: 'ArrowDown' });
    expect(document.body.querySelector('.ty-cascader__dropdown')).toBeTruthy();

    fireEvent.keyDown(selector, { key: 'Escape' });
    await waitFor(() => {
      expect(container.querySelector('.ty-cascader')).not.toHaveClass('ty-cascader_open');
    });
  });

  it('should render first level options', () => {
    const { container, getByText } = render(<Cascader options={options} />);
    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    expect(getByText('Zhejiang')).toBeInTheDocument();
    expect(getByText('Jiangsu')).toBeInTheDocument();
  });

  it('should expand on option click', () => {
    const { container, getByText } = render(<Cascader options={options} />);
    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    fireEvent.click(getByText('Zhejiang'));
    expect(getByText('Hangzhou')).toBeInTheDocument();
  });

  it('should render disabled', () => {
    const { container } = render(<Cascader options={options} disabled />);
    expect(container.firstChild).toHaveClass('ty-cascader_disabled');
  });

  it('should clear the selected value when allowClear is clicked', () => {
    const onChange = jest.fn();
    const { container, queryByText } = render(
      <Cascader
        options={options}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        allowClear
        onChange={onChange}
      />
    );

    const clearButton = container.querySelector('.ty-cascader__clear') as HTMLButtonElement;

    expect(clearButton).toHaveAttribute('aria-label', 'Clear selection');
    expect(clearButton.querySelector('svg')).toBeTruthy();

    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith([], []);
    expect(queryByText('Zhejiang / Hangzhou / West Lake')).not.toBeInTheDocument();
  });

  it('should close on outside click', async () => {
    const { container } = render(
      <div>
        <Cascader options={options} />
        <button>Outside</button>
      </div>
    );

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    expect(document.body.querySelector('.ty-cascader__dropdown')).toBeTruthy();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(container.querySelector('.ty-cascader')).not.toHaveClass('ty-cascader_open');
    });
  });

  it('should display selected value', () => {
    const { getByText } = render(
      <Cascader options={options} value={['zhejiang', 'hangzhou', 'xihu']} />
    );
    expect(getByText('Zhejiang / Hangzhou / West Lake')).toBeInTheDocument();
  });

  it('should update value on parent selection when changeOnSelect is enabled', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <Cascader options={options} changeOnSelect onChange={onChange} />
    );

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    fireEvent.click(getByText('Zhejiang'));

    expect(onChange).toHaveBeenCalledWith(
      ['zhejiang'],
      [expect.objectContaining({ value: 'zhejiang', label: 'Zhejiang' })]
    );
    expect(container.querySelector('.ty-cascader__display')).toHaveTextContent('Zhejiang');
    expect(document.body.querySelector('.ty-cascader__dropdown')).toBeTruthy();
    expect(getByText('Hangzhou')).toBeInTheDocument();
  });

  it('should keep the full path after selecting a child in controlled changeOnSelect mode', () => {
    const ChangeOnSelectControlledDemo = () => {
      const [value, setValue] = React.useState<(string | number)[]>([]);

      return (
        <Cascader
          options={options}
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          changeOnSelect
          placeholder="Select any level"
        />
      );
    };

    const { container, getByText } = render(<ChangeOnSelectControlledDemo />);

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    fireEvent.click(getByText('Zhejiang'));
    fireEvent.click(getByText('Hangzhou'));
    fireEvent.click(getByText('West Lake'));

    expect(container.querySelector('.ty-cascader__display')).toHaveTextContent(
      'Zhejiang / Hangzhou / West Lake'
    );
  });

  it('should preserve parent path when selecting a child after reopening in controlled changeOnSelect mode', () => {
    const ChangeOnSelectControlledDemo = () => {
      const [value, setValue] = React.useState<(string | number)[]>([]);

      return (
        <div>
          <Cascader
            options={options}
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            changeOnSelect
            placeholder="Select any level"
          />
          <button>Outside</button>
        </div>
      );
    };

    const { container, getByText } = render(<ChangeOnSelectControlledDemo />);

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    fireEvent.click(getByText('Jiangsu'));
    fireEvent.click(getByText('Outside'));
    fireEvent.click(selector!);
    fireEvent.click(getByText('Nanjing'));

    expect(container.querySelector('.ty-cascader__display')).toHaveTextContent(
      'Jiangsu / Nanjing'
    );
  });

  it('should respect the configured popup container', () => {
    const popupContainer = document.createElement('div');
    document.body.appendChild(popupContainer);

    const { container } = render(
      <ConfigProvider getPopupContainer={() => popupContainer}>
        <Cascader options={options} />
      </ConfigProvider>
    );

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);

    const dropdown = popupContainer.querySelector('.ty-cascader__dropdown');
    const popup = dropdown?.closest('.ty-popup');

    expect(dropdown).toBeTruthy();
    expect(popup?.parentElement).toBe(popupContainer);

    document.body.removeChild(popupContainer);
  });

  it('should call onDropdownVisibleChange when outside click closes dropdown', async () => {
    const onDropdownVisibleChange = jest.fn();

    const { container } = render(
      <div>
        <Cascader options={options} onDropdownVisibleChange={onDropdownVisibleChange} />
        <button>Outside</button>
      </div>
    );

    const selector = container.querySelector('.ty-cascader__selector');
    fireEvent.click(selector!);
    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(onDropdownVisibleChange).toHaveBeenCalledWith(false);
    });
  });
});
