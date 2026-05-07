cat > src/components/home/ProductSection.tsx <<'EOF'
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProductSection({
  title,
  products,
  href,
}: {
  title: string;
  products: Product[];
  href?: string;
}) {
  const mobileProducts = products.slice(0, 4);

  return (
    <section className="container-page mt-8 lg:mt-10">
      <SectionHeader title={title} href={href} />

      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {mobileProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
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
EOF