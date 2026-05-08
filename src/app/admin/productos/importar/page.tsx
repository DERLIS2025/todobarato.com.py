import Link from "next/link";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminPageShell } from "@/components/admin/AdminPageShell";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    created?: string;
    updated?: string;
    skipped?: string;
    errors?: string;
  }>;
};

export default async function ImportProductsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};

  const created = Number(params.created ?? 0);
  const updated = Number(params.updated ?? 0);
  const skipped = Number(params.skipped ?? 0);
  const errors = params.errors ?? "";

  const hasResult = Boolean(params.created || params.updated || params.skipped || params.errors);

  return (
    <AdminLayout>
      <AdminPageShell
        title="Importar productos"
        description="Cargá productos masivamente desde un archivo Excel o CSV."
      >
        <div className="mb-4 flex flex-wrap gap-3">
          <Link href="/admin/productos" className="btn-secondary">
            ← Volver a productos
          </Link>

          <a
            href="/templates/productos-import-template.csv"
            className="btn-primary"
            download
          >
            Descargar plantilla CSV
          </a>
        </div>

        {hasResult && (
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-xs font-black uppercase text-green-700">
                Creados
              </p>
              <strong className="mt-2 block text-3xl font-black text-green-800">
                {created}
              </strong>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-xs font-black uppercase text-blue-700">
                Actualizados
              </p>
              <strong className="mt-2 block text-3xl font-black text-blue-800">
                {updated}
              </strong>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-xs font-black uppercase text-yellow-800">
                Omitidos
              </p>
              <strong className="mt-2 block text-3xl font-black text-yellow-900">
                {skipped}
              </strong>
            </div>
          </div>
        )}

        {errors && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            <p className="font-black">Errores detectados:</p>
            <p className="mt-2">{errors}</p>
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <form
            action="/api/admin/products/import"
            method="post"
            encType="multipart/form-data"
            className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft"
          >
            <h2 className="text-xl font-black text-primaryDark">
              Subir archivo
            </h2>

            <p className="mt-2 text-sm text-textSecondary">
              El archivo debe ser .xlsx o .csv. Los productos se crearán o
              actualizarán usando SKU o slug como referencia.
            </p>

            <div className="mt-5 grid gap-4">
              <input
                type="file"
                name="file"
                accept=".xlsx,.csv"
                required
                className="input"
              />

              <button type="submit" className="btn-primary">
                Importar productos
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-surfaceBlue/40 p-4 text-xs font-bold text-primaryDark">
              Recomendación: primero probá con 2 o 3 productos antes de subir un
              archivo grande.
            </div>
          </form>

          <aside className="rounded-2xl border border-borderSoft bg-white p-6 shadow-soft">
            <h3 className="text-lg font-black text-primaryDark">
              Columnas esperadas
            </h3>

            <div className="mt-4 grid gap-2 text-sm text-textSecondary">
              <p>
                <strong>Obligatorias:</strong> name, categorySlug, price
              </p>
              <p>
                <strong>Recomendadas:</strong> sku, slug, brand, stock, image
              </p>
              <p>
                <strong>Opcionales:</strong> oldPrice, badges, variants, colors,
                gallery, isNew, featured
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-surface p-4 text-xs font-bold text-primaryDark">
              Para varios valores usá punto y coma:
              <br />
              <span className="text-primary">Nuevo;Oferta;Destacado</span>
            </div>

            <div className="mt-5 rounded-xl border border-borderSoft p-4 text-xs text-textSecondary">
              <p className="font-black text-primaryDark">Estados válidos:</p>
              <p className="mt-2">ACTIVE, DRAFT, OUT_OF_STOCK</p>
              <p className="mt-2">También acepta: Activo, Borrador, Agotado.</p>
            </div>
          </aside>
        </section>
      </AdminPageShell>
    </AdminLayout>
  );
}
