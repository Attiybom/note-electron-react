import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
