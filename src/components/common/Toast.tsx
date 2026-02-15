import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastData } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

const toastStyles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-500'
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-500'
  },
  warning: {
    bg: 'bg-orange-50 border-orange-200',
    text: 'text-orange-800',
    icon: AlertTriangle,
    iconColor: 'text-orange-500'
  }
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${toastStyles[toast.type].bg}`}
          >
            {React.createElement(toastStyles[toast.type].icon, {
              size: 18,
              className: toastStyles[toast.type].iconColor
            })}
            <span className={`text-sm font-medium ${toastStyles[toast.type].text}`}>
              {toast.message}
            </span>
            <button
              onClick={onDismiss}
              className={`ml-2 ${toastStyles[toast.type].text} hover:opacity-70`}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
