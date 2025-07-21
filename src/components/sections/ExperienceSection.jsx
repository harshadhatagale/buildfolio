// components/ExperienceSection.jsx
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export default function ExperienceSection({ id, content }) {
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
    <section className={`${isSelected?"selected-section":""} relative bg-background py-10 px-6`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-5">
          {content.primaryHeading}
        </h2>

        <div className="space-y-8">
          {content.experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-background rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.jobTitle}{" "}
                  <span className="text-primary">@ {exp.companyName}</span>
                </h3>
                <span className="text-sm text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>

              <p className="mt-4 text-muted-foreground">{exp.responsibillities}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-muted text-foreground px-3 py-1 rounded-full text-sm border border-border"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
