"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CartSummary } from "@/components/cart/CartSummary";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store/cartStore";

type OrderConfirmation = {
  orderNumber: string;
  total: number;
};

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!items.length) {
      setError("Tu carrito está vacío.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const payload = {
      customer: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        document: String(formData.get("document") ?? ""),
        city: String(formData.get("city") ?? ""),
        address: String(formData.get("address") ?? ""),
        notes: String(formData.get("notes") ?? ""),
      },
      deliveryMethod: String(formData.get("deliveryMethod") ?? "DELIVERY"),
      paymentMethod: String(formData.get("paymentMethod") ?? "TRANSFER"),
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No se pudo crear el pedido.");
      }

      clearCart();

      setConfirmation({
        orderNumber: data.orderNumber,
        total: data.total,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo crear el pedido."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="container-page mt-8">
        <section className="card mx-auto max-w-2xl p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cta">
            Pedido confirmado
          </p>

          <h1 className="mt-3 text-3xl font-black text-primaryDark">
            ¡Gracias por tu compra!
          </h1>

          <p className="mt-3 text-primaryDark/70">
            Recibimos tu pedido correctamente. Nuestro equipo se pondrá en
            contacto contigo para coordinar el pago y la entrega.
          </p>

          <div className="mt-6 rounded-2xl border border-borderSoft bg-surface p-5">
            <p className="text-sm font-bold text-textSecondary">Número de pedido</p>
            <strong className="mt-1 block text-2xl font-black text-primary">
              #{confirmation.orderNumber}
            </strong>

            <p className="mt-4 text-sm font-bold text-textSecondary">Total</p>
            <strong className="mt-1 block text-xl font-black">
              {formatPrice(confirmation.total)}
            </strong>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Volver a la tienda
            </Link>

            <Link href="/nuevos-productos" className="btn-secondary">
              Seguir comprando
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container-page mt-8">
      <h1 className="text-3xl font-black">Checkout</h1>

      {!items.length ? (
        <div className="card mt-6 p-10 text-center">
          <p className="text-lg font-bold">Tu carrito está vacío.</p>

          <Link href="/" className="btn-primary mt-5 inline-block">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="card grid gap-4 p-6">
            <div>
              <h2 className="text-xl font-black">Datos del cliente</h2>
              <p className="mt-1 text-sm text-primaryDark/60">
                Estos datos se usarán para registrar el pedido y coordinar la entrega.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">
                {error}
              </div>
            )}

            <input
              name="name"
              className="input"
              placeholder="Nombre y apellido *"
              required
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="phone"
                className="input"
                placeholder="Teléfono / WhatsApp *"
                required
              />

              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email opcional"
              />
            </div>

            <input
              name="document"
              className="input"
              placeholder="Documento o RUC opcional"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="city"
                className="input"
                placeholder="Ciudad"
              />

              <input
                name="address"
                className="input"
                placeholder="Dirección"
              />
            </div>

            <select name="deliveryMethod" className="input" defaultValue="DELIVERY">
              <option value="DELIVERY">Delivery a domicilio</option>
              <option value="PICKUP">Retiro en tienda</option>
            </select>

            <select name="paymentMethod" className="input" defaultValue="TRANSFER">
              <option value="TRANSFER">Transferencia bancaria</option>
              <option value="CARD">Tarjeta / pasarela futura</option>
              <option value="PICKUP_PAYMENT">Pago al retirar</option>
              <option value="QR">QR</option>
              <option value="CASH">Efectivo</option>
            </select>

            <textarea
              name="notes"
              className="input"
              placeholder="Observaciones para el pedido"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Confirmando pedido..." : "Confirmar pedido"}
            </button>

            <p className="rounded-xl bg-surfaceBlue/40 p-3 text-xs text-primaryDark/70">
              Al confirmar, el pedido se guardará en el panel administrativo y
              quedará visible en la sección Pedidos.
            </p>
          </form>

          <CartSummary showCheckoutButton={false} />
        </div>
      )}
    </div>
  );
}
