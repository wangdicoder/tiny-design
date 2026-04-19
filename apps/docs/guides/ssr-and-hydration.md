# SSR and Hydration

Tiny UI works in SSR applications, but there are two separate concerns to keep straight:

1. **Component rendering** on the server.
2. **Theme state** that may depend on browser-only APIs such as `localStorage`, `matchMedia`, or DOM attributes.

This guide explains what is safe on the server, what must stay on the client, and how to avoid hydration mismatches or theme flash on first paint.

## What is SSR-safe

These parts are safe to use during server rendering:

- Rendering components such as `Button`, `Card`, `Table`, and `Layout`
- Rendering `ConfigProvider`
- Passing a static `theme` string such as `"light"` or `"dark"` to `ConfigProvider`
- Passing a static token object to `ConfigProvider theme={{ tokens: ... }}`

Example:

```tsx
import { ConfigProvider, Button } from '@tiny-design/react';

export default function Page() {
  return (
    <ConfigProvider theme="dark">
      <Button variant="solid" color="primary">
        Button
      </Button>
    </ConfigProvider>
  );
}
```

This is deterministic on both server and client, so hydration remains stable.

## What must stay on the client

`useTheme()` reads and writes browser state:

- `localStorage`
- `window.matchMedia`
- `document.documentElement`
- the `data-tiny-theme` attribute on `<html>`

That means `useTheme()` should only be used inside client components.

```tsx
'use client';

import { Button, useTheme } from '@tiny-design/react';

export default function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();

  return (
    <Button variant="outline" color="primary" onClick={toggle}>
      Current: {resolvedTheme}
    </Button>
  );
}
```

Do not call `useTheme()` from a server component or from server-only logic.

## First paint and theme flash

The most common SSR issue is not hydration failure, but **theme flash**:

- the server renders light mode
- the browser restores a stored dark preference
- the page briefly shows light before switching to dark

There are three common strategies.

### 1. Static server theme

If your application always renders one mode for all users, set it directly on the server:

```html
<html data-tiny-theme="dark">
```

Or render a fixed mode through `ConfigProvider theme="dark"`.

This is the simplest and most stable option.

### 2. Server-known user preference

If your app stores the user's preference in cookies, headers, or session data, write the same mode into the initial HTML:

```html
<html data-tiny-theme="dark">
```

This avoids a mode switch during hydration because the server and client start from the same value.

### 3. Client-restored preference

If the mode only exists in `localStorage`, the client can restore it after boot. This is acceptable, but the first paint may briefly use the default mode.

In that setup:

- keep the server output deterministic
- expect possible theme flash
- avoid rendering different text on the server and client based on unresolved theme state

## ConfigProvider placement

In SSR apps, place `ConfigProvider` high enough that the same theme scope wraps the full interactive subtree.

Recommended:

- app root layout
- framework root app shell
- route layout boundary when you intentionally want local scope

Example:

```tsx
import { ConfigProvider } from '@tiny-design/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-tiny-theme="light">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
```

This keeps token scope and popup holder ownership stable across hydration.

## Avoiding hydration mismatches

Hydration mismatches usually come from rendering different content before and after mount.

Risky pattern:

```tsx
'use client';

import { useTheme } from '@tiny-design/react';

export default function Label() {
  const { resolvedTheme } = useTheme();
  return <span>{resolvedTheme === 'dark' ? 'Dark' : 'Light'}</span>;
}
```

If the server rendered light but the client restores dark from storage, the text changes immediately.

Safer options:

- render a neutral placeholder until mounted
- make the server know the theme ahead of time
- use theme state for styling first, not for visible SSR text

Mounted guard example:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@tiny-design/react';

export default function ThemeLabel() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>Theme</span>;
  }

  return <span>{resolvedTheme}</span>;
}
```

## Static feedback APIs in SSR apps

Static APIs such as `Message`, `Notification`, `LoadingBar`, and `Modal.open()` do not automatically read the nearest React tree provider.

If you need them to inherit theme or locale, configure them explicitly:

```tsx
import { ConfigProvider } from '@tiny-design/react';

ConfigProvider.config({
  holderRender: (children) => (
    <ConfigProvider theme="dark">
      {children}
    </ConfigProvider>
  ),
});
```

Do this in client startup code, not in server-only code.

## Recommended baseline

- Render deterministic HTML on the server
- Use `ConfigProvider` high in the tree
- Use `useTheme()` only in client components
- If possible, write the initial `data-tiny-theme` on the server
- Avoid server-rendered text that depends on unresolved client theme state

If you are using Next.js, this guide pairs well with the framework-specific setup pages such as `Use with Next.js` and `Use with Next.js Pages Router`.
