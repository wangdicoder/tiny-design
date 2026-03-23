# TextLoop Component Design

## Purpose

A component that cycles through multiple children one at a time with a slide transition. Each child is displayed for a configurable interval before sliding out and being replaced by the next. Supports both vertical and horizontal cycling directions.

Primary use case: loop banner alerts where notification messages rotate automatically.

## API

```tsx
interface TextLoopProps extends BaseProps {
  /** Time each item stays visible, in ms (default: 3000) */
  interval?: number;
  /** Pause cycling on hover (default: true) */
  pauseOnHover?: boolean;
  /** Loop infinitely or stop after one full cycle (default: true) */
  infinite?: boolean;
  /** Cycling direction (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
}
```

## Usage

```tsx
// Vertical cycling (default)
<TextLoop interval={3000}>
  <span>Message 1</span>
  <span>Message 2</span>
  <span>Message 3</span>
</TextLoop>

// Horizontal cycling
<TextLoop direction="left" interval={2000}>
  <span>Slide 1</span>
  <span>Slide 2</span>
</TextLoop>

// Inside Alert for loop banner
<Alert type="warning" icon>
  <TextLoop interval={3000}>
    <span>Alert message 1</span>
    <span>Alert message 2</span>
    <span>Alert message 3</span>
  </TextLoop>
</Alert>
```

## Implementation

### Approach: CSS translateY/translateX with interval timer

1. **Container** has `overflow: hidden` and a measured size (height for vertical, width for horizontal) equal to one child.
2. **Inner wrapper** holds all children stacked in the cycling direction (flex-direction: column for up/down, row for left/right). Each child is sized to fill the container.
3. **Timer** (`setInterval`) increments the current index every `interval` ms.
4. **Translation**: On index change, the wrapper is translated by `-(index * itemSize)px` with a 300ms CSS transition.
5. **Seamless loop** (`infinite=true`): A duplicate of the first child is appended at the end. After transitioning to it, the wrapper silently resets to position 0 (transition disabled) to create a seamless loop.
6. **Finite mode** (`infinite=false`): No duplicate child. Cycling stops on the last item.
7. **Pause on hover**: `mouseenter` clears the interval, `mouseleave` restarts it.
8. **Accessibility**: Respects `prefers-reduced-motion` — disables transition animation.

### Direction mechanics

| Direction | Flex direction | Translate axis | Measured dimension |
|-----------|---------------|----------------|--------------------|
| `up`      | column        | translateY (-)  | height             |
| `down`    | column        | translateY (+)  | height             |
| `left`    | row           | translateX (-)  | width              |
| `right`   | row           | translateX (+)  | width              |

### CSS classes (BEM)

- `.ty-text-loop` — outer container, `overflow: hidden`
- `.ty-text-loop__track` — inner wrapper, holds children, animated via `transform`
- `.ty-text-loop__item` — each child wrapper, sized to fill container

## File structure

```
packages/react/src/text-loop/
├── text-loop.tsx
├── types.ts
├── index.tsx
├── index.md
├── index.zh_CN.md
├── style/
│   ├── _index.scss
│   └── index.tsx
├── demo/
│   └── basic.tsx
└── __tests__/
    └── text-loop.test.tsx
```

## Integration

- Export from `packages/react/src/index.ts`
- Add route in `apps/docs/src/routers.tsx`
- Update Alert demo (`LoopBanner.tsx`) to use TextLoop instead of Marquee

## Testing

- Renders all children
- Cycles to next child after interval (use `jest.advanceTimersByTime`)
- Pauses on hover, resumes on mouse leave
- Stops after one cycle when `infinite={false}`
- Supports all four directions
- Respects `prefers-reduced-motion`
