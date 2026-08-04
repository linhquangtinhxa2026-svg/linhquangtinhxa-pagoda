---
description: Backend Integration Architecture - PocketBase with Next.js
---

# Backend Integration Architecture

This workflow documents the architecture pattern for integrating frontend designs with the PocketBase backend. Follow this pattern when connecting UI components to the database.

## Architecture Overview

| Page Type | Data Fetching | Rendering | Authentication | SEO |
|-----------|---------------|-----------|----------------|-----|
| **Admin Dashboard Pages** | Client-side | CSR | Required (user logged in) | Not needed |
| **Public Pages** | Server-side | SSR | Not required | ✅ Optimized |

---

## 1. Admin Dashboard Pages (Client-Side)

Admin pages use **fully client-side** data fetching for maximum interactivity.

### Key Principles:
- Use `'use client'` directive
- Fetch data with `useEffect` hook
- Use the authenticated `pb` client from `@/lib/pocketbase`
- Check authentication state with `useAdminAuth` hook
- Redirect unauthenticated users to login

### Example: Admin CRUD Page

```tsx
'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Item {
  id: string;
  name: string;
  // ... other fields
}

export default function AdminItemsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAdminAuth();
  
  // Data state
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data client-side
  const fetchData = async () => {
    try {
      setError(null);
      const data = await pb.collection('items').getFullList<Item>({
        sort: '-created',
        requestKey: null, // Disable request cancellation
      });
      setItems(data);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load items');
      toast.error('Failed to load items');
    } finally {
      setIsLoading(false);
    }
  };

  // Auth check + initial data fetch
  useEffect(() => {
    if (!authLoading && user) {
      fetchData();
    } else if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [authLoading, user, router]);

  // CRUD operations use pb directly
  const handleCreate = async (data: Partial<Item>) => {
    try {
      await pb.collection('items').create(data);
      toast.success('Item created successfully');
      fetchData(); // Refresh data
    } catch (err: any) {
      toast.error(err.message || 'Failed to create item');
    }
  };

  const handleUpdate = async (id: string, data: Partial<Item>) => {
    try {
      await pb.collection('items').update(id, data);
      toast.success('Item updated successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await pb.collection('items').delete(id);
      toast.success('Item deleted successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete item');
    }
  };

  // Loading state
  if (authLoading || isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Your UI here */}
    </div>
  );
}
```

### Files Used:
- `@/lib/pocketbase` - Client-side PocketBase instance (authenticated via user login)
- `@/contexts/AdminAuthContext` - Authentication state management

---

## 2. Public Pages (Server-Side)

Public pages use **server-side** data fetching for SEO and performance.

### Key Principles:
- Use Server Components (no `'use client'`)
- Fetch data using functions from `@/lib/pocketbase-server`
- Data is fetched at request time (SSR) or build time (SSG)
- No authentication required for public data

### Example: Public List Page

```tsx
// src/app/services/page.tsx (Server Component)

import { getActiveServices, getServiceCategories } from '@/lib/pocketbase-server';
import { ServiceCard } from '@/components/public/ServiceCard';

export const metadata = {
  title: 'Our Services | NailTech',
  description: 'Explore our premium nail salon services',
};

export default async function ServicesPage() {
  // Server-side data fetching
  const [services, categories] = await Promise.all([
    getActiveServices(),
    getServiceCategories(),
  ]);

  return (
    <main>
      <h1>Our Services</h1>
      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </main>
  );
}
```

### Example: Dynamic Route with SSR

```tsx
// src/app/services/[slug]/page.tsx

import { getServiceBySlug, getActiveServices } from '@/lib/pocketbase-server';
import { notFound } from 'next/navigation';

// Generate static params for popular services (optional SSG)
export async function generateStaticParams() {
  const services = await getActiveServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.name} | NailTech`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <main>
      <h1>{service.name}</h1>
      <p>{service.full_description}</p>
      {/* ... */}
    </main>
  );
}
```

### Files Used:
- `@/lib/pocketbase-server` - Server-side PocketBase functions (no auth needed for public data)

---

## 3. PocketBase Client Configuration

### Client-Side (`@/lib/pocketbase.ts`)
```tsx
import PocketBase from "pocketbase";
import { config } from "./config";

export const pb = new PocketBase(config.pocketbase.url);
pb.autoCancellation(false);

