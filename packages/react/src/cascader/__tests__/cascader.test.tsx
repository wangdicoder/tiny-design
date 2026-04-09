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
