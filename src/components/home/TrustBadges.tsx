const badges = ["🚚 Envíos a todo Paraguay", "🏬 Retiro en tienda", "🔒 Pagos seguros", "💬 Atención por WhatsApp"];

export function TrustBadges() {
  return (
    <section className="container-page mt-4 grid grid-cols-2 gap-2 sm:gap-3 lg:mt-6 lg:grid-cols-4">
      {badges.map((badge) => (
        <div className="card px-3 py-3 text-center text-xs font-black sm:text-sm lg:p-4" key={badge}>
          {badge}
        </div>
      ))}
    </section>
  );
}
