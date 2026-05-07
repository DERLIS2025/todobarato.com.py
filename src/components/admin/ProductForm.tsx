export function ProductForm({ mode = "create" }: { mode?: "create" | "edit" }) {
  return (
    <form className="grid gap-5 rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
      <div>
        <h3 className="text-xl font-black">
          {mode === "create" ? "Nuevo producto" : "Editar producto"}
        </h3>
        <p className="mt-1 text-sm text-textSecondary">
          Datos principales del producto para el catálogo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Nombre del producto" />
        <input className="input" placeholder="Slug automático" />
        <input className="input" placeholder="Marca" />
        <select className="input">
          <option>Categoría</option>
          <option>Electrónica</option>
          <option>Bazar</option>
          <option>Hogar</option>
        </select>
        <input className="input" placeholder="Precio actual" />
        <input className="input" placeholder="Precio anterior" />
        <input className="input" placeholder="Stock" />
        <input className="input" placeholder="SKU" />
      </div>

      <textarea className="input min-h-28" placeholder="Descripción corta" />
      <textarea className="input min-h-36" placeholder="Descripción larga / detalles" />

      <div className="grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Badges: Oferta, Nuevo, Más vendido" />
        <input className="input" placeholder="Variantes: color, modelo, pack" />
        <input className="input" placeholder="SEO title" />
        <input className="input" placeholder="SEO description" />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary">
          Guardar producto
        </button>
        <button type="button" className="btn-secondary">
          Guardar como borrador
        </button>
      </div>
    </form>
  );
}
