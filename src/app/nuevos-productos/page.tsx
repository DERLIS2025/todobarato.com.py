import { ProductSection } from "@/components/home/ProductSection";import { products } from "@/data/products";
export default function NewPage(){return <ProductSection title="Nuevos productos" products={products.filter(p=>p.isNew)} />}