export default pb;
```

- Used for **authenticated** operations (admin CRUD)
- Auth token is automatically stored after user login
- Singleton instance shared across components

### Server-Side (`@/lib/pocketbase-server.ts`)

```tsx
import PocketBase from 'pocketbase';
import { config } from './config';

// For unauthenticated read-only operations (public data)
export function getPocketBaseServer() {
  return new PocketBase(config.pocketbase.url);
}

// For authenticated server-side operations (if needed)
export async function getPocketBaseAdmin(): Promise<PocketBase> {
  const pb = new PocketBase(config.pocketbase.url);
  
  const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL;
  const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    throw new Error('PocketBase admin credentials not configured');
  }
  
  await pb.admins.authWithPassword(adminEmail, adminPassword);
  return pb;
}

// Data fetching functions
export async function getActiveServices() {
  const pb = getPocketBaseServer();
  return pb.collection('services').getFullList({
    filter: 'is_active = true',
    sort: 'display_order',
    expand: 'category_id',
  });
}
```

---

## 4. When to Use Each Pattern

### Use Client-Side (Admin) When:
- ✅ Building admin dashboard pages
- ✅ Need full CRUD operations
- ✅ User must be authenticated
- ✅ Real-time updates are needed
- ✅ Complex UI interactions (modals, dropdowns, etc.)

### Use Server-Side (Public) When:
- ✅ Building public-facing pages
- ✅ SEO is important
- ✅ Only read operations needed
- ✅ Data doesn't change frequently
- ✅ Faster initial page load is priority

---

## 5. File Structure Convention

```
src/
├── app/
│   ├── admin/                    # Admin pages (client-side)
│   │   ├── services/
│   │   │   └── page.tsx          # 'use client' - full client component
│   │   ├── gallery/
│   │   │   └── page.tsx          # 'use client' - full client component
│   │   └── ...
│   │
│   ├── services/                 # Public pages (server-side)
│   │   ├── page.tsx              # Server Component - SSR
│   │   └── [slug]/
│   │       └── page.tsx          # Server Component - dynamic SSR
│   │
│   └── page.tsx                  # Home page - Server Component
│
├── components/
│   ├── admin/                    # Admin-specific components
│   │   ├── ServiceModal.tsx      # 'use client' - uses pb directly
│   │   └── DeleteConfirmModal.tsx
│   │
│   └── public/                   # Public components (can be server or client)
│       ├── ServiceCard.tsx       # Can be server component
│       └── ServicesSection.tsx
│
├── contexts/
│   └── AdminAuthContext.tsx      # Admin authentication state
│
└── lib/
    ├── pocketbase.ts             # Client-side PocketBase instance
    ├── pocketbase-server.ts      # Server-side PocketBase functions
    └── config.ts                 # Centralized configuration
```

---

## 6. Environment Variables

```env
# PocketBase Configuration
NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090

# Admin credentials (for server-side authenticated operations if needed)
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=secure_password
```

---

## 7. Quick Reference

| Task | Pattern | File to Use |
|------|---------|-------------|
| Admin list page | Client-side | `'use client'` + `pb` |
| Admin create/edit | Client-side | `pb.collection().create/update()` |
| Admin delete | Client-side | `pb.collection().delete()` |
| Public list page | Server-side | `getActiveItems()` from pocketbase-server |
| Public detail page | Server-side | `getItemBySlug()` from pocketbase-server |
| SEO metadata | Server-side | `generateMetadata()` async function |
| Auth check | Client-side | `useAdminAuth()` hook |

---

## 8. Best Practices

1. **Always use `requestKey: null`** in client-side fetches to prevent request cancellation issues:
   ```tsx
   pb.collection('items').getFullList({ requestKey: null });
   ```

2. **Handle errors gracefully** with try/catch and user-friendly toast messages

3. **Refresh data after mutations** by calling `fetchData()` again

4. **Use TypeScript interfaces** for all PocketBase record types

5. **Add loading states** for better UX during data fetching

6. **Redirect unauthenticated users** early in admin pages:
   ```tsx
   if (!authLoading && !user) {
     router.push('/admin/login');
   }
   ```

7. **Use `expand` parameter** to include related records in a single query

8. **Sort by `display_order`** for user-controlled ordering, or `-created` for newest first
