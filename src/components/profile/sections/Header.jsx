
import React from 'react'
import { motion } from 'framer-motion'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Terminal } from 'lucide-react'
export default function Header({user}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
        >
            <div className="flex w-full justify-between items-center gap-3 text-black dark:text-white font-mono">
                <div className="flex justify-center items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    <span className="text-sm md:text-base">{`~/${user?.firstName}/profile`}</span>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex gap-2 ml-auto">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <AnimatedThemeToggler />
                </div>
            </div>
        </motion.div>
    )
}
