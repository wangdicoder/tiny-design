import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorPicker from '../index';
import { parseColor } from '../utils';

describe('<ColorPicker />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<ColorPicker defaultValue="#ff0000" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<ColorPicker />);
    expect(container.firstChild).toHaveClass('ty-color-picker');
  });

  it('should render swatch with color', () => {
    const { container } = render(<ColorPicker defaultValue="#ff0000" />);
    const swatch = container.querySelector('.ty-color-picker__swatch-inner');
    expect(swatch).toBeTruthy();
  });

  it('should open panel on click', () => {
    const { container } = render(<ColorPicker />);
    const trigger = container.querySelector('.ty-color-picker__trigger');
    fireEvent.click(trigger!);
    expect(document.body.querySelector('.ty-color-picker__panel')).toBeTruthy();
  });

  it('should render disabled', () => {
    const { container } = render(<ColorPicker disabled />);
    expect(container.firstChild).toHaveClass('ty-color-picker_disabled');
  });

  it('should render presets', () => {
    render(<ColorPicker open presets={['#ff0000', '#00ff00', '#0000ff']} />);
    const presets = document.body.querySelectorAll('.ty-color-picker__preset');
    expect(presets.length).toBe(3);
  });

  it('should parse oklch values into a dark neutral color instead of the red fallback', () => {
    const color = parseColor('oklch(0.205 0 0)');
    expect(color.s).toBe(0);
    expect(color.b).toBeLessThan(20);
  });
});
