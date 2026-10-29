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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141414] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] light:focus:ring-offset-[#FAF7F2]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary: 'bg-[#E88B88] hover:bg-[#d97774] text-neutral-950 font-semibold shadow-md shadow-[#e88b88]/20 focus:ring-[#E88B88] light:text-neutral-900 light:shadow-[#e88b88]/25',
    secondary: 'bg-[#2B2824] hover:bg-[#38342F] text-[#FBF9F5] border border-neutral-700/60 focus:ring-neutral-500 light:bg-white light:hover:bg-[#F5EFE6] light:text-[#2B2824] light:border-[#DDD5C7] light:shadow-sm light:hover:border-[#C8BEAE] light:focus:ring-[#E88B88]',
    retro: 'bg-[#F4EFE6] hover:bg-[#EFE7DA] text-[#2B2824] font-semibold border-2 border-[#2B2824] shadow-[2px_2px_0px_0px_#2B2824] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] light:bg-[#F9F5EC]',
    outline: 'border border-neutral-600 hover:border-neutral-400 text-neutral-200 hover:bg-neutral-800/40 focus:ring-neutral-400 light:border-[#DDD5C7] light:hover:border-[#B8A078] light:text-[#3D342B] light:hover:bg-[#F5EFE6] light:focus:ring-[#E88B88]',
    ghost: 'text-neutral-300 hover:text-white hover:bg-neutral-800/50 focus:ring-neutral-400 light:text-[#5A544C] light:hover:text-[#1C1A17] light:hover:bg-[#F2ECE1] light:focus:ring-[#E88B88]',
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

