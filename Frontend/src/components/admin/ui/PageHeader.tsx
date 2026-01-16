/**
 * Page Header Component
 * Consistent header with title, description, and actions
 */
import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

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
                  <a href={crumb.href} className="hover:text-blue-600 transition-colors">
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
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
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
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};
