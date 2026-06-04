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
      className="flex w-full flex-col gap-2 sm:max-w-xl sm:flex-row"
      role="search"
    >
      <Input
        aria-label="Término de búsqueda"
        className="min-h-11 flex-1 rounded-full border border-zinc-300 bg-white px-4 text-sm text-zinc-950 shadow-sm outline-none"
        disabled
        name="s"
        placeholder="Buscar productos"
      />
      <Button
        className="min-h-11 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white"
        disabled
        type="submit"
      >
        Buscar
      </Button>
    </form>
  );
}
