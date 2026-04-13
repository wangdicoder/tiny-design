import React from 'react';
import { render, screen } from '@testing-library/react';
import ChartContainer, { resetChartContainerWarningsForTest } from '../chart-container';
import { ChartContextProvider } from '../chart-context';
import { ChartTooltipContent } from '../chart-tooltip';
import { ChartLegendContent } from '../chart-legend';

class ResizeObserverMock {
  observe() {}
  disconnect() {}
}

const ResponsiveContainerMock = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="responsive-container">{children}</div>
);

ResponsiveContainerMock.displayName = 'ResponsiveContainer';

beforeAll(() => {
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock,
  });

  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value() {
      return {
        width: 480,
        height: 240,
        top: 0,
        left: 0,
        right: 480,
        bottom: 240,
        x: 0,
        y: 0,
        toJSON() {
          return {};
        },
      };
    },
  });
});

jest.mock('recharts', () => ({
  Tooltip: () => null,
  Legend: () => null,
}));

describe('charts package', () => {
  beforeEach(() => {
    resetChartContainerWarningsForTest();
    jest.restoreAllMocks();
  });

  it('injects chart color variables onto the container', () => {
    render(
      <ChartContainer config={{ revenue: { color: '#123456' } }} style={{ height: 240 }}>
        <div>chart</div>
      </ChartContainer>
    );

    const container = document.querySelector('.ty-chart') as HTMLDivElement;
    expect(container).toBeInTheDocument();
    expect(container.style.getPropertyValue('--color-revenue')).toBe('#123456');
    expect(screen.getByText('chart')).toBeInTheDocument();
  });

  it('warns when ResponsiveContainer is nested manually', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ChartContainer config={{ revenue: { color: '#123456' } }} style={{ height: 240 }}>
        <ResponsiveContainerMock>
          <div>chart</div>
        </ResponsiveContainerMock>
      </ChartContainer>
    );

    expect(warn).toHaveBeenCalledWith(
      'ChartContainer manages chart sizing itself. Pass the chart element directly instead of nesting another <ResponsiveContainer />.'
    );
  });

  it('warns about config keys that are unsafe for CSS custom properties', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <ChartContainer config={{ 'total revenue': { color: '#123456' } }} style={{ height: 240 }}>
        <div>chart</div>
      </ChartContainer>
    );

    expect(warn).toHaveBeenCalledWith(
      'Chart config key "total revenue" contains characters that are unsafe for CSS custom properties. Use letters, numbers, "_" or "-". Theme colors for this key will not be injected.'
    );
  });

  it('renders tooltip labels and values from chart config', () => {
    render(
      <ChartContextProvider
        config={{
          desktop: { label: 'Desktop Revenue' },
        }}
      >
        <ChartTooltipContent
          active
          label="April"
          payload={[
            {
              graphicalItemId: 'desktop',
              dataKey: 'desktop',
              name: 'desktop',
              value: 320,
              color: '#1890ff',
              payload: {},
            },
          ]}
        />
      </ChartContextProvider>
    );

    expect(screen.getByText('April')).toBeInTheDocument();
    expect(screen.getByText('Desktop Revenue')).toBeInTheDocument();
    expect(screen.getByText('320')).toBeInTheDocument();
  });

  it('maps tooltip series and label keys from the original payload data', () => {
    render(
      <ChartContextProvider
        config={{
          revenue: { label: 'Revenue' },
          april: { label: 'April 2026' },
        }}
      >
        <ChartTooltipContent
          active
          label="ignored"
          labelKey="period"
          nameKey="series"
          payload={[
            {
              graphicalItemId: 'desktop',
              dataKey: 'value',
              name: 'value',
              value: 320,
              color: '#1890ff',
              payload: {
                period: 'april',
                series: 'revenue',
              },
            },
          ]}
        />
      </ChartContextProvider>
    );

    expect(screen.getByText('April 2026')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('320')).toBeInTheDocument();
  });

  it('does not forward recharts-only tooltip props onto the DOM', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ChartContextProvider
        config={{
          desktop: { label: 'Desktop Revenue' },
        }}
      >
        <ChartTooltipContent
          active
          label="April"
          cursorStyle={{ stroke: '#1890ff' }}
          payload={[
            {
              graphicalItemId: 'desktop',
              dataKey: 'desktop',
              name: 'desktop',
              value: 320,
              color: '#1890ff',
              payload: {},
            },
          ]}
        />
      </ChartContextProvider>
    );

    const tooltip = document.querySelector('.ty-chart-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).not.toHaveAttribute('cursorStyle');
    expect(error).not.toHaveBeenCalledWith(
      expect.stringContaining('React does not recognize the `cursorStyle` prop on a DOM element')
    );
  });

  it('renders legend labels from chart config', () => {
    render(
      <ChartContextProvider
        config={{
          mobile: { label: 'Mobile Revenue' },
        }}
      >
        <ChartLegendContent
          payload={[
            {
              value: 'mobile',
              dataKey: 'mobile',
              color: '#52c41a',
            },
          ]}
        />
      </ChartContextProvider>
    );

    expect(screen.getByText('Mobile Revenue')).toBeInTheDocument();
  });

  it('maps legend names from payload data when nameKey is provided', () => {
    render(
      <ChartContextProvider
        config={{
          chrome: { label: 'Chrome Browser' },
        }}
      >
        <ChartLegendContent
          nameKey="browser"
          payload={[
            {
              value: 'Visitors',
              dataKey: 'visitors',
              color: '#52c41a',
              payload: {
                browser: 'chrome',
              },
            },
          ]}
        />
      </ChartContextProvider>
    );

    expect(screen.getByText('Chrome Browser')).toBeInTheDocument();
  });

  it('renders theme-based color styles for dark mode aware configs', () => {
    render(
      <ChartContainer
        config={{
          revenue: {
            theme: {
              light: '#111111',
              dark: '#eeeeee',
            },
          },
        }}
        style={{ height: 240 }}
      >
        <div>chart</div>
      </ChartContainer>
    );

    const styleTag = document.querySelector('style');
    expect(styleTag?.textContent).toContain('--color-revenue: #111111;');
    expect(styleTag?.textContent).toContain('html[data-tiny-theme=dark] [data-chart=');
    expect(styleTag?.textContent).toContain('--color-revenue: #eeeeee;');
  });

  describe('when ResizeObserver is unavailable', () => {
    const originalResizeObserver = window.ResizeObserver;

    beforeEach(() => {
      Object.defineProperty(window, 'ResizeObserver', {
        writable: true,
        configurable: true,
        value: undefined,
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'ResizeObserver', {
        writable: true,
        configurable: true,
        value: originalResizeObserver,
      });
    });

    it('uses fallbackSize before resize measurement is available', () => {
      render(
        <ChartContainer
          config={{ revenue: { color: '#123456' } }}
          fallbackSize={{ width: 320, height: 180 }}
          style={{ minHeight: 180 }}
        >
          <div>chart</div>
        </ChartContainer>
      );

      expect(screen.getByText('chart')).toBeInTheDocument();
    });

    it('falls back to window resize events', () => {
      render(
        <ChartContainer config={{ revenue: { color: '#123456' } }} style={{ height: 240 }}>
          <div>chart</div>
        </ChartContainer>
      );

      expect(screen.getByText('chart')).toBeInTheDocument();
    });
  });
});
