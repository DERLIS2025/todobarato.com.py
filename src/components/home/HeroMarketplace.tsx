import Link from "next/link";
import { CategorySidebar } from "@/components/layout/CategorySidebar";

export function HeroMarketplace() {
  return (
    <section className="container-page mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <CategorySidebar />
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primaryDark via-primary to-cta p-8 text-white shadow-soft lg:p-14">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-24 h-64 w-64 rounded-full bg-promo/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-promo">
            Ofertas todos los días
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight lg:text-6xl">
            Todo para tu casa, tus fiestas y tu día a día al mejor precio.
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/90">
            Comprá bazar, electrónica, cotillón y productos para el hogar con precios bajos y envío a todo Paraguay.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ofertas"
              className="rounded-xl bg-cta px-5 py-3 font-black text-white shadow-soft transition hover:bg-orange-600"
            >
              Ver ofertas
            </Link>

            <Link
              href="/nuevos-productos"
              className="rounded-xl bg-white px-5 py-3 font-black text-primaryDark shadow-soft transition hover:bg-primaryLight"
            >
              Nuevos ingresos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
