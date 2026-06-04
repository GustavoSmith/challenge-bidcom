import Link from "next/link";
import { SearchFormLoader } from "./search-form-loader";
import Image from "next/image";
import bidcomLogo from "@/app/logo_bidcom.svg";
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Link
          aria-label="Ir a la página principal de Bidcom"
          className="inline-flex w-fit items-center rounded-md text-2xl font-black tracking-tight text-zinc-950"
          href="/"
        >
          <Image src={bidcomLogo} alt="Bidcom" width={100} height={100} />
        </Link>
        <SearchFormLoader />
      </div>
    </header>
  );
}
