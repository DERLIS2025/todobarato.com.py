export function StatusBadge({ status }: { status: string }) {
  const isGood = ["Activo", "Activa", "Pagado", "Enviado"].includes(status);
  const isWarning = ["Pendiente", "Borrador"].includes(status);

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-black ${
        isGood
          ? "bg-green-100 text-green-700"
          : isWarning
            ? "bg-promo text-primaryDark"
            : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}
