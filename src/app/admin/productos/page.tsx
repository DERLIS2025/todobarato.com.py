import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    status?: string;
    stock?: string;
  }>;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-PY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value);
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    ACTIVE: "Activo",
    DRAFT: "Borrador",
    OUT_OF_STOCK: "Agotado",
  };

  return labels[status] ?? status;
}

function ProductPreview({
  image,
  name,
}: {
  image?: string | null;
  name: string;
}) {
  if (!image) {
    return (
      <div className="flex h-14 w-16 items-center justify-center rounded-xl border border-borderSoft bg-surface text-[10px] font-black text-textSecondary">
        Sin imagen
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      className="h-14 w-16 rounded-xl border border-borderSoft object-cover"
    />
  );
}

function StockIndicator({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
        Sin stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-800">
        Bajo: {stock}
      </span>
    );
  }

  return <span className="font-bold text-primaryDark">{stock}</span>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};

  const query = params.q?.trim() ?? "";
  const categoryId = params.category ?? "";
  const status = params.status ?? "";
  const stockFilter = params.stock ?? "";

  const where: any = {};

  if (query) {
    where.OR = [
      {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        sku: {
          contains: query,
          mode: "insensitive",
        },
      },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (status) {
    where.status = status;
  }

  if (stockFilter === "low") {
    where.stock = {
      lte: 5,
    };
  }

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
    prisma.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    }),
  ]);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Productos"
        description="Gestioná productos reales conectados a Supabase."
      >
        <form className="mb-4 grid gap-3 lg:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_auto_auto]">
          <input
            name="q"
            className="input"
            placeholder="Buscar por producto, marca o SKU..."
            defaultValue={query}
          />

          <select name="category" className="input" defaultValue={categoryId}>
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select name="status" className="input" defaultValue={status}>
            <option value="">Todos los estados</option>
            <option value="ACTIVE">Activo</option>
            <option value="DRAFT">Borrador</option>
            <option value="OUT_OF_STOCK">Agotado</option>
          </select>

          <select name="stock" className="input" defaultValue={stockFilter}>
            <option value="">Todo stock</option>
            <option value="low">Stock bajo</option>
          </select>

          <button type="submit" className="btn-primary">
            Filtrar
          </button>

          <Link href="/admin/productos/importar" className="btn-secondary text-center">
            Importar productos
          </Link>

          <Link href="/admin/productos/nuevo" className="btn-cta text-center">
            Nuevo producto
          </Link>
        </form>

        {(query || categoryId || status || stockFilter) && (
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-borderSoft bg-white p-4 text-sm">
            <p className="font-bold text-textSecondary">
              Filtros activos: {products.length} producto(s) encontrado(s).
            </p>

            <Link
              href="/admin/productos"
              className="text-sm font-black text-primary"
            >
              Limpiar filtros
            </Link>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Preview</th>
                  <th className="px-4 py-3 font-black">Producto</th>
                  <th className="px-4 py-3 font-black">Categoría</th>
                  <th className="px-4 py-3 font-black">Marca</th>
                  <th className="px-4 py-3 font-black">Precio</th>
                  <th className="px-4 py-3 font-black">Stock</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Badges</th>
                  <th className="px-4 py-3 font-black">Creado</th>
                  <th className="sticky right-0 bg-surface px-4 py-3 font-black shadow-[-8px_0_16px_-14px_rgba(15,23,42,0.35)]">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-borderSoft transition hover:bg-surface/60"
                  >
                    <td className="px-4 py-3">
                      <ProductPreview image={product.image} name={product.name} />
                    </td>

                    <td className="px-4 py-3">
                      <div>
                        <p className="font-black text-primaryDark">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs font-bold text-textSecondary">
                          SKU: {product.sku || "Sin SKU"}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3">{product.category.name}</td>
                    <td className="px-4 py-3">{product.brand ?? "-"}</td>

                    <td className="px-4 py-3">
                      <p className="font-black text-primary">
                        {formatPrice(product.price)}
                      </p>

                      {product.oldPrice && product.oldPrice > product.price && (
                        <p className="mt-1 text-xs text-textSecondary line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <StockIndicator stock={product.stock} />
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={formatStatus(product.status)} />
                    </td>

                    <td className="px-4 py-3">
                      {product.badges.length ? (
                        <div className="flex flex-wrap gap-1">
                          {product.badges.map((badge) => (
                            <span
                              key={badge}
                              className="rounded-full bg-promo px-2 py-1 text-[10px] font-black text-primaryDark"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-4 py-3 text-xs font-bold text-textSecondary">
                      {formatDate(product.createdAt)}
                    </td>

                    <td className="sticky right-0 bg-white px-4 py-3 shadow-[-8px_0_16px_-14px_rgba(15,23,42,0.25)]">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/productos/${product.id}/editar`}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white"
                        >
                          Editar
                        </Link>

                        <Link
                          href={`/producto/${product.slug}`}
                          className="rounded-lg border border-borderSoft px-3 py-2 text-xs font-black"
                        >
                          Ver
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {!products.length && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-10 text-center text-sm font-bold text-textSecondary"
                    >
                      No se encontraron productos con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPageShell>
    </AdminLayout>
  );
}
