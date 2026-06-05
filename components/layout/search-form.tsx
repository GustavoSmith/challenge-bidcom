"use client";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("s") ?? "";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formSearchTerm = formData.get("s");
    const term = typeof formSearchTerm === "string" ? formSearchTerm : "";
    const normalizedTerm = term.trim();
    const params = new URLSearchParams();

    if (normalizedTerm) {
      params.set("s", normalizedTerm);
    }

    const target = params.size ? `/search?${params.toString()}` : "/search";
    router.push(target);
  }

  return (
    <form
      aria-label="Buscar productos"
      className="flex w-full flex-col gap-2 lg:max-w-2xl lg:flex-row"
      role="search"
      onSubmit={handleSubmit}
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
          className="min-h-12 w-full rounded-full border border-border-soft bg-surface py-3 pl-10 pr-4 text-sm font-medium text-foreground shadow-sm outline-none transition placeholder:text-zinc-500 focus:border-bidcom-blue focus:ring-4 focus:ring-bidcom-blue-soft"
          defaultValue={searchTerm}
          key={searchTerm}
          name="s"
          placeholder="¿Qué estás buscando?"
        />
      </div>
      <Button
        className="min-h-12 rounded-full bg-bidcom-blue px-6 text-sm font-bold text-surface shadow-sm transition hover:bg-bidcom-blue-ink focus:outline-none focus:ring-4 focus:ring-bidcom-blue-soft active:translate-y-px"
        type="submit"
      >
        Buscar
      </Button>
    </form>
  );
}
