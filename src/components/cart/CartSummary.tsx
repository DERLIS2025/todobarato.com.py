"use client";

import Link from "next/link";
import { deliveryFee } from "@/lib/constants";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store/cartStore";

export function CartSummary({
  showCheckoutButton = true,
}: {
  showCheckoutButton?: boolean;
}) {
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = subtotal > 250000 ? 20000 : 0;
  const total = subtotal ? subtotal - discount + deliveryFee : 0;

  return (
    <aside className="card p-5">
      <h2 className="text-xl font-black">Resumen</h2>

      <div className="mt-4 grid gap-3 text-sm">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <b>{formatPrice(subtotal)}</b>
        </p>

        <p className="flex justify-between">
          <span>Descuento</span>
          <b>-{formatPrice(discount)}</b>
        </p>

        <p className="flex justify-between">
          <span>Delivery estimado</span>
          <b>{formatPrice(subtotal ? deliveryFee : 0)}</b>
        </p>

        <p className="flex justify-between border-t pt-3 text-lg">
          <span>Total</span>
          <b>{formatPrice(total)}</b>
        </p>
      </div>

      {showCheckoutButton && (
        <Link href="/checkout" className="btn-cta mt-5 block text-center">
          Ir al checkout
        </Link>
      )}

      <div className="mt-4 rounded-xl bg-surfaceBlue/40 p-3 text-xs text-primaryDark/70">
        🔒 Compra segura · Tarjetas, transferencia, QR y efectivo al retirar.
      </div>
    </aside>
  );
}
