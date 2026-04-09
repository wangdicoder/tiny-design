import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import PopConfirm from '../index';

describe('<PopConfirm />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<PopConfirm title="Sure?"><button>Delete</button></PopConfirm>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render children', () => {
    const { getByText } = render(<PopConfirm title="Sure?"><button>Delete</button></PopConfirm>);
    expect(getByText('Delete')).toBeInTheDocument();
  });

  it('should support controlled visible', () => {
    const { queryByText, rerender } = render(
      <PopConfirm title="Sure?" visible={false}>
        <button>Delete</button>
      </PopConfirm>
    );

    expect(queryByText('Sure?')).not.toBeInTheDocument();

    rerender(
      <PopConfirm title="Sure?" visible={true}>
        <button>Delete</button>
      </PopConfirm>
    );

    expect(queryByText('Sure?')).toBeInTheDocument();
  });

  it('should notify visibility changes when confirm closes a controlled popup', () => {
    const onVisibleChange = jest.fn();
    const onConfirm = jest.fn();
    const { getByText } = render(
      <PopConfirm title="Sure?" visible={true} onVisibleChange={onVisibleChange} onConfirm={onConfirm}>
        <button>Delete</button>
      </PopConfirm>
    );

    fireEvent.click(getByText('Yes'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  it('should expose alertdialog semantics linked to the title', () => {
    render(
      <PopConfirm title="Sure?" visible={true}>
        <button>Delete</button>
      </PopConfirm>
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby') || '')).toHaveTextContent('Sure?');
  });
});
