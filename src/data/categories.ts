export type Category = { name: string; slug: string; icon: string; description: string; color: string };
export const categories: Category[] = [
 { name: "Electrónica", slug: "electronica", icon: "⚡", description: "Accesorios, audio, gadgets y tecnología útil.", color: "from-primaryLight to-primary" },
 { name: "Bazar", slug: "bazar", icon: "🛒", description: "Prácticos para cocina, mesa y organización.", color: "from-primary to-primaryDark" },
 { name: "Cotillón", slug: "cotillon", icon: "🎉", description: "Fiestas, globos, decoración y packs.", color: "from-surfaceBlue to-primary" },
 { name: "Hogar", slug: "hogar", icon: "🏠", description: "Orden, limpieza, deco y confort diario.", color: "from-primaryLight to-primaryDark" },
 { name: "Juguetería", slug: "jugueteria", icon: "🧸", description: "Juegos creativos, didácticos y diversión.", color: "from-surfaceBlue to-primary" },
 { name: "Papelería", slug: "papeleria", icon: "📚", description: "Útiles, oficina, arte y organización escolar.", color: "from-primary to-primaryDark" },
 { name: "Ofertas", slug: "ofertas", icon: "🔥", description: "Precios rematados y oportunidades por tiempo limitado.", color: "from-primary to-primaryDark" },
 { name: "Temporada", slug: "temporada", icon: "☀️", description: "Selección especial para cada época del año.", color: "from-primaryLight to-primaryDark" }
];
