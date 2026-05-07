import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { BannerImageField } from "@/components/admin/BannerImageField";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const banner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!banner) {
    notFound();
  }

  return (
    <AdminLayout>
      <AdminPageShell
        title="Editar banner"
        description={`Editando: ${banner.title}`}
      >
        <form
          action={`/api/admin/banners/${banner.id}`}
          method="post"
          encType="multipart/form-data"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <BannerImageField
              name="imageFile"
              currentName="currentImage"
              label="Imagen de escritorio"
              helper="Recomendado: 1920 x 900 px. Ideal para banners horizontales amplios."
              defaultValue={banner.image}
            />

            <BannerImageField
              name="mobileImageFile"
              currentName="currentMobileImage"
              label="Imagen mobile"
              helper="Recomendado: 600 x 480 px. Si queda vacío, se usará la imagen desktop."
              defaultValue={banner.mobileImage}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" className="input" defaultValue={banner.title} required />
            <input name="href" className="input" defaultValue={banner.href ?? ""} />

            <input name="ctaLabel" className="input" defaultValue={banner.ctaLabel ?? ""} />
            <input name="location" className="input" defaultValue={banner.location} />

            <input name="order" className="input" defaultValue={banner.order} />
            <input name="color" className="input" defaultValue={banner.color ?? ""} />

            <select name="status" className="input" defaultValue={banner.status}>
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>

          <textarea
            name="text"
            className="input min-h-24"
            defaultValue={banner.text ?? ""}
          />

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar cambios
            </button>

            <a href="/admin/banners" className="btn-secondary">
              Cancelar
            </a>
          </div>
        </form>
      </AdminPageShell>
    </AdminLayout>
  );
}
