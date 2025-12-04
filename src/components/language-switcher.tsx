'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = pathname.split('/')[1]
  const newLocale = currentLocale === 'en' ? 'th' : 'en'

  const switchLanguage = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span>{newLocale.toUpperCase()}</span>
    </button>
  )
}
