---
name: api-query-integration
description: 'Use when adding or changing backend API integration in this app: generate or consume OpenAPI clients, create React Query query functions and options, define query keys, validate API data, or load API data in routes.'
---

# API and React Query Integration

## When to Use

- Add or update a backend endpoint integration.
- Generate or consume the typed client from an OpenAPI specification.
- Add React Query data fetching, query keys, caching, or route-level loading.
- Replace a temporary Directus data source with a real backend endpoint.

## Repository Architecture

- `openapi-ts.config.ts` configures `@hey-api/openapi-ts`. Generated client, SDK, types, and Zod files live in `src/api/generated/`; do not edit generated files by hand.
- `OPENAPI_INPUT` can override the default OpenAPI URL. Regenerate with `npm run api:generate`.
- The generated client reads its base URL from `src/api/runtime-config.ts`, which uses `VITE_API_BASE_URL` and falls back to the local Directus URL.
- Keep endpoint-specific API code under `src/api/collections/<domain>/`. Existing examples separate `queries.ts`, `constants.ts`, `types.ts`, `utils.ts`, and schemas by concern.
- `src/api/directus-query.ts` is explicitly a temporary Directus adapter. Do not copy its custom query serialization into new integrations unless the endpoint actually requires that Directus-specific behavior.
- `src/integration/tanstack-query.ts` owns the shared `QueryClient` and its defaults.

## Procedure

1. **Inspect the contract and nearby patterns.** Find the endpoint in the configured OpenAPI spec and inspect the generated operation and types in `src/api/generated/`. Check the closest domain's API files and callers before adding structure.
2. **Generate types when the contract changed.** Set `OPENAPI_INPUT` if needed and run `npm run api:generate`. Never patch files in `src/api/generated/`; fix the source spec or generator configuration instead.
3. **Implement a typed request function.** Keep transport and response mapping/validation in the API domain layer, not in a React component. Call the generated operation and pass the supplied `AbortSignal` through. Set `throwOnError: true` so failed requests reject instead of becoming success-shaped results.
4. **Validate and map untrusted response data.** Reuse generated types and existing domain schemas where possible. If the application needs a stronger or transformed shape, parse/map it explicitly and throw a useful error when required data is malformed. Avoid silently returning empty/default data for failed or invalid responses.
5. **Export query keys and `queryOptions`.** Follow the existing `featureKeys` and `translationKeys` patterns in `src/api/collections/*/queries.ts`. Use stable, parameterized key factories for distinct inputs, and build options with TanStack Query's `queryOptions`. The query function should accept the context's `signal` and pass it to the request function. Set a per-query `staleTime` only when its freshness requirement differs from the shared defaults.
6. **Consume the options consistently.**
   - In React components, use the exported options with `useQuery`.
   - For route/bootstrap loading or non-React callers, use the shared `queryClient` from `src/integration/tanstack-query.ts`; existing code uses `queryClient.query(options)` and reads cached data with `getQueryData` when appropriate.
   - Keep query keys and options reusable at the API boundary rather than rebuilding them in callers.
7. **Verify the integration.** Run the relevant lint/type or build check available in the repository. For code generation, confirm the expected operation is exported and then check the consuming API module and callers.

## Established Patterns

```ts
import { queryOptions } from '@tanstack/react-query'
import { readItemsFeatures } from '#/api/generated'

export const featureKeys = {
  all: ['features'] as const,
}

export const featuresQueryOptions = () =>
  queryOptions({
    queryKey: featureKeys.all,
    queryFn: ({ signal }) =>
      readItemsFeatures({
        signal,
        throwOnError: true,
      }),
  })
```

This is a shape example, not a complete response mapper: use the operation's actual generated input and response types, and return the application-facing data shape expected by consumers.

For parameterized data, include every input that changes the result in its key, as `translationKeys.byLanguage(language)` does. If an endpoint needs custom serialization, first confirm the requirement against the API contract; the custom serializer in `src/api/directus-query.ts` exists for Directus nested filters and is not a general-purpose default.

## Relevant Examples

- OpenAPI generator configuration: `openapi-ts.config.ts`
- Client runtime configuration: `src/api/runtime-config.ts`
- Query client defaults: `src/integration/tanstack-query.ts`
- Query keys and options: `src/api/collections/features/queries.ts`, `src/api/collections/translations/queries.ts`
- Generated-client request and Zod validation: `src/api/directus-query.ts`
- Route/bootstrap query use: `src/routes/__root.tsx`, `src/locales/load-translations.ts`
- Cached data access outside React: `src/utils/features.ts`
