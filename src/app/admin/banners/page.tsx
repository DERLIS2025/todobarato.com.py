import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
  };

  return labels[status] ?? status;
}

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: [{ location: "asc" }, { order: "asc" }],
  });

  return (
    <AdminLayout>
      <AdminPageShell
        title="Banners"
        description="Gestioná piezas gráficas promocionales para desktop y mobile."
      >
        <div className="mb-4 flex flex-wrap justify-between gap-3">
          <input className="input max-w-sm" placeholder="Buscar banner..." />

          <Link href="/admin/banners/nuevo" className="btn-cta">
            Nuevo banner
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
                <tr>
                  <th className="px-4 py-3 font-black">Preview</th>
                  <th className="px-4 py-3 font-black">Título interno</th>
                  <th className="px-4 py-3 font-black">Ubicación</th>
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
                      <div className="h-16 w-32 overflow-hidden rounded-xl border border-borderSoft bg-surface">
                        {banner.image ? (
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs font-bold text-textSecondary">
                            Sin imagen
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 font-bold">{banner.title}</td>
                    <td className="px-4 py-3">{banner.location}</td>
                    <td className="px-4 py-3">{banner.href ?? "-"}</td>
                    <td className="px-4 py-3">{banner.order}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={formatStatus(banner.status)} />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/banners/${banner.id}/editar`}
                          className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white"
                        >
                          Editar
                        </Link>

                        {banner.href && (
                          <Link
                            href={banner.href}
                            className="rounded-lg border border-borderSoft px-3 py-2 text-xs font-black"
                          >
                            Ver
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {banners.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-textSecondary" colSpan={7}>
                      Todavía no hay banners cargados.
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
