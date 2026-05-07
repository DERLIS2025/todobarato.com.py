import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-borderSoft bg-white/95 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
            Panel Administrativo
          </p>
          <h1 className="text-xl font-black text-primaryDark">
            Gestión de Todobarato.com.py
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="btn-secondary py-2 text-xs">
            Ver tienda
          </Link>
          <Link href="/admin/login" className="btn-primary py-2 text-xs">
            Admin
          </Link>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-borderSoft px-4 py-3 lg:hidden">
        {["Dashboard", "Productos", "Pedidos", "Home", "Config"].map((item) => (
          <span
            key={item}
            className="shrink-0 rounded-full bg-surface px-3 py-2 text-xs font-black text-primaryDark"
          >
            {item}
          </span>
        ))}
      </div>
    </header>
  );
}
