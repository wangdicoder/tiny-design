import React from 'react';
import { render } from '@testing-library/react';
import { ANCHOR_LINK_MARK, markComponent } from '../../_utils/component-markers';
import Anchor from '../index';

describe('<Anchor />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Anchor>
        <Anchor.Link href="#section1" title="Section 1" />
        <Anchor.Link href="#section2" title="Section 2" />
      </Anchor>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Anchor>
        <Anchor.Link href="#section1" title="Section 1" />
      </Anchor>
    );
    expect(container.querySelector('.ty-anchor')).toBeInTheDocument();
  });

  it('should render links', () => {
    const { getByText } = render(
      <Anchor>
        <Anchor.Link href="#s1" title="Link 1" />
        <Anchor.Link href="#s2" title="Link 2" />
      </Anchor>
    );
    expect(getByText('Link 1')).toBeInTheDocument();
    expect(getByText('Link 2')).toBeInTheDocument();
  });

  it('should recognize marker-based link wrappers', () => {
    const WrappedLink = markComponent(
      (props: React.ComponentProps<typeof Anchor.Link>) => <Anchor.Link {...props} />,
      ANCHOR_LINK_MARK
    );

    const { getByText } = render(
      <Anchor>
        <WrappedLink href="#s1" title="Wrapped Link" />
      </Anchor>
    );

    expect(getByText('Wrapped Link')).toBeInTheDocument();
  });

  it('should forward ref to root list element', () => {
    const ref = React.createRef<HTMLUListElement>();

    render(
      <Anchor ref={ref}>
        <Anchor.Link href="#section1" title="Section 1" />
      </Anchor>
    );

    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });
});
