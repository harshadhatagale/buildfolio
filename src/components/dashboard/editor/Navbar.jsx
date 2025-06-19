import { ModeToggle } from '@/components/basics/ModeToggle'
import { Button } from '@/components/ui/button'
import { Globe, Save, Settings } from 'lucide-react'
import React from 'react'

export default function Navbar({ name, logo }) {
  return (
    <nav className='flex bg-background justify-between items-center w-full h-14 border-b-2 border-muted px-3'>
      <div className='flex justify-center items-center gap-3'>
        <img src='/images/code.png' alt='Project Logo' width={30} height={30} />
        <span className='text-lg font-semibold' contentEditable suppressContentEditableWarning>Harshad's Portfolio</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Settings size={20} className='cursor-pointer' />
        <Button variant={"outline"} className={"bg-emerald-500 text-slate-900 dark:bg-emerald-900 dark:text-white cursor-pointer"}>
          <Globe size={20} />
          <span>Publish</span>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  )
}
