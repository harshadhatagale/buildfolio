'use client'
import React, { useState } from 'react'
import { ModeToggle } from '../basics/ModeToggle'
import Link from 'next/link'
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { Roboto, Inter } from 'next/font/google'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'
import ToolsDropdown from './ToolsDropdown'

const roboto = Roboto({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className={`flex z-99 border-b border-muted sticky top-0 left-0 bg-background md:flex-row justify-start md:justify-between items-center md:h-16 w-full px-6 ${isNavOpen ? 'h-[100vh] flex-col' : 'h-16'}`}>
            
            {/* TOP ROW */}
            <div className={`flex justify-between items-center w-full ${isNavOpen ? 'h-16' : ''}`}>
                
                {/* Logo */}
                <Link href={"/home"} className="text-xl font-bold">
                    BuildFolio
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                    <ul className="flex justify-center items-center gap-8">
                        <ToolsDropdown />
                        <Link href={"/home#pricing"}>Pricing</Link>
                        <Link href={"/home#features"}>Features</Link>
                        <Link href={"/about"}>About</Link>   
                    </ul>
                </div>

                {/* Right Side Buttons */}
                <div className="flex justify-center items-center gap-4">
                    <SignedIn>
                        <Button variant="outline" className="cursor-pointer md:block hidden" asChild>
                            <Link href="/dashboard" className={roboto.className}>Dashboard</Link>
                        </Button>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <button className={`${roboto.className} bg-primary cursor-pointer text-white p-2 px-4 rounded-md hover:bg-primary/80`}>
                                Login
                            </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn><UserButton /></SignedIn>
                    <AnimatedThemeToggler className="cursor-pointer" />
                    <Menu className='block md:hidden' size={25} onClick={() => setIsNavOpen(!isNavOpen)} />
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`block md:hidden ${isNavOpen ? 'h-[70%] flex flex-col justify-center items-center gap-5' : 'hidden'}`}>
                <ul className="flex flex-col justify-center items-center gap-5">
                    <ToolsDropdown />
                    <Link href="/home#pricing" onClick={() => setIsNavOpen(false)}>Pricing</Link>
                    <Link href="/about" onClick={() => setIsNavOpen(false)}>About</Link> {/* Added */}
                    <Link href="/home#features" onClick={() => setIsNavOpen(false)}>Features</Link>
                </ul>
            </div>
        </nav>
    )
}
