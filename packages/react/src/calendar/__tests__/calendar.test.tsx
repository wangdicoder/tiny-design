import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../index';

describe('<Calendar />', () => {
  // ── Existing tests ──────────────────────────────────────────────────────

  it('should match the snapshot', () => {
    const { asFragment } = render(<Calendar value={new Date(2024, 0, 15)} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(<Calendar />);
    expect(container.firstChild).toHaveClass('ty-calendar');
  });

  it('should render fullscreen by default', () => {
    const { container } = render(<Calendar />);
    expect(container.firstChild).toHaveClass('ty-calendar_fullscreen');
  });

  it('should render as card', () => {
    const { container } = render(<Calendar fullscreen={false} />);
    expect(container.firstChild).toHaveClass('ty-calendar_card');
  });

  it('should render week headers', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Su')).toBeInTheDocument();
    expect(getByText('Mo')).toBeInTheDocument();
  });

  it('should call onChange when date selected', () => {
    const onChange = jest.fn();
    const { container } = render(<Calendar value={new Date(2024, 0, 15)} onChange={onChange} />);
    const cells = container.querySelectorAll('.ty-calendar__cell_in-view');
    if (cells.length > 0) {
      fireEvent.click(cells[0]);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('should switch to year mode', () => {
    const { container } = render(<Calendar value={new Date(2024, 0, 15)} />);
    const titleBtn = container.querySelector('.ty-calendar__title-btn');
    fireEvent.click(titleBtn!);
    expect(container.querySelector('.ty-calendar__months')).toBeTruthy();
  });

  // ── weekStartsOn ───────────────────────────────────────────────────────

  it('should start weeks on Monday when weekStartsOn={1}', () => {
    const { container } = render(<Calendar weekStartsOn={1} value={new Date(2024, 0, 15)} />);
    const headers = container.querySelectorAll('.ty-calendar__cell-header');
    expect(headers[0].textContent).toBe('Mo');
    expect(headers[6].textContent).toBe('Su');
  });

  // ── showWeekNumber ─────────────────────────────────────────────────────

  it('should render week numbers when showWeekNumber is true', () => {
    const { container } = render(<Calendar showWeekNumber value={new Date(2024, 0, 15)} />);
    const weekNumCells = container.querySelectorAll('.ty-calendar__week-number');
    expect(weekNumCells.length).toBeGreaterThan(0);
    // Week number header
    const weekNumHeader = container.querySelector('.ty-calendar__week-number-header');
    expect(weekNumHeader).toBeTruthy();
    expect(weekNumHeader!.textContent).toBe('#');
  });

  // ── Range selection ────────────────────────────────────────────────────

  it('should support range selection mode', () => {
    const onRangeChange = jest.fn();
    const { container } = render(
      <Calendar
        selectionMode="range"
        value={new Date(2024, 0, 15)}
        onRangeChange={onRangeChange}
      />
    );
    const cells = container.querySelectorAll('.ty-calendar__cell_in-view');
    // Click first date to start range
    fireEvent.click(cells[4]);
    // Click second date to end range
    fireEvent.click(cells[10]);
    expect(onRangeChange).toHaveBeenCalledTimes(1);
    const args = onRangeChange.mock.calls[0][0] as [Date, Date];
    expect(args[0]).toBeInstanceOf(Date);
    expect(args[1]).toBeInstanceOf(Date);
  });

  // ── Multiple selection ─────────────────────────────────────────────────

  it('should support multiple selection mode', () => {
    const onMultipleChange = jest.fn();
    const { container } = render(
      <Calendar
        selectionMode="multiple"
        value={new Date(2024, 0, 15)}
        onMultipleChange={onMultipleChange}
      />
    );
    const cells = container.querySelectorAll('.ty-calendar__cell_in-view');
    fireEvent.click(cells[2]);
    expect(onMultipleChange).toHaveBeenCalledTimes(1);
    expect(onMultipleChange.mock.calls[0][0]).toHaveLength(1);
    fireEvent.click(cells[5]);
    expect(onMultipleChange).toHaveBeenCalledTimes(2);
    expect(onMultipleChange.mock.calls[1][0]).toHaveLength(2);
  });

  // ── showToday ──────────────────────────────────────────────────────────

  it('should render Today button when showToday is true', () => {
    const { container } = render(<Calendar showToday value={new Date(2024, 0, 15)} />);
    const todayBtn = container.querySelector('.ty-calendar__today-link');
    expect(todayBtn).toBeTruthy();
    expect(todayBtn!.textContent).toBe('Today');
  });

  // ── Decade panel ───────────────────────────────────────────────────────

  it('should navigate to decade panel', () => {
    const { container } = render(<Calendar value={new Date(2024, 0, 15)} />);
    const titleBtn = container.querySelector('.ty-calendar__title-btn');
    // month → year
    fireEvent.click(titleBtn!);
    expect(container.querySelector('.ty-calendar__months')).toBeTruthy();
    // year → decade
    const titleBtn2 = container.querySelector('.ty-calendar__title-btn');
    fireEvent.click(titleBtn2!);
    expect(container.querySelector('.ty-calendar__decades')).toBeTruthy();
    const decadeCells = container.querySelectorAll('.ty-calendar__decade-cell');
    expect(decadeCells.length).toBe(12);
  });

  // ── validRange ─────────────────────────────────────────────────────────

  it('should disable dates outside validRange', () => {
    const min = new Date(2024, 0, 10);
    const max = new Date(2024, 0, 20);
    const { container } = render(<Calendar validRange={[min, max]} value={new Date(2024, 0, 15)} />);
    const disabledCells = container.querySelectorAll('.ty-calendar__cell_disabled');
    expect(disabledCells.length).toBeGreaterThan(0);
  });

  it('should disable nav buttons at validRange boundaries', () => {
    const min = new Date(2024, 0, 1);
    const max = new Date(2024, 0, 31);
    const { container } = render(<Calendar validRange={[min, max]} value={new Date(2024, 0, 15)} />);
    const navBtns = container.querySelectorAll('.ty-calendar__nav-btn');
    // Both prev and next should be disabled since we can only view Jan 2024
    expect(navBtns[0]).toBeDisabled();
    expect(navBtns[1]).toBeDisabled();
  });

  // ── Keyboard navigation ────────────────────────────────────────────────

  it('should handle keyboard navigation', () => {
    const onChange = jest.fn();
    const { container } = render(<Calendar value={new Date(2024, 0, 15)} onChange={onChange} />);
    const calendarEl = container.firstChild as HTMLElement;
    fireEvent.keyDown(calendarEl, { key: 'ArrowRight' });
    // Check that a cell is now focused
    const focused = container.querySelector('.ty-calendar__cell_focused');
    expect(focused).toBeTruthy();
    // Press Enter to select
    fireEvent.keyDown(calendarEl, { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  // ── cellClassName ──────────────────────────────────────────────────────

  it('should apply cellClassName to cells', () => {
    const { container } = render(
      <Calendar
        value={new Date(2024, 0, 15)}
        cellClassName={(date) => (date.getDay() === 0 ? 'sunday' : undefined)}
      />
    );
    const sundayCells = container.querySelectorAll('.sunday');
    expect(sundayCells.length).toBeGreaterThan(0);
  });

  // ── dotRender ──────────────────────────────────────────────────────────

  it('should render dot indicators', () => {
    const { container } = render(
      <Calendar
        value={new Date(2024, 0, 15)}
        dotRender={(date) => date.getDate() === 15}
      />
    );
    const dots = container.querySelectorAll('.ty-calendar__cell-dot');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('should render dot with custom color', () => {
    const { container } = render(
      <Calendar
        value={new Date(2024, 0, 15)}
        dotRender={(date) => (date.getDate() === 15 ? '#ff0000' : false)}
      />
    );
    const dot = container.querySelector('.ty-calendar__cell-dot') as HTMLElement;
    expect(dot).toBeTruthy();
    expect(dot.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  // ── onMonthChange / onYearChange ───────────────────────────────────────

  it('should fire onMonthChange when navigating months', () => {
    const onMonthChange = jest.fn();
    const { container } = render(
      <Calendar value={new Date(2024, 0, 15)} onMonthChange={onMonthChange} />
    );
    const navBtns = container.querySelectorAll('.ty-calendar__nav-btn');
    fireEvent.click(navBtns[1]); // next
    expect(onMonthChange).toHaveBeenCalledTimes(1);
  });
});
