import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublicProductsByCategorySlug } from "@/lib/public/products";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { category, products } = await getPublicProductsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Categoría
        </p>
        <h1 className="mt-1 text-3xl font-black text-primaryDark">
          {category.name}
        </h1>

        {category.description && (
          <p className="mt-2 max-w-2xl text-textSecondary">
            {category.description}
          </p>
        )}
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
