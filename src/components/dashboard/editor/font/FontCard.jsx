'use client'
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { loadFont } from "@/lib/lazyFontLoad"
import { setFont } from "../../../../../features/portfolio/portfolioSlice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"

const PREVIEW_TEXT = "The quick brown fox jumps over the lazy dog"

export default function FontCard({ font }) {
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const handleSetFont=(font)=>{
    dispatch(setFont(font))
    toast.success(`Font set to ${font}`, {duration:2000})
  }
  useEffect(() => {
    let mounted = true

    loadFont(font.name, {
      weights: font.weights,
      timeout: 1200,
    }).then(() => {
      if (mounted) setReady(true)
    })

    return () => {
      mounted = false
    }
  }, [font.name])

  return (
    <div className="border rounded-md p-3 min-h-[72px] flex items-center">
      {!ready ? (
        <div className="w-full flex justify-center">
          <Loader2 className="animate-spin opacity-60" size={18} />
        </div>
      ) : (
        <div
          onClick={() => handleSetFont(font.name)}
          className="cursor-pointer"
          style={{ fontFamily: font.name }}
        >
          <p className="text-sm font-medium">{font.name}</p>
          <p className="text-xs opacity-70">{PREVIEW_TEXT}</p>
        </div>
      )}
    </div>
  )
}
