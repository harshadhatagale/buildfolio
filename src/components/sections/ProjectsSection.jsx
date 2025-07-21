// components/ProjectsSection.jsx
import { Button } from "@/components/ui/button"
import React, {useState, useEffect} from "react"
import { useSelector } from "react-redux"

export default function ProjectsSection({id, content}) {
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
    <section className={`${isSelected ? "selected-section" :""} relative bg-background py-10 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {content.heading}
        </h2>
        
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {content?.projects?.map((project, index) => (
            <div
              key={index}
              className="bg-muted p-6 rounded-xl border border-border shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-background text-foreground px-2 py-1 rounded text-xs border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button size="sm">Live</Button>
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline">Code</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
