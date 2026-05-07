import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export const dynamic = "force-dynamic";

export default function NewCategoryPage() {
  return (
    <AdminLayout>
      <AdminPageShell
        title="Nueva categoría"
        description="Creá una categoría real para organizar productos del ecommerce."
      >
        <form
          action="/api/admin/categories"
          method="post"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input" placeholder="Nombre: Hogar" required />
            <input name="slug" className="input" placeholder="Slug automático si queda vacío" />
            <input name="icon" className="input" placeholder="Icono: 🏠" />
            <input name="order" className="input" placeholder="Orden: 1" defaultValue="0" />
            <input name="image" className="input md:col-span-2" placeholder="URL de imagen opcional" />
          </div>

          <textarea
            name="description"
            className="input min-h-28"
            placeholder="Descripción breve de la categoría..."
          />

          <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
            <input type="checkbox" name="isActive" defaultChecked />
            Categoría activa
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar categoría
            </button>

            <a href="/admin/categorias" className="btn-secondary">
              Cancelar
            </a>
          </div>
        </form>
      </AdminPageShell>
    </AdminLayout>
  );
}
