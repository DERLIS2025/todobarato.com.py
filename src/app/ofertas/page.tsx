import { ProductGrid } from "@/components/product/ProductGrid";
import { getPublicProducts } from "@/lib/public/products";

export const revalidate = 300;



export default async function OffersPage() {
  const products = await getPublicProducts({
    where: {
      OR: [
        {
          oldPrice: {
            not: null,
          },
        },
        {
          badges: {
            has: "Oferta",
          },
        },
        {
          badges: {
            has: "oferta",
          },
        },
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Promociones
        </p>
        <h1 className="mt-1 text-3xl font-black text-primaryDark">
          Ofertas
        </h1>
        <p className="mt-2 max-w-2xl text-textSecondary">
          Productos con precio anterior, descuentos o campañas especiales.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
