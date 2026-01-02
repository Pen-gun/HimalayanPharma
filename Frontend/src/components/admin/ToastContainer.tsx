import { useEffect, useState } from 'react';
import { setToastListener, type Toast, type ToastType } from '../../utils/admin';

const toastColors = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const toastIcons = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'ℹ',
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    setToastListener((toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      
      if (toast.duration) {
        const timer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration);
        
        return () => clearTimeout(timer);
      }
    });
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
            toastColors[toast.type as ToastType]
          }`}
        >
          <span className="text-lg font-semibold">{toastIcons[toast.type as ToastType]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-lg opacity-60 hover:opacity-100 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
