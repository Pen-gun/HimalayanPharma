/**
 * Stats Card Component
 * Clean metric cards for dashboard summaries
 */
import type { ReactNode } from 'react';

type ColorScheme = 'blue' | 'slate';

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
  blue: {
    bg: 'bg-white',
    border: 'border-blue-200',
    title: 'text-blue-700',
    value: 'text-slate-900',
    subtitle: 'text-slate-500',
  },
  slate: {
    bg: 'bg-white',
    border: 'border-slate-200',
    title: 'text-slate-700',
    value: 'text-slate-900',
    subtitle: 'text-slate-500',
  },
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'slate',
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
          <div className={`rounded-lg border border-slate-200 p-2.5 text-slate-500`}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              trend.isPositive
                ? 'bg-blue-100 text-blue-700'
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

export const QuickActionCard = ({ title, description, icon, onClick, color = 'slate' }: QuickActionCardProps) => {
  const styles = colorStyles[color];

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`w-full rounded-xl ${styles.bg} border ${styles.border} p-5 text-left transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="flex items-center gap-4">
        <div className={`rounded-lg border border-slate-200 p-3 text-slate-500`}>
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
