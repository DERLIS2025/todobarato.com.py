import Link from "next/link";
import { ProductStatus } from "@/generated/prisma/client";
import { WholesaleHeroSlider } from "@/components/mayorista/WholesaleHeroSlider";
import { prisma } from "@/lib/db/prisma";
import { site } from "@/lib/constants";

export const revalidate = 300;



function formatPrice(value?: number | null) {
  if (!value) return "Consultar";
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

function getWhatsAppHref(productName?: string, minQty?: number | null) {
  const phone = site.phone.replace(/\D/g, "");
  const message = productName
    ? `Hola, quiero consultar precio mayorista para: ${productName}. Cantidad mínima: ${minQty ?? 3} unidades.`
    : "Hola, quiero consultar productos mayoristas.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default async function WholesalePage() {
  const [banners, products] = await Promise.all([
    prisma.banner.findMany({
      where: {
        status: "ACTIVE",
        location: "mayorista-hero",
        image: {
          not: null,
        },
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        title: true,
        image: true,
        mobileImage: true,
        href: true,
      },
    }),

    prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        isWholesale: true,
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
      },
      take: 48,
    }),
  ]);

  return (
    <main className="container-page py-6 md:py-8">
      <WholesaleHeroSlider banners={banners} />

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cta">
              Catálogo mayorista
            </p>

            <h1 className="mt-1 text-2xl font-black text-primaryDark md:text-3xl">
              Productos con precio mayorista
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-textSecondary">
              Comprá por volumen con precios especiales. La cantidad mínima se
              define por producto.
            </p>
          </div>

          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Consultar por WhatsApp
          </a>
        </div>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
            {products.map((product) => {
              const wholesalePrice = product.wholesalePrice || product.price;
              const minQty = product.wholesaleMinQty || 3;

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft transition hover:-translate-y-0.5"
                >
                  <Link href={`/producto/${product.slug}`} className="block">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="grid aspect-square place-items-center bg-surface text-xs font-bold text-textSecondary">
                        Sin imagen
                      </div>
                    )}
                  </Link>

                  <div className="p-3 md:p-4">
                    <p className="text-[10px] font-black uppercase text-textSecondary md:text-xs">
                      {product.brand ?? "Marca"} · {product.category.name}
                    </p>

                    <Link
                      href={`/producto/${product.slug}`}
                      className="mt-1 line-clamp-2 block min-h-[40px] text-sm font-black text-primaryDark hover:text-primary md:text-base"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-3 rounded-xl bg-surface p-3">
                      <p className="text-[10px] font-bold uppercase text-textSecondary md:text-xs">
                        Precio mayorista
                      </p>

                      <strong className="mt-1 block text-lg font-black text-primary md:text-xl">
                        {formatPrice(wholesalePrice)}
                      </strong>

                      <p className="mt-1 text-[11px] font-bold text-primaryDark/70 md:text-xs">
                        Desde {minQty} unidades
                      </p>
                    </div>

                    {product.price > wholesalePrice && (
                      <p className="mt-2 text-xs text-textSecondary">
                        Minorista:{" "}
                        <span className="line-through">
                          {formatPrice(product.price)}
                        </span>
                      </p>
                    )}

                    <a
                      href={getWhatsAppHref(product.name, minQty)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block rounded-xl bg-primary px-3 py-2 text-center text-xs font-black text-white md:text-sm"
                    >
                      Consultar
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-borderSoft bg-white p-8 text-center shadow-soft">
            <h2 className="text-xl font-black text-primaryDark">
              Todavía no hay productos mayoristas activos.
            </h2>

            <p className="mt-2 text-sm text-textSecondary">
              Activá productos desde Admin → Mayorista → Productos mayoristas.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
