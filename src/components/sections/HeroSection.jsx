
import { useState, useEffect } from "react"
export default function HeroSection({id, content}) {
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
    <section className={`${isSelected? "selected-section": ""} h-[calc(80vh-40px)] relative flex items-center justify-center bg-background px-6`}>
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          {content.primaryHeading}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          {content.secondaryHeading}
        </p>
        {/* <div className="flex justify-center gap-4">
          <Button>Contact Me</Button>
          <Button variant="outline">View Projects</Button>
        </div> */}
      </div>
    </section>
  )
}
