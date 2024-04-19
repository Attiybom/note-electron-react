import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ children, className, ...props }: ActionButtonProps) => {
  // eslint-disable-next-line react/prop-types
  return (
    <button
      className={twMerge(
        'px-2 py-1 rounder-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
