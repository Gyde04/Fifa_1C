import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300 shadow-sm',
  secondary: 'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 focus:ring-primary-200',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-300 shadow-sm',
  ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-200',
  accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-300 shadow-sm',
  outline: 'bg-transparent text-primary-600 border border-primary-300 hover:bg-primary-50 focus:ring-primary-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-2.5 text-base rounded-xl',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', loading, disabled, icon: Icon, iconRight: IconRight, fullWidth, className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 16} className="animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
});

export default Button;
