/**
 * Confirm Dialog Component
 * Accessible confirmation modal for destructive actions
 */
import { useEffect, useRef } from 'react';
import { AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: (
        <AlertTriangle className="h-6 w-6 text-red-600" />
      ),
      iconBg: 'bg-red-100',
      button: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: (
        <AlertCircle className="h-6 w-6 text-blue-600" />
      ),
      iconBg: 'bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    info: {
      icon: (
        <Info className="h-6 w-6 text-blue-600" />
      ),
      iconBg: 'bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 rounded-full p-3 ${styles.iconBg}`}>
              {styles.icon}
            </div>
            <div className="flex-1">
              <h3 id="confirm-title" className="text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p id="confirm-message" className="mt-2 text-sm text-slate-600">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            ref={confirmButtonRef}
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${styles.button}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
