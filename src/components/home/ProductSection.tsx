import { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProductSection({ title, products, href, eyebrow }: { title: string; products: Product[]; href?: string; eyebrow?: string }) {
  const visibleOnMobile = products.slice(0, 4);

  return (
    <section className="container-page mt-7 lg:mt-10">
      <SectionHeader title={title} href={href} eyebrow={eyebrow} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {visibleOnMobile.map((product) => (
          <ProductCard product={product} key={product.id} compact />
        ))}
      </div>
      <div className="hidden gap-4 lg:grid lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
