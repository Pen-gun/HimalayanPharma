function SkeletonCard() {
  return (
    <div className="glass-panel rounded-2xl p-4 animate-pulse">
      <div className="h-40 bg-slate-200 rounded-xl mb-4" />
      <div className="h-4 bg-slate-200 rounded mb-2" />
      <div className="h-4 bg-slate-200 rounded w-2/3 mb-4" />
      <div className="flex justify-between">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-6 bg-slate-200 rounded w-16" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </>
  );
}
