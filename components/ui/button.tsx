import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button'
    
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const getVariantClasses = (variant?: string) => {
      const variants: Record<string, string> = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-zinc-300 bg-white hover:bg-zinc-50',
        secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
        ghost: 'hover:bg-zinc-100 hover:text-zinc-900',
        link: 'text-blue-600 underline-offset-4 hover:underline'
      }
      return variants[variant || 'default']
    }
    
    const getSizeClasses = (size?: string) => {
      const sizes: Record<string, string> = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
      return sizes[size || 'default']
    }

    return (
      <Comp
        className={cn(
          baseClasses,
          getVariantClasses(variant),
          getSizeClasses(size),
          className || ''
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

