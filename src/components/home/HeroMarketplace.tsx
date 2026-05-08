import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";

type HeroBanner = {
  id: string;
  title: string;
  image: string | null;
  mobileImage?: string | null;
  href?: string | null;
};

type HeroMarketplaceProps = {
  heroBanners?: HeroBanner[];
};

const heroCategories = [
  {
    label: "Electrónica",
    href: "/categoria/electronica",
    icon: "⚡",
  },
  {
    label: "Bazar",
    href: "/categoria/bazar",
    icon: "🛒",
  },
  {
    label: "Cotillón",
    href: "/categoria/cotillon",
    icon: "🎉",
  },
  {
    label: "Hogar",
    href: "/categoria/hogar",
    icon: "🏠",
  },
  {
    label: "Juguetería",
    href: "/categoria/jugueteria",
    icon: "🧸",
  },
  {
    label: "Papelería",
    href: "/categoria/papeleria",
    icon: "📚",
  },
  {
    label: "Ofertas",
    href: "/ofertas",
    icon: "🔥",
  },
  {
    label: "Temporada",
    href: "/nuevos-productos",
    icon: "🌟",
  },
];

export function HeroMarketplace({ heroBanners = [] }: HeroMarketplaceProps) {
  return (
    <section className="container-page mt-6">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="hidden overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft lg:block">
          <div className="bg-primaryDark px-5 py-4">
            <h2 className="text-base font-black text-white">
              Todas las categorías
            </h2>
          </div>

          <nav className="divide-y divide-borderSoft">
            {heroCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="flex items-center justify-between px-5 py-4 text-sm font-bold text-primaryDark transition hover:bg-surface"
              >
                <span className="flex items-center gap-3">
                  <span>{category.icon}</span>
                  {category.label}
                </span>

                <span className="text-textSecondary">›</span>
              </Link>
            ))}
          </nav>
        </aside>

        <HeroSlider banners={heroBanners} />
      </div>
    </section>
  );
}
