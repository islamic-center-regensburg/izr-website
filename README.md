Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Donation dashboard

`/dashboard` implements the goal-progress dashboard with a EUR 1,200,000 target.
The query in `src/api/cms/donors/queries.ts` uses the shared Directus client at
`${VITE_API_BASE_URL}/cms/public`: an aggregate query sums all donations, while a
separate query fetches only the four latest entries, ordered by donation date
(newest first). Both queries filter out null, zero, and negative amounts.
Only amount, date, and payment method are requested; no donor identities are shown.
Both queries include only `status = paid`; outstanding pledges are excluded.
The shared query refreshes every two seconds while mounted in an active tab,
updating totals and recent donations on both the homepage and dashboard.
Cached results become stale after two seconds. Loading, empty, and retryable error states
are localized in German, English, and Arabic. Both donation actions open the
existing bank-transfer card. The dashboard shares the site's background and
`public/islamic-bg.svg` pattern. All dashboard languages use 0–9 digits while
retaining locale-specific formatting. Totals, remaining amount, and percentage
count alongside ECharts gauge and bar charts with a shared 2.8-second quadratic ease-in, starting when
the section enters the viewport. Reduced-motion preferences show final values
immediately. The homepage reuses a compact preview with the latest donation and
a link to `/dashboard`, sharing the same cached query.
During counting, displayed amounts use magnitude-based steps (for example,
EUR 1,000 for a six-digit total), then settle on the exact amount including cents.
Chart motion remains smooth.

The dashboard composes goal, activity, and bank-transfer action components in
`src/pages/dashboard/components/` using shadcn Card, Badge, Table, Button, and Dialog
primitives. Styling uses Tailwind utilities with donation color tokens in
`src/styles.css`; there is no dashboard-specific stylesheet.
Animation and locale formatting live in `src/pages/dashboard/hooks/`.
Only the goal card rerenders on each
animation frame; the donation table and action card do not.

## Post details

Post pages use an editorial reading column with a responsive campaign sidebar.
The body remains a single CMS rich-text HTML field; no CMS schema changes are
needed. HTML is sanitized with DOMPurify and inline presentation styles are
removed so headings, lists, quotes, images, and tables use the site's typography.
A leading blockquote becomes the introduction, while the remaining content keeps
its order. The contents menu is generated from nonempty H2 headings and omitted
when none exist. The campaign panel reuses the existing donation dialog and goal;
it does not infer campaign data from article text. German, English, and Arabic
labels are supported. The design ornament is stored locally.

## Donor CSV scripts

`data/create-donors.mjs` creates the donor schema matching the receipt-based CSV.
It reuses the existing `campaign` collection and its SOM row without modifying them.
Back up donor data and permissions before running
`node data/create-donors.mjs --replace-donors`: this explicitly deletes the entire
donors collection and all its records, then recreates it. Public permissions
are not granted; review CMS permissions before using the website.

Import with `node data/import-donors.mjs "<csv-path>" --dry-run` first, then
remove `--dry-run` to write. Import requires an empty SOM campaign. The importer
skips the spreadsheet's leading total and empty rows, reads UTF-8 and German
dates (two-digit years mean 20xx), defaults blank dates to today and payment
methods to cash. English values are `paid`/`outstanding`, `cash`/`bank`,
`immediately`, and `contract_conclusion`. Free-text notes remain unchanged.
UUIDs, audit fields, and the campaign relationship are retained alongside the
eight CSV fields; old name/pledge/source fields are removed in the replacement.

## Pending screens

`src/components/pending-screen.tsx` provides a shared animated loading screen
with localized text, a compact section variant, and reduced-motion support.
It is the router's default pending component (200ms delay, 400ms minimum
display) and the fallback for lazy homepage/dashboard content and initial data
loads. Background query refreshes keep existing content visible.

## Translations
Translations live in `src/i18n/locales/{de,en,ar}/`, with a JSON file for
each content section (for example, `nav.json`, `about.json`, and `linktree.json`).
`src/i18n/index.ts` combines these files into the existing translation keys,
so components continue to use calls such as `t("linktree.title")`.
When adding a section, create its JSON file in all three language folders and
register the imports in `src/i18n/index.ts`.

## Styling

`CardSurface` in `src/components/card-surface.tsx` provides shared Motion hover
feedback for cards and card-like sections. Surfaces are borderless and shadowless
at rest; hover adds a spring lift, subtle scale, outline, and shadow. Large
sections use gentler scaling. Keyboard focus inside a surface reveals its outline
and shadow, and reduced-motion preferences disable the lift and scale.
The shadcn Card uses this surface automatically; semantic sections and links
reuse it with `asChild` without adding wrapper elements.

`src/components/call-to-action-card.tsx` exports the shared patterned green
`CallToActionCard` and gold `CallToActionButton`, built on the shadcn primitives.
The donation CTA and news previews reuse these components; news cards remain
single clickable links with localized read-more labels.

The shared shadcn Button uses Motion (`motion/react`) for spring hover-lift and
press feedback, including `asChild` links. Disabled buttons and reduced-motion
preferences disable these gesture animations. CSS transitions exclude transforms
so they do not compete with Motion.
The navigation header expands over the page without changing its reserved height
on hover or keyboard focus, revealing a tagline and desktop link descriptions.
Links have individual hover/press feedback. Reduced-motion preferences make
expansion immediate and disable link gesture animations.

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpm dlx shadcn@latest add button
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My App" },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en-US">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
});
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from "@tanstack/react-start";

const getServerTime = createServerFn({
  method: "GET",
}).handler(async () => {
  return new Date().toISOString();
});

// Use in a component
function MyComponent() {
  const [time, setTime] = useState("");

  useEffect(() => {
    getServerTime().then(setTime);
  }, []);

  return <div>Server time: {time}</div>;
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/hello")({
  server: {
    handlers: {
      GET: () => json({ message: "Hello, World!" }),
    },
  },
});
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people")({
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json();
  },
  component: PeopleComponent,
});

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
