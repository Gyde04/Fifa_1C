import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, helperText, icon: Icon, className = '', ...props },
  ref
) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm
            transition-colors duration-150
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${Icon ? 'pl-10' : ''}
            ${error
              ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-200'
              : 'border-slate-200 focus:border-primary-400 focus:ring-primary-100'
            }
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-danger-600">{error}</p>}
      {helperText && !error && <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>}
    </div>
  );
});

export default Input;
