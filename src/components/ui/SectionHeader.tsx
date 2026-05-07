import Link from "next/link";

export function SectionHeader({
  title,
  href,
  eyebrow,
}: {
  title: string;
  href?: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-cta">
            {eyebrow}
          </p>
        )}

        <h2 className="text-xl font-black text-primaryDark sm:text-2xl">
          {title}
        </h2>
      </div>

      {href && (
        <Link href={href} className="shrink-0 text-sm font-black text-primary">
          Ver todo →
        </Link>
      )}
    </div>
  );
}
