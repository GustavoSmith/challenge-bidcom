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
      className="flex w-full flex-col gap-2 sm:max-w-xl sm:flex-row"
      role="search"
      onSubmit={handleSubmit}
    >
      <Input
        aria-label="Término de búsqueda"
        className="min-h-11 flex-1 rounded-full border border-zinc-300 bg-white px-4 text-sm text-zinc-950 shadow-sm outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-200"
        defaultValue={searchTerm}
        key={searchTerm}
        name="s"
        placeholder="Buscar productos"
      />
      <Button
        className="min-h-11 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        type="submit"
      >
        Buscar
      </Button>
    </form>
  );
}
