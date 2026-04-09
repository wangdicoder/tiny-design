import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Popup from '../index';

describe('<Popup />', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Popup content="Popup content"><button>Trigger</button></Popup>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render trigger element', () => {
    const { getByText } = render(
      <Popup content="Content"><button>Trigger</button></Popup>
    );
    expect(getByText('Trigger')).toBeInTheDocument();
  });

  it('should close on outside click for click trigger', async () => {
    render(
      <div>
        <Popup content={<div>Popup content</div>}>
          <button>Trigger</button>
        </Popup>
        <button>Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popup content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Outside'));

    await waitFor(() => {
      expect(screen.queryByText('Popup content')).not.toBeInTheDocument();
    });
  });

  it('should respect controlled visible prop', () => {
    const { rerender } = render(
      <Popup visible={false} trigger="manual" content={<div>Controlled popup</div>}>
        <button>Trigger</button>
      </Popup>
    );

    expect(screen.queryByText('Controlled popup')).not.toBeInTheDocument();

    rerender(
      <Popup visible={true} trigger="manual" content={<div>Controlled popup</div>}>
        <button>Trigger</button>
      </Popup>
    );

    expect(screen.getByText('Controlled popup')).toBeInTheDocument();
  });
});
