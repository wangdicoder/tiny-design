# @tiny-design/icons

SVG icon components for React, part of the Tiny Design system. Includes 243 icons auto-generated from the icon font.

## Install

```bash
npm install @tiny-design/icons
# or
pnpm add @tiny-design/icons
```

**Peer dependency:** `react >= 18.0.0`

## Usage

```tsx
import { IconHeart, IconStar, IconClose } from '@tiny-design/icons';

function App() {
  return (
    <div>
      <IconHeart size={24} color="red" />
      <IconStar size="2em" />
      <IconClose />
    </div>
  );
}
```

### Props

All icons accept the following props (plus any standard SVG attributes):

| Prop    | Type               | Default          | Description                  |
| ------- | ------------------ | ---------------- | ---------------------------- |
| `size`  | `string \| number` | `'1em'`          | Width and height of the icon |
| `color` | `string`           | `'currentColor'` | Fill color                   |

### Spinning Icons

Use the `withSpin` HOC from `@tiny-design/react` to create spinning variants (useful for loaders):

```tsx
import { withSpin } from '@tiny-design/react';
import { IconLoader } from '@tiny-design/icons';

const SpinningLoader = withSpin(IconLoader);

function Loading() {
  return <SpinningLoader size={24} />;
}
```

## Available Icons

**Navigation:** IconArrowUp, IconArrowDown, IconArrowLeft, IconArrowRight, IconChevronUp, IconChevronDown, IconChevronLeft, IconChevronRight, ...

**Actions:** IconPlus, IconMinus, IconClose, IconCheck, IconSearch, IconEdit, IconDelete, IconRefresh, ...

**Status:** IconInfo, IconWarning, IconSuccess, IconError, ...

**Files:** IconDocument, IconFile, IconImageFile, IconAudioFile, IconVideoFile, IconXls, IconWord, IconPsd, ...

**Social:** IconGithub, IconTwitter, IconFacebook, IconLinkedin, IconSlack, IconWeibo, IconWechat, ...

**Users:** IconUser, IconTeam, IconOrganization, IconManager, ...

And 200+ more. See the [source](./src) for the full list.

## License

MIT
