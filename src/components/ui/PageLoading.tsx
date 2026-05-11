export function PageLoading({
  title = "Cargando contenido...",
}: {
  title?: string;
}) {
  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <div className="h-4 w-36 animate-pulse rounded-full bg-surface" />
        <div className="mt-3 h-8 w-72 animate-pulse rounded-xl bg-surface" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 animate-pulse rounded-2xl border border-borderSoft bg-white shadow-soft" />
        <div className="h-28 animate-pulse rounded-2xl border border-borderSoft bg-white shadow-soft" />
        <div className="h-28 animate-pulse rounded-2xl border border-borderSoft bg-white shadow-soft" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
        <div className="border-b border-borderSoft bg-surface px-4 py-3">
          <div className="h-4 w-48 animate-pulse rounded-full bg-white" />
        </div>

        <div className="grid gap-3 p-4">
          <div className="h-14 animate-pulse rounded-xl bg-surface" />
          <div className="h-14 animate-pulse rounded-xl bg-surface" />
          <div className="h-14 animate-pulse rounded-xl bg-surface" />
          <div className="h-14 animate-pulse rounded-xl bg-surface" />
        </div>
      </div>

      <p className="mt-4 text-sm font-bold text-textSecondary">{title}</p>
    </div>
  );
}
