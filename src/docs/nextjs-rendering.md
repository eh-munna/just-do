# Next.js Rendering — Comprehensive Notes

> **Purpose:**
>
> This document covers how rendering works in Next.js App Router — what rendering is, CSR vs SSR, Server vs Client Components, hydration, and the rendering strategies Next.js provides. Includes examples and interview-level Q&A.

---

## Table of Contents

1. [What Is Rendering?](#1-what-is-rendering)
2. [CSR vs SSR](#2-csr-vs-ssr)
3. [Server Components vs Client Components](#3-server-components-vs-client-components)
4. [Hydration](#4-hydration)
5. [Next.js Rendering Techniques](#5-nextjs-rendering-techniques)
6. [When to Use `'use client'`](#6-when-to-use-use-client)
7. [Interview Questions & Answers](#7-interview-questions--answers)
8. [Quick Reference Checklist](#quick-reference-checklist)

---

## 1. What Is Rendering?

### Overview

Rendering is the process of converting data into a visual representation on the screen. In a web app, that means turning your components and data into HTML the browser can display. Rendering can happen on the server or on the client — and in Next.js, it can happen on both within a single page.

### Key Points

- **Server-side rendering**: HTML is generated on the server before reaching the browser. The user sees content faster, and search engines can index it.
- **Client-side rendering**: The browser downloads a minimal HTML shell and JavaScript, then builds the page itself.
- **Next.js App Router default**: Components are Server Components by default, so most rendering happens on the server unless you opt into the client.

---

## 2. CSR vs SSR

### Overview

CSR (Client-Side Rendering) and SSR (Server-Side Rendering) describe where the HTML is built. Each has trade-offs in performance, SEO, and interactivity.

### Key Points

- **CSR**: The server sends an almost-empty HTML file. The browser downloads JavaScript, runs it, and builds the page. Initial page load is slow; subsequent navigation is fast.
- **SSR**: The server builds the full HTML on every request and sends it to the browser. The user sees content faster, but the server does more work per request.
- **SEO**: SSR is better for SEO because search engine crawlers receive fully-rendered HTML. CSR pages may appear empty to crawlers if JavaScript hasn't run yet.
- **Interactivity**: CSR pages become interactive immediately after JavaScript loads. SSR pages show HTML first, then become interactive after hydration.

### Example

```js
// CSR — React app shell, content built in the browser
// index.html → <div id="root"></div>
// JavaScript fills it in after download

// SSR — Next.js page, HTML built on the server per request
export default async function Page() {
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

---

## 3. Server Components vs Client Components

### Overview

Next.js App Router splits React components into two types. Server Components render on the server and never send their code to the browser. Client Components run in the browser and can use state, effects, and browser APIs.

### Key Points

- **Server Components** (default): Can `async/await`, access databases and secrets directly, reduce the JavaScript bundle, and cannot use hooks or browser APIs.
- **Client Components** (opt-in with `'use client'`): Can use `useState`, `useEffect`, event handlers, browser APIs like `localStorage`, and custom hooks.
- **`'use client'` is a boundary, not a per-component flag**: Once a file is marked `'use client'`, everything it imports is also included in the client bundle. You don't need to repeat the directive on every file below that boundary.
- **Composition pattern**: A Server Component can pass a Client Component as `children`. This keeps the Server Component out of the client bundle even though it renders inside a Client Component.
- **Props must be serializable**: Data passed from a Server Component to a Client Component must be serializable (strings, numbers, plain objects — not functions or class instances).

### Example

```js
// app/page.js — Server Component (no directive needed)
import LikeButton from './LikeButton';
import { getPost } from '@/lib/data';

export default async function Page({ params }) {
  const { id } = await params;
  const post = await getPost(id); // runs on server, never exposed to client
  return (
    <div>
      <h1>{post.title}</h1>
      <LikeButton likes={post.likes} /> {/* passes serializable data */}
    </div>
  );
}
```

```js
// app/LikeButton.js — Client Component
'use client';

import { useState } from 'react';

export default function LikeButton({ likes }) {
  const [count, setCount] = useState(likes);
  return <button onClick={() => setCount(count + 1)}>{count} likes</button>;
}
```

### Important Rules

- You cannot import a Server Component inside a Client Component (it would pull server code into the client bundle). Pass Server Components as `children` props instead.
- React context is not available in Server Components — create a Client Component wrapper for your context providers.

---

## 4. Hydration

### Overview

Hydration is the process where React attaches event listeners to the server-rendered HTML to make it interactive. The page looks correct immediately from the server HTML, but it is not interactive until hydration completes.

### Key Points

- **What happens**: The server sends HTML + the RSC (React Server Component) Payload. The browser displays the HTML immediately, then React downloads the JavaScript for Client Components and "hydrates" them — wiring up state and event handlers.
- **RSC Payload**: A compact serialized representation of the Server Component tree. It tells the client where Client Components should go, what props they received, and which JavaScript files to load.
- **First load vs subsequent navigation**: On first load, the browser gets HTML + RSC Payload + JavaScript. On subsequent navigations, only the RSC Payload is fetched — no full HTML is re-sent.
- **Hydration mismatch**: If the HTML from the server doesn't match what React expects to render on the client, you get a hydration error. Common cause: rendering things like `new Date()` or `Math.random()` differently on server and client.

### Example

```
Server                          Client
──────────────────────────────────────────────────────
1. Renders HTML + RSC Payload
2. Sends to browser            → Displays HTML instantly (non-interactive)
                               → Downloads JS for Client Components
                               → React hydrates (attaches event handlers)
                               → Page is now interactive
```

---

## 5. Next.js Rendering Techniques

### Overview

Next.js App Router treats static and dynamic rendering as a spectrum at the component level — not a binary per-route choice. A single page can mix a static shell, cached components, and dynamic sections that stream in.

### Key Points

- **Static rendering** (default for Server Components): HTML is generated at build time or after revalidation. Served instantly from a CDN. Use for content that doesn't change per request (blog posts, landing pages).
- **Dynamic rendering**: Triggered automatically when a component uses request-specific data — `headers()`, `cookies()`, or `searchParams`. HTML is generated on every request.
- **Streaming with Suspense**: Long-running data fetches don't block the entire page. Wrap a component in `<Suspense>` and Next.js streams the shell immediately, then streams the component in when its data is ready.
- **Incremental Static Regeneration (ISR)**: Revalidate a cached page after a set time interval (`revalidate`) or on demand (`revalidateTag`). The page stays static but can be updated without a full rebuild.
- **Partial Prerendering (PPR)**: Experimental. The static shell is served at CDN speed; dynamic holes stream in from the server. Static and dynamic coexist in one response.

### Example

```js
// app/posts/[id]/page.js

import { Suspense } from 'react';
import Comments from './Comments';

// This page is statically rendered at build time
export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await fetchPost(id); // cached by default

  return (
    <div>
      <h1>{post.title}</h1>
      {/* Comments stream in separately — doesn't block the page */}
      <Suspense fallback={<p>Loading comments…</p>}>
        <Comments postId={id} />
      </Suspense>
    </div>
  );
}

// ISR: re-generate this page at most every 60 seconds
export const revalidate = 60;
```

---

## 6. When to Use `'use client'`

### Overview

`'use client'` opts a component into the client bundle. You should use it as deep in the component tree as possible — only where client-side capabilities are actually needed. This keeps the JavaScript bundle small.

### Key Points

- **When you need a hook**: `useState`, `useEffect`, `useContext`, `useRef`, and custom hooks are only available in Client Components.
- **When you need reactivity**: Any component that responds to user interaction (button clicks, form input, toggles) needs to be a Client Component.
- **When you need browser APIs**: `localStorage`, `window`, `navigator.geolocation`, `document` — these don't exist on the server.
- **Push it down**: Don't mark a whole page or layout as `'use client'`. Instead, extract the interactive piece into its own small component and mark only that.
- **Third-party components**: If a library component uses client-only features but doesn't ship `'use client'`, wrap it in a thin Client Component of your own.

### Example

```js
// Bad: marks the entire layout as a Client Component
// app/layout.js
'use client'; // ← avoid this — pulls the whole tree into the client bundle

import Search from './Search';
export default function Layout({ children }) {
  return (
    <>
      <Search />
      {children}
    </>
  );
}
```

```js
// Good: only the interactive Search is a Client Component
// app/Search.js
'use client'

import { useState } from 'react'
export default function Search() {
  const [query, setQuery] = useState('')
  return <input value={query} onChange={e => setQuery(e.target.value)} />
}

// app/layout.js — stays a Server Component
import Search from './Search'
export default function Layout({ children }) {
  return <><Search />{children}</>
}
```

---

## 7. Interview Questions & Answers

### Q1: What is the difference between a Server Component and a Client Component in Next.js?

**Answer:**
Server Components render on the server and their code never ships to the browser — they can fetch data directly, access secrets, and reduce bundle size. Client Components are marked with `'use client'` and run in the browser, which is required for hooks, event handlers, and browser APIs. The default in Next.js App Router is Server Component; you opt into the client only when needed.

---

### Q2: What is hydration and why does it matter?

**Answer:**
Hydration is React's process of attaching event handlers to server-rendered HTML to make it interactive. The browser receives HTML that displays immediately (fast First Contentful Paint), then React downloads the JavaScript and wires up the interactivity. It matters because until hydration completes, a page looks interactive but isn't — buttons don't respond, state doesn't update.

**Example:**

```js
// Server sends this HTML:
<button>0 likes</button>

// After hydration, the onClick handler is attached:
<button onClick={() => setCount(count + 1)}>0 likes</button>
```

---

### Q3: Why shouldn't you mark your entire layout with `'use client'`?

**Answer:**
`'use client'` creates a boundary: every file imported below that boundary is included in the client JavaScript bundle. Marking a layout as a Client Component pulls in the entire subtree, removing the performance benefits of Server Components — larger bundle, less server-side rendering, and secrets can no longer be safely used in that subtree.

---

### Q4: Can you pass a Server Component as a child to a Client Component?

**Answer:**
Yes, and it's a key composition pattern. You cannot _import_ a Server Component inside a Client Component (it would bundle server code on the client). But you can pass one as `children` from a parent Server Component — the Server Component renders on the server and its output is passed as props.

**Example:**

```js
// page.js — Server Component
import Modal from './Modal'; // Client Component
import Cart from './Cart'; // Server Component

export default function Page() {
  return (
    <Modal>
      <Cart /> {/* Cart stays a Server Component */}
    </Modal>
  );
}
```

---

### Q5: What triggers dynamic rendering in Next.js?

**Answer:**
A Server Component is statically rendered by default. Next.js switches to dynamic (per-request) rendering when the component uses request-specific data: calling `headers()`, `cookies()`, or reading `searchParams`. You can also force dynamic rendering with `export const dynamic = 'force-dynamic'`.

---

### Q6: What is the React `use` hook and where is it used?

**Answer:**
The `use` hook is a React API for Client Components that lets you unwrap a Promise or read a Context value inside a render function — useful when a Server Component passes a Promise to a Client Component as a prop and the client needs to resolve it. It is not for Server Components; Server Components are `async` functions and use `await` directly. `use` exists because Client Components cannot be `async`.

**Example:**

```js
// Server Component passes a Promise
export default function Page() {
  const dataPromise = fetchData() // not awaited
  return <ClientWidget data={dataPromise} />
}

// Client Component unwraps it with `use`
'use client'
import { use } from 'react'

export default function ClientWidget({ data }) {
  const resolved = use(data) // unwraps the Promise
  return <p>{resolved.title}</p>
}
```

---

### Q7: What is the difference between static rendering and ISR in Next.js?

**Answer:**
Both generate HTML at build time and serve it from a CDN. The difference is freshness: purely static pages only update on a full rebuild and redeploy. ISR (Incremental Static Regeneration) lets a page revalidate on a time interval (`revalidate = 60`) or on demand via `revalidateTag()` — the page stays fast but can reflect new data without redeploying.

---

## Quick Reference Checklist

- [ ] Component needs `useState`, `useEffect`, or custom hooks → add `'use client'`
- [ ] Component handles `onClick`, `onChange`, or other DOM events → add `'use client'`
- [ ] Component accesses `window`, `localStorage`, or `document` → add `'use client'`
- [ ] Component fetches data → keep it a Server Component; use `async/await` directly
- [ ] Component uses API keys or secrets → keep it a Server Component; never add `'use client'`
- [ ] Marking a large component `'use client'`? → extract only the interactive part instead
- [ ] Seeing a hydration mismatch error → check for code that runs differently on server vs client (e.g. `Date.now()`, `Math.random()`)
- [ ] Need to share server-fetched data with a Client Component → pass it as serializable props, not a function
- [ ] Third-party package uses client features but lacks `'use client'` → wrap it in your own Client Component
