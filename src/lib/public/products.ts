import "server-only";

import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";
import { products as fallbackProducts } from "@/data/products";

type StoreProduct = (typeof fallbackProducts)[number];

type PublicProductRecord = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

type GetPublicProductsArgs = {
  where?: Prisma.ProductWhereInput;
  orderBy?:
    | Prisma.ProductOrderByWithRelationInput
    | Prisma.ProductOrderByWithRelationInput[];
  take?: number;
};

function getFallbackImage() {
  return fallbackProducts[0]?.image ?? "/placeholder-product.jpg";
}

function calculateDiscount(price: number, oldPrice?: number | null) {
  if (!oldPrice || oldPrice <= price) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function mapPrismaProductToStoreProduct(
  product: PublicProductRecord
): StoreProduct {
  const image = product.image || getFallbackImage();
  const gallery = product.gallery.length ? product.gallery : [image];

  const mappedProduct = {
    id: product.id,
    name: product.name,
    title: product.name,
    slug: product.slug,
    brand: product.brand ?? "Todopromo",
    sku: product.sku ?? "",
    category: product.category.slug,
    categorySlug: product.category.slug,
    categoryName: product.category.name,
    description: product.description ?? "",
    shortDescription: product.description ?? "",
    longDescription: product.longDescription ?? "",
    image,
    images: gallery,
    gallery,
    price: product.price,
    oldPrice: product.oldPrice ?? undefined,
    discount: calculateDiscount(product.price, product.oldPrice),
    stock: product.stock,
    rating: product.rating,
    reviews: product.reviews,
    sold: product.sold,
    badges: product.badges,
    variants: product.variants,
    colors: product.colors,
    details: product.longDescription ? [product.longDescription] : [],
    tags: product.badges,
    isNew: product.isNew,
    featured: product.featured,
    href: `/producto/${product.slug}`,
  };

  return mappedProduct as unknown as StoreProduct;
}

export async function getPublicProducts({
  where = {},
  orderBy = { createdAt: "desc" },
  take,
}: GetPublicProductsArgs = {}) {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        ...where,
      },
      orderBy,
      take,
      include: {
        category: true,
      },
    });

    return products.map(mapPrismaProductToStoreProduct);
  } catch (error) {
    console.error("Error loading public products:", error);
    return fallbackProducts;
  }
}

export async function getPublicProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });

    if (!product || product.status !== "ACTIVE") {
      return null;
    }

    return mapPrismaProductToStoreProduct(product);
  } catch (error) {
    console.error("Error loading product by slug:", error);
    return fallbackProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getPublicProductsByCategorySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            category: true,
          },
        },
      },
    });

    if (!category || !category.isActive) {
      return {
        category: null,
        products: [],
      };
    }

    return {
      category,
      products: category.products.map(mapPrismaProductToStoreProduct),
    };
  } catch (error) {
    console.error("Error loading category products:", error);

    return {
      category: {
        name: slug,
        slug,
        description: "",
      },
      products: fallbackProducts.filter((product) => product.category === slug),
    };
  }
}

export async function searchPublicProducts(query: string) {
  const search = query.trim();

  if (!search) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return products.map(mapPrismaProductToStoreProduct);
  } catch (error) {
    console.error("Error searching public products:", error);

    const normalized = search.toLowerCase();

    return fallbackProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.brand.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      );
    });
  }
}

export async function getHomeProductSections() {
  const [newProducts, bestSellers, featuredProducts] = await Promise.all([
    getPublicProducts({
      where: {
        isNew: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    }),

    getPublicProducts({
      orderBy: {
        sold: "desc",
      },
      take: 4,
    }),

    getPublicProducts({
      where: {
        featured: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 4,
    }),
  ]);

  return {
    newProducts,
    bestSellers,
    featuredProducts,
  };
}
