import SectionRenderer from '@/components/sections/SectionRenderer'
import React, { useEffect,useState, useRef } from 'react'
import { useSelector } from 'react-redux'

export default function PortfolioPreview({ sections }) {
    const [device, setDevice] = useState("mobile")
    const sectionRefs = useRef({})
    const containerRef = useRef(null)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)

    // Assign refs to each section
    const assignSectionRef = (id, element) => {
        if (element) {
            sectionRefs.current[id] = element
        }
    }

    // Handle scroll to section when selected
    useEffect(() => {
        if (!selectedSection) return

        const section = sections.find(s => s._id === selectedSection._id)

        const sectionElement = sectionRefs.current[selectedSection._id]
        if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [selectedSection, sections])

    return (
        <div
            ref={containerRef}
            className={`mt-5 z-10 overflow-y-scroll border-2 border-muted bg-accent  
                ${device === "mobile" ? "w-[680px] h-[667px]" : ""}
                ${device === "desktop" ? "min-h-[600px] w-lvw" : ""} 
                rounded-md`}
        >
            {sections.map((section) => (
                <div
                    key={section._id}
                    ref={(el) => assignSectionRef(section._id, el)}
                >
                    <SectionRenderer 
                        id={section._id} 
                        type={section.type} 
                        content={section.content} 
                    />
                </div>
            ))}
        </div>
    )
}