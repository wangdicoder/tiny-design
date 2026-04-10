import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createPopper } from '@popperjs/core';
import Popup from '../index';

jest.mock('@popperjs/core', () => ({
  createPopper: jest.fn(),
}));

describe('<Popup />', () => {
  beforeEach(() => {
    (createPopper as jest.Mock).mockImplementation(
      (_target: HTMLElement, popup: HTMLElement, options) => {
        const applyReactStyles = () => {
          options.modifiers
            .find((modifier: { name: string }) => modifier.name === 'reactApplyStyles')
            ?.fn({
              state: {
                styles: {
                  popper: {
                    position: 'absolute',
                    left: '37px',
                    top: '575px',
                    margin: '0px',
                  },
                  arrow: {
                    position: 'absolute',
                    left: '8px',
                  },
                },
                attributes: {
                  popper: {
                    'data-popper-placement': 'bottom',
                  },
                  arrow: {},
                },
              },
            });
        };
        return {
          state: {
            elements: {
              popper: popup,
            },
          },
          forceUpdate: jest.fn(applyReactStyles),
          destroy: jest.fn(),
        };
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <Popup content="Popup content">
        <button>Trigger</button>
      </Popup>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render trigger element', () => {
    const { getByText } = render(
      <Popup content="Content">
        <button>Trigger</button>
      </Popup>
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

  it('should keep popup content mounted during exit transition', () => {
    const { rerender } = render(
      <Popup visible={true} trigger="manual" content={<div>Controlled popup</div>}>
        <button>Trigger</button>
      </Popup>
    );

    const openPopup = document.querySelector('.ty-popup') as HTMLDivElement;
    expect(openPopup.style.left).toBe('37px');
    expect(openPopup.style.top).toBe('575px');

    rerender(
      <Popup visible={false} trigger="manual" content={<div>Controlled popup</div>}>
        <button>Trigger</button>
      </Popup>
    );

    const closingPopup = document.querySelector('.ty-popup') as HTMLDivElement;
    expect(closingPopup).toBeInTheDocument();
    expect(screen.getByText('Controlled popup')).toBeInTheDocument();
    expect(closingPopup.style.left).toBe('37px');
    expect(closingPopup.style.top).toBe('575px');
  });
});
