import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title="Editar categoría"
        description={`Editando: ${category.name}`}
      >
        <form
          action={`/api/admin/categories/${category.id}`}
          method="post"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" className="input" defaultValue={category.name} required />
            <input name="slug" className="input" defaultValue={category.slug} />
            <input name="icon" className="input" defaultValue={category.icon ?? ""} />
            <input name="order" className="input" defaultValue={category.order} />
            <input name="image" className="input md:col-span-2" defaultValue={category.image ?? ""} />
          </div>

          <textarea
            name="description"
            className="input min-h-28"
            defaultValue={category.description ?? ""}
          />

          <label className="flex items-center gap-2 rounded-xl border border-borderSoft p-4 font-bold">
            <input type="checkbox" name="isActive" defaultChecked={category.isActive} />
            Categoría activa
          </label>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar cambios
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
