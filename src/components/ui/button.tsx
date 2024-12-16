import * as React from 'react'
import { cn } from '@/lib/utils' // Corrected import path

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'ghost' && 'btn-ghost',
          size === 'sm' && 'btn-sm',
          size === 'md' && 'btn-md',
          size === 'lg' && 'btn-lg',
          size === 'icon' && 'btn-icon',
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
