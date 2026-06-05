"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";

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
        <TextInput
          aria-label="Término de búsqueda"
          className="pl-10"
          defaultValue={searchTerm}
          key={searchTerm}
          name="s"
          placeholder="¿Qué estás buscando?"
        />
      </div>
      <Button type="submit">Buscar</Button>
    </form>
  );
}
