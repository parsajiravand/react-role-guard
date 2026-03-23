# Feature flag rollout

Combine **`Feature`** with **`Can`** so a flag **and** a permission must pass before showing new UI.

## When to use

- Gradual rollout of a feature to a subset of users
- You want flags in **`config.features`** separate from RBAC strings

## Example

```tsx
import {
  Feature,
  RoleGuardProvider,
  Can,
} from 'advanced-react-role-guard';

export function App() {
  return (
    <RoleGuardProvider
      user={{ roles: ['editor'], permissions: [] }}
      config={{
        roles: {
          editor: ['post:*'],
        },
        features: {
          aiAssist: true,
        },
      }}
    >
      <Editor />
    </RoleGuardProvider>
  );
}

function Editor() {
  return (
    <div>
      <Feature name="aiAssist" fallback={<p>AI assist is off.</p>}>
        <Can permission="post:create" fallback={<p>Cannot create posts.</p>}>
          <button type="button">Draft with AI</button>
        </Can>
      </Feature>
    </div>
  );
}
```

## Pitfalls

- Flags are **visible in the client bundle** — do not use for secret capabilities (see [Security](/security)).

## Best practices

- Drive **`config.features`** from the same remote config service you use for other environments.
