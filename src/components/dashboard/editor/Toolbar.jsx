import { Redo, Undo, Save } from 'lucide-react'
import React from 'react'

export default function Toolbar() {
  return (
    <div className='h-10 flex bg-background -translate-x-1/2 z-15 justify-between items-center px-5 gap-8 border-3 border-muted rounded-md fixed top-18 left-1/2'>
      <Undo size={20} className='cursor-pointer' />
      <Redo size={20} className='cursor-pointer' />
      <Save size={20} className='cursor-pointer' />
    </div>
  )
}
