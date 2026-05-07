export function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-white p-5 shadow-soft">
      <p className="text-sm font-bold text-textSecondary">{label}</p>
      <strong className="mt-2 block text-2xl font-black text-primaryDark">
        {value}
      </strong>
      <p className="mt-2 text-xs font-bold text-primary">{helper}</p>
    </div>
  );
}
