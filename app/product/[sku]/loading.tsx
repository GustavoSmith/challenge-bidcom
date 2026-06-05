import { buttonStyles } from "@/components/ui/button";

export default function ProductLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-10">
      <div
        aria-hidden="true"
        className={buttonStyles({
          className: "h-10 w-36 animate-pulse",
          variant: "secondary",
        })}
      />

      <article
        aria-busy="true"
        aria-label="Cargando producto"
        className="grid gap-8 rounded-[2rem] border border-border-soft bg-surface p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] lg:p-8"
      >
        <div className="relative flex min-h-[320px] items-center justify-center rounded-[1.5rem] bg-surface-muted p-6 lg:min-h-[520px]">
          <div className="size-40 animate-pulse rounded-3xl bg-border-soft sm:size-56" />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-7 w-28 animate-pulse rounded-full bg-bidcom-blue-soft" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-border-soft" />
            </div>
            <div className="mt-4 h-10 w-11/12 animate-pulse rounded-2xl bg-border-soft" />
            <div className="mt-3 h-10 w-8/12 animate-pulse rounded-2xl bg-border-soft" />
            <div className="mt-5 rounded-3xl bg-bidcom-blue px-5 py-4">
              <div className="h-5 w-24 animate-pulse rounded-full bg-surface/40" />
              <div className="mt-3 h-11 w-44 animate-pulse rounded-2xl bg-surface/60" />
            </div>
          </div>

          <div className="flex max-w-[65ch] flex-col gap-3">
            <div className="h-4 animate-pulse rounded-full bg-border-soft" />
            <div className="h-4 w-11/12 animate-pulse rounded-full bg-border-soft" />
            <div className="h-4 w-8/12 animate-pulse rounded-full bg-border-soft" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-20 animate-pulse rounded-full bg-surface-muted" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-surface-muted" />
          </div>

          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                className="rounded-2xl border border-border-soft bg-surface-muted p-4"
                key={index}
              >
                <dt className="h-3 w-20 animate-pulse rounded-full bg-border-soft" />
                <dd className="mt-3 h-5 w-28 animate-pulse rounded-full bg-border-soft" />
              </div>
            ))}
          </dl>
        </div>
      </article>
    </div>
  );
}
