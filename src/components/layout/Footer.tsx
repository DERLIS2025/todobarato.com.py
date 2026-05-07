import Link from "next/link";
import { categories } from "@/data/categories";
import { site } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-10 bg-primaryDark text-surface lg:mt-14">
      <div className="container-page grid gap-6 py-8 text-sm md:grid-cols-4 lg:gap-8 lg:py-12">
        <div>
          <h3 className="text-xl font-black text-white lg:text-2xl">Todobarato.com.py</h3>
          <p className="mt-2 text-xs leading-relaxed lg:mt-3 lg:text-sm">Marketplace paraguayo multicategoría con ofertas para hogar, fiestas, electrónica y más.</p>
        </div>
        <div>
          <h4 className="font-black text-white">Categorías</h4>
          <div className="mt-2 grid grid-cols-2 gap-1 text-xs md:grid-cols-1 lg:mt-3 lg:gap-2 lg:text-sm">
            {categories.slice(0, 6).map((category) => (
              <Link href={`/categoria/${category.slug}`} key={category.slug}>{category.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-black text-white">Ayuda</h4>
          <div className="mt-2 grid gap-1 text-xs lg:mt-3 lg:gap-2 lg:text-sm">
            <Link href="/politica-envios">Política de envíos</Link>
            <Link href="/politica-cambios">Cambios y devoluciones</Link>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            <Link href="/terminos-condiciones">Términos</Link>
          </div>
        </div>
        <div>
          <h4 className="font-black text-white">Contacto</h4>
          <p className="mt-2 text-xs leading-relaxed lg:mt-3 lg:text-sm">{site.phone}<br />{site.email}<br />{site.address}</p>
          <p className="mt-3 rounded-xl bg-white/10 p-3 text-xs">Medios de pago: tarjetas, transferencia, QR y efectivo.</p>
        </div>
      </div>
    </footer>
  );
}
