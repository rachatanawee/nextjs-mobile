'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = pathname.split('/')[1]

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'th' : 'en'
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Languages className="w-4 h-4" />
      {currentLocale === 'en' ? 'ไทย' : 'EN'}
    </button>
  )
}
