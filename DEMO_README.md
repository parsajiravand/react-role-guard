# Simple React Role Guard Demo

🎉 **Live demo (production):** [advanced-react-role-guard-website.netlify.app](https://advanced-react-role-guard-website.netlify.app/) · **Documentation:** [advanced-react-role-guard-doc.netlify.app](https://advanced-react-role-guard-doc.netlify.app/)

**Local dev:** visit http://localhost:5173 (or the port Vite prints) after `npm run website:dev` from the repo root.

## What You'll See

This interactive demo showcases all the core features of `advanced-react-role-guard`:

### 👤 **User Switching**
- **Admin**: Full access (`*` wildcard permission)
- **Editor**: Post management + user reading (`post:*`, `user:read`)
- **Viewer**: Read-only access (`post:read`)

### 🚩 **Feature Flags**
- Toggle "New Dashboard" and "AI Search" features on/off
- See how `<Feature />` component responds

### 🔒 **Role-Based Access Control**
- Admin Panel (admin role only)
- Editor Tools (editor role only)

### 🔑 **Permission-Based Access Control**
- Create Post Button (`post:create` permission)
- User Management (`user:create` OR `user:delete`)

### 🎣 **useCan Hook**
- Real-time permission checking
- Different parameter types (role, permission, permissions array)

## How It Works

The demo uses the **built package** from `./dist/` - exactly what users would get from npm!

```html
<script type="module">
  import { RoleGuardProvider, Can, useCan, Feature } from './dist/react-role-guard.js';
  // ... React components using the library
</script>
```

## Testing Different Scenarios

1. **Start as Editor** (default)
   - Can create posts ✅
   - Cannot access admin panel ❌
   - Can see editor tools ✅

2. **Switch to Admin**
   - Has all permissions ✅
   - Can access everything ✅

3. **Switch to Viewer**
   - Only read permissions ✅
   - Cannot create or edit ❌

4. **Toggle Features**
   - Enable/disable features dynamically
   - See components show/hide instantly

## Running the Demo

```bash
# Make sure the package is built
npm run build

# Start the demo server
npm run demo

# Visit http://localhost:3000
```

The demo proves that `advanced-react-role-guard` works perfectly for:
- ✅ Declarative role/permission checks
- ✅ Feature flag management
- ✅ Dynamic user switching
- ✅ SSR-safe (no hydration issues)
- ✅ TypeScript support
- ✅ Tree-shakable bundle

**Ready to publish to npm! 🚀**