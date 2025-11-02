// components/AboutSection.tsx
import Image from "next/image"
import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
export default function AboutSection({ id, content }) {
  const selectedSection= useSelector((state)=> state.portfolio.selectedSection)
  const [isSelected, setSelected]= useState(false)
  useEffect(()=>{
    const handleSelection=()=>{
      if (selectedSection._id===id) {
        setSelected(true)
      }
      else
      {
        setSelected(false)
      }
    }
    if(selectedSection)
    {
      handleSelection()
    }
  }, [selectedSection])
  return (
    <div className={`${isSelected ? "selected-section" : ""} relative py-10 px-5 bg-background`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full flex justify-center items-center h-72 md:h-96 rounded-xl bg-transparent overflow-hidden shadow-lg">
          <img
            src={content.avatar} // Add your image in public folder
            alt="Harshad"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {content.heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {content.about}
          </p>
        </div>
      </div>
    </div>
  )
}