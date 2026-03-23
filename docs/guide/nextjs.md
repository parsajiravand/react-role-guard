# Next.js

**advanced-react-role-guard** uses React context and hooks. Use it in **Client Components** and mount `RoleGuardProvider` high enough that pages and layouts share the same user/config.

## When to use

- App Router (`app/`) or Pages Router with React 18+
- You need SSR-friendly hydration without leaking authorization to the client as **security**

## Client boundary

Mark files that use the provider or hooks with the App Router directive:

```tsx
'use client';

import {
  RoleGuardProvider,
  Can,
} from 'advanced-react-role-guard';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuardProvider
      user={{ roles: ['admin'] }}
      config={{ roles: { admin: ['*'] } }}
    >
      {children}
    </RoleGuardProvider>
  );
}
```

Compose `Providers` in `app/layout.tsx` around the body content.

## Example (App Router layout)

```tsx
// app/layout.tsx — server component can import a client Providers wrapper
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
// app/providers.tsx
'use client';

import { RoleGuardProvider } from 'advanced-react-role-guard';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuardProvider user={null} config={{}}>
      {children}
    </RoleGuardProvider>
  );
}
```

Replace `user` and `config` with values from your session loader or client fetch.

## SSR and hydration

- **Render the same provider tree on server and client** for the initial HTML to avoid hydration mismatches.
- **Do not** put secret permission rules only in client bundles. The browser can always see props passed to `RoleGuardProvider`.

## Pitfalls

- Using hooks or `Can`/`Guard`/`Feature` in **Server Components** without a client wrapper — they require client context.
- Passing **non-serializable** values to `children` when bridging server/client boundaries — keep props JSON-serializable.

## Best practices

- Resolve **session → user + roles** in a route handler or server action, then pass a **plain object** into the client provider.
- Keep `config.roles` in sync with **server-side** policy or regenerate from a shared config package.

## Common mistakes

- Treating client-side `Can` as **authorization** — it is **UI gating** only. Enforce in Next.js Route Handlers, Server Actions, and your API.
