import cs from 'classnames';
import React, { ReactNode } from 'react';

import { Spinner } from '@/components/atoms/Spinner';

import { ButtonColor } from './interface';

type ButtonProps = {
  label?: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
  onClick?: () => void;
  href?: string;
  target?: string;
  marginClass?: `${'m' | 'p'}${string}`;
  variant?: 'outlined' | 'contained';
};

export const Button = ({
  label,
  type = 'submit',
  icon,
  fullWidth = false,
  color = 'primary',
  loading = false,
  disabled = false,
  onClick = () => {},
  href = undefined,
  target = undefined,
  marginClass = undefined,
  variant = undefined
}: ButtonProps) => {
  const Component = href ? 'a' : 'button';
  const componentProps = href ? { href, target } : {};

  return (
    <Component
      data-testid={`button-${label}`}
      type={type}
      className={cs(
        `flex justify-center items-center shadow-bottom-sm shadow-slate-300 py-2 px-4 rounded focus:outline-none disabled:bg-slate-300 disabled:cursor-not-allowed`,
        [
          fullWidth && 'w-full',
          color === 'primary' && 'bg-emerald-400 hover:bg-emerald-500 text-slate-50',
          color === 'secondary' && 'bg-slate-700 hover:bg-slate-800 text-slate-50',
          color === 'neutral' && 'bg-slate-200 hover:bg-slate-300 text-slate-50',
          color === 'alert' && 'bg-rose-500 hover:bg-rose-600 text-slate-50',
          color === 'white' && 'bg-white hover:bg-slate-300 text-slate-700',
          color === 'grey' && 'bg-slate-300 hover:bg-slate-400 text-slate-700',
          marginClass && marginClass,
          disabled && 'opacity-50 cursor-not-allowed',
          variant === 'outlined' && 'border border-slate-300 border-dashed bg-transparent',
          variant === 'outlined' && color === 'primary' && '!text-emerald-400 border-emerald-400 hover:border-emerald-500 hover:text-emerald-500',
          variant === 'outlined' && color === 'secondary' && '!text-slate-700 border-slate-700 hover:border-slate-800 hover:text-slate-800',
          variant === 'outlined' && color === 'neutral' && '!text-slate-200 border-slate-200 hover:border-slate-300 hover:text-slate-300',
          variant === 'outlined' && color === 'alert' && '!text-rose-500 border-rose-500 hover:border-rose-600 hover:text-rose-600',
          variant === 'contained' && 'border border-transparent'
        ]
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...componentProps}
    >
      <span className="flex justify-center items-center gap-1">
        {label}
        {loading ? <Spinner reverse noMargin /> : icon}
      </span>
    </Component>
  );
};
