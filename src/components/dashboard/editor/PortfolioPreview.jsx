import SectionRenderer from '@/components/sections/SectionRenderer'
import React, { useState } from 'react'

export default function PortfolioPreview({ sections }) {
    const [device, setDevice] = useState("mobile")
    return (
        <div className={`mt-5 z-10 overflow-y-scroll border-2 border-muted bg-accent  
      ${device === "mobile" ? "w-[680px] h-[667px]" : ""}
    ${device === "desktop" ? "min-h-[600px] w-lvw" : ""} rounded-md`}>
            {sections.map((section) => (
                <SectionRenderer key={section._id} type={section.type} content={section.content} />
            ))}
        </div>
    )
}
