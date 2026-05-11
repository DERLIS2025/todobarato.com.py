export default function ProductLoading() {
  return (
    <div className="container-page py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_480px]">
        <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
          <div className="aspect-square animate-pulse bg-surface" />
        </div>

        <div className="rounded-3xl border border-borderSoft bg-white p-6 shadow-soft">
          <div className="h-4 w-40 animate-pulse rounded-full bg-surface" />
          <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-surface" />
          <div className="mt-3 h-5 w-64 animate-pulse rounded-full bg-surface" />
          <div className="mt-6 h-12 w-40 animate-pulse rounded-xl bg-surface" />

          <div className="mt-6 grid gap-3">
            <div className="h-12 w-full animate-pulse rounded-xl bg-surface" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-surface" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-surface" />
          </div>
        </div>
      </div>
    </div>
  );
}
