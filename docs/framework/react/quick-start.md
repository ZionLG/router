---
title: Quick Start
---

If you're feeling impatient and prefer to skip all of our wonderful documentation, here is the bare minimum to get going with TanStack Router using both file-based route generation and code-based route configuration:

## Using File-Based Route Generation + Vite

File based route generation (via Vite) is the recommended way to use TanStack Router as it provides the best experience, performance, and ergonomics for the least amount of effort.

> 🧠 You can also use the Router CLI (the `tsr` binary) to generate routes if you are unable to use Vite. See [File-Based Routing](./guide/file-based-routing) for more info.

### Install the Vite Plugin

```bash
npm install --save-dev @tanstack/router-vite-plugin
```

### Configure the Vite Plugin

```tsx
// vite.config.ts
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...,
    TanStackRouterVite(),
  ],
})
```

Create the following files:

- `src/routes/__root.tsx`
- `src/routes/index.lazy.tsx`
- `src/routes/about.lazy.tsx`
- `src/app.tsx`

> 🧠 **Route files with the `.lazy.tsx` extension are lazy loaded via separate bundles to keep the main bundle size as lean as possible.**

### `src/routes/__root.tsx`

```tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```

### `src/routes/index.lazy.tsx`

```tsx
export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
```

### `src/routes/about.lazy.tsx`

```tsx
export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!</div>
}
```

### `src/app.tsx`

Regardless if you are using the `@tanstack/router-vite-plugin` or manually run `tsr watch`/`tsr generate` from your package scripts, the following file will be generated for you:

- `src/routeTree.gen.ts`

Import the generated route tree and create a new router instance:

```tsx
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
```

## Using Code-Based Route Configuration

> ⚠️ **Note:** The following example shows how to configure routes using code, and for simplicity's sake is in a single file for this demo. While code-based generation allows you to declare many routes and even the router instance in a single file, we recommend splitting your routes into separate files for better organization and performance as your application grows.

```tsx
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
```

If you glossed over these examples or didn't understand something, we don't blame you, because there's so much more to learn to really take advantage of TanStack Router! Let's move on.
