// components/ui/use-toast.ts
'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`rounded-lg p-4 shadow-lg transition-all ${
                  toast.variant === 'destructive'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-900'
                }`}
                role="alert"
              >
                {toast.title && (
                  <div className="font-medium">{toast.title}</div>
                )}
                {toast.description && (
                  <div className="text-sm">{toast.description}</div>
                )}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-2 right-2 text-sm opacity-70 hover:opacity-100"
                  aria-label="Close toast"
                >
                  ×
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const toast = React.useCallback(
    (options: Omit<Toast, 'id'>) => {
      context.addToast(options);
    },
    [context]
  );

  return { toast };
};