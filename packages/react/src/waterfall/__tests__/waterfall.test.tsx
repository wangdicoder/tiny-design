import React from 'react';
import { render } from '@testing-library/react';
import Waterfall from '../index';
import { WaterfallItem } from '../types';

const items: WaterfallItem[] = [
  { key: '1', data: 100 },
  { key: '2', data: 150 },
  { key: '3', data: 80 },
  { key: '4', data: 120 },
  { key: '5', data: 90 },
];

describe('<Waterfall />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Waterfall
        columns={3}
        gutter={16}
        items={items}
        itemRender={({ data, index }) => (
          <div style={{ height: data }}>{index + 1}</div>
        )}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct number of items', () => {
    const { container } = render(
      <Waterfall
        columns={3}
        items={items}
        itemRender={({ data, index }) => (
          <div style={{ height: data }}>{index + 1}</div>
        )}
      />,
    );
    expect(container.querySelectorAll('.ty-waterfall__item')).toHaveLength(5);
  });

  it('should apply correct prefix class', () => {
    const { container } = render(
      <Waterfall columns={2} items={items} itemRender={() => <div />} />,
    );
    expect(container.firstChild).toHaveClass('ty-waterfall');
  });

  it('should accept custom className and style', () => {
    const { container } = render(
      <Waterfall
        className="custom-cls"
        style={{ background: 'red' }}
        columns={2}
        items={items}
        itemRender={() => <div />}
      />,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('ty-waterfall');
    expect(el).toHaveClass('custom-cls');
    expect(el.style.background).toBe('red');
  });

  it('should render items with children prop directly', () => {
    const itemsWithChildren: WaterfallItem[] = [
      { key: '1', children: <span>Direct Content</span> },
    ];
    const { getByText } = render(
      <Waterfall columns={2} items={itemsWithChildren} />,
    );
    expect(getByText('Direct Content')).toBeInTheDocument();
  });

  it('should render empty when no items provided', () => {
    const { container } = render(<Waterfall columns={3} />);
    expect(container.querySelectorAll('.ty-waterfall__item')).toHaveLength(0);
  });
});
