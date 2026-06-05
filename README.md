# Challenge Frontend Bidcom

Aplicación construida con Next.js, TypeScript y Tailwind. Consume productos desde DummyJSON, muestra un listado responsive, permite buscar productos y expone una página de detalle por SKU.

Disponible en [https://challenge-bidcom-gules.vercel.app/](https://challenge-bidcom-gules.vercel.app/).

## Setup

Scripts principales:

```bash
pnpm dev
pnpm test
pnpm lint
pnpm build
pnpm storybook
pnpm build-storybook
```

## Stack actual

- Next.js 16 con App Router.
- React 19 + TypeScript en modo `strict`.
- Tailwind CSS 4.
- Base UI para primitivas accesibles.
- DummyJSON Products API como fuente de datos.
- Storybook 10 con framework `@storybook/nextjs-vite`.
- Vitest + React Testing Library + `jsdom` para tests.

## Arquitectura

```text
app/
  page.tsx
  layout.tsx
  globals.css
  product/
    [sku]/
      page.tsx
      loading.tsx
  search/
    page.tsx
components/
  layout/
    site-header.tsx
    search-form.tsx
    search-form-loader.tsx
  product/
    product-card.tsx
    product-grid.tsx
    product-detail-view.tsx
    empty-products-state.tsx
  ui/
    button.tsx
    text-input.tsx
lib/
  dummyjson/
    client.ts
    types.ts
  classnames.ts
  formatters.ts
```

Las páginas de `app/` resuelven datos en el servidor y delegan el render visual a componentes de `components/`. La interacción del browser queda acotada al formulario de búsqueda.

## Enfoque server-side

La app usa Server Components por defecto:

- `app/page.tsx` obtiene el listado inicial con el endpoint de búsqueda de DummyJSON y límite 20.
- `app/search/page.tsx` lee `searchParams`, normaliza el término y busca productos server-side.
- `app/product/[sku]/page.tsx` resuelve el detalle por SKU desde el servidor.
- `app/product/[sku]/loading.tsx` muestra feedback inmediato durante la navegación al detalle.

Solo `components/layout/search-form.tsx` es Client Component porque usa `useRouter` y `useSearchParams` para navegar a `/search?s=$termino`.

## API y datos

La integración con DummyJSON está centralizada en `lib/dummyjson/client.ts`:

- `searchProducts`: usa `GET /products/search?q=$term&limit=20`.
- `getCategories`: obtiene categorías y devuelve las primeras 5 para el estado vacío.
- `getProductBySku`: resuelve el SKU en dos pasos porque DummyJSON no expone un endpoint directo por SKU:
  - `GET /products?limit=0&select=sku`.
  - `GET /products/:id`.

Los tipos de respuesta viven en `lib/dummyjson/types.ts`.

## UI, responsive y Design System

- Header sticky con logo de Bidcom que vuelve a home.
- Buscador accesible que redirige a `/search?s=$termino`.
- Grilla responsive mobile-first.
- Cards con imagen, nombre, precio, categoría, rating y disponibilidad.
- Detalle con imagen principal, precio, descuento, descripción, tags y metadata disponible.
- Estado vacío con el texto requerido por el challenge y 5 categorías enlazadas.

Los tokens visuales principales están en `app/globals.css`:

- `--bidcom-blue`.
- `--bidcom-blue-soft`.
- `--bidcom-blue-ink`.
- `--surface`.
- `--surface-muted`.
- `--border-soft`.

También hay primitivas simples en `components/ui`:

- `Button`, con variantes `primary`, `secondary` y `category`.
- `TextInput`.
- `cn`, combinando `clsx` y `tailwind-merge`.

## Storybook

Storybook está configurado con:

- `@storybook/nextjs-vite`.
- `@storybook/addon-docs`.
- `@storybook/addon-a11y`.
- `appDirectory: true`.
- Import global de `app/globals.css`.

Stories actuales:

- `Challenge/Site Header`: header con logo y buscador.
- `Challenge/Product Experience`: listado, empty state, detalle y loading del detalle.
- `Design System/Button`: variantes reales del botón.
- `Design System/Text Input`: estados básico, con valor inicial y deshabilitado.

## Testing

Se agregó Vitest con React Testing Library y `jsdom`.

Suite actual:

- `__tests__/dummyjson-client.test.ts`: búsqueda con trim y límite 20, categorías, resolución de detalle por SKU y SKU inexistente.
- `__tests__/product-components.test.tsx`: card de producto y estado vacío con links de categoría.
- `__tests__/search-form.test.tsx`: sincronización con query param, navegación con término y navegación sin término.
- `__tests__/pages.integration.test.tsx`: integración simple de home, búsqueda sin resultados y detalle por SKU.
