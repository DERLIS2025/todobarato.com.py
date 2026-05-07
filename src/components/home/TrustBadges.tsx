const badges = [
  "🚚 Envíos a todo Paraguay",
  "🏬 Retiro en tienda",
  "🔒 Pagos seguros",
  "💬 Atención por WhatsApp",
];

export function TrustBadges() {
  return (
    <section className="container-page mt-5 grid grid-cols-2 gap-3 lg:mt-6 lg:grid-cols-4">
      {badges.map((badge) => (
        <div
          className="card flex min-h-14 items-center justify-center p-3 text-center text-xs font-black sm:text-sm"
          key={badge}
        >
          {badge}
        </div>
      ))}
    </section>
  );
}
