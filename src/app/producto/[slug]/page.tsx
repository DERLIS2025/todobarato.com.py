import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicProductBySlug } from "@/lib/public/products";

export const revalidate = 300;



function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateDiscount(price: number, oldPrice?: number | null) {
  if (!oldPrice || oldPrice <= price) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productExtra = product as typeof product & {
    oldPrice?: number | null;
    stock?: number;
    badges?: string[];
    variants?: string[];
    colors?: string[];
    longDescription?: string | null;
  };

  const images = [product.image].filter(Boolean);
  const oldPrice = productExtra.oldPrice ?? null;
  const discount = calculateDiscount(product.price, oldPrice);
  const badges = Array.isArray(productExtra.badges) ? productExtra.badges : [];
  const variants = Array.isArray(productExtra.variants) ? productExtra.variants : [];
  const colors = Array.isArray(productExtra.colors) ? productExtra.colors : [];
  const stock = productExtra.stock ?? 0;
  const longDescription = productExtra.longDescription ?? "";

  return (
    <main className="container-page py-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="grid gap-4">
          <div className="overflow-hidden rounded-3xl border border-borderSoft bg-white shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-xl border border-borderSoft bg-white"
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-borderSoft bg-white p-6 shadow-soft">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-textSecondary">
            {product.brand} · {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight text-primaryDark lg:text-4xl">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-4 text-textSecondary">{product.description}</p>
          )}

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-black text-primary">
              {formatPrice(product.price)}
            </p>

            {oldPrice && (
              <p className="text-lg font-bold text-textSecondary line-through">
                {formatPrice(oldPrice)}
              </p>
            )}

            {discount > 0 && (
              <span className="rounded-full bg-promo px-3 py-1 text-xs font-black text-primaryDark">
                -{discount}%
              </span>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="btn-primary">Agregar al carrito</button>

            <Link
              href={`https://wa.me/595981000000?text=Hola,%20quiero%20consultar%20por%20${encodeURIComponent(
                product.name
              )}`}
              className="btn-secondary text-center"
            >
              Consultar por WhatsApp
            </Link>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-xl bg-surface p-4">
              <strong>Stock:</strong> {stock}
            </div>

            {badges.length > 0 && (
              <div className="rounded-xl bg-surface p-4">
                <strong>Etiquetas:</strong> {badges.join(", ")}
              </div>
            )}

            {variants.length > 0 && (
              <div className="rounded-xl bg-surface p-4">
                <strong>Variantes:</strong> {variants.join(", ")}
              </div>
            )}

            {colors.length > 0 && (
              <div className="rounded-xl bg-surface p-4">
                <strong>Colores:</strong> {colors.join(", ")}
              </div>
            )}
          </div>
        </section>
      </div>

      {longDescription && (
        <section className="mt-8 rounded-3xl border border-borderSoft bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-primaryDark">
            Detalles del producto
          </h2>
          <p className="mt-3 whitespace-pre-line text-textSecondary">
            {longDescription}
          </p>
        </section>
      )}
    </main>
  );
}
