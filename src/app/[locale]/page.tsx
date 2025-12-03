import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="flex flex-col items-center mb-4">
          <Home className="h-12 w-12 text-blue-600 mb-2" />
          <h1 className="text-3xl font-extrabold text-gray-800">{t('title')}</h1>
        </div>
        <div>
          <p className="text-lg text-gray-600 mb-4">{t('description')}</p>
        </div>
      </div>
    </div>
  )
}
