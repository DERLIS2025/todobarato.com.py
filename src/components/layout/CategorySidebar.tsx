import Link from "next/link";
import { categories } from "@/data/categories";

export function CategorySidebar() {
  return (
    <aside className="card overflow-hidden">
      <h3 className="bg-primaryDark px-4 py-3 text-sm font-black text-white">Todas las categorías</h3>
      {categories.map((category) => (
        <Link href={`/categoria/${category.slug}`} key={category.slug} className="flex items-center justify-between border-b border-border px-4 py-3 text-sm font-semibold hover:bg-primaryLight">
          <span>{category.icon} {category.name}</span>
          <span className="text-textSecondary">›</span>
        </Link>
      ))}
    </aside>
  );
}
