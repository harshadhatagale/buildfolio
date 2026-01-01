import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { ChevronLeft, Terminal, Menu, X, Home, LayoutDashboard, Palette } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Header({ user }) {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-3 md:px-6 bg-background w-full h-16 justify-between flex items-center border-b-2 border-muted"
            >
                {/* Mobile Back Button */}
                <Button 
                    variant={'outline'} 
                    size={'icon'} 
                    className={'mr-2 md:mr-5'}
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                
                <div className="flex flex-1 justify-between items-center gap-3 text-black dark:text-white font-mono">
                    {/* Left Section - Terminal Info */}
                    <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-none">
                        <Terminal className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                        <span className="text-xs md:text-sm lg:text-base truncate">
                            {`~/${user?.firstName || 'user'}/profile`}
                        </span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-6 px-4">
                        <Link 
                            className="hover:text-primary text-sm lg:text-base flex items-center gap-1"
                            href={"/home"}
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            className="hover:text-primary text-sm lg:text-base flex items-center gap-1"
                            href={"/dashboard"}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <Link 
                            className="hover:text-primary text-sm lg:text-base flex items-center gap-1"
                            href={"/themes"}
                        >
                            <Palette className="w-4 h-4" />
                            <span>Themes</span>
                        </Link>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Desktop window controls */}
                        <div className="hidden sm:flex gap-2 ml-auto">
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                        </div>
                        
                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </Button>
                        
                        {/* Desktop Logout Button */}
                        <div className="hidden md:block">
                            <SignOutButton className="cursor-pointer">
                                <Button variant={"destructive"} size="sm" className={"font-sans text-xs lg:text-sm"}>
                                    Log Out
                                </Button>
                            </SignOutButton>
                        </div>
                        
                        <AnimatedThemeToggler className={"cursor-pointer w-8 h-8 md:w-9 md:h-9"} />
                    </div>
                </div>
            </motion.div>
            
            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden bg-background border-b-2 border-muted"
                >
                    <div className="px-4 py-3 space-y-3">
                        <Link
                            href="/home"
                            className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/themes"
                            className="flex items-center gap-2 text-sm p-2 hover:bg-muted rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Palette className="w-4 h-4" />
                            Themes
                        </Link>
                        
                        {/* Mobile Logout Button */}
                        <div className="pt-2 border-t border-muted">
                            <SignOutButton className="cursor-pointer">
                                <Button 
                                    variant={"destructive"} 
                                    size="sm" 
                                    className={"font-sans w-full text-sm"}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Log Out
                                </Button>
                            </SignOutButton>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
}