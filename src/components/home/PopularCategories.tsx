import Link from "next/link";
import { categories } from "@/data/categories";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PopularCategories() {
  return (
    <section className="container-page mt-8 lg:mt-10">
      <SectionHeader title="Categorías populares" />

      <div className="lg:hidden">
        <HorizontalScroll>
          {categories.map((category) => (
            <Link
              href={`/categoria/${category.slug}`}
              className="card min-w-[42%] snap-start p-4 transition hover:-translate-y-1"
              key={category.slug}
            >
              <div
                className={`mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${category.color} text-xl text-white`}
              >
                {category.icon}
              </div>
              <h3 className="text-sm font-black">{category.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-primaryDark/60">
                {category.description}
              </p>
            </Link>
          ))}
        </HorizontalScroll>
      </div>

      <div className="hidden gap-4 lg:grid lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            href={`/categoria/${category.slug}`}
            className="card p-5 transition hover:-translate-y-1"
            key={category.slug}
          >
            <div
              className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${category.color} text-2xl text-white`}
            >
              {category.icon}
            </div>
            <h3 className="font-black">{category.name}</h3>
            <p className="mt-1 text-sm text-primaryDark/60">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
