"use client";

import { useToast } from "@/shared/providers/ToastProvider";
import Toast from "./Toast";

export default function ToastWrapper() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            message={toast.message}
            type={toast.type}
            key={toast.id}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}
