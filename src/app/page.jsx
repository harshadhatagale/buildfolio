'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

  return <div>Loading...</div>
}
