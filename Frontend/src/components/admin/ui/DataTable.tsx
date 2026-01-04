/**
 * Professional Data Table Component
 * Sortable, with actions and responsive design
 */
import type { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => ReactNode;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no items to display.',
  onRowClick,
  actions,
  stickyHeader = false,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner size="lg" text="Loading data..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        }
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`bg-slate-50 ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 ${
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-600 text-right w-[120px]">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-emerald-50/50' : 'hover:bg-slate-50/50'
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm text-slate-700 ${
                      col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.render
                      ? col.render(item, index)
                      : (item as Record<string, unknown>)[col.key]?.toString() ?? '-'}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {actions(item)}
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

// Action Button Components for Table
interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const ActionButton = ({ onClick, disabled, children, variant = 'secondary' }: ActionButtonProps) => {
  const variants = {
    primary: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    secondary: 'bg-slate-50 text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-50 text-red-700 hover:bg-red-100',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
    >
      {children}
    </button>
  );
};
