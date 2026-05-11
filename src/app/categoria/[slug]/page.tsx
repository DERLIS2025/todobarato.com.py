import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublicProductsByCategorySlug } from "@/lib/public/products";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    select: {
      slug: true,
    },
  });

  return categories.map((category) => ({
    slug: category.slug,
  }));
}




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