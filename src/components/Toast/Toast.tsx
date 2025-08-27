import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  showCloseButton?: boolean;
  onClose?: () => void;
  isVisible?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  showCloseButton = true,
  onClose,
  isVisible = true,
  position = 'bottom-right',
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (duration > 0 && visible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, visible]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation to complete
  };

  const Icon = toastIcons[type];

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return { top: 16, right: 16 };
      case 'top-left':
        return { top: 16, left: 16 };
      case 'bottom-left':
        return { bottom: 16, left: 16 };
      case 'bottom-right':
      default:
        return { bottom: 16, right: 16 };
    }
  };

  const getAnimationVariants = () => {
    const isTop = position.includes('top');
    const isRight = position.includes('right');

    return {
      hidden: {
        opacity: 0,
        x: isRight ? 100 : -100,
        y: isTop ? -20 : 20,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: isRight ? 100 : -100,
        scale: 0.9,
        transition: {
          duration: 0.2,
        },
      },
    };
  };

  return (
    <div className="toast-portal" style={getPositionStyles()}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key={id || 'toast'}
            className={`toast toast--${type}`}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
          >
            <div className="toast-content">
              <div className="toast-icon">
                <Icon size={20} />
              </div>
              <div className="toast-text">
                {title && <div className="toast-title">{title}</div>}
                <div className="toast-message">{message}</div>
              </div>
            </div>
            {showCloseButton && (
              <button
                className="toast-close"
                onClick={handleClose}
                aria-label="Close notification"
              >
                <X size={16} />
              </button>
            )}
            {duration > 0 && (
              <motion.div
                className="toast-progress"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Toast Container for managing multiple toasts
export interface ToastContainerProps {
  toasts: (ToastProps & { id: string })[];
  onRemoveToast: (id: string) => void;
  position?: ToastProps['position'];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
  position = 'bottom-right',
}) => {
  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          position={position}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </>
  );
};
