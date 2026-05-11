"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";
export type CartLine = { product: Product; quantity: number };
type CartState = { items: CartLine[]; add: (product: Product, quantity?: number) => void; remove: (id: string) => void; setQty: (id: string, quantity: number) => void; clear: () => void; count: () => number; subtotal: () => number };
export const useCartStore = create<CartState>()(persist((set, get) => ({
 items: [],
 add: (product, quantity = 1) => set((s) => { const found=s.items.find(i=>i.product.id===product.id); return { items: found ? s.items.map(i=>i.product.id===product.id?{...i, quantity:i.quantity+quantity}:i) : [...s.items,{product,quantity}]}; }),
 remove: (id) => set((s) => ({ items: s.items.filter(i=>i.product.id!==id) })),
 setQty: (id, quantity) => set((s) => ({ items: s.items.map(i=>i.product.id===id?{...i, quantity:Math.max(1,quantity)}:i) })),
 clear: () => set({ items: [] }), count: () => get().items.reduce((a,i)=>a+i.quantity,0), subtotal: () => get().items.reduce((a,i)=>a+i.product.price*i.quantity,0)
}), { name: "todopromo-cart" }));
