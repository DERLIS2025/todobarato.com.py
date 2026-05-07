import Link from "next/link";
import { categories } from "@/data/categories";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PopularCategories() {
  return (
    <section className="container-page mt-6 lg:mt-10">
      <SectionHeader title="Categorías populares" eyebrow="Comprá rápido" />
      <div className="hidden gap-4 md:grid md:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.slug} />
        ))}
      </div>
      <div className="md:hidden">
        <HorizontalScroll>
          {categories.map((category) => (
            <div className="w-36 shrink-0 snap-start" key={category.slug}>
              <CategoryCard category={category} compact />
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}

function CategoryCard({ category, compact = false }: { category: (typeof categories)[number]; compact?: boolean }) {
  return (
    <Link href={`/categoria/${category.slug}`} className={`card block transition hover:-translate-y-1 ${compact ? "p-3" : "p-5"}`}>
      <div className={`mb-3 grid place-items-center rounded-2xl bg-gradient-to-br ${category.color} text-white ${compact ? "h-11 w-11 text-xl" : "h-14 w-14 text-2xl"}`}>
        {category.icon}
      </div>
      <h3 className="font-black leading-tight">{category.name}</h3>
      {!compact && <p className="mt-1 text-sm text-textSecondary">{category.description}</p>}
    </Link>
  );
}
