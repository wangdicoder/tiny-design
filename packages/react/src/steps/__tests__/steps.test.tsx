import React from 'react';
import { render } from '@testing-library/react';
import { markComponent, STEPS_ITEM_MARK } from '../../_utils/component-markers';
import Steps from '../index';

describe('<Steps />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Steps current={1}>
        <Steps.Step title="Step 1" />
        <Steps.Step title="Step 2" />
        <Steps.Step title="Step 3" />
      </Steps>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Steps current={0}>
        <Steps.Step title="Step 1" />
      </Steps>
    );
    expect(container.firstChild).toHaveClass('ty-steps');
  });

  it('should render items', () => {
    const { getByText } = render(
      <Steps current={0}>
        <Steps.Step title="First" />
        <Steps.Step title="Second" />
      </Steps>
    );
    expect(getByText('First')).toBeInTheDocument();
    expect(getByText('Second')).toBeInTheDocument();
  });

  it('should recognize marker-based step wrappers', () => {
    const WrappedStep = markComponent(
      (props: React.ComponentProps<typeof Steps.Step>) => <Steps.Step {...props} />,
      STEPS_ITEM_MARK
    );

    const { getByText } = render(
      <Steps current={0}>
        <WrappedStep title="Wrapped Step" />
      </Steps>
    );

    expect(getByText('Wrapped Step')).toBeInTheDocument();
  });
});
