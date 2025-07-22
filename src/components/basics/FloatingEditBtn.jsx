'use client'

import { Code } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FloatingEditBtn({projectId}) {
    const router= useRouter()
  return (
    <div onClick={()=> router.push(`/dashboard/${projectId}/edit`)} className='fixed flex cursor-pointer justify-center items-center bg-primary text-foreground rounded-full bottom-10 right-10 w-12 h-12'>
        <Code className='text-accent'/>
    </div>
  )
}
