export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl border border-text/15 bg-text/5">
      <div className="flex items-center gap-2 opacity-60 text-sm">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
