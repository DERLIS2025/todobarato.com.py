import { ProductSection } from "@/components/home/ProductSection";import { products } from "@/data/products";
export default function BestPage(){return <ProductSection title="Más vendidos" products={[...products].sort((a,b)=>b.sold-a.sold)} />}
