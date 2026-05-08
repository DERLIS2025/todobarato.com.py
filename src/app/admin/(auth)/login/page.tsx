export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; returnTo?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const error = params.error;
  const returnTo = params.returnTo || "/admin/dashboard";

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <section className="w-full max-w-md rounded-3xl border border-borderSoft bg-white p-8 shadow-soft">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
          Panel administrativo
        </p>

        <h1 className="mt-2 text-3xl font-black text-primaryDark">
          Acceso administrador
        </h1>

        <p className="mt-2 text-sm text-textSecondary">
          Ingresá con tu usuario administrador para gestionar Todobarato.com.py.
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
            Credenciales incorrectas o incompletas.
          </div>
        )}

        <form action="/api/admin/auth/login" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="returnTo" value={returnTo} />

          <input
            name="email"
            type="email"
            required
            className="input"
            placeholder="Email administrador"
            autoComplete="email"
          />

          <input
            name="password"
            type="password"
            required
            className="input"
            placeholder="Contraseña"
            autoComplete="current-password"
          />

          <button type="submit" className="btn-primary">
            Ingresar al panel
          </button>
        </form>
      </section>
    </main>
  );
}
