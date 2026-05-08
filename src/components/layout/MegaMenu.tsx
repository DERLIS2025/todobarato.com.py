import Link from "next/link";
import { categories } from "@/data/categories";
import { mainNav } from "@/data/navigation";

export function MegaMenu() {
  return (
    <div className="hidden border-b bg-white lg:block">
      <div className="container-page flex items-center gap-6">
        <Link
          href="/mayorista"
          className="bg-cta px-5 py-3 font-black text-white transition hover:bg-cta/90"
        >
          🛒 Sección mayorista
        </Link>

        <nav className="flex gap-5 text-sm font-bold">
          {mainNav.map((item) => (
            <Link
              className="hover:text-primary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto text-sm text-primaryDark/60">
          {categories.length} departamentos activos
        </div>
      </div>
    </div>
  );
}
