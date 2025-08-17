'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [portfolio, setPortfolio] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!portfolio) {
      router.push("/portfolio-not-found")
    }
  }, [portfolio, router])

  return (
    <div>page</div>
  )
}
