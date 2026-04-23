import React from 'react';
import { render } from '@testing-library/react';
import { FLIP_ITEM_MARK, markComponent } from '../../_utils/component-markers';
import Flip from '../index';

describe('<Flip />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front</div></Flip.Item>
        <Flip.Item><div>Back</div></Flip.Item>
      </Flip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front</div></Flip.Item>
        <Flip.Item><div>Back</div></Flip.Item>
      </Flip>
    );
    expect(container.firstChild).toHaveClass('ty-flip');
  });

  it('should render content', () => {
    const { getByText } = render(
      <Flip width={200} height={200}>
        <Flip.Item><div>Front Side</div></Flip.Item>
        <Flip.Item><div>Back Side</div></Flip.Item>
      </Flip>
    );
    expect(getByText('Front Side')).toBeInTheDocument();
    expect(getByText('Back Side')).toBeInTheDocument();
  });

  it('should recognize marker-based flip item wrappers', () => {
    const WrappedItem = markComponent(
      (props: React.ComponentProps<typeof Flip.Item>) => <Flip.Item {...props} />,
      FLIP_ITEM_MARK
    );

    const { getByText } = render(
      <Flip width={200} height={200}>
        <WrappedItem><div>Front Wrapped</div></WrappedItem>
        <WrappedItem><div>Back Wrapped</div></WrappedItem>
      </Flip>
    );

    expect(getByText('Front Wrapped')).toBeInTheDocument();
    expect(getByText('Back Wrapped')).toBeInTheDocument();
  });
});
