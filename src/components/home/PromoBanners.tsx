import Link from "next/link";
import { promoBanners } from "@/data/banners";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";

export function PromoBanners() {
  return (
    <section className="container-page mt-5">
      <div className="lg:hidden">
        <HorizontalScroll>
          {promoBanners.map((banner) => (
            <Link
              href={banner.href}
              key={banner.title}
              className={`min-w-[78%] snap-start rounded-2xl bg-gradient-to-br ${banner.color} p-4 text-white shadow-soft`}
            >
              <h3 className="text-lg font-black">{banner.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/90">
                {banner.text}
              </p>
              <span className="mt-4 inline-block text-sm font-black">
                Comprar ahora →
              </span>
            </Link>
          ))}
        </HorizontalScroll>
      </div>

      <div className="hidden gap-4 lg:grid lg:grid-cols-4">
        {promoBanners.map((banner) => (
          <Link
            href={banner.href}
            key={banner.title}
            className={`rounded-2xl bg-gradient-to-br ${banner.color} p-5 text-white shadow-soft`}
          >
            <h3 className="text-xl font-black">{banner.title}</h3>
            <p className="mt-2 text-sm text-white/90">{banner.text}</p>
            <span className="mt-5 inline-block text-sm font-black">
              Comprar ahora →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
