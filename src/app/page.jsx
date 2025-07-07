'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
export default function Page() {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (userId) {
      router.replace('/dashboard')
    } else {
      router.replace('/home')
    }
  }, [isLoaded, userId, router])

  return <div className="flex items-center justify-center h-screen">
    <Loader2 size={25} className="animate-spin" />
  </div>
}
