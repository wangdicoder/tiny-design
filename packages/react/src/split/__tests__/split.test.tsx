import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Split from '../index';

const rect = ({ width = 400, height = 300 }: { width?: number; height?: number } = {}) => ({
  width,
  height,
  top: 0,
  left: 0,
  right: width,
  bottom: height,
  x: 0,
  y: 0,
  toJSON: () => ({}),
});

describe('<Split />', () => {
  let rectSpy: jest.SpyInstance;

  beforeEach(() => {
    rectSpy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function mockRect() {
      const element = this as HTMLElement;
      if (element.className.includes('ty-split')) {
        return rect();
      }
      return rect({ width: 160, height: 120 });
    });
  });

  afterEach(() => {
    rectSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it('renders horizontal layout with pane API by default', async () => {
    const { container, getByRole } = render(
      <Split defaultSize="32%">
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    await waitFor(() => expect(getByRole('separator')).toHaveAttribute('aria-valuenow', '128'));
    expect(container.firstChild).toHaveClass('ty-split', 'ty-split_horizontal');
    expect(getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('supports controlled primary pane size', async () => {
    const { getByRole, rerender } = render(
      <Split size="25%">
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    await waitFor(() => expect(getByRole('separator')).toHaveAttribute('aria-valuenow', '100'));

    rerender(
      <Split size={180}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    await waitFor(() => expect(getByRole('separator')).toHaveAttribute('aria-valuenow', '180'));
  });

  it('supports primary second pane sizing and constraints', async () => {
    const { getByRole } = render(
      <Split primary="second" defaultSize="25%" min="80px" max="200px">
        <Split.Pane min="160px">
          <div>Canvas</div>
        </Split.Pane>
        <Split.Pane>
          <div>Inspector</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '100'));

    fireEvent.keyDown(separator, { key: 'End' });

    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '200'));
  });

  it('resizes with pointer dragging and emits lifecycle callbacks', async () => {
    const onResizeStart = jest.fn();
    const onResize = jest.fn();
    const onResizeEnd = jest.fn();
    const { getByRole } = render(
      <Split defaultSize={120} onResizeStart={onResizeStart} onResize={onResize} onResizeEnd={onResizeEnd}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane min="120px">
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '120'));

    fireEvent.mouseDown(separator, { clientX: 120 });
    fireEvent.mouseMove(window, { clientX: 220 });
    fireEvent.mouseUp(window);

    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '220'));
    expect(onResizeStart).toHaveBeenCalledWith(120);
    expect(onResize).toHaveBeenCalledWith(220);
    expect(onResizeEnd).toHaveBeenCalledWith(220);
  });

  it('supports vertical keyboard resizing', async () => {
    const { getByRole } = render(
      <Split orientation="vertical" defaultSize="40%">
        <Split.Pane>
          <div>Top</div>
        </Split.Pane>
        <Split.Pane>
          <div>Bottom</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '120'));

    fireEvent.keyDown(separator, { key: 'ArrowDown' });

    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '132'));
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('supports collapsible primary pane from keyboard and double click', async () => {
    const onCollapseChange = jest.fn();
    const { getByRole } = render(
      <Split defaultSize={160} collapsible collapsedSize={64} onCollapseChange={onCollapseChange}>
        <Split.Pane>
          <div>Sidebar</div>
        </Split.Pane>
        <Split.Pane min="160px">
          <div>Content</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '160'));

    fireEvent.keyDown(separator, { key: 'Enter' });
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '64'));

    fireEvent.doubleClick(separator);
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '160'));

    expect(onCollapseChange).toHaveBeenNthCalledWith(1, true);
    expect(onCollapseChange).toHaveBeenNthCalledWith(2, false);
  });

  it('does not resize when disabled', async () => {
    const onResize = jest.fn();
    const { getByRole } = render(
      <Split disabled defaultSize={140} onResize={onResize}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '140'));

    fireEvent.mouseDown(separator, { clientX: 140 });
    fireEvent.mouseMove(window, { clientX: 220 });
    fireEvent.mouseUp(window);
    fireEvent.keyDown(separator, { key: 'ArrowRight' });

    expect(separator).toHaveAttribute('aria-valuenow', '140');
    expect(onResize).not.toHaveBeenCalled();
    expect(separator).toHaveAttribute('tabindex', '-1');
  });

  it('warns and skips separator when children count is invalid', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { queryByRole } = render(
      <Split>{[<Split.Pane key="only">Only</Split.Pane>] as unknown as [React.ReactNode, React.ReactNode]}</Split>
    );

    expect(warnSpy).toHaveBeenCalledWith('Warning: Split expects exactly two children.');
    expect(queryByRole('separator')).not.toBeInTheDocument();
  });

  it('supports custom separator content', async () => {
    const separatorRender = jest.fn(({ dragging, collapsed }: { dragging: boolean; collapsed: boolean }) => (
      <span data-testid="custom-separator">
        {collapsed ? 'collapsed' : dragging ? 'dragging' : 'idle'}
      </span>
    ));
    const { getByRole, getByTestId } = render(
      <Split defaultSize={120} collapsible collapsedSize={60} separatorRender={separatorRender}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(getByTestId('custom-separator')).toHaveTextContent('idle'));

    fireEvent.mouseDown(separator, { clientX: 120 });
    await waitFor(() => expect(getByTestId('custom-separator')).toHaveTextContent('dragging'));
    fireEvent.mouseUp(window);

    fireEvent.keyDown(separator, { key: 'Enter' });
    await waitFor(() => expect(getByTestId('custom-separator')).toHaveTextContent('collapsed'));
    expect(separatorRender).toHaveBeenCalled();
  });

  it('keeps separator layout size independent from the hit area size', async () => {
    const { getByRole } = render(
      <Split defaultSize={120} separatorSize={2} separatorHitAreaSize={24}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '120'));

    expect(separator.parentElement).toHaveStyle({ width: '2px' });
    expect(separator).toHaveStyle({ width: '24px' });
    expect(separator).toHaveStyle('--ty-split-bar-hit-area-size: 24px');
  });

  it('applies separatorClassName and separatorStyle to the interaction container', async () => {
    const { getByRole } = render(
      <Split
        defaultSize={120}
        separatorClassName="split-separator-test"
        separatorStyle={{ background: 'rgba(59, 130, 246, 0.24)' }}>
        <Split.Pane>
          <div>Left</div>
        </Split.Pane>
        <Split.Pane>
          <div>Right</div>
        </Split.Pane>
      </Split>
    );

    const separator = getByRole('separator');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '120'));

    expect(separator).toHaveClass('split-separator-test');
    expect(separator).toHaveStyle({ background: 'rgba(59, 130, 246, 0.24)' });
  });
});
