import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-2xl border border-[#A09BD3] border-opacity-20 px-6 py-4 text-lg grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start',
  {
    variants: {
      variant: {
        default: 'bg-[#2A2B45] text-white',
        destructive: 'bg-red-500 bg-opacity-10 text-red-400 border-red-500 border-opacity-30',
        success: 'bg-green-500 bg-opacity-10 text-green-400 border-green-500 border-opacity-30',
        warning: 'bg-yellow-500 bg-opacity-10 text-yellow-400 border-yellow-500 border-opacity-30',
        info: 'bg-blue-500 bg-opacity-10 text-blue-400 border-blue-500 border-opacity-30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertIcon({ 
  variant = 'default',
  className,
  ...props 
}: { variant?: VariantProps<typeof alertVariants>['variant'] } & React.ComponentProps<'div'>) {
  const Icon = {
    default: Info,
    destructive: XCircle,
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  }[variant || 'default']

  return (
    <div className={cn('flex items-start pt-0.5', className)} {...props}>
      <Icon size={20} />
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-[#A09BD3] grid justify-items-start gap-1 text-lg [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

export { Alert, AlertIcon, AlertTitle, AlertDescription }