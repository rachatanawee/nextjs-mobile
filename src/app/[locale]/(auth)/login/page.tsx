import { getTranslations } from 'next-intl/server'
import { LoginForm } from './login-form'
import { LanguageSwitcher } from './language-switcher'

export default async function Login({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginPage' });

  return (
    <div className="min-h-screen flex flex-col p-4 overflow-y-auto scrollbar-hide">
      <header className="p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl mb-4 border border-white/20 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js Template
          </h1>
          <LanguageSwitcher />
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-white/20 overflow-y-auto scrollbar-hide">
            <LoginForm translations={{
              title: t('title'),
              welcome: t('welcome'),
              email: t('email'),
              password: t('password'),
              signIn: t('signIn'),
              signingIn: t('signingIn'),
              or: t('or'),
              signInWithGoogle: t('signInWithGoogle'),
              emailPlaceholder: t('emailPlaceholder'),
              passwordPlaceholder: t('passwordPlaceholder')
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
