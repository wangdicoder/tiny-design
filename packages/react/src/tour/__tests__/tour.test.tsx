import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Tour from '../index';
import { TourStepProps } from '../types';
import ConfigProvider from '../../config-provider';

const steps: TourStepProps[] = [
  { title: 'Step 1', description: 'Description 1' },
  { title: 'Step 2', description: 'Description 2' },
  { title: 'Step 3', description: 'Description 3' },
];

describe('<Tour />', () => {
  it('should not render when open is false', () => {
    const { baseElement } = render(<Tour open={false} steps={steps} />);
    expect(baseElement.querySelector('.ty-tour')).not.toBeInTheDocument();
  });

  it('should render when open is true', () => {
    const { getByText } = render(<Tour open steps={steps} />);
    expect(getByText('Step 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
  });

  it('should render step title and description', () => {
    const { getByText } = render(<Tour open steps={steps} />);
    expect(getByText('Step 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
  });

  it('should expose aria relationships for step title and description', () => {
    render(<Tour open steps={steps} />);

    const dialog = document.querySelector('.ty-tour') as HTMLElement;
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby') || '')).toHaveTextContent('Step 1');
    expect(document.getElementById(dialog.getAttribute('aria-describedby') || '')).toHaveTextContent('Description 1');
  });

  it('should navigate to next step', () => {
    const onChange = jest.fn();
    const { getByText } = render(<Tour open steps={steps} onChange={onChange} />);
    fireEvent.click(getByText('Next'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should navigate to previous step', () => {
    const onChange = jest.fn();
    const { getByText } = render(<Tour open steps={steps} current={1} onChange={onChange} />);
    fireEvent.click(getByText('Previous'));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const { baseElement } = render(<Tour open steps={steps} onClose={onClose} />);
    const closeBtn = baseElement.querySelector('.ty-tour__close-btn') as HTMLElement;
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onFinish on last step next click', () => {
    const onFinish = jest.fn();
    const onClose = jest.fn();
    const { getByText } = render(
      <Tour open steps={steps} current={2} onFinish={onFinish} onClose={onClose} />
    );
    fireEvent.click(getByText('Finish'));
    expect(onFinish).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should render indicators', () => {
    const { baseElement } = render(<Tour open steps={steps} />);
    const indicators = baseElement.querySelectorAll('.ty-tour__indicator');
    expect(indicators).toHaveLength(3);
  });

  it('should show active indicator for current step', () => {
    const { baseElement } = render(<Tour open steps={steps} current={1} />);
    const indicators = baseElement.querySelectorAll('.ty-tour__indicator');
    expect(indicators[1]).toHaveClass('ty-tour__indicator_active');
  });

  it('should render mask by default', () => {
    const { baseElement } = render(<Tour open steps={steps} />);
    expect(baseElement.querySelector('.ty-tour__mask')).toBeInTheDocument();
  });

  it('should not render mask when mask is false', () => {
    const { baseElement } = render(<Tour open steps={steps} mask={false} />);
    expect(baseElement.querySelector('.ty-tour__mask')).not.toBeInTheDocument();
  });

  it('should render primary type', () => {
    const { baseElement } = render(<Tour open steps={steps} type="primary" />);
    expect(baseElement.querySelector('.ty-tour__panel_primary')).toBeInTheDocument();
  });

  it('should handle keyboard Escape', () => {
    const onClose = jest.fn();
    render(<Tour open steps={steps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('should ignore keyboard events when keyboard is disabled', () => {
    const onClose = jest.fn();
    render(<Tour open steps={steps} keyboard={false} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should focus the panel when opened and restore focus on close', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Tour open steps={[{ title: 'Centered' }]} />);

    await waitFor(() => {
      const closeBtn = document.querySelector('.ty-tour__close-btn') as HTMLElement | null;
      expect(closeBtn).toHaveFocus();
    });

    rerender(<Tour open={false} steps={[{ title: 'Centered' }]} />);

    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });

    document.body.removeChild(trigger);
  });

  it('should keep focus inside the panel across rerenders while open', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'trigger';
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = render(<Tour open steps={[{ title: 'Step 1', description: 'Body' }]} zIndex={1001} />);

    await waitFor(() => {
      const closeBtn = document.querySelector('.ty-tour__close-btn') as HTMLElement | null;
      expect(closeBtn).toHaveFocus();
    });

    rerender(<Tour open steps={[{ title: 'Step 1', description: 'Body' }]} zIndex={1002} />);

    expect(document.querySelector('.ty-tour__close-btn')).toHaveFocus();
    expect(trigger).not.toHaveFocus();

    document.body.removeChild(trigger);
  });

  it('should center panel when no target', () => {
    const { baseElement } = render(<Tour open steps={[{ title: 'Centered' }]} />);
    expect(
      baseElement.querySelector('.ty-tour__panel-wrapper_centered')
    ).toBeInTheDocument();
  });

  it('should not render previous button on first step', () => {
    const { queryByText } = render(<Tour open steps={steps} />);
    expect(queryByText('Previous')).not.toBeInTheDocument();
  });

  it('should show Finish text on last step', () => {
    const { getByText } = render(<Tour open steps={steps} current={2} />);
    expect(getByText('Finish')).toBeInTheDocument();
  });

  it('should support custom indicatorsRender', () => {
    const { getByText } = render(
      <Tour
        open
        steps={steps}
        indicatorsRender={(current, total) => <span>{`${current + 1}/${total}`}</span>}
      />
    );
    expect(getByText('1/3')).toBeInTheDocument();
  });

  it('should lock and restore the configured target container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { unmount } = render(
      <ConfigProvider getTargetContainer={() => container}>
        <Tour open steps={steps} />
      </ConfigProvider>
    );

    expect(container.style.overflow).toBe('hidden');
    expect(document.body.style.overflow).toBe('');

    unmount();

    expect(container.style.overflow).toBe('');
    document.body.removeChild(container);
  });
});
