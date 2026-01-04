/**
 * Empty State Component
 * Friendly placeholder for empty lists
 */
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 px-6 py-16 text-center">
      {icon && <div className="mb-4 text-slate-300">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-slate-600">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {action.label}
        </button>
      )}
    </div>
  );
};
