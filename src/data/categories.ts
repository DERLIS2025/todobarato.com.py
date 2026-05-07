export type Category = { name: string; slug: string; icon: string; description: string; color: string };
export const categories: Category[] = [
 { name: "Electrónica", slug: "electronica", icon: "⚡", description: "Accesorios, audio, gadgets y tecnología útil.", color: "from-sky-500 to-blue-700" },
 { name: "Bazar", slug: "bazar", icon: "🛒", description: "Prácticos para cocina, mesa y organización.", color: "from-orange-500 to-red-600" },
 { name: "Cotillón", slug: "cotillon", icon: "🎉", description: "Fiestas, globos, decoración y packs.", color: "from-fuchsia-500 to-pink-700" },
 { name: "Hogar", slug: "hogar", icon: "🏠", description: "Orden, limpieza, deco y confort diario.", color: "from-emerald-500 to-teal-700" },
 { name: "Juguetería", slug: "jugueteria", icon: "🧸", description: "Juegos creativos, didácticos y diversión.", color: "from-yellow-400 to-orange-600" },
 { name: "Papelería", slug: "papeleria", icon: "📚", description: "Útiles, oficina, arte y organización escolar.", color: "from-indigo-500 to-violet-700" },
 { name: "Ofertas", slug: "ofertas", icon: "🔥", description: "Precios rematados y oportunidades por tiempo limitado.", color: "from-red-500 to-rose-700" },
 { name: "Temporada", slug: "temporada", icon: "☀️", description: "Selección especial para cada época del año.", color: "from-lime-500 to-green-700" }
];
