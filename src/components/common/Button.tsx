import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${
        primary
          ? 'bg-amber-800 text-white hover:bg-amber-900'
          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
      } px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};