import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Nuevo producto"
        description="Creá un producto real en la base de datos de Todopromo.com.py."
      >
        <form
          action="/api/admin/products"
          method="post"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input" placeholder="Nombre del producto" required />
            <input name="slug" className="input" placeholder="Slug automático si queda vacío" />
            <input name="brand" className="input" placeholder="Marca" />
            <input name="sku" className="input" placeholder="SKU" />

            <select name="categoryId" className="input" required>
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

            <select name="status" className="input" defaultValue="ACTIVE">
              <option value="ACTIVE">Activo</option>
              <option value="DRAFT">Borrador</option>
              <option value="OUT_OF_STOCK">Agotado</option>
            </select>

            <input name="price" className="input" placeholder="Precio actual: 99000" required />
            <input name="oldPrice" className="input" placeholder="Precio anterior: 129000" />
            <input name="stock" className="input" placeholder="Stock: 15" defaultValue="0" />
            <input name="image" className="input" placeholder="URL de imagen principal" />
          </div>

          <textarea name="description" className="input min-h-28" placeholder="Descripción corta" />
          <textarea name="longDescription" className="input min-h-36" placeholder="Descripción larga / detalles" />

          <div className="grid gap-4 md:grid-cols-3">
            <input name="badges" className="input" placeholder="Badges: Nuevo, Oferta" />
            <input name="variants" className="input" placeholder="Variantes: Negro, Blanco" />
            <input name="colors" className="input" placeholder="Colores: Negro, Gris" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
              <input type="checkbox" name="isNew" />
              Marcar como nuevo
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
              <input type="checkbox" name="featured" />
              Marcar como destacado
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input name="seoTitle" className="input" placeholder="SEO title" />
            <input name="seoDescription" className="input" placeholder="SEO description" />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar producto
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
