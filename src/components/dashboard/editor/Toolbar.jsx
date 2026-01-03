'use client'

import { Redo, Undo, Save } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redo, undo } from '../../../../features/portfolio/portfolioSlice'
import { toast } from 'react-hot-toast'
import { useParams } from 'next/navigation'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Toolbar() {
  const params = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  const themeId = useSelector((state) => state.portfolio.themeId)
  const font = useSelector((state) => state.portfolio.font)
  const handleSave = async () => {
    const savePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/saveSections/${params.project}`,
          {
            method: 'POST',
            body: JSON.stringify({ sections, themeId, font }),
            headers: { 'Content-Type': 'application/json' },
          }
        )

        const data = await res.json()
        if (data.success) resolve('Saved Successfully!')
        else reject(data.error || 'Failed to Save')
      } catch (error) {
        reject(error.message || 'Error Saving')
      }
    })

    toast.promise(
      savePromise,
      {
        loading: 'Saving...',
        success: (msg) => msg,
        error: (err) => err,
      },
      {
        success: { duration: 3000 },
        error: { duration: 4000 },
      }
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed top-18 left-1/2 -translate-x-1/2 z-20 h-10 flex items-center gap-6 px-5 bg-background border border-muted rounded-md shadow-md">

        {/* Undo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Undo
              size={18}
              className="cursor-pointer text-muted-foreground hover:text-foreground transition"
              onClick={() => dispatch(undo())}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Undo <span className="ml-1 text-xs opacity-70">⌘Z</span>
          </TooltipContent>
        </Tooltip>

        {/* Redo */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Redo
              size={18}
              className="cursor-pointer text-muted-foreground hover:text-foreground transition"
              onClick={() => dispatch(redo())}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Redo <span className="ml-1 text-xs opacity-70">⌘⇧Z</span>
          </TooltipContent>
        </Tooltip>

        {/* Save */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Save
              size={18}
              className="cursor-pointer text-muted-foreground hover:text-foreground transition"
              onClick={handleSave}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Save changes <span className="ml-1 text-xs opacity-70">⌘S</span>
          </TooltipContent>
        </Tooltip>

      </div>
    </TooltipProvider>
  )
}
