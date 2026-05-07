import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { BannerImageField } from "@/components/admin/BannerImageField";

export const dynamic = "force-dynamic";

export default function NewBannerPage() {
  return (
    <AdminLayout>
      <AdminPageShell
        title="Nuevo banner"
        description="Creá una pieza gráfica para desktop y mobile. El banner será clickeable si tiene link."
      >
        <form
          action="/api/admin/banners"
          method="post"
          encType="multipart/form-data"
          className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <BannerImageField
              name="imageFile"
              label="Imagen de escritorio"
              helper="Recomendado: 1920 x 900 px. Ideal para banners horizontales amplios."
            />

            <BannerImageField
              name="mobileImageFile"
              label="Imagen mobile"
              helper="Recomendado: 600 x 480 px. Si queda vacío, se usará la imagen desktop."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" className="input" placeholder="Título interno: Banner motos Taiga" required />
            <input name="href" className="input" placeholder="Link destino: /categoria/electrodomesticos" />

            <input name="ctaLabel" className="input" placeholder="CTA opcional: Ver más" />
            <input name="location" className="input" placeholder="Ubicación: home" defaultValue="home" />

            <input name="order" className="input" placeholder="Orden: 1" defaultValue="0" />
            <input name="color" className="input" placeholder="Opcional: esquema/gradiente" />

            <select name="status" className="input" defaultValue="ACTIVE">
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>

          <textarea
            name="text"
            className="input min-h-24"
            placeholder="Texto interno u observación opcional..."
          />

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar banner
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
