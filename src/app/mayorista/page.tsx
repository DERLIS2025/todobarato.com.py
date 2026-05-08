import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { site } from "@/lib/constants";
import { ProductStatus } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

function getWhatsAppHref(productName?: string) {
  const phone = site.phone.replace(/\D/g, "");
  const message = productName
    ? `Hola, quiero consultar precio mayorista para este producto: ${productName}. Compra desde 3 unidades.`
    : "Hola, quiero consultar productos con precio mayorista desde 3 unidades.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default async function WholesalePage() {
  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
    take: 24,
  });

  return (
    <main className="container-page py-8">
      <section className="overflow-hidden rounded-3xl bg-primaryDark p-8 text-white shadow-soft lg:p-10">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-promo">
          Compra por volumen
        </p>

        <div className="mt-3 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight lg:text-5xl">
              Sección mayorista
            </h1>

            <p className="mt-4 max-w-2xl text-white/80">
              Accedé a precios especiales comprando desde 3 unidades. Ideal para
              negocios, revendedores, regalos corporativos, eventos y compras por
              volumen.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm font-bold text-white/80">
              Condición mayorista
            </p>
            <strong className="mt-2 block text-2xl font-black text-promo">
              Desde 3 unidades
            </strong>
            <p className="mt-2 text-sm text-white/70">
              El precio final se confirma según producto, cantidad y disponibilidad.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="btn-cta"
          >
            Consultar por WhatsApp
          </a>

          <Link href="/ofertas" className="rounded-xl bg-white px-5 py-3 font-black text-primaryDark">
            Ver ofertas
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
              Catálogo mayorista
            </p>
            <h2 className="mt-1 text-2xl font-black text-primaryDark">
              Productos disponibles para compra por volumen
            </h2>
          </div>

          <p className="text-sm font-bold text-textSecondary">
            Precio mayorista desde 3 unidades
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft"
            >
              <Link href={`/producto/${product.slug}`} className="block">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="grid h-52 place-items-center bg-surface text-sm font-bold text-textSecondary">
                    Sin imagen
                  </div>
                )}
              </Link>

              <div className="p-4">
                <p className="text-xs font-black uppercase text-textSecondary">
                  {product.brand ?? "Marca"} · {product.category.name}
                </p>

                <Link
                  href={`/producto/${product.slug}`}
                  className="mt-2 block min-h-12 font-black text-primaryDark hover:text-primary"
                >
                  {product.name}
                </Link>

                <div className="mt-3 rounded-xl bg-surface p-3">
                  <p className="text-xs font-bold text-textSecondary">
                    Precio minorista
                  </p>
                  <strong className="mt-1 block text-xl font-black text-primary">
                    {formatPrice(product.price)}
                  </strong>
                </div>

                <div className="mt-3 rounded-xl border border-promo bg-promo/20 p-3">
                  <p className="text-xs font-black uppercase text-primaryDark">
                    Mayorista desde 3 unidades
                  </p>
                  <p className="mt-1 text-sm font-bold text-primaryDark/70">
                    Consultar precio especial
                  </p>
                </div>

                <a
                  href={getWhatsAppHref(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-4 block text-center"
                >
                  Consultar mayorista
                </a>
              </div>
            </article>
          ))}
        </div>

        {!products.length && (
          <div className="mt-6 rounded-2xl border border-borderSoft bg-white p-10 text-center shadow-soft">
            <p className="font-bold text-textSecondary">
              Todavía no hay productos activos para mostrar.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
