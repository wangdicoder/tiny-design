import React from 'react';
import { render } from '@testing-library/react';
import Statistic from '../index';

describe('<Statistic />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Statistic title="Active Users" value={112893} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Statistic title="Score" value={95} />);
    expect(container.firstChild).toHaveClass('ty-statistic');
  });

  it('should render title', () => {
    const { getByText } = render(<Statistic title="Total Sales" value={1000} />);
    expect(getByText('Total Sales')).toBeInTheDocument();
  });

  it('should format value with group separator', () => {
    const { getByText } = render(<Statistic value={112893} />);
    expect(getByText('112,893')).toBeInTheDocument();
  });

  it('should format value with precision', () => {
    const { getByText } = render(<Statistic value={11.28} precision={2} />);
    expect(getByText('11.28')).toBeInTheDocument();
  });

  it('should support custom decimal separator', () => {
    const { getByText } = render(
      <Statistic value={112893.5} precision={1} groupSeparator="." decimalSeparator="," />
    );
    expect(getByText('112.893,5')).toBeInTheDocument();
  });

  it('should render prefix and suffix', () => {
    const { getByText } = render(
      <Statistic value={100} prefix="$" suffix="USD" />
    );
    expect(getByText('$')).toBeInTheDocument();
    expect(getByText('USD')).toBeInTheDocument();
  });

  it('should use custom formatter', () => {
    const formatter = (val: number | string) => `${val}%`;
    const { getByText } = render(<Statistic value={95} formatter={formatter} />);
    expect(getByText('95%')).toBeInTheDocument();
  });

  it('should pass formatting info to formatter', () => {
    const formatter = jest.fn((_: number | string, info) => info.formattedValue);
    const { getByText } = render(<Statistic value={2386.4} precision={1} formatter={formatter} />);
    expect(getByText('2,386.4')).toBeInTheDocument();
    expect(formatter).toHaveBeenCalledWith(
      2386.4,
      expect.objectContaining({
        formattedValue: '2,386.4',
        groupSeparator: ',',
        decimalSeparator: '.',
        precision: 1,
        isNumeric: true,
      })
    );
  });

  it('should render string value', () => {
    const { getByText } = render(<Statistic value="N/A" />);
    expect(getByText('N/A')).toBeInTheDocument();
  });

  it('should render empty placeholder for invalid number', () => {
    const { getByText } = render(<Statistic value={Number.NaN} />);
    expect(getByText('--')).toBeInTheDocument();
  });

  it('should support custom empty placeholder', () => {
    const { getByText } = render(<Statistic empty="Pending" />);
    expect(getByText('Pending')).toBeInTheDocument();
  });

  it('should apply value class name', () => {
    const { container } = render(<Statistic value={95} valueClassName="custom-value" />);
    expect(container.querySelector('.ty-statistic__content')).toHaveClass('custom-value');
  });
});
