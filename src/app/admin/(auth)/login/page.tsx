import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-surface p-4">
      <section className="w-full max-w-md rounded-3xl border border-borderSoft bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-primaryDark">
          Acceso administrador
        </h1>
        <p className="mt-2 text-sm text-textSecondary">
          Login visual preparado para autenticación real en la siguiente fase.
        </p>

        <form className="mt-6 grid gap-4">
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Contraseña" type="password" />
          <Link href="/admin/dashboard" className="btn-primary text-center">
            Ingresar al panel
          </Link>
        </form>
      </section>
    </main>
  );
}
