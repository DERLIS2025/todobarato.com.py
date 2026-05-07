import { ProductSection } from "@/components/home/ProductSection";import { products } from "@/data/products";
export default function OffersPage(){return <ProductSection title="Ofertas activas" products={products.filter(p=>p.oldPrice)} />}
