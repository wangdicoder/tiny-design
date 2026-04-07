import React from 'react';
import { render } from '@testing-library/react';
import Grid from '../index';
import Row from '../../row/index';
import Col from '../../col/index';

describe('Grid', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1024,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
  });

  it('renders a CSS Grid container', () => {
    const { container } = render(<Grid columns={3} gap="md" />);
    const node = container.querySelector('.ty-grid') as HTMLElement;

    expect(node).toBeTruthy();
    expect(node.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    expect(node.style.gap).toBe('16px');
  });

  it('supports responsive container props', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 880,
    });

    const { container } = render(
      <Grid columns={{ xs: 2, md: 6 }} gap={{ xs: 8, md: 24 }} />
    );
    const node = container.querySelector('.ty-grid') as HTMLElement;

    expect(node.style.gridTemplateColumns).toBe('repeat(6, minmax(0, 1fr))');
    expect(node.style.gap).toBe('24px');
  });

  it('supports MUI-style spacing aliases', () => {
    const { container } = render(
      <Grid spacing={{ xs: 8, md: 16 }} columnSpacing={{ md: 24 }} rowSpacing={{ md: 12 }} />
    );
    const node = container.querySelector('.ty-grid') as HTMLElement;

    expect(node.style.gap).toBe('16px');
    expect(node.style.columnGap).toBe('24px');
    expect(node.style.rowGap).toBe('12px');
  });

  it('supports Grid.Item span and offset', () => {
    const { container } = render(
      <Grid columns={12}>
        <Grid.Item size={{ xs: 6, md: 4 }} offset={{ md: 2 }}>
          Cell
        </Grid.Item>
      </Grid>
    );
    const node = container.querySelector('.ty-grid-item') as HTMLElement;

    expect(node.style.gridColumn).toBe('3 / span 4');
  });

  it('supports Grid.Item row span and named area', () => {
    const { container } = render(
      <Grid areas={['hero side', 'content side']}>
        <Grid.Item area="hero" rowSpan={2}>
          Hero
        </Grid.Item>
      </Grid>
    );
    const item = container.querySelector('.ty-grid-item') as HTMLElement;
    const grid = container.querySelector('.ty-grid') as HTMLElement;

    expect(grid.style.gridTemplateAreas).toContain('"hero side"');
    expect(item.style.gridArea).toBe('hero');
    expect(item.style.gridRow).toBe('span 2');
  });

  it('supports Grid.Item offset auto by pushing an item to the far right', () => {
    const { container } = render(
      <Grid columns={12}>
        <Grid.Item size={3} offset="auto">
          Right
        </Grid.Item>
      </Grid>
    );
    const item = container.querySelector('.ty-grid-item') as HTMLElement;

    expect(item.style.gridColumn).toBe('10 / span 3');
  });
});

describe('Grid System', () => {
  it('renders Row and Cols', () => {
    const { container } = render(
      <Row>
        <Col span={12}>Left</Col>
        <Col span={12}>Right</Col>
      </Row>
    );
    expect(container.querySelector('.ty-row')).toBeTruthy();
    expect(container.querySelectorAll('.ty-col').length).toBe(2);
  });
});
