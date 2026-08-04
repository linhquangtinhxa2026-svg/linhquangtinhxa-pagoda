# next/image with PocketBase-hosted files

Any `<Image>` (from `next/image`) whose `src` can be a PocketBase file URL
(`pb.files.getURL(...)`, or any `post.image` / `*_avatar` field coming from the
`posts`/`media` collections) needs **two** separate things configured in
`next.config.ts`, or it will fail with `"url" parameter is not allowed`:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // required for 127.0.0.1 in local dev
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "127.0.0.1", port: "8090" }, // local PocketBase
      // add the production PocketBase domain here too when deploying
    ],
  },
};
```

## Why two separate settings

1. **`remotePatterns`** — allow-lists which hosts `next/image` is permitted to
   fetch from at all. Missing this → `"url" parameter is not allowed`.
2. **`dangerouslyAllowLocalIP`** — Next.js added an SSRF guard that blocks the
   image optimizer from fetching any URL that resolves to a private/loopback
   IP (this includes `127.0.0.1`, which is where PocketBase runs in local
   dev). This check happens *after* `remotePatterns` matches, so a URL can
   pass the host allow-list and still get rejected with the exact same
   `"url" parameter is not allowed"` error. Missing this is the actual cause
   if the host is already in `remotePatterns` and it's still failing — check
   the dev server logs for `"resolved to private ip"` to confirm.

## Rule: `next.config.ts` changes always need a full dev server restart

Unlike most file edits, Next.js does **not** hot-reload `next.config.ts`.
After editing `images.remotePatterns` or `images.dangerouslyAllowLocalIP`,
you must stop (`Ctrl+C`) and restart the dev server (`npm run dev`) — a
save alone will not apply the change, and the old behavior will persist even
though the file on disk is correct.

## Debugging checklist when a PocketBase image fails to load in `next/image`

1. Confirm the file is actually reachable: `curl -I <the pocketbase file url>` → expect `200`.
2. Confirm `next.config.ts` has both `remotePatterns` (matching host) and
   `dangerouslyAllowLocalIP: true` if the host is a local/private IP.
3. Restart the dev server — config changes are not hot-reloaded.
4. If still broken, check `.next/dev/logs/next-development.log` for the
   specific rejection reason (`"resolved to private ip"` vs. the
   `remotePatterns` mismatch) rather than guessing from the generic 400.

## Alternative: skip next/image entirely for admin-only thumbnails

For internal admin UI (e.g. `PostsTable.tsx` row thumbnails) where the
PocketBase host will differ between local dev and production and the
optimization benefit is negligible, it's simpler to use a plain `<img>` tag
(with `// eslint-disable-next-line @next/next/no-img-element`) instead of
maintaining `remotePatterns` across environments. Public-facing pages
(`BlogGrid`, `BlogDetailContent`, etc.) still use `next/image` for the
performance benefit, so they do need the config kept in sync per environment.
