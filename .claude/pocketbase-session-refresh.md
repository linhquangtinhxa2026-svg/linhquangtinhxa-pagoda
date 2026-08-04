# PocketBase Session Refresh Pattern

## Problem

PocketBase JWT tokens expire (default: **14 days**). After expiry:
- `pb.authStore.model` remains populated (user appears logged in)
- API calls return **401 Unauthorized**
- UI shows empty data instead of redirecting to login

## Solution

Three layers of protection:

1. **Validate on init** — check `pb.authStore.isValid` before trusting the stored model
2. **Refresh on mount** — call `authRefresh()` immediately to extend the session
3. **Periodic refresh** — repeat every 30 minutes to keep long sessions alive

---

## Implementation (React / Next.js)

### AuthContext.tsx

```ts
// Initialize user only if token is still valid
const [user, setUser] = useState<any>(
  pb.authStore.isValid ? pb.authStore.model : null
);

useEffect(() => {
  const refreshSession = async () => {
    if (!pb.authStore.isValid) {
      pb.authStore.clear();
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      await pb.collection('users').authRefresh();
    } catch {
      // Token rejected by server (revoked, user deleted, etc.)
      pb.authStore.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  refreshSession(); // run immediately on mount

  const refreshInterval = setInterval(refreshSession, 30 * 60 * 1000); // every 30 min

  const unsubscribe = pb.authStore.onChange((token, model) => {
    setUser(model);
  });

  return () => {
    unsubscribe();
    clearInterval(refreshInterval);
  };
}, []);
```

### QueryProvider (React Query)

```ts
// Skip retries on auth errors
retry: (failureCount, error: any) => {
  if (error?.status === 401 || error?.status === 403) return false;
  return failureCount < 2;
},

// Global 401 handler — clears auth so the redirect to login fires
client.getQueryCache().subscribe((event) => {
  if (event.type === 'updated' && event.query.state.status === 'error') {
    const error: any = event.query.state.error;
    if (error?.status === 401) {
      pb.authStore.clear();
    }
  }
});
```

---

## Implementation (React Native)

The same logic applies. Key differences:

### 1. PocketBase Auth Storage

By default PocketBase stores the auth token in memory. In React Native you need to persist it to `AsyncStorage` (or `expo-secure-store`) so it survives app restarts:

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import PocketBase, { AsyncAuthStore } from 'pocketbase';

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem('pb_auth', serialized),
  initial: await AsyncStorage.getItem('pb_auth'),
  clear: async () => AsyncStorage.removeItem('pb_auth'),
});

const pb = new PocketBase('http://your-pocketbase-url', store);
```

> Use `expo-secure-store` instead of `AsyncStorage` for better security on sensitive apps.

### 2. Session Refresh in Auth Context / Hook

Replace the `useEffect` the same way as the web version. React Native supports the identical pattern:

```ts
useEffect(() => {
  const refreshSession = async () => {
    if (!pb.authStore.isValid) {
      pb.authStore.clear();
      setUser(null);
      return;
    }
    try {
      await pb.collection('users').authRefresh();
      setUser(pb.authStore.model);
    } catch {
      pb.authStore.clear();
      setUser(null);
    }
  };

  refreshSession();

  const refreshInterval = setInterval(refreshSession, 30 * 60 * 1000);

  const unsubscribe = pb.authStore.onChange((token, model) => {
    setUser(model ?? null);
  });

  return () => {
    unsubscribe();
    clearInterval(refreshInterval);
  };
}, []);
```

### 3. App Foreground Refresh (React Native specific)

In mobile apps, users often switch apps and return after hours. Use `AppState` to trigger a refresh when the app comes back to the foreground:

```ts
import { AppState } from 'react-native';

useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextState) => {
    if (nextState === 'active') {
      refreshSession(); // re-validate/refresh when app comes to foreground
    }
  });

  return () => subscription.remove();
}, []);
```

This is the mobile equivalent of `refetchOnWindowFocus` in the web version.

### 4. 401 Error Handling (without React Query)

If using plain `fetch` or `axios` instead of React Query, add a wrapper:

```ts
const safeFetch = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error: any) {
    if (error?.status === 401) {
      pb.authStore.clear();
      setUser(null); // triggers redirect to login screen
    }
    throw error;
  }
};
```

---

## Token Lifetime

| Setting | Default | Location |
|---------|---------|----------|
| Auth token duration | 14 days | PocketBase Admin → Settings → Application |

Every successful `authRefresh()` call resets the 14-day clock. A user is only logged out if they haven't opened the app for 14+ consecutive days.

---

## Summary of Key APIs

```ts
pb.authStore.isValid        // true if token exists and not expired client-side
pb.authStore.model          // the authenticated user record (may exist even if expired)
pb.authStore.clear()        // clears token + model (triggers onChange)
pb.authStore.onChange(cb)   // subscribe to auth state changes

pb.collection('users').authRefresh()  // exchanges current token for a fresh one
```
