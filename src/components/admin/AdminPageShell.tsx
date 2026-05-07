import type { ReactNode } from "react";

export function AdminPageShell({
  title,
  description,
  actionLabel,
  children,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-primaryDark">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-textSecondary">
            {description}
          </p>
        </div>

        {actionLabel && (
          <button className="btn-cta">{actionLabel}</button>
        )}
      </div>

      {children}
    </section>
  );
}
