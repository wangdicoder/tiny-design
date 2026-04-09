import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ConfigProvider, { useConfig } from '../index';
import Button from '../../button';
import Message from '../../message';
import Notification from '../../notification';
import LoadingBar from '../../loading-bar';
import Modal from '../../modal';

describe('<ConfigProvider />', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-tiny-theme');
    document.documentElement.removeAttribute('style');
    ConfigProvider.config({ holderRender: undefined });
    document.querySelectorAll('.ty-message-container').forEach((node) => node.remove());
    document.querySelectorAll('.ty-notification-container').forEach((node) => node.remove());
    document.querySelectorAll('#ty-loading-bar').forEach((node) => node.parentElement?.remove());
  });

  it('should render provider scope and popup holder when scoped theme is enabled', () => {
    const { container } = render(
      <ConfigProvider prefixCls="custom" theme="dark">
        <Button>Button</Button>
      </ConfigProvider>
    );
    expect(container.querySelector('.custom-config-provider')).toBeTruthy();
    expect(container.querySelector('.custom-config-provider__popup-holder')).toBeTruthy();
  });

  it('should avoid rendering provider scope when scoped theme is not needed', () => {
    const { container } = render(
      <ConfigProvider prefixCls="custom">
        <Button>Button</Button>
      </ConfigProvider>
    );

    expect(container.querySelector('.custom-config-provider')).toBeFalsy();
    expect(container.querySelector('.custom-config-provider__popup-holder')).toBeFalsy();
  });

  it('should render children', () => {
    const { getByText } = render(
      <ConfigProvider>
        <div>Content</div>
      </ConfigProvider>
    );
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('should provide custom prefix', () => {
    const { container } = render(
      <ConfigProvider prefixCls="my">
        <Button>Btn</Button>
      </ConfigProvider>
    );
    expect(container.querySelector('.my-btn')).toBeTruthy();
  });

  it('should restore parent theme mode when nested provider unmounts', () => {
    const nested = render(
      <ConfigProvider theme="dark">
        <ConfigProvider theme="light">
          <div>Content</div>
        </ConfigProvider>
      </ConfigProvider>
    );

    const providers = nested.container.querySelectorAll('.ty-config-provider');
    expect(providers[0].getAttribute('data-tiny-theme')).toBe('dark');
    expect(providers[1].getAttribute('data-tiny-theme')).toBe('light');

    nested.rerender(
      <ConfigProvider theme="dark">
        <div>Content</div>
      </ConfigProvider>
    );

    expect(nested.container.querySelector('.ty-config-provider')?.getAttribute('data-tiny-theme')).toBe('dark');
  });

  it('should restore parent token overrides when nested provider unmounts', () => {
    const nested = render(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'blue' } } }}>
        <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'red' } } }}>
          <div>Content</div>
        </ConfigProvider>
      </ConfigProvider>
    );

    const providers = nested.container.querySelectorAll('.ty-config-provider');
    expect((providers[0] as HTMLElement).style.getPropertyValue('--ty-color-primary')).toBe('blue');
    expect((providers[1] as HTMLElement).style.getPropertyValue('--ty-color-primary')).toBe('red');

    nested.rerender(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'blue' } } }}>
        <div>Content</div>
      </ConfigProvider>
    );

    expect(
      (nested.container.querySelector('.ty-config-provider') as HTMLElement).style.getPropertyValue(
        '--ty-color-primary'
      )
    ).toBe('blue');
  });

  it('should resolve preset mode and preset token values from extends', () => {
    const { container } = render(
      <ConfigProvider theme={{ extends: 'tiny-dark' }}>
        <Button>Button</Button>
      </ConfigProvider>
    );

    const provider = container.querySelector('.ty-config-provider') as HTMLElement;
    expect(provider.getAttribute('data-tiny-theme')).toBe('dark');
    expect(provider.style.getPropertyValue('--ty-color-bg')).toBe('#141414');
    expect(provider.style.getPropertyValue('--ty-color-primary')).toBe('#9065d0');
  });

  it('should replace old token values when the same provider updates theme config', () => {
    const { rerender } = render(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'blue', 'border-radius': '8px' } } }}>
        <div>Content</div>
      </ConfigProvider>
    );

    const getProvider = () => document.querySelector('.ty-config-provider') as HTMLElement;

    expect(getProvider().style.getPropertyValue('--ty-color-primary')).toBe('blue');
    expect(getProvider().style.getPropertyValue('--ty-border-radius')).toBe('8px');

    rerender(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-success': 'green' } } }}>
        <div>Content</div>
      </ConfigProvider>
    );

    expect(getProvider().style.getPropertyValue('--ty-color-success')).toBe('green');
    expect(getProvider().style.getPropertyValue('--ty-color-primary')).toBe('');
    expect(getProvider().style.getPropertyValue('--ty-border-radius')).toBe('');
  });

  it('should isolate different token keys across multiple providers', () => {
    const nested = render(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'blue' } } }}>
        <ConfigProvider theme={{ tokens: { semantic: { 'border-radius': '12px' } } }}>
          <div>Content</div>
        </ConfigProvider>
      </ConfigProvider>
    );

    const providers = nested.container.querySelectorAll('.ty-config-provider');
    expect((providers[0] as HTMLElement).style.getPropertyValue('--ty-color-primary')).toBe('blue');
    expect((providers[1] as HTMLElement).style.getPropertyValue('--ty-border-radius')).toBe('12px');

    nested.rerender(
      <ConfigProvider theme={{ tokens: { semantic: { 'color-primary': 'blue' } } }}>
        <div>Content</div>
      </ConfigProvider>
    );

    const provider = nested.container.querySelector('.ty-config-provider') as HTMLElement;
    expect(provider.style.getPropertyValue('--ty-color-primary')).toBe('blue');
    expect(provider.style.getPropertyValue('--ty-border-radius')).toBe('');
  });

  it('should expose merged config via useConfig', () => {
    const Consumer = () => {
      const config = useConfig();
      return (
        <div
          data-testid="config"
          data-prefix={config.prefixCls}
          data-size={config.componentSize}
          data-theme={config.theme}
        />
      );
    };

    render(
      <ConfigProvider prefixCls="outer" componentSize="lg" theme="dark">
        <ConfigProvider componentSize="sm">
          <Consumer />
        </ConfigProvider>
      </ConfigProvider>
    );

    const node = screen.getByTestId('config');
    expect(node.getAttribute('data-prefix')).toBe('outer');
    expect(node.getAttribute('data-size')).toBe('sm');
    expect(node.getAttribute('data-theme')).toBe('dark');
  });

  it('should apply holderRender to static message APIs', () => {
    ConfigProvider.config({
      holderRender: (children) => <div data-testid="message-holder">{children}</div>,
    });

    act(() => {
      Message.info('Hello', 1000, undefined as unknown as () => void, {});
    });

    expect(document.querySelector('[data-testid="message-holder"]')).toBeTruthy();
    expect(document.body.textContent).toContain('Hello');
  });

  it('should apply holderRender to static notification APIs', () => {
    ConfigProvider.config({
      holderRender: (children) => <div data-testid="notification-holder">{children}</div>,
    });

    act(() => {
      Notification.open({ title: 'Notice', description: 'Body', duration: 0 });
    });

    expect(document.querySelector('[data-testid="notification-holder"]')).toBeTruthy();
    expect(document.body.textContent).toContain('Notice');
  });

  it('should apply holderRender to static loading bar APIs', () => {
    ConfigProvider.config({
      holderRender: (children) => <div data-testid="loading-bar-holder">{children}</div>,
    });

    act(() => {
      LoadingBar.start();
    });

    expect(document.querySelector('[data-testid="loading-bar-holder"]')).toBeTruthy();
    expect(document.querySelector('#ty-loading-bar')).toBeTruthy();

    act(() => {
      LoadingBar.succeed();
    });
  });

  it('should apply holderRender to static modal APIs', () => {
    ConfigProvider.config({
      holderRender: (children) => <div data-testid="modal-holder">{children}</div>,
    });

    let instance!: ReturnType<typeof Modal.open>;

    act(() => {
      instance = Modal.open({ header: 'Static Modal', children: 'Body' });
    });

    expect(document.querySelector('[data-testid="modal-holder"]')).toBeTruthy();
    expect(document.body.textContent).toContain('Static Modal');

    act(() => {
      instance.destroy();
    });
  });
});
