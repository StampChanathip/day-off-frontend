"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastType } from "@/shared/enums/toast";

const toastStyles: Record<ToastType, string> = {
  [ToastType.Error]: "alert-error",
  [ToastType.Success]: "alert-success",
  [ToastType.Info]: "alert-info",
  [ToastType.Warning]: "alert-warning",
};

export default function Toast({
  message,
  onClose,
  type,
}: {
  message: string | null;
  onClose: () => void;
  type: ToastType;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        onClose();
        setShow(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          className="w-80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className={`alert shadow-lg ${toastStyles[type]} flex justify-between`}
          >
            <span>{message}</span>
            <button onClick={onClose} className="btn btn-sm btn-ghost">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
