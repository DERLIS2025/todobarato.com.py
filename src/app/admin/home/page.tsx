import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { getHomeSettings, isEnabled } from "@/lib/admin/homeSettings";

export const dynamic = "force-dynamic";

function ToggleField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-borderSoft bg-white p-4 font-bold">
      <span>{label}</span>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} />
    </label>
  );
}

export default async function AdminHomePage() {
  const settings = await getHomeSettings();

  return (
    <AdminLayout>
      <AdminPageShell
        title="Home"
        description="Gestioná el contenido principal y las secciones visibles de la página de inicio."
      >
        <form
          action="/api/admin/home"
          method="post"
          className="grid gap-6 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft"
        >
          <section className="grid gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
                Hero principal
              </p>
              <h2 className="mt-1 text-xl font-black text-primaryDark">
                Texto comercial de portada
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="heroEyebrow"
                className="input"
                defaultValue={settings.heroEyebrow}
                placeholder="Etiqueta superior"
              />

              <input
                name="heroPrimaryLabel"
                className="input"
                defaultValue={settings.heroPrimaryLabel}
                placeholder="Texto botón principal"
              />

              <input
                name="heroPrimaryHref"
                className="input"
                defaultValue={settings.heroPrimaryHref}
                placeholder="Link botón principal"
              />

              <input
                name="heroSecondaryLabel"
                className="input"
                defaultValue={settings.heroSecondaryLabel}
                placeholder="Texto botón secundario"
              />

              <input
                name="heroSecondaryHref"
                className="input"
                defaultValue={settings.heroSecondaryHref}
                placeholder="Link botón secundario"
              />
            </div>

            <textarea
              name="heroTitle"
              className="input min-h-28 text-lg font-black"
              defaultValue={settings.heroTitle}
              placeholder="Título principal"
            />

            <textarea
              name="heroSubtitle"
              className="input min-h-24"
              defaultValue={settings.heroSubtitle}
              placeholder="Subtítulo"
            />
          </section>

          <section className="grid gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
                Secciones visibles
              </p>
              <h2 className="mt-1 text-xl font-black text-primaryDark">
                Activar o desactivar bloques de la home
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <ToggleField
                name="showPromoBanners"
                label="Mostrar banners promocionales"
                defaultChecked={isEnabled(settings.showPromoBanners)}
              />

              <ToggleField
                name="showTrustBadges"
                label="Mostrar beneficios/confianza"
                defaultChecked={isEnabled(settings.showTrustBadges)}
              />

              <ToggleField
                name="showDealOfDay"
                label="Mostrar oferta del día"
                defaultChecked={isEnabled(settings.showDealOfDay)}
              />

              <ToggleField
                name="showNewProducts"
                label="Mostrar nuevos ingresos"
                defaultChecked={isEnabled(settings.showNewProducts)}
              />

              <ToggleField
                name="showBestSellers"
                label="Mostrar más vendidos"
                defaultChecked={isEnabled(settings.showBestSellers)}
              />

              <ToggleField
                name="showFeaturedProducts"
                label="Mostrar productos destacados"
                defaultChecked={isEnabled(settings.showFeaturedProducts)}
              />

              <ToggleField
                name="showNewsletter"
                label="Mostrar newsletter"
                defaultChecked={isEnabled(settings.showNewsletter)}
              />
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Guardar cambios de home
            </button>

            <a href="/" className="btn-secondary">
              Ver tienda
            </a>
          </div>
        </form>
      </AdminPageShell>
    </AdminLayout>
  );
}
