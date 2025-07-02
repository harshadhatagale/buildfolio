'use client'
import React, { useState } from 'react'
import { ModeToggle } from '../basics/ModeToggle'
import Link from 'next/link'
import { SignedIn, SignInButton, SignOutButton, SignedOut, UserButton } from '@clerk/nextjs'
import { Roboto, Inter } from 'next/font/google'
import { Menu } from 'lucide-react'
import { Button } from '../ui/button'

const roboto = Roboto({
    subsets: ['latin'],
})


const inter = Inter({
    subsets: ['latin'],
})
export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <nav className={`flex bg-background md:flex-row justify-start md:justify-between items-center md:h-16 w-full px-6 ${isNavOpen ? ' h-[100vh] flex-col' : "h-16"}`}>
            <div className={`flex justify-between items-center w-full ${isNavOpen ? "h-16 flex justify-between items-center" : ""}`}>
                <div className='flex justify-center items-center'>
                    <Link href={"/"} className={`text-xl font-bold`}>BuildFolio</Link>
                </div>
                <div className='hidden md:block'>
                    <ul className={`flex justify-center items-center gap-8`}>
                        <Link href={"/pricing"}>Pricing</Link>
                        <Link href={"/about"}>About</Link>
                        <Link href={"#"}>Documentation</Link>
                        <Link href={"#"}>Features</Link>
                    </ul>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <SignedIn>
                        <Button variant={"secondary"} className={"cursor-pointer"} asChild>
                            <Link href={"/dashboard"} className={`${roboto.className}`}>Dashboard</Link>
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button className={`${roboto.className} bg-primary cursor-pointer text-white p-2 px-4 rounded-md hover:bg-primary/80`}>Login</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <ModeToggle />
                    <Menu className='block md:hidden' size={25} onClick={() => setIsNavOpen(!isNavOpen)} />
                </div>
            </div>
            <div className={`block md:hidden ${isNavOpen ? "h-[70%] flex flex-col justify-center items-center gap-5" : "hidden"}`}>
                <ul className={`flex justify-center items-center gap-8 ${isNavOpen ? "flex flex-col justify-center items-center gap-5" : ""}`}>
                    <Link href={"/pricing"}>Pricing</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"#"}>Documentation</Link>
                    <Link href={"#"}>Features</Link>
                </ul>
            </div>
        </nav>
    )
}
