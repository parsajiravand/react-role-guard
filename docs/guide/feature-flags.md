# Feature flags

Boolean **feature toggles** live on `RoleGuardProvider` under `config.features`. Render gated UI with the `Feature` component.

## When to use

- Gradual rollouts, experiments, or entitlements that are **not** fine-grained RBAC strings
- UI that should flip on/off without redeploying (when your app loads flag values from config or remote)

## Configuration

```tsx
<RoleGuardProvider
  user={user}
  config={{
    features: {
      newDashboard: true,
      betaSearch: false,
    },
  }}
>
  <App />
</RoleGuardProvider>
```

Missing keys are treated as **false**.

## Example

```tsx
import { Feature, RoleGuardProvider } from 'advanced-react-role-guard';

export function Shell() {
  return (
    <RoleGuardProvider
      user={null}
      config={{
        features: { newNav: true },
      }}
    >
      <Feature name="newNav" fallback={<ClassicNav />}>
        <ModernNav />
      </Feature>
    </RoleGuardProvider>
  );
}
```

## Pitfalls

- **Feature flags are client-visible.** Do not use them to hide secrets or enforce security (see [Security](/security)).
- `Feature` uses the same context as `Can` — you still need `RoleGuardProvider` above the tree.

## Best practices

- Load `config.features` from your **remote config** or bootstrap payload in one place.
- Name flags **after behavior** (`checkoutOneClick`) not ticket IDs.

## Common mistakes

- Expecting `Feature` to read from `user` — flags are **only** on `config.features`.
