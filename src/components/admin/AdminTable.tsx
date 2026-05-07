import { StatusBadge } from "@/components/admin/StatusBadge";

type Row = Record<string, string | number>;

export function AdminTable({
  rows,
  actions = true,
}: {
  rows: Row[];
  actions?: boolean;
}) {
  const columns = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-borderSoft bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-textSecondary">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-black">
                  {column}
                </th>
              ))}
              {actions && <th className="px-4 py-3 font-black">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-borderSoft">
                {columns.map((column) => {
                  const value = row[column];
                  const isStatus = column.toLowerCase().includes("status");

                  return (
                    <td key={column} className="px-4 py-3">
                      {isStatus ? <StatusBadge status={String(value)} /> : value}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white">
                        Editar
                      </button>
                      <button className="rounded-lg border border-borderSoft px-3 py-2 text-xs font-black">
                        Ver
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
