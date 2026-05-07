import Link from "next/link";

export function SectionHeader({ title, href, eyebrow }: { title: string; href?: string; eyebrow?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 md:mb-4">
      <div>
        {eyebrow && <p className="text-xs font-black uppercase tracking-wide text-cta">{eyebrow}</p>}
        <h2 className="text-xl font-black text-primaryDark md:text-2xl">{title}</h2>
      </div>
      {href && (
        <Link className="shrink-0 text-sm font-black text-primary hover:text-cta" href={href}>
          Ver todo →
        </Link>
      )}
    </div>
  );
}
