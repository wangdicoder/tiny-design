import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CollapseTransition from '../index';

describe('<CollapseTransition />', () => {
  it('should render open content', () => {
    const { container } = render(
      <CollapseTransition open>
        <div>Visible Content</div>
      </CollapseTransition>
    );

    expect(container.firstChild).toHaveClass('ty-collapse-transition');
  });

  it('should call onHidden after a close transition', () => {
    const onHidden = jest.fn();
    const { container, rerender } = render(
      <CollapseTransition open onHidden={onHidden}>
        <div>Visible Content</div>
      </CollapseTransition>
    );

    rerender(
      <CollapseTransition open={false} onHidden={onHidden}>
        <div>Visible Content</div>
      </CollapseTransition>
    );

    const node = container.firstChild as Element;
    const event = new Event('transitionend');
    Object.defineProperty(event, 'propertyName', { value: 'height' });
    fireEvent(node, event);

    expect(onHidden).toHaveBeenCalledTimes(1);
  });
});
