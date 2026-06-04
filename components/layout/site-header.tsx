import Link from "next/link";
import { SearchFormLoader } from "./search-form-loader";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link
          aria-label="Ir a la página principal de Bidcom"
          className="inline-flex w-fit items-center rounded-md text-2xl font-black tracking-tight text-zinc-950"
          href="/"
        >
          Bidcom
        </Link>
        <SearchFormLoader />
      </div>
    </header>
  );
}
