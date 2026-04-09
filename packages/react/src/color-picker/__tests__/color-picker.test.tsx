import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ColorPicker from '../index';
import { formatColor, parseColor } from '../utils';

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

  it('should expose button dialog semantics and open with keyboard', () => {
    const { container } = render(<ColorPicker />);
    const trigger = container.querySelector('.ty-color-picker__trigger') as HTMLElement;

    fireEvent.keyDown(trigger, { key: 'Enter' });

    expect(trigger).toHaveAttribute('role', 'button');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls');
    expect(document.getElementById(trigger.getAttribute('aria-controls') || '')).toHaveAttribute('role', 'dialog');
  });

  it('should render disabled', () => {
    const { container } = render(<ColorPicker disabled />);
    expect(container.firstChild).toHaveClass('ty-color-picker_disabled');
  });

  it('should close panel on outside click', async () => {
    const { container } = render(
      <div>
        <ColorPicker />
        <button>Outside</button>
      </div>
    );

    const trigger = container.querySelector('.ty-color-picker__trigger');
    fireEvent.click(trigger!);
    expect(document.body.querySelector('.ty-color-picker__panel')).toBeTruthy();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(document.body.querySelector('.ty-color-picker__panel')).toBeNull();
    });
  });

  it('should call onOpenChange when outside click closes panel', async () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <div>
        <ColorPicker onOpenChange={onOpenChange} />
        <button>Outside</button>
      </div>
    );

    const trigger = container.querySelector('.ty-color-picker__trigger');
    fireEvent.click(trigger!);
    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
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

  it('should format color as oklch', () => {
    const color = parseColor('#1890ff');
    expect(formatColor(color, 'oklch')).toMatch(/^oklch\(/);
  });

  it('should call onChange with meta', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorPicker defaultValue="#1890ff" onChange={onChange} />);
    const trigger = container.querySelector('.ty-color-picker__trigger');
    fireEvent.click(trigger!);
    const preset = document.body.querySelector('.ty-color-picker__preset') as HTMLElement | null;

    if (preset) {
      fireEvent.click(preset);
    } else {
      const input = document.body.querySelector('.ty-color-picker__hex-input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '#ff0000' } });
    }

    expect(onChange).toHaveBeenCalled();
    const [, meta] = onChange.mock.calls.at(-1)!;
    expect(meta).toEqual(
      expect.objectContaining({
        format: 'hex',
        color: expect.objectContaining({ a: 1 }),
      })
    );
  });

  it('should only cycle through configured formats', () => {
    const onFormatChange = jest.fn();
    const { container } = render(
      <ColorPicker defaultValue="#1890ff" formats={['hex', 'oklch']} onFormatChange={onFormatChange} />
    );
    const trigger = container.querySelector('.ty-color-picker__trigger');
    fireEvent.click(trigger!);
    const button = document.body.querySelector('.ty-color-picker__format-btn') as HTMLButtonElement;
    fireEvent.click(button);
    expect(onFormatChange).toHaveBeenCalledWith('oklch');
  });

  it('should call onChangeComplete when preset is selected', () => {
    const onChangeComplete = jest.fn();
    const { container } = render(
      <ColorPicker open presets={['#ff0000']} onChangeComplete={onChangeComplete} />
    );

    const preset = document.body.querySelector('.ty-color-picker__preset') as HTMLElement;
    fireEvent.click(preset);

    expect(onChangeComplete).toHaveBeenCalled();
    const [, meta] = onChangeComplete.mock.calls[0];
    expect(meta).toEqual(expect.objectContaining({ format: 'hex' }));
  });
});
