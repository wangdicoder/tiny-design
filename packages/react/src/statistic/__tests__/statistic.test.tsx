import React from 'react';
import { render } from '@testing-library/react';
import Statistic from '../index';

describe('<Statistic />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Statistic
        title="Monthly Revenue"
        description="Booked revenue across all active subscriptions."
        value={128430.5}
        format={{ type: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
        trend={{ direction: 'up', value: '+12.4%', label: 'vs last month', sentiment: 'positive' }}
        status={{ type: 'success', text: 'Healthy growth' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render currency formatting', () => {
    const { getByText } = render(
      <Statistic value={128430.5} format={{ type: 'currency', currency: 'USD', maximumFractionDigits: 2 }} />
    );
    expect(getByText('$128,430.50')).toBeInTheDocument();
  });

  it('should render percent formatting', () => {
    const { getByText } = render(
      <Statistic value={0.2386} format={{ type: 'percent', maximumFractionDigits: 2 }} />
    );
    expect(getByText('23.86%')).toBeInTheDocument();
  });

  it('should support custom formatter', () => {
    const formatter = jest.fn((_, info) => `${info.formattedValue} live`);
    const { getByText } = render(
      <Statistic value={112893} format={{ type: 'compact', maximumFractionDigits: 1 }} formatter={formatter} />
    );
    expect(getByText('112.9K live')).toBeInTheDocument();
    expect(formatter).toHaveBeenCalledWith(
      112893,
      expect.objectContaining({
        formattedValue: '112.9K',
        isNumeric: true,
      })
    );
  });

  it('should render loading skeleton', () => {
    const { container } = render(<Statistic title="Net Retention" loading />);
    expect(container.querySelector('.ty-skeleton')).toBeInTheDocument();
  });

  it('should render empty placeholder for null value', () => {
    const { getByText } = render(<Statistic value={null} empty="No data" />);
    expect(getByText('No data')).toBeInTheDocument();
  });

  it('should render error state before value', () => {
    const { getByText, queryByText } = render(
      <Statistic value={95} suffix="%" error="Feed unavailable" />
    );
    expect(getByText('Feed unavailable')).toBeInTheDocument();
    expect(queryByText('95')).not.toBeInTheDocument();
  });

  it('should render trend and status', () => {
    const { container, getByText } = render(
      <Statistic
        value={95}
        trend={{ direction: 'down', value: '-2%', label: 'vs yesterday', sentiment: 'negative' }}
        status={{ type: 'warning', text: 'Below target' }}
      />
    );
    expect(getByText('-2%')).toBeInTheDocument();
    expect(getByText('Below target')).toBeInTheDocument();
    expect(container.querySelector('.ty-statistic__trend_negative')).toBeInTheDocument();
    expect(container.querySelector('.ty-statistic__status_warning')).toBeInTheDocument();
  });

  it('should build aria label from the rendered metric content', () => {
    const { container } = render(
      <Statistic
        title="Revenue"
        value={128430.5}
        format={{ type: 'currency', currency: 'USD', maximumFractionDigits: 2 }}
        trend={{ direction: 'up', value: '+12.4%', label: 'vs last month' }}
        status={{ type: 'success', text: 'Healthy growth' }}
      />
    );

    expect(container.querySelector('.ty-statistic__content')).toHaveAttribute(
      'aria-label',
      'Revenue, $128,430.50, up +12.4% vs last month, success Healthy growth'
    );
  });
});
