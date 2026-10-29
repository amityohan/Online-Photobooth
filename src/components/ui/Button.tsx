import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'retro';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FAF7F2] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary: 'bg-[#E88B88] hover:bg-[#d97774] text-neutral-900 font-semibold shadow-md shadow-[#e88b88]/25 focus:ring-[#E88B88]',
    secondary: 'bg-white hover:bg-[#F5EFE6] text-[#2B2824] border border-[#DDD5C7] shadow-sm hover:border-[#C8BEAE] focus:ring-[#E88B88]',
    retro: 'bg-[#F9F5EC] hover:bg-[#EFE7DA] text-[#2B2824] font-semibold border-2 border-[#2B2824] shadow-[2px_2px_0px_0px_#2B2824] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
    outline: 'border border-[#DDD5C7] hover:border-[#B8A078] text-[#3D342B] hover:bg-[#F5EFE6] focus:ring-[#E88B88]',
    ghost: 'text-[#5A544C] hover:text-[#1C1A17] hover:bg-[#F2ECE1] focus:ring-[#E88B88]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : icon && iconPosition === 'left' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && icon && iconPosition === 'right' ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
    </button>
  );
};

