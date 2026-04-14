import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../button';
import { IconWifi, IconArrowRight, IconLoader3quarter } from '@tiny-design/icons';

describe('<Button />', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(<Button>Default</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('button variants and colors', () => {
    it('should render default button by default', () => {
      const { container } = render(<Button>Default Button</Button>);
      expect(container.firstChild).toHaveClass('ty-btn');
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-default');
    });

    it('should render primary button', () => {
      const { container } = render(
        <Button variant="solid" color="primary">
          Primary Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-primary');
    });

    it('should render outline button', () => {
      const { container } = render(
        <Button variant="outline" color="primary">
          Outline Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-outline', 'ty-btn_color-primary');
    });

    it('should render ghost button', () => {
      const { container } = render(
        <Button variant="ghost" color="primary">
          Ghost Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-ghost', 'ty-btn_color-primary');
    });

    it('should render link button', () => {
      const { container } = render(
        <Button variant="link" color="primary">
          Link Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-link', 'ty-btn_color-primary');
    });

    it('should render success button', () => {
      const { container } = render(
        <Button variant="solid" color="success">
          Success Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-success');
    });

    it('should render info button', () => {
      const { container } = render(
        <Button variant="solid" color="info">
          Info Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-info');
    });

    it('should render warning button', () => {
      const { container } = render(
        <Button variant="solid" color="warning">
          Warning Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-warning');
    });

    it('should render danger button', () => {
      const { container } = render(
        <Button variant="solid" color="danger">
          Danger Button
        </Button>
      );
      expect(container.firstChild).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-danger');
    });
  });

  describe('button size', () => {
    it('should render medium size by default', () => {
      const { container } = render(<Button>Medium Button</Button>);
      expect(container.firstChild).toHaveClass('ty-btn_md');
    });

    it('should render small size', () => {
      const { container } = render(<Button size="sm">Small Button</Button>);
      expect(container.firstChild).toHaveClass('ty-btn_sm');
    });

    it('should render large size', () => {
      const { container } = render(<Button size="lg">Large Button</Button>);
      expect(container.firstChild).toHaveClass('ty-btn_lg');
    });
  });

  it('should have loading icon', () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(container.firstChild).toHaveClass('ty-btn_loading');
    expect(container.firstChild).toBeDisabled();
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('.ty-btn__loader')).toBeTruthy();
  });

  it('should have icon placement', () => {
    const { container } = render(<Button icon={<IconWifi />}>Icon</Button>);
    expect(container.querySelector('.ty-btn__icon-container')).toBeTruthy();
  });

  it('should support end icon placement', () => {
    const { container } = render(
      <Button icon={<IconArrowRight />} iconPosition="end">
        Next
      </Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('ty-btn_icon-end');
    expect(button.firstElementChild).toHaveClass('ty-btn__children');
    expect(button.lastElementChild).toHaveClass('ty-btn__icon-container');
  });

  it('should render custom loading icon', () => {
    const { container } = render(
      <Button loading loadingIcon={<IconLoader3quarter data-testid="custom-loader" />}>
        Loading
      </Button>
    );
    expect(container.querySelector('[data-testid="custom-loader"]')).toBeTruthy();
    expect(container.querySelector('.ty-btn__loader')).toBeFalsy();
  });

  it('should be disabled', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.firstChild).toHaveClass('ty-btn_disabled');
    expect(container.firstChild).toBeDisabled();
  });

  it('should be a block style', () => {
    const { container } = render(<Button block>Block</Button>);
    expect(container.firstChild).toHaveClass('ty-btn_block');
  });

  it('should fire event when clicking the button', () => {
    const fn = jest.fn();
    const { container } = render(<Button onClick={fn}>Button</Button>);

    const btn = container.firstChild;
    btn && fireEvent.click(btn);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should not fire event when loading', () => {
    const fn = jest.fn();
    const { container } = render(
      <Button loading onClick={fn}>
        Button
      </Button>
    );
    const btn = container.firstChild;
    btn && fireEvent.click(btn);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should support shape prop and round compatibility', () => {
    const { container, rerender } = render(
      <Button shape="circle" icon={<IconWifi />} aria-label="Wifi" />
    );
    expect(container.firstChild).toHaveClass('ty-btn_circle');

    rerender(<Button round>Round</Button>);
    expect(container.firstChild).toHaveClass('ty-btn_round');
  });

  it('should forward ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toContain('Ref');
  });

  it('should pass through native type attribute', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    expect(container.firstChild).toHaveAttribute('type', 'submit');
  });

  it('should warn for icon-only buttons without accessible name', () => {
    render(<Button icon={<IconWifi />} />);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('should not warn for icon-only buttons with accessible name', () => {
    render(<Button icon={<IconWifi />} aria-label="Wifi" />);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
