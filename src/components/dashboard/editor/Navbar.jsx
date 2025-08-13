'use client'
import { ModeToggle } from '@/components/basics/ModeToggle'
import { Button } from '@/components/ui/button'
import { Eye, Globe, Paintbrush, Save, Settings } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import ThemeEditor from './ThemeEditor/ThemeEditor'
import toast from 'react-hot-toast'

export default function Navbar({ name, logo }) {
  const router = useRouter()
  const params = useParams()

  const handlePublish=()=>{
    toast.error("Hello")
  }
  return (
    <nav className='flex bg-background justify-between items-center w-full h-14 border-b-2 border-muted px-3'>
      <div className='flex justify-center items-center gap-3'>
        <img src='/images/code.png' alt='Project Logo' width={30} height={30} />
        <span className='text-lg font-semibold'>Harshad's Portfolio</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <ThemeEditor/>
        <Eye size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/preview`)} />
        <Settings size={20} className='cursor-pointer' onClick={() => router.replace(`/dashboard/${params.project}/settings`)} />
        <Button variant={"outline"} className={"bg-emerald-500 text-slate-900 dark:bg-emerald-900 dark:text-white cursor-pointer"}>
          <Globe size={20} />
          <span onClick={handlePublish}>Publish</span>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  )
}