import Link from "next/link";
import { CategorySidebar } from "@/components/layout/CategorySidebar";

export function HeroMarketplace() {
  return (
    <section className="container-page mt-4 grid gap-4 lg:mt-6 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <CategorySidebar />
      </div>
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-cta to-promo p-5 text-white shadow-soft sm:p-7 lg:p-12">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-promo lg:text-sm">Ofertas todos los días</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">
          Todo para tu casa, tus fiestas y tu día a día al mejor precio.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
          Comprá bazar, electrónica, cotillón y productos para el hogar con precios bajos y envío a todo Paraguay.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 lg:mt-8">
          <Link href="/ofertas" className="btn-cta px-5">
            Ver ofertas
          </Link>
          <Link href="/nuevos-productos" className="rounded-xl bg-white px-5 py-3 text-sm font-black text-primaryDark shadow-soft transition hover:bg-primaryLight">
            Nuevos ingresos
          </Link>
        </div>
      </div>
    </section>
  );
}
