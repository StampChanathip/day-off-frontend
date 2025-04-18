"use client";
import { createContext, useContext, useState } from "react";
import { ToastType } from "../enums/toast";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toasts: Toast[];
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showError = (message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type: ToastType.Error,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const showSuccess = (message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type: ToastType.Success,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const showInfo = (message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type: ToastType.Info,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const showWarning = (message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type: ToastType.Warning,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeToast,
        showError,
        showSuccess,
        showInfo,
        showWarning,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
