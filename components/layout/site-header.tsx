import Link from "next/link";
import Image from "next/image";
import bidcomLogo from "@/app/logo_bidcom.svg";
import { SearchFormLoader } from "./search-form-loader";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-soft bg-surface/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          aria-label="Ir a la página principal"
          className="inline-flex w-fit items-center rounded-2xl bg-bidcom-blue px-4 py-3 outline-none transition hover:bg-bidcom-blue-ink focus-visible:ring-4 focus-visible:ring-bidcom-blue-soft"
          href="/"
        >
          <Image
            src={bidcomLogo}
            alt="Bidcom"
            width={118}
            height={48}
            className="h-auto w-[118px]"
            priority
          />
        </Link>
        <SearchFormLoader />
      </div>
    </header>
  );
}
