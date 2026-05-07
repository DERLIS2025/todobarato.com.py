import { AdminPageShell } from "@/components/admin/AdminPageShell";

export default function AdminSeoPage() {
  return (
    <AdminPageShell title="SEO" description="Configuración SEO general preparada para conectar con productos, categorías y páginas.">
      <form className="grid gap-4 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
        <input className="input" placeholder="Título SEO general del sitio" />
        <textarea className="input min-h-28" placeholder="Meta description general" />
        <input className="input" placeholder="Open Graph image URL" />
        <input className="input" placeholder="Keywords principales" />
        <button type="button" className="btn-primary w-fit">Guardar SEO</button>
      </form>
    </AdminPageShell>
  );
}
