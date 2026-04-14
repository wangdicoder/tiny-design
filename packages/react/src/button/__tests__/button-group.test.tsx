import React from 'react';
import { render } from '@testing-library/react';
import Button from '../button';
import ButtonGroup from '../button-group';

describe('<ButtonGroup />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <ButtonGroup>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render two buttons', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(container.querySelectorAll('.ty-btn_variant-solid.ty-btn_color-default').length).toBe(2);
  });

  it('should render correct type of buttons', () => {
    const { container } = render(
      <ButtonGroup variant="solid" color="primary">
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(container.querySelectorAll('.ty-btn_variant-solid.ty-btn_color-primary').length).toBe(2);
  });

  it('should render correct size of buttons', () => {
    const { container } = render(
      <ButtonGroup size="lg">
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(container.querySelectorAll('.ty-btn_lg').length).toBe(2);
  });

  it('should render correct disabled of buttons', () => {
    const { container } = render(
      <ButtonGroup disabled>
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(container.querySelectorAll('.ty-btn_disabled').length).toBe(2);
  });

  it('should only disable one button when group disabled is not set', () => {
    const { container } = render(
      <ButtonGroup>
        <Button disabled>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
    );
    expect(container.querySelectorAll('.ty-btn_disabled').length).toBe(1);
  });

  it('should fill missing child props by default', () => {
    const { container } = render(
      <ButtonGroup variant="solid" color="primary" size="lg" disabled shape="round">
        <Button>Inherited</Button>
        <Button variant="solid" color="danger" disabled={false}>
          Override
        </Button>
      </ButtonGroup>
    );

    const buttons = container.querySelectorAll('.ty-btn');
    expect(buttons[0]).toHaveClass(
      'ty-btn_variant-solid',
      'ty-btn_color-primary',
      'ty-btn_lg',
      'ty-btn_round',
      'ty-btn_disabled'
    );
    expect(buttons[1]).toHaveClass(
      'ty-btn_variant-solid',
      'ty-btn_color-danger',
      'ty-btn_lg',
      'ty-btn_round'
    );
    expect(buttons[1]).not.toHaveClass('ty-btn_disabled');
  });

  it('should override child props when inheritMode is override', () => {
    const { container } = render(
      <ButtonGroup variant="solid" color="primary" size="lg" disabled inheritMode="override">
        <Button variant="solid" color="danger" size="sm" disabled={false}>
          Override
        </Button>
      </ButtonGroup>
    );

    const button = container.querySelector('.ty-btn');
    expect(button).toHaveClass(
      'ty-btn_variant-solid',
      'ty-btn_color-primary',
      'ty-btn_lg',
      'ty-btn_disabled'
    );
    expect(button).not.toHaveClass('ty-btn_color-danger', 'ty-btn_sm');
  });

  it('should skip inheritance when inheritMode is none', () => {
    const { container } = render(
      <ButtonGroup variant="solid" color="primary" size="lg" disabled inheritMode="none">
        <Button>Default</Button>
      </ButtonGroup>
    );

    const button = container.querySelector('.ty-btn');
    expect(button).toHaveClass('ty-btn_variant-solid', 'ty-btn_color-default', 'ty-btn_md');
    expect(button).not.toHaveClass('ty-btn_color-primary', 'ty-btn_lg', 'ty-btn_disabled');
  });
});
