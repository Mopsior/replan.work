# replan.work

> _replan (that) work_

Plan your contract or volunteer job, sync with calendars and know your wages before end of the month

This project is **not** vibecoded

## 📂 Structure

```md
- `db` - Drizzle schemas
- `features` - project-wise components
    - `{segment}` - components, types and local functions for each app segments
      if anything (component, type or function) is used in any other segment,
      it needs to be moved to corresponding folder
- `hooks` - all hooks
- `functions` - all (mostly serverside) "functions" from tanstack
- `lib` - utils for specific libs
- `utils` - non lib-specific utils
- `types` - all project-wise types
```

## 🌲 How routes are built

_This is about `/routes/app` subpages (we take that as "main" so next paths will be named `/summary` etc.)_

App is divided into two sides - **calendar** and **subpage content**.

Every path (**subpage content**) (without `/`) are rendered either as:

- **Sidebar** for computers
- **Drawer** for mobile

**Subpage content** is just a component from createFileRoute (so content of page). It's **the same** for Sidebar and Drawer!

Main routes (defined in [selectedRouteTab](src/features/routing/types.ts)) have **Tabs** to select between these two. Other pages have **Return** button.

For A11y, every page requires to have **Title** and **Description** (provided via `useDrawerData` with options isVisible for visually hiding elements). Otherwise it will spam errors in console.

> [!NOTE]
> `Description` provided via hook have the same styling as small muted text and can replace page description for mobile (but it still won't render on computers!). `Title` does not have it's counterpart on computer

For **Nested drawers** title and description can be provided via `<Drawer.Title>`/`<Drawer.HiddenTitle>` and `<Drawer.Description>`/`<Drawer.HiddenDescription>` elements. There's no need to use any hooks.

Nested drawers should be used as ex. selects for mobile views. Bigger parts should be moved into own sub-sub-page ex. `/summary/...`

## ⛅ Themes

`ThemeProvider` is configured in [src/lib/theme-provider.tsx](src/lib/theme-provider.tsx)

- **Three theme modes:**
    - `light` (`Theme.LIGHT`) - Forces light theme
    - `dark` (`Theme.DARK`) - Forces dark theme
    - `system` (`Theme.SYSTEM`) - Uses OS preference (default)

- User preference is saved in **localStorage**
- **Flash prevention** - A script injected at startup prevents flash of unstyled content (FOUC)
- Automatically switches theme if OS preference changes

### Usage

```tsx
import { Theme } from '@/types/enums'
// ...
const { userTheme, appTheme, setTheme } = useTheme()
// userTheme - prefered method. It combines user chocie and auto-detecting
// appTheme - auto-detected  theme

return (
    <div>
        <p>Current theme: {userTheme}</p>
        <button onClick={() => setTheme(Theme.LIGHT)}>Light</button>
        <button onClick={() => setTheme(Theme.DARK)}>Dark</button>
        <button onClick={() => setTheme(Theme.SYSTEM)}>System</button>
    </div>
)
```

The theme is applied as a CSS class (`light` or `dark`) on the `<html>` element. You can style based on it using Tailwind's `dark:` prefix:

```tsx
<div className='bg-white dark:bg-black'>This switches colors based on theme</div>
```

## 🐞 Error handling

Handling error should be done through `<ErrorScreen />` component (and added later similar things). This will create one space for sending data to PostHog

## 🗺️ Roadmap

- [ ] Add mobile calendar view
- [ ] Move to Biome
- [ ] Handle months that aren't provided in dataset
- [ ] **Production**: add PostHog

## ☁️ Deployment

App is primarly deployed by me on Coolify, so it's easy to deploy yourself.

Settings to care when uploading: (everything else can be in default state)

```
General
    Build pack: Nixpacks
    Is a static site: NO
    Install/Build command: empty (default)
    Start command: node .output/server/index.mjs
    Base/Publish directory: / (default)
    Port exposes: 3000

Advanced
    Include Source Commit in Build: true

ENV:
    NIXPACKS_NODE_VERSION = 22 (for both types)
```

---

# Pre-generated info

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/people',
    loader: async () => {
        const response = await fetch('https://swapi.dev/api/people')
        return response.json() as Promise<{
            results: {
                name: string
            }[]
        }>
    },
    component: () => {
        const data = peopleRoute.useLoaderData()
        return (
            <ul>
                {data.results.map((person) => (
                    <li key={person.name}>{person.name}</li>
                ))}
            </ul>
        )
    },
})
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

## State Management

Another common requirement for React applications is state management. There are many options for state management in React. TanStack Store provides a great starting point for your project.

First you need to add TanStack Store as a dependency:

```bash
pnpm add @tanstack/store
```

Now let's create a simple counter in the `src/App.tsx` file as a demonstration.

```tsx
import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'
import './App.css'

const countStore = new Store(0)

function App() {
    const count = useStore(countStore)
    return (
        <div>
            <button onClick={() => countStore.setState((n) => n + 1)}>Increment - {count}</button>
        </div>
    )
}

export default App
```

One of the many nice features of TanStack Store is the ability to derive state from other state. That derived state will update when the base state updates.

Let's check this out by doubling the count using derived state.

```tsx
import { useStore } from '@tanstack/react-store'
import { Store, Derived } from '@tanstack/store'
import './App.css'

const countStore = new Store(0)

const doubledStore = new Derived({
    fn: () => countStore.state * 2,
    deps: [countStore],
})
doubledStore.mount()

function App() {
    const count = useStore(countStore)
    const doubledCount = useStore(doubledStore)

    return (
        <div>
            <button onClick={() => countStore.setState((n) => n + 1)}>Increment - {count}</button>
            <div>Doubled - {doubledCount}</div>
        </div>
    )
}

export default App
```

We use the `Derived` class to create a new store that is derived from another store. The `Derived` class has a `mount` method that will start the derived store updating.

Once we've created the derived store we can use it in the `App` component just like we would any other store using the `useStore` hook.

You can find out everything you need to know on how to use TanStack Store in the [TanStack Store documentation](https://tanstack.com/store/latest).
