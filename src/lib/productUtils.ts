import { products, Product } from "@/data/products";
export function getDiscount(p: Product) { return p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0; }
export function getProduct(slug: string) { return products.find((p) => p.slug === slug); }
export function getByCategory(slug: string) { return slug === "ofertas" ? products.filter((p) => p.oldPrice) : products.filter((p) => p.categorySlug === slug); }
export function sortProducts(list: Product[], sort = "relevancia") { const l=[...list]; return l.sort((a,b)=> sort==='precio-asc'?a.price-b.price:sort==='precio-desc'?b.price-a.price:sort==='az'?a.name.localeCompare(b.name):sort==='za'?b.name.localeCompare(a.name):sort==='vendidos'?b.sold-a.sold:b.featured?1:-1); }
export function searchProducts(q = "") { const s=q.toLowerCase(); return products.filter(p => [p.name,p.brand,p.category,...p.tags].join(' ').toLowerCase().includes(s)); }
