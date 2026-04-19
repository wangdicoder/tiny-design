import React from 'react';
import { render } from '@testing-library/react';
import Link from '../index';

describe('<Link />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Link href="#">Link</Link>);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('external', () => {
    it('should set _blank to target attribute by default', () => {
      const { container } = render(<Link>Link</Link>);
      expect(container.firstChild).toHaveAttribute('target', '_blank');
    });

    it('should set _self to target attribute by default', () => {
      const { container } = render(<Link external={false}>Link</Link>);
      expect(container.firstChild).toHaveAttribute('target', '_self');
    });
  });

  it('should be disabled', () => {
    const { container } = render(<Link disabled>Link</Link>);
    expect(container.firstChild).toHaveClass('ty-link_disabled');
  });

  it('should forward ref to anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement | HTMLSpanElement>();
    render(<Link ref={ref} href="#">Link</Link>);

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('should forward ref to disabled fallback element', () => {
    const ref = React.createRef<HTMLAnchorElement | HTMLSpanElement>();
    render(<Link ref={ref} disabled>Link</Link>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
