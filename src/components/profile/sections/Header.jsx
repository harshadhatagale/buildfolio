
import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { ChevronLeft, Terminal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function Header({ user }) {
    const router= useRouter()
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-3 bg-background w-full h-16 justify-between flex items-center border-b-2 border-muted"
        >
            <Button variant={'outline'} size={'icon'} className={'mr-5'} onClick={()=> router.back()}>
                <ChevronLeft />
            </Button>
            <div className="flex w-full justify-between items-center gap-3 text-black dark:text-white font-mono">
                <div className="flex justify-center items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    <span className="text-sm md:text-base">{`~/${user?.firstName}/profile`}</span>
                </div>
                <div className='flex gap-3'>
                    <Link className='hover:text-primary' href={"/home"}>Home</Link>
                    <Link className='hover:text-primary' href={"/dashboard"}>Dashboard</Link>
                    <Link className='hover:text-primary' href={"/themes"}>Themes</Link>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex gap-2 ml-auto">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <AnimatedThemeToggler className={"cursor-pointer"}/>
                </div>
            </div>
        </motion.div>
    )
}
