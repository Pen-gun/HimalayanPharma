interface Stat {
  label: string;
  value: string;
}

interface Props {
  stats: Stat[];
}

const StatsBar = ({ stats }: Props) => (
  <div className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
    {stats.map((stat) => (
      <div key={stat.label} className="text-center sm:text-left">
        <div className="text-3xl font-semibold text-emerald-800">{stat.value}</div>
        <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
      </div>
    ))}
  </div>
);

export default StatsBar;
