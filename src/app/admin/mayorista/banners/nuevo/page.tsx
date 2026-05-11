import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { BannerImageField } from "@/components/admin/BannerImageField";

export const dynamic = "force-dynamic";

export default function NewWholesaleBannerPage() {
  return (
    <AdminLayout>
      <AdminPageShell
        title="Nuevo banner mayorista"
        description="Creá un banner exclusivo para la sección Mayorista."
      >
        <form
          action="/api/admin/banners"
          method="post"
          encType="multipart/form-data"
          className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft"
        >
          <input type="hidden" name="location" value="mayorista-hero" />

          <div className="mb-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-bold text-yellow-900">
            Este banner se guardará automáticamente con ubicación:
            <span className="ml-1 font-black">mayorista-hero</span>.
            <br />
            Tamaños recomendados: desktop 1920 x 900 px y mobile 600 x 480 px.
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <BannerImageField
              name="image"
              label="Banner desktop"
              helper="Recomendado: 1920 x 900 px. Usar imagen horizontal para escritorio."
            />

            <BannerImageField
              name="mobileImage"
              label="Banner mobile"
              helper="Recomendado: 600 x 480 px. Usar imagen adaptada para teléfonos."
            />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              name="title"
              className="input"
              placeholder="Título interno: Banner mayorista principal"
              required
            />

            <input
              name="href"
              className="input"
              placeholder="Link destino opcional: /mayorista"
            />

            <input
              name="ctaLabel"
              className="input"
              placeholder="CTA opcional: Ver productos"
            />

            <input
              name="order"
              className="input"
              defaultValue="1"
              placeholder="Orden"
            />

            <input
              name="color"
              className="input"
              placeholder="Opcional: color o referencia interna"
            />

            <select name="status" className="input" defaultValue="ACTIVE">
              <option value="ACTIVE">Activo</option>
              <option value="INACTIVE">Inactivo</option>
            </select>
          </div>

          <textarea
            name="text"
            className="input mt-4 min-h-28"
            placeholder="Texto interno u observación opcional..."
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar banner mayorista
            </button>

            <Link href="/admin/mayorista/banners" className="btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </AdminPageShell>
    </AdminLayout>
  );
}
