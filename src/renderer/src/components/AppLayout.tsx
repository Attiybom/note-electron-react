import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={twMerge('w-[250px] h-screen overflow-auto flex flex-col')} {...props}>
      {/* 操作栏容器 */}
      <div className="w-full h-10 border-b border-white/20 flex justify-start items-center px-3 sticky top-0 z-10">
        {/* 操作栏按钮 */}
        <button className="text-white mr-2">─</button>
        <button className="text-white mr-2">口</button>
        <button className="text-white">X</button>
      </div>
      {/* 侧边栏内容，现在调整为flex-grow让它填充剩余空间 */}
      <div className={twMerge('flex-grow w-full overflow-auto', className)}>{children}</div>
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={twMerge('w-[calc(100%-250px)] h-[100vh + 10px] overflow-auto', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Content.displayName = 'Content'
