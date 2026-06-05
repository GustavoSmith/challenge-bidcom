"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

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
        <TextInput
          aria-label="Término de búsqueda"
          className="pl-10"
          disabled
          name="s"
          placeholder="¿Qué estás buscando?"
        />
      </div>
      <Button disabled type="submit">
        Buscar
      </Button>
    </form>
  );
}
