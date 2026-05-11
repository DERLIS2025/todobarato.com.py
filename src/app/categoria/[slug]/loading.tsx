export default function CategoryLoading() {
  return (
    <div className="container-page py-8">
      <div className="mb-6 rounded-3xl bg-white p-6 shadow-soft">
        <div className="h-4 w-40 animate-pulse rounded-full bg-surface" />
        <div className="mt-3 h-8 w-72 animate-pulse rounded-xl bg-surface" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded-full bg-surface" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft"
          >
            <div className="h-56 animate-pulse bg-surface" />
            <div className="grid gap-3 p-4">
              <div className="h-3 w-24 animate-pulse rounded-full bg-surface" />
              <div className="h-5 w-full animate-pulse rounded-full bg-surface" />
              <div className="h-6 w-28 animate-pulse rounded-full bg-surface" />
              <div className="h-10 w-full animate-pulse rounded-xl bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
