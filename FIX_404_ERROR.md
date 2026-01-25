# ✅ Fix: 404 Error on Subdomains

## The Issue
Accessing `skoda-india.localhost:3000` was returning a 404 error, even though the site existed in the database.

## The Cause
The **Middleware Rewrite** was incorrect.
It was rewriting requests to: `/(client)/skoda-india/`
But `(client)` is a **Route Group** in Next.js, which means it is transparent and should **not** be part of the URL path. Next.js was looking for a literal folder named `(client)`, which doesn't exist in the routing tree.

## The Fix
I updated `src/middleware.ts` to remove `(client)` from the rewrite URL:

```typescript
// Before (Incorrect)
return NextResponse.rewrite(new URL(`/(client)/${currentHost}${path}`, req.url));

// After (Correct)
return NextResponse.rewrite(new URL(`/${currentHost}${path}`, req.url));
```

Now, `skoda-india.localhost:3000` correctly maps to `src/app/(client)/[domain]/page.tsx`.

## 🚀 Try It Now
1.  Refresh **http://skoda-india.localhost:3000**
2.  The site should load perfectly! 🎉
