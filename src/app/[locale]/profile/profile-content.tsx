'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, User, Mail, Calendar, Loader2 } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface ProfileContentProps {
  translations: Record<string, string>
}

export function ProfileContent({ translations: t }: ProfileContentProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  const locale = usePathname().split('/')[1]

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push(`/${locale}/login`)
    router.refresh()
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-32" />
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-40" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {t.logout}
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {user?.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.user_metadata?.full_name || user?.user_metadata?.name || t.user}
            </h2>
            <p className="text-gray-600">{t.member}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">{t.email}</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">{t.joinedDate}</p>
              <p className="font-medium text-gray-800">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US') : t.unknown}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">{t.loginType}</p>
              <p className="font-medium text-gray-800">
                {user?.app_metadata?.provider === 'google' ? 'Google' : t.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
