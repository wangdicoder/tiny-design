import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TimePicker from '../index';

beforeAll(() => {
  Element.prototype.scrollTo = jest.fn();
});

describe('<TimePicker />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<TimePicker defaultValue={new Date(2024, 0, 1, 10, 30, 0)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<TimePicker />);
    expect(container.firstChild).toHaveClass('ty-time-picker');
  });

  it('should render input', () => {
    const { container } = render(<TimePicker />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should render disabled', () => {
    const { container } = render(<TimePicker disabled />);
    expect(container.firstChild).toHaveClass('ty-time-picker_disabled');
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('should render placeholder', () => {
    const { container } = render(<TimePicker placeholder="Choose time" />);
    expect(container.querySelector('input')?.getAttribute('placeholder')).toBe('Choose time');
  });

  it('should open dropdown on click', () => {
    const { container } = render(<TimePicker />);
    const input = container.querySelector('.ty-time-picker__input');
    input && fireEvent.click(input);
    expect(document.querySelector('.ty-time-picker__dropdown')).toBeInTheDocument();
  });

  it('should render formatted time', () => {
    const date = new Date(2024, 0, 1, 14, 30, 45);
    const { container } = render(<TimePicker defaultValue={date} />);
    expect(container.querySelector('input')?.value).toBe('14:30:45');
  });

  it('should render different sizes', () => {
    const { container: sm } = render(<TimePicker size="sm" />);
    expect(sm.firstChild).toHaveClass('ty-time-picker_sm');

    const { container: lg } = render(<TimePicker size="lg" />);
    expect(lg.firstChild).toHaveClass('ty-time-picker_lg');
  });

  it('should hide seconds column when format excludes seconds', () => {
    render(<TimePicker format="HH:mm" open />);
    const columns = document.querySelectorAll('.ty-time-picker__column');
    expect(columns.length).toBe(2);
  });

  it('should show three columns by default', () => {
    render(<TimePicker open />);
    const columns = document.querySelectorAll('.ty-time-picker__column');
    expect(columns.length).toBe(3);
  });

  it('should render step intervals', () => {
    render(<TimePicker hourStep={2} open />);
    const cells = document.querySelectorAll('.ty-time-picker__column:first-child .ty-time-picker__cell');
    expect(cells.length).toBe(12); // 24 / 2
  });

  it('should call onOpenChange', () => {
    const fn = jest.fn();
    const { container } = render(<TimePicker onOpenChange={fn} />);
    const input = container.querySelector('.ty-time-picker__input');
    input && fireEvent.click(input);
    expect(fn).toHaveBeenCalledWith(true);
  });

  it('should close on outside click', async () => {
    const { container } = render(
      <div>
        <TimePicker />
        <button>Outside</button>
      </div>
    );

    const input = container.querySelector('.ty-time-picker__input');
    input && fireEvent.click(input);
    expect(document.querySelector('.ty-time-picker__dropdown')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(document.querySelector('.ty-time-picker__dropdown')).not.toBeInTheDocument();
    });
  });

  it('should clear value on clear button click', () => {
    const fn = jest.fn();
    const { container } = render(
      <TimePicker defaultValue={new Date(2024, 0, 1, 10, 0, 0)} onChange={fn} />
    );
    const clear = container.querySelector('.ty-time-picker__clear');
    clear && fireEvent.click(clear);
    expect(fn).toHaveBeenCalledWith(null);
  });
});
