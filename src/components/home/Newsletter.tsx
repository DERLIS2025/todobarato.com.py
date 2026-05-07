export function Newsletter() {
  return (
    <section className="container-page mt-8 lg:mt-12">
      <div className="rounded-3xl bg-primaryDark p-5 text-white sm:p-7 lg:flex lg:items-center lg:justify-between lg:p-8">
        <div>
          <h2 className="text-2xl font-black lg:text-3xl">Recibí ofertas antes que nadie</h2>
          <p className="mt-2 text-sm text-white/90">Newsletter con lanzamientos, packs y descuentos por temporada.</p>
        </div>
        <form className="mt-4 flex overflow-hidden rounded-2xl bg-white lg:mt-0 lg:w-[360px]">
          <input className="min-w-0 flex-1 px-4 py-3 text-sm text-primaryDark outline-none" placeholder="tu@email.com" />
          <button className="bg-cta px-4 text-sm font-black text-white transition hover:bg-primary">Suscribirme</button>
        </form>
      </div>
    </section>
  );
}
