import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const electronica = await prisma.category.upsert({
    where: { slug: "electronica" },
    update: {},
    create: {
      name: "Electrónica",
      slug: "electronica",
      icon: "⚡",
      description: "Accesorios, audio, gadgets y tecnología útil.",
      order: 1,
    },
  });

  const bazar = await prisma.category.upsert({
    where: { slug: "bazar" },
    update: {},
    create: {
      name: "Bazar",
      slug: "bazar",
      icon: "🛒",
      description: "Prácticos para cocina, mesa y organización.",
      order: 2,
    },
  });

  const hogar = await prisma.category.upsert({
    where: { slug: "hogar" },
    update: {},
    create: {
      name: "Hogar",
      slug: "hogar",
      icon: "🏠",
      description: "Orden, limpieza, deco y confort diario.",
      order: 3,
    },
  });

  await prisma.product.upsert({
    where: { slug: "auriculares-bluetooth-maxbass" },
    update: {},
    create: {
      name: "Auriculares Bluetooth MaxBass",
      slug: "auriculares-bluetooth-maxbass",
      brand: "TECHPY",
      sku: "TECH-AUD-001",
      description: "Auriculares Bluetooth con buen sonido y precio promocional.",
      price: 89000,
      oldPrice: 129000,
      stock: 24,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      badges: ["Oferta", "Más vendido"],
      isNew: true,
      featured: true,
      sold: 86,
      reviews: 86,
      categoryId: electronica.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "set-contenedores-hermeticos-12-piezas" },
    update: {},
    create: {
      name: "Set contenedores herméticos 12 piezas",
      slug: "set-contenedores-hermeticos-12-piezas",
      brand: "CASAPLUS",
      sku: "BAZ-ORG-001",
      description: "Set práctico para organizar alimentos y cocina.",
      price: 74900,
      oldPrice: 99000,
      stock: 12,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
      badges: ["Pack", "Oferta"],
      isNew: true,
      featured: true,
      sold: 112,
      reviews: 112,
      categoryId: bazar.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "lampara-led-recargable-escritorio" },
    update: {},
    create: {
      name: "Lámpara LED recargable de escritorio",
      slug: "lampara-led-recargable-escritorio",
      brand: "LUZPY",
      sku: "HOG-LUZ-001",
      description: "Lámpara LED práctica para escritorio, estudio y hogar.",
      price: 82000,
      oldPrice: 110000,
      stock: 18,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
      badges: ["Nuevo"],
      isNew: true,
      featured: false,
      sold: 41,
      reviews: 41,
      categoryId: hogar.id,
    },
  });

  await prisma.banner.upsert({
    where: { id: "home-electronica" },
    update: {},
    create: {
      id: "home-electronica",
      title: "Tecnología con ofertas",
      text: "Gadgets, audio y accesorios para renovar tu día.",
      href: "/categoria/electronica",
      ctaLabel: "Comprar ahora",
      location: "home",
      color: "from-primaryDark to-cta",
      order: 1,
    },
  });

  await prisma.homeSection.upsert({
    where: { key: "hero" },
    update: {},
    create: {
      key: "hero",
      title: "Todo para tu casa, tus fiestas y tu día a día al mejor precio.",
      subtitle:
        "Comprá bazar, electrónica, cotillón y productos para el hogar con precios bajos y envío a todo Paraguay.",
      order: 1,
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "storeName" },
    update: {},
    create: {
      key: "storeName",
      value: "Todopromo.com.py",
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "coupon" },
    update: {},
    create: {
      key: "coupon",
      value: "BARATO10",
    },
  });

  console.log("Seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
