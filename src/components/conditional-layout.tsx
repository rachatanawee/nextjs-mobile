'use client'

import { usePathname } from 'next/navigation'
import { BottomNav } from '@/components/bottom-nav/bottom-nav'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'
import { LanguageSwitcher } from '@/components/language-switcher'
import { APP_NAME } from '@/lib/config'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.includes('/login')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-white shadow-md w-full sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-lg font-bold text-gray-800">
            {APP_NAME}
          </h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="flex-grow pb-16 max-w-md mx-auto w-full px-4">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </main>
      <BottomNav />
    </div>
  )
}
