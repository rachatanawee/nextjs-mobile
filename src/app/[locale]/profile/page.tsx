import { getTranslations } from 'next-intl/server'
import { ProfileContent } from './profile-content'

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ProfilePage' })

  return (
    <ProfileContent translations={{
      title: t('title'),
      logout: t('logout'),
      member: t('member'),
      email: t('email'),
      joinedDate: t('joinedDate'),
      loginType: t('loginType'),
      user: t('user'),
      unknown: t('unknown')
    }} />
  )
}
