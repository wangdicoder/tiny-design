import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DatePicker from '../index';

describe('<DatePicker />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<DatePicker defaultValue={new Date(2024, 0, 15)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<DatePicker />);
    expect(container.firstChild).toHaveClass('ty-date-picker');
  });

  it('should render input', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('should render disabled', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.firstChild).toHaveClass('ty-date-picker_disabled');
    expect(container.querySelector('input')).toBeDisabled();
  });

  it('should render placeholder', () => {
    const { container } = render(<DatePicker placeholder="Pick a date" />);
    expect(container.querySelector('input')?.getAttribute('placeholder')).toBe('Pick a date');
  });

  it('should open dropdown on click', () => {
    const { container } = render(<DatePicker />);
    const input = container.querySelector('.ty-date-picker__input');
    input && fireEvent.click(input);
    expect(document.querySelector('.ty-date-picker__dropdown')).toBeInTheDocument();
  });

  it('should render formatted value', () => {
    const date = new Date(2024, 0, 15);
    const { container } = render(<DatePicker defaultValue={date} />);
    expect(container.querySelector('input')?.value).toBe('2024-01-15');
  });

  it('should render different sizes', () => {
    const { container: sm } = render(<DatePicker size="sm" />);
    expect(sm.firstChild).toHaveClass('ty-date-picker_sm');

    const { container: lg } = render(<DatePicker size="lg" />);
    expect(lg.firstChild).toHaveClass('ty-date-picker_lg');
  });

  it('should show Today button by default', () => {
    render(<DatePicker open />);
    expect(document.querySelector('.ty-date-picker__today-btn')).toBeInTheDocument();
  });

  it('should hide Today button when showToday is false', () => {
    render(<DatePicker open showToday={false} />);
    expect(document.querySelector('.ty-date-picker__today-btn')).toBeNull();
  });

  it('should call onOpenChange', () => {
    const fn = jest.fn();
    const { container } = render(<DatePicker onOpenChange={fn} />);
    const input = container.querySelector('.ty-date-picker__input');
    input && fireEvent.click(input);
    expect(fn).toHaveBeenCalledWith(true);
  });

  it('should close on outside click', async () => {
    const { container } = render(
      <div>
        <DatePicker />
        <button>Outside</button>
      </div>
    );

    const input = container.querySelector('.ty-date-picker__input');
    input && fireEvent.click(input);
    expect(document.querySelector('.ty-date-picker__dropdown')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(document.querySelector('.ty-date-picker__dropdown')).not.toBeInTheDocument();
    });
  });

  it('should format month picker', () => {
    const { container } = render(<DatePicker picker="month" defaultValue={new Date(2024, 5, 1)} />);
    expect(container.querySelector('input')?.value).toBe('2024-06');
  });

  it('should format year picker', () => {
    const { container } = render(<DatePicker picker="year" defaultValue={new Date(2024, 0, 1)} />);
    expect(container.querySelector('input')?.value).toBe('2024');
  });

  it('should clear value', () => {
    const fn = jest.fn();
    const { container } = render(<DatePicker defaultValue={new Date(2024, 0, 15)} onChange={fn} />);
    const clear = container.querySelector('.ty-date-picker__clear');
    clear && fireEvent.click(clear);
    expect(fn).toHaveBeenCalledWith(null, '');
  });

  it('should render range value', () => {
    const { container } = render(<DatePicker range defaultValue={[new Date(2024, 0, 10), new Date(2024, 0, 15)]} />);
    expect(container.querySelector('input')?.value).toBe('2024-01-10 ~ 2024-01-15');
  });

  it('should select a date range', () => {
    const fn = jest.fn();
    const { container } = render(<DatePicker range open onChange={fn} defaultValue={[new Date(2024, 0, 1), null]} />);
    const input = container.querySelector('.ty-date-picker__input');
    input && fireEvent.click(input);

    const dayCells = Array.from(document.querySelectorAll('.ty-date-picker__cell.ty-date-picker__cell_in-view'));
    const startCell = dayCells.find((cell) => cell.textContent?.trim() === '10');
    startCell && fireEvent.click(startCell);

    expect(fn).toHaveBeenCalledWith([expect.any(Date), expect.any(Date)], ['2024-01-01', '2024-01-10']);

    const endCell = dayCells.find((cell) => cell.textContent?.trim() === '15');
    endCell && fireEvent.click(endCell);

    expect(fn).toHaveBeenLastCalledWith([expect.any(Date), null], ['2024-01-15', '']);
  });
});
