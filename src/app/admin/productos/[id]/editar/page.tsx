import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    prisma.category.findMany({
      orderBy: {
        order: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title="Editar producto"
        description={`Editando: ${product.name}`}
      >
        <form
          action={`/api/admin/products/${product.id}`}
          method="post"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input" defaultValue={product.name} required />
            <input name="slug" className="input" defaultValue={product.slug} />
            <input name="brand" className="input" defaultValue={product.brand ?? ""} />
            <input name="sku" className="input" defaultValue={product.sku ?? ""} />

            <select name="categoryId" className="input" defaultValue={product.categoryId} required>
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

            <select name="status" className="input" defaultValue={product.status}>
              <option value="ACTIVE">Activo</option>
              <option value="DRAFT">Borrador</option>
              <option value="OUT_OF_STOCK">Agotado</option>
            </select>

            <input name="price" className="input" defaultValue={product.price} required />
            <input name="oldPrice" className="input" defaultValue={product.oldPrice ?? ""} />
            <input name="stock" className="input" defaultValue={product.stock} />
            <input name="image" className="input" defaultValue={product.image ?? ""} />
          </div>

          <textarea
            name="description"
            className="input min-h-28"
            defaultValue={product.description ?? ""}
          />

          <textarea
            name="longDescription"
            className="input min-h-36"
            defaultValue={product.longDescription ?? ""}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <input name="badges" className="input" defaultValue={product.badges.join(", ")} />
            <input name="variants" className="input" defaultValue={product.variants.join(", ")} />
            <input name="colors" className="input" defaultValue={product.colors.join(", ")} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
              <input type="checkbox" name="isNew" defaultChecked={product.isNew} />
              Marcar como nuevo
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
              <input type="checkbox" name="featured" defaultChecked={product.featured} />
              Marcar como destacado
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input name="seoTitle" className="input" defaultValue={product.seoTitle ?? ""} />
            <input name="seoDescription" className="input" defaultValue={product.seoDescription ?? ""} />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar cambios
            </button>

            <a href="/admin/productos" className="btn-secondary">
              Cancelar
            </a>
          </div>
        </form>
      </AdminPageShell>
    </AdminLayout>
  );
}
