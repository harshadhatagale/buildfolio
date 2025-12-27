"use client"

import * as React from "react"
import { cn } from "@/lib/utils"


export function GradientProgress({
    value,
    className,
}) {
    return (
        <div
            className={cn(
                "relative h-3 w-full overflow-hidden rounded-full bg-muted",
                className
            )}
        >
            <div
                className="h-full rounded-full transition-all duration-500 ease-out
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                style={{ width: `${value}%` }}
            />
        </div>
    )
}
