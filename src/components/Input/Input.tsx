import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './Input.css';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  clearable?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      error,
      label,
      helperText,
      fullWidth = false,
      variant = 'outlined',
      size = 'medium',
      className = '',
      value,
      onChange,
      disabled,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = () => {
      setInputValue('');
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;
    const hasValue = inputValue && inputValue.toString().length > 0;
    const showClearButton = clearable && hasValue && !disabled;
    const showPasswordToggle = type === 'password';

    const inputClasses = [
      'input',
      `input--${variant}`,
      `input--${size}`,
      fullWidth && 'input--full-width',
      error && 'input--error',
      disabled && 'input--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="input-container">
        {label && <label className="input-label">{label}</label>}
        <div className="input-wrapper">
          <input
            ref={ref}
            type={inputType}
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClasses}
            {...props}
          />
          {(showClearButton || showPasswordToggle) && (
            <div className="input-actions">
              {showClearButton && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="input-action-button input-clear-button"
                  aria-label="Clear input"
                >
                  <X size={16} />
                </button>
              )}
              {showPasswordToggle && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="input-action-button input-password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <div className={`input-helper ${error ? 'input-helper--error' : ''}`}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  },
);
