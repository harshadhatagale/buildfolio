'use client'
import { useEffect, useState } from "react"
import FontRow from "./FontRow"

export default function FontList() {
  const [fonts, setFonts] = useState([])

  useEffect(() => {
    fetch("/fonts.json").then(r => r.json()).then(setFonts)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-auto">
      {fonts.map(font => (
        <FontRow key={font.name} font={font} />
      ))}
    </div>
  )
}
