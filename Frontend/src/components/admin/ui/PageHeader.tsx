/**
 * Page Header Component
 * Consistent header with title, description, and actions
 */
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader = ({ title, description, actions, breadcrumbs }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-emerald-600 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-slate-700 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
          {description && <p className="mt-1 text-slate-600">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

// Primary Button for actions
interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variantStyles = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled,
  isLoading,
  icon,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};
