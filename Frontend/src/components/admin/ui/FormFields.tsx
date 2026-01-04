/**
 * Professional Form Field Components
 * Consistent styling and validation patterns
 */
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

// Base styles
const labelStyles = 'block text-sm font-semibold text-slate-700 mb-1.5';
const inputStyles = 'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none disabled:bg-slate-100 disabled:cursor-not-allowed';
const errorStyles = 'border-red-300 focus:border-red-500 focus:ring-red-500/20';
const helpTextStyles = 'mt-1.5 text-xs text-slate-500';
const errorTextStyles = 'mt-1.5 text-xs text-red-600';

interface BaseFieldProps {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

// Text Input Field
interface FormFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {}

export const FormField = ({ label, error, helpText, required, ...inputProps }: FormFieldProps) => {
  return (
    <div className="space-y-1">
      <label className={labelStyles}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className={`${inputStyles} ${error ? errorStyles : ''}`}
        {...inputProps}
      />
      {error && <p className={errorTextStyles}>{error}</p>}
      {helpText && !error && <p className={helpTextStyles}>{helpText}</p>}
    </div>
  );
};

// Textarea Field
interface FormTextAreaProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  rows?: number;
}

export const FormTextArea = ({ label, error, helpText, required, rows = 4, ...textareaProps }: FormTextAreaProps) => {
  return (
    <div className="space-y-1">
      <label className={labelStyles}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        rows={rows}
        className={`${inputStyles} resize-vertical min-h-[100px] ${error ? errorStyles : ''}`}
        {...textareaProps}
      />
      {error && <p className={errorTextStyles}>{error}</p>}
      {helpText && !error && <p className={helpTextStyles}>{helpText}</p>}
    </div>
  );
};

// Select Field
interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends BaseFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  options: SelectOption[];
  placeholder?: string;
}

export const FormSelect = ({ label, error, helpText, required, options, placeholder, ...selectProps }: FormSelectProps) => {
  return (
    <div className="space-y-1">
      <label className={labelStyles}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        className={`${inputStyles} cursor-pointer ${error ? errorStyles : ''}`}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className={errorTextStyles}>{error}</p>}
      {helpText && !error && <p className={helpTextStyles}>{helpText}</p>}
    </div>
  );
};

// Checkbox Field
interface FormCheckboxProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  description?: string;
}

export const FormCheckbox = ({ label, error, description, ...checkboxProps }: FormCheckboxProps) => {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
        {...checkboxProps}
      />
      <div>
        <label className="text-sm font-medium text-slate-700 cursor-pointer">
          {label}
        </label>
        {description && <p className="text-xs text-slate-500">{description}</p>}
        {error && <p className={errorTextStyles}>{error}</p>}
      </div>
    </div>
  );
};

// Form Section Component
interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2 | 3;
}

export const FormSection = ({ title, description, children, columns = 1 }: FormSectionProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="border-b border-slate-200 pb-3">
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
      )}
      <div className={`grid gap-4 ${gridCols[columns]}`}>
        {children}
      </div>
    </div>
  );
};
