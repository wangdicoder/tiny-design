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
      'ChartContainer already includes Recharts ResponsiveContainer. Pass the chart element directly instead of nesting another <ResponsiveContainer />.'
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
      'Chart config key "total revenue" contains characters that are unsafe for CSS custom properties. Use letters, numbers, "_" or "-".'
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
});
