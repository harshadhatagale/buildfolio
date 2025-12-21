import React from 'react'
import Link from 'next/link'
import { Triangle } from 'lucide-react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/basics/ModeToggle'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import Logo from '@/components/basics/Logo'
import ProfileBtn from '@/components/basics/ProfileBtn'
export default function Navbar() {
  return (
    <div className="bg-background w-full h-16 flex justify-between items-center px-6 border-b-2 border-muted">
      <div className="flex justify-center items-center gap-4">
        <div className='flex justify-center items-center'>
          <Link href={"/dashboard"} className='text-xl font-bold text-primary'><Logo/></Link>
        </div>
        <div className='flex justify-center items-center'>
          <h2 className='text-2xl font-semibold'>Portfolios</h2>
        </div>
      </div>
      <div className='flex justify-center items-center gap-4'>
        <SignedIn>
          <ProfileBtn/>
        </SignedIn>
        <AnimatedThemeToggler/>
      </div>
    </div>
  )
}
