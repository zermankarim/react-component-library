import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import './SidebarMenu.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: MenuItem[];
  badge?: string | number;
}

export interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  title?: string;
  width?: number;
  position?: 'left' | 'right';
  overlay?: boolean;
  className?: string;
}

const MenuItemComponent: React.FC<{
  item: MenuItem;
  level: number;
  onItemClick?: (item: MenuItem) => void;
}> = ({ item, level, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleItemClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      item.onClick?.();
      onItemClick?.(item);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (item.href) {
      e.preventDefault();
      if (item.onClick) {
        item.onClick();
      } else {
        window.location.href = item.href;
      }
      onItemClick?.(item);
    }
  };

  return (
    <div className="menu-item-container">
      <div
        className={`menu-item menu-item--level-${level} ${hasChildren ? 'menu-item--expandable' : ''}`}
        onClick={handleItemClick}
        role={hasChildren ? 'button' : 'menuitem'}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick();
          }
        }}
      >
        <div className="menu-item-content">
          {item.icon && <span className="menu-item-icon">{item.icon}</span>}
          {item.href ? (
            <a
              href={item.href}
              className="menu-item-link"
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          ) : (
            <span className="menu-item-label">{item.label}</span>
          )}
          {item.badge && <span className="menu-item-badge">{item.badge}</span>}
        </div>
        {hasChildren && (
          <span className="menu-item-arrow">
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </span>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            className="menu-submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {item.children!.map(child => (
              <MenuItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                onItemClick={onItemClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  items,
  title,
  width = 320,
  position = 'right',
  overlay = true,
  className = '',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = () => {
    if (overlay) {
      onClose();
    }
  };

  const handleItemClick = () => {
    // Optionally close sidebar when item is clicked
    // onClose();
  };

  const sidebarVariants = {
    hidden: {
      x: position === 'right' ? '100%' : '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {overlay && (
            <motion.div
              className="sidebar-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleOverlayClick}
            />
          )}
          <motion.aside
            className={`sidebar sidebar--${position} ${className}`}
            style={{ width }}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="sidebar-header">
              {title && <h2 className="sidebar-title">{title}</h2>}
              <button
                className="sidebar-close"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="sidebar-content">
              <nav className="sidebar-nav">
                {items.map(item => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    level={0}
                    onItemClick={handleItemClick}
                  />
                ))}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
