"use client";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import dynamic from "next/dynamic";

// Usamos Dynamic para cargar el componente de forma diferida, evitando un mismatch de hidratación.
const SearchForm = dynamic(
  () => import("./search-form").then((mod) => mod.SearchForm),
  {
    loading: SearchFormFallback,
    ssr: false,
  },
);

export function SearchFormLoader() {
  return <SearchForm />;
}

function SearchFormFallback() {
  return (
    <form
      aria-label="Buscar productos"
      className="flex w-full flex-col gap-2 lg:max-w-2xl lg:flex-row"
      role="search"
    >
      <div className="relative flex-1">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
        <Input
          aria-label="Término de búsqueda"
          className="min-h-12 w-full rounded-full border border-border-soft bg-surface py-3 pl-10 pr-4 text-sm font-medium text-foreground shadow-sm outline-none"
          disabled
          name="s"
          placeholder="¿Qué estás buscando?"
        />
      </div>
      <Button
        className="min-h-12 rounded-full bg-bidcom-blue px-6 text-sm font-bold text-surface shadow-sm"
        disabled
        type="submit"
      >
        Buscar
      </Button>
    </form>
  );
}
