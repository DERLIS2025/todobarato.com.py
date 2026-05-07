import Link from "next/link";
import { promoBanners } from "@/data/banners";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";

export function PromoBanners() {
  return (
    <section className="container-page mt-4 lg:mt-6">
      <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        {promoBanners.map((banner) => (
          <PromoBannerCard key={banner.title} banner={banner} />
        ))}
      </div>
      <div className="md:hidden">
        <HorizontalScroll>
          {promoBanners.map((banner) => (
            <div className="w-[78vw] shrink-0 snap-start" key={banner.title}>
              <PromoBannerCard banner={banner} />
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}

function PromoBannerCard({ banner }: { banner: (typeof promoBanners)[number] }) {
  return (
    <Link href={banner.href} className={`block min-h-32 rounded-2xl bg-gradient-to-br ${banner.color} p-5 text-white shadow-soft`}>
      <h3 className="text-lg font-black leading-tight">{banner.title}</h3>
      <p className="mt-2 text-sm text-white/90">{banner.text}</p>
      <span className="mt-4 inline-block text-sm font-black">Comprar ahora →</span>
    </Link>
  );
}
