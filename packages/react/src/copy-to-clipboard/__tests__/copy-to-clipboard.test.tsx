import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import CopyToClipboard from '../index';

describe('<CopyToClipboard />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <CopyToClipboard text="Hello">
        <button>Copy</button>
      </CopyToClipboard>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render children', () => {
    const { getByText } = render(
      <CopyToClipboard text="Hello">
        <button>Copy</button>
      </CopyToClipboard>
    );
    expect(getByText('Copy')).toBeInTheDocument();
  });

  it('should notify copy result', async () => {
    const onCopy = jest.fn();

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    const { getByText } = render(
      <CopyToClipboard text="Hello" onCopy={onCopy}>
        <button>Copy</button>
      </CopyToClipboard>
    );

    await act(async () => {
      fireEvent.click(getByText('Copy'));
    });

    expect(onCopy).toHaveBeenCalledWith(true, 'Hello');
  });
});
