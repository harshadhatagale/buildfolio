// components/SkillsSection.tsx
import React, {useState, useEffect} from "react"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"

export default function SkillsSection({id, content}) {
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
    <section className={`${isSelected? "selected-section":""} relative bg-background py-10 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          {content.primaryHeading}
        </h2>
        <p className="text-muted-foreground mb-8 text-base md:text-lg">
          {content.secondaryHeading}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {content.skills.map((skill, index) => (
            <Badge
              key={index}
              className="text-base dark:text-black px-4 py-2 rounded-xl shadow-sm border-muted"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}