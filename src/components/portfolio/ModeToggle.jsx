"use client"

import React, { useEffect, useTransition } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setTheme } = useTheme()

    const [isPending, startTransition] = useTransition()

    const mode = searchParams.get("mode")

    useEffect(() => {
        if (mode === "light" || mode === "dark") {
            setTheme(mode)
        }
    }, [mode, setTheme])

    const changeTheme = (mode) => {
        startTransition(() => {
            router.push(`?mode=${mode}`)
        })
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {isPending ? (
                        <div className="z-50 flex items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                        </div>
                    ) : (
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    )}
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => changeTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
