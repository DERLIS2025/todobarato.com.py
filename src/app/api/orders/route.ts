import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { deliveryFee } from "@/lib/constants";

type OrderItemInput = {
  productId?: string;
  quantity?: number;
};

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function generateOrderNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `TB-${y}${m}${d}-${Date.now().toString().slice(-5)}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const customerInput = body?.customer ?? {};
    const rawItems = Array.isArray(body?.items) ? body.items : [];

    const name = normalizeText(customerInput.name);
    const email = normalizeText(customerInput.email).toLowerCase();
    const phone = normalizeText(customerInput.phone);
    const document = normalizeText(customerInput.document);
    const city = normalizeText(customerInput.city);
    const address = normalizeText(customerInput.address);
    const notes = normalizeText(customerInput.notes);
    const deliveryMethod = normalizeText(body?.deliveryMethod) || "DELIVERY";
    const paymentMethod = normalizeText(body?.paymentMethod) || "TRANSFER";

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Nombre y teléfono son obligatorios." },
        { status: 400 }
      );
    }

    const items: Required<OrderItemInput>[] = rawItems
      .map((item: OrderItemInput) => ({
        productId: normalizeText(item.productId),
        quantity: Number(item.quantity ?? 0),
      }))
      .filter((item: Required<OrderItemInput>) => item.productId && item.quantity > 0);

    if (!items.length) {
      return NextResponse.json(
        { error: "El carrito está vacío." },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map((item) => item.productId),
        },
        status: "ACTIVE",
      },
    });

    const productsById = new Map(products.map((product) => [product.id, product]));

    const orderItems = items.map((item) => {
      const product = productsById.get(item.productId);

      if (!product) {
        throw new Error(`Producto inválido o inactivo: ${item.productId}`);
      }

      const quantity = Math.max(1, item.quantity);
      const unitPrice = product.price;

      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity,
        unitPrice,
        total: unitPrice * quantity,
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const discount = subtotal > 250000 ? 20000 : 0;
    const shippingCost = subtotal > 0 && deliveryMethod === "DELIVERY" ? deliveryFee : 0;
    const total = subtotal - discount + shippingCost;

    let customer =
      phone
        ? await prisma.customer.findUnique({
            where: {
              phone,
            },
          })
        : null;

    if (!customer && email) {
      customer = await prisma.customer.findUnique({
        where: {
          email,
        },
      });
    }

    if (customer) {
      const updateData: Record<string, string | boolean | null> = {
        name,
        document: document || null,
        city: city || null,
        address: address || null,
        notes: notes || null,
        isActive: true,
      };

      if (email && (!customer.email || customer.email === email)) {
        updateData.email = email;
      }

      if (phone && (!customer.phone || customer.phone === phone)) {
        updateData.phone = phone;
      }

      customer = await prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: updateData,
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          name,
          email: email || null,
          phone: phone || null,
          document: document || null,
          city: city || null,
          address: address || null,
          notes: notes || null,
          isActive: true,
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: customer.id,
        status: "NEW",
        paymentMethod,
        deliveryMethod,
        subtotal,
        shippingCost,
        total,
        notes: notes || null,
        items: {
          create: orderItems,
        },
      },
      include: {
        customer: true,
        items: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    return NextResponse.json(
      { error: "No se pudo crear el pedido." },
      { status: 500 }
    );
  }
}
