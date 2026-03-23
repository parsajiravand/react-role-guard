# Feature

Renders **`children`** when **`config.features[name]`** is truthy; otherwise renders **`fallback`**.

## When to use

- **Feature flags** and experiments driven by `RoleGuardProvider`’s `config.features`.

## Signature

```tsx
import { Feature } from 'advanced-react-role-guard';

<Feature name={featureName} fallback={...} children={...} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Key in `config.features`. |
| `fallback` | `ReactNode` | `null` | Rendered when the flag is off or missing. |
| `children` | `ReactNode` | required | Rendered when the flag is on. |

## Behavior

- Uses `useRoleGuardContext` and `hasFeature(name)`.
- `undefined` / missing keys → **false**.

## Edge cases

- **`name` typo** — Treated as off; always render something sensible in **`fallback`**.

## Error / fallback

Throws if used **outside** `RoleGuardProvider` (same as other hooks). When inside, denied access shows **`fallback`**.

## Examples

### Simple

```tsx
<Feature name="newDashboard" fallback={<ClassicDashboard />}>
  <NewDashboard />
</Feature>
```

### Advanced (nested with `Can`)

```tsx
<Feature name="betaBilling">
  <Can permission="billing:view">
    <BetaBilling />
  </Can>
</Feature>
```

## Do / don’t

| Do | Don’t |
|----|--------|
| Use for **UI experiments** | Store secrets in flag names or expect flags to be secure |

## Pitfalls

- **`Feature`** does **not** read roles or permissions — combine with **`Can`** if you need both.
