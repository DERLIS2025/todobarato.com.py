export const adminStats = [
  { label: "Pedidos pendientes", value: "18", helper: "Requieren revisión", tone: "warning" },
  { label: "Productos activos", value: "124", helper: "Catálogo publicado", tone: "success" },
  { label: "Bajo stock", value: "9", helper: "Reponer esta semana", tone: "danger" },
  { label: "Ventas estimadas", value: "Gs. 8.450.000", helper: "Últimos 30 días", tone: "info" },
];

export const adminProducts = [
  { id: "1", image: "🎧", name: "Auriculares Bluetooth MaxBass", category: "Electrónica", price: "Gs. 89.000", stock: 24, status: "Activo", badges: "Oferta, Más vendido" },
  { id: "2", image: "🧺", name: "Set contenedores herméticos 12 piezas", category: "Bazar", price: "Gs. 74.900", stock: 12, status: "Activo", badges: "Pack, Oferta" },
  { id: "3", image: "💡", name: "Lámpara LED recargable de escritorio", category: "Hogar", price: "Gs. 82.000", stock: 8, status: "Activo", badges: "Nuevo" },
  { id: "4", image: "🎉", name: "Bloques didácticos creativos 120 piezas", category: "Juguetería", price: "Gs. 115.000", stock: 0, status: "Agotado", badges: "Nuevo" },
];

export const adminCategories = [
  { name: "Electrónica", slug: "electronica", products: 28, status: "Activa", order: 1 },
  { name: "Bazar", slug: "bazar", products: 36, status: "Activa", order: 2 },
  { name: "Cotillón", slug: "cotillon", products: 19, status: "Activa", order: 3 },
  { name: "Hogar", slug: "hogar", products: 22, status: "Activa", order: 4 },
];

export const adminBanners = [
  { title: "Tecnología con ofertas", location: "Home", device: "Desktop/Mobile", status: "Activo", order: 1 },
  { title: "Bazar útil para tu hogar", location: "Home", device: "Desktop/Mobile", status: "Activo", order: 2 },
  { title: "Cotillón para cada fiesta", location: "Home", device: "Desktop/Mobile", status: "Activo", order: 3 },
];

export const adminHomeSections = [
  { section: "Hero principal", title: "Todo para tu casa, tus fiestas y tu día a día", status: "Activa", order: 1 },
  { section: "Banners promocionales", title: "Promos por categoría", status: "Activa", order: 2 },
  { section: "Nuevos ingresos", title: "Productos nuevos", status: "Activa", order: 3 },
  { section: "Oferta del día", title: "Oferta relámpago", status: "Activa", order: 4 },
  { section: "Más vendidos", title: "Productos más vendidos", status: "Activa", order: 5 },
];

export const adminPromotions = [
  { name: "BARATO10", type: "Cupón", discount: "10%", status: "Activo", dates: "Todo el mes" },
  { name: "Oferta del día", type: "Campaña", discount: "Hasta 35%", status: "Activo", dates: "Semanal" },
  { name: "Liquidación hogar", type: "Categoría", discount: "20%", status: "Borrador", dates: "Pendiente" },
];

export const adminOrders = [
  { code: "#TB-1001", customer: "Juan Pérez", phone: "+595 981 000 001", total: "Gs. 245.000", payment: "Transferencia", status: "Pendiente", date: "Hoy" },
  { code: "#TB-1002", customer: "María López", phone: "+595 981 000 002", total: "Gs. 139.000", payment: "QR", status: "Pagado", date: "Hoy" },
  { code: "#TB-1003", customer: "Carlos Duarte", phone: "+595 981 000 003", total: "Gs. 89.000", payment: "Efectivo", status: "Enviado", date: "Ayer" },
];

export const adminCustomers = [
  { name: "Juan Pérez", phone: "+595 981 000 001", email: "juan@email.com", orders: 4, total: "Gs. 820.000" },
  { name: "María López", phone: "+595 981 000 002", email: "maria@email.com", orders: 2, total: "Gs. 310.000" },
  { name: "Carlos Duarte", phone: "+595 981 000 003", email: "carlos@email.com", orders: 1, total: "Gs. 89.000" },
];

export const adminUsers = [
  { name: "Administrador", email: "admin@todobarato.com.py", role: "Super Admin", status: "Activo" },
  { name: "Catálogo", email: "catalogo@todobarato.com.py", role: "Editor de catálogo", status: "Activo" },
];

export const adminSettings = {
  storeName: "Todobarato.com.py",
  phone: "+595 981 000 000",
  email: "ventas@todobarato.com.py",
  address: "Asunción, Paraguay",
  topMessage: "Envíos a todo Paraguay · Retiro en tienda",
  coupon: "BARATO10",
};
