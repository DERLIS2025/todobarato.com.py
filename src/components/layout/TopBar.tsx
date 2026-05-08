import { site } from "@/lib/constants";

const topBarMessage = `🚚 Envíos a todo Paraguay · 🏬 Retiro en tienda · 💬 WhatsApp ${site.phone} · 🎟 Cupón BARATO10`;

export function TopBar() {
  return (
    <div className="bg-primaryDark text-white">
      {/* Desktop */}
      <div className="container-page hidden items-center justify-between gap-4 py-2 text-xs font-bold md:flex">
        <span>🚚 Envíos a todo Paraguay · Retiro en tienda</span>
        <span>WhatsApp {site.phone} · Cupón BARATO10</span>
      </div>

      {/* Mobile ticker */}
      <div className="relative overflow-hidden py-2 text-[11px] font-bold md:hidden">
        <div className="flex w-max animate-[topbar-marquee_22s_linear_infinite] whitespace-nowrap">
          <span className="px-6">{topBarMessage}</span>
          <span className="px-6">{topBarMessage}</span>
          <span className="px-6">{topBarMessage}</span>
        </div>
      </div>

      <style>
        {`
          @keyframes topbar-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}
      </style>
    </div>
  );
}
