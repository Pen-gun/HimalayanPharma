/**
 * Loading Spinner Component
 * Consistent loading indicators
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
};

export const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animate-spin rounded-full border-slate-200 border-t-emerald-600 ${sizeStyles[size]}`}
      />
      {text && <p className="text-sm text-slate-600">{text}</p>}
    </div>
  );
};

// Full page loading overlay
interface LoadingOverlayProps {
  text?: string;
}

export const LoadingOverlay = ({ text = 'Loading...' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

// Skeleton loader for content placeholders
interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = 'h-4 w-full' }: SkeletonProps) => {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
};

// Card skeleton for loading product/blog cards
export const CardSkeleton = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <Skeleton className="h-40 w-full rounded-lg mb-4" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
};

// Table row skeleton
export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 ${i === 0 ? 'w-32' : 'w-24'}`} />
        </td>
      ))}
    </tr>
  );
};
