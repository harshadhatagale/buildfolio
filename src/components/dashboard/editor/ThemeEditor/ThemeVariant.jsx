import { Button } from '@/components/ui/button'
import React from 'react'

export default function ThemeVariant() {
  return (
    <div className='w-[170px] bg-card border-2 shadow-md space-y-2 rounded-md p-2 flex justify-center items-center flex-col'>
        <div className='w-full h-30 rounded-md overflow-hidden'>
            <img src="/images/demo1.png" alt="Theme preview" className='w-full h-full object-cover'/>
        </div>
        <div className='w-full items-start'>
            <p className='text-foreground font-semibold text-lg'>Card title</p>
        </div>
        <Button className={"w-full h-8 text-white bg-primary dark:bg-primary hover:bg-primary/50 dark:hover:bg-primary/50"} variant={"outline"} >Apply</Button>
    </div>
  )
}
