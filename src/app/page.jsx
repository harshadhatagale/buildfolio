'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
export default function page() {
  const router = useRouter()
  useEffect(() => {
    router.push("/home")
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 size={25} className="animate-spin" />
    </div>
  )
}
