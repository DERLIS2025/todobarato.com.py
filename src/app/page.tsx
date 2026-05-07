import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { HeroMarketplace } from "@/components/home/HeroMarketplace";
import { Newsletter } from "@/components/home/Newsletter";
import { PopularCategories } from "@/components/home/PopularCategories";
import { ProductSection } from "@/components/home/ProductSection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TrustBadges } from "@/components/home/TrustBadges";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <HeroMarketplace />
      <PromoBanners />
      <TrustBadges />
      <PopularCategories />
      <ProductSection title="Nuevos ingresos" href="/nuevos-productos" eyebrow="Recién llegados" products={products.filter((p) => p.isNew).slice(0, 4)} />
      <DealOfTheDay />
      <ProductSection title="Más vendidos" href="/mas-vendidos" eyebrow="Favoritos de clientes" products={[...products].sort((a, b) => b.sold - a.sold).slice(0, 4)} />
      <ProductSection title="Productos destacados" href="/ofertas" eyebrow="Selección Todobarato" products={products.filter((p) => p.featured).slice(0, 4)} />
      <Newsletter />
    </>
  );
}
