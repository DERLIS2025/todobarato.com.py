"use client";
import { ProductCard } from "@/components/product/ProductCard";import { products } from "@/data/products";import { useWishlistStore } from "@/store/wishlistStore";
export default function WishlistPage(){const ids=useWishlistStore(s=>s.ids);const list=products.filter(p=>ids.includes(p.id));return <div className="container-page mt-8"><h1 className="text-3xl font-black">Wishlist</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{list.length?list.map(p=><ProductCard product={p} key={p.id}/>):<p className="card p-8">Todavía no agregaste favoritos.</p>}</div></div>}
