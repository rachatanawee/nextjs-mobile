import { getTranslations } from 'next-intl/server'
import { Home } from 'lucide-react'
import { APP_NAME } from '@/lib/config'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage' })
  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center">
        <Home className="h-12 w-12 text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{APP_NAME}</h1>
        <p className="text-gray-600">{t('description')}</p>
      </div>
    </div>
  )
}
