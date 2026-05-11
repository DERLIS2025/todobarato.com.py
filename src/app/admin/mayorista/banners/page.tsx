import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatStatus(status: string) {
  return status === "ACTIVE" ? "Activo" : "Inactivo";
}

export default async function AdminWholesaleBannersPage() {
  const banners = await prisma.banner.findMany({
    where: { location: "mayorista-hero" },
    orderBy: { order: "asc" },
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Banners mayoristas"
        description="Usá ubicación mayorista-hero para mostrar banners en la página mayorista."
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <Link href="/admin/mayorista" className="btn-secondary">
            ← Volver a Mayorista
          </Link>

          <Link href="/admin/mayorista/banners/nuevo" className="btn-cta">
            Nuevo banner mayorista
          </Link>
        </div>

        <div className="mb-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-bold text-yellow-900">
          Para que aparezca en Mayorista, el banner debe tener ubicación:
          <span className="ml-1 font-black">mayorista-hero</span>. Tamaños recomendados:
          desktop 1920x900 px y mobile 600x480 px.
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Preview</th>
                  <th className="px-4 py-3 font-black">Título</th>
                  <th className="px-4 py-3 font-black">Link</th>
                  <th className="px-4 py-3 font-black">Orden</th>
                  <th className="px-4 py-3 font-black">Estado</th>
                  <th className="px-4 py-3 font-black">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-t border-borderSoft">
                    <td className="px-4 py-3">
                      {banner.image ? (
                        <img src={banner.image} alt={banner.title} className="h-16 w-28 rounded-xl object-cover" />
                      ) : (
                        <div className="grid h-16 w-28 place-items-center rounded-xl bg-surface text-xs font-bold text-textSecondary">
                          Sin imagen
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-black">{banner.title}</td>
                    <td className="px-4 py-3">{banner.href ?? "-"}</td>
                    <td className="px-4 py-3">{banner.order}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={formatStatus(banner.status)} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/banners/${banner.id}/editar`} className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white">
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}

                {!banners.length && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center font-bold text-textSecondary">
                      Todavía no hay banners mayoristas.
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
