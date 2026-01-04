/**
 * Badge Component
 * Status indicators and tags
 */
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
};

const dotStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  purple: 'bg-purple-500',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const Badge = ({ children, variant = 'default', size = 'sm', dot = false }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};

// Tag list component for displaying multiple tags
interface TagListProps {
  tags: string[];
  maxVisible?: number;
  variant?: BadgeVariant;
}

export const TagList = ({ tags, maxVisible = 3, variant = 'default' }: TagListProps) => {
  const visible = tags.slice(0, maxVisible);
  const remaining = tags.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((tag) => (
        <Badge key={tag} variant={variant} size="sm">
          {tag}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="default" size="sm">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
};
