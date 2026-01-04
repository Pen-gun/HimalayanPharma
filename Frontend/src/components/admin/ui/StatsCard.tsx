/**
 * Stats Card Component
 * Beautiful gradient cards for dashboard metrics
 */
import type { ReactNode } from 'react';

type ColorScheme = 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'cyan' | 'slate';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: ColorScheme;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const colorStyles: Record<ColorScheme, { bg: string; border: string; title: string; value: string; subtitle: string }> = {
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    title: 'text-emerald-700',
    value: 'text-emerald-900',
    subtitle: 'text-emerald-600',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    title: 'text-blue-700',
    value: 'text-blue-900',
    subtitle: 'text-blue-600',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    title: 'text-purple-700',
    value: 'text-purple-900',
    subtitle: 'text-purple-600',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    title: 'text-amber-700',
    value: 'text-amber-900',
    subtitle: 'text-amber-600',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-50 to-rose-100',
    border: 'border-rose-200',
    title: 'text-rose-700',
    value: 'text-rose-900',
    subtitle: 'text-rose-600',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
    border: 'border-cyan-200',
    title: 'text-cyan-700',
    value: 'text-cyan-900',
    subtitle: 'text-cyan-600',
  },
  slate: {
    bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
    border: 'border-slate-200',
    title: 'text-slate-700',
    value: 'text-slate-900',
    subtitle: 'text-slate-600',
  },
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'emerald',
  trend,
  onClick,
}: StatsCardProps) => {
  const styles = colorStyles[color];

  const handleClick = onClick ? (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  } : undefined;

  return (
    <div
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      className={`rounded-xl ${styles.bg} border ${styles.border} p-5 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-wider ${styles.title}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold ${styles.value}`}>{value}</p>
          {subtitle && <p className={`text-sm ${styles.subtitle}`}>{subtitle}</p>}
        </div>
        {icon && (
          <div className={`rounded-lg p-2.5 ${styles.bg} ${styles.title}`}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              trend.isPositive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

// Quick Action Card variant
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  color?: ColorScheme;
}

export const QuickActionCard = ({ title, description, icon, onClick, color = 'emerald' }: QuickActionCardProps) => {
  const styles = colorStyles[color];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`w-full rounded-xl ${styles.bg} border ${styles.border} p-5 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
    >
      <div className="flex items-center gap-4">
        <div className={`rounded-lg p-3 bg-white/50 ${styles.title}`}>
          {icon}
        </div>
        <div>
          <p className={`font-semibold ${styles.value}`}>{title}</p>
          <p className={`text-sm ${styles.subtitle}`}>{description}</p>
        </div>
      </div>
    </button>
  );
};
