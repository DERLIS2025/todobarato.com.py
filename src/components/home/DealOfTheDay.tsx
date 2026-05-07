import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { promotions } from "@/data/promotions";

export function DealOfTheDay() {
  const deal = products[0];

  return (
    <section className="container-page mt-7 grid gap-4 lg:mt-10 lg:grid-cols-[1fr_340px]">
      <div className="rounded-3xl bg-primaryDark p-5 text-white shadow-soft sm:p-7 lg:p-8">
        <p className="text-xs font-black uppercase tracking-wide text-promo">{promotions.headline}</p>
        <h2 className="mt-2 text-2xl font-black lg:text-3xl">Oferta del día con contador</h2>
        <p className="mt-3 text-sm text-primaryLight">
          Termina en: <span className="font-black text-white">12 días · 08 h · 45 min</span>
        </p>
        <p className="mt-4 max-w-xl text-sm text-primaryLight">
          Usá el cupón {promotions.coupon} y aprovechá precios especiales en productos seleccionados.
        </p>
      </div>
      <ProductCard product={deal} compact />
    </section>
  );
}
