import SectionRenderer from '@/components/sections/SectionRenderer'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

export default function PortfolioPreview({ sections }) {
    const [device, setDevice] = useState("mobile")
    const sectionRefs = useRef({})
    const containerRef = useRef(null)
    const selectedSection = useSelector((state) => state.portfolio.selectedSection)
    const theme = useSelector((state) => state.portfolio.theme)
    const themeMode = useSelector((state) => state.portfolio.themeMode)

    // Apply theme styles to the preview container
    const getThemeStyles = () => {
        const colors = theme["dark"]
        return {
            '--radius': colors.radius,
            '--background': colors.background,
            '--foreground': colors.foreground,
            '--card': colors.card,
            '--card-foreground': colors.cardForeground,
            '--popover': colors.popover,
            '--popover-foreground': colors.popoverForeground,
            '--primary': colors.primary,
            '--primary-foreground': colors.primaryForeground,
            '--secondary': colors.secondary,
            '--secondary-foreground': colors.secondaryForeground,
            '--muted': colors.muted,
            '--muted-foreground': colors.mutedForeground,
            '--accent': colors.accent,
            '--accent-foreground': colors.accentForeground,
            '--destructive': colors.destructive,
            '--border': colors.border,
            '--input': colors.input,
            '--ring': colors.ring,
            '--chart-1': colors.chart1,
            '--chart-2': colors.chart2,
            '--chart-3': colors.chart3,
            '--chart-4': colors.chart4,
            '--chart-5': colors.chart5,
            '--sidebar': colors.sidebar,
            '--sidebar-foreground': colors.sidebarForeground,
            '--sidebar-primary': colors.sidebarPrimary,
            '--sidebar-primary-foreground': colors.sidebarPrimaryForeground,
            '--sidebar-accent': colors.sidebarAccent,
            '--sidebar-accent-foreground': colors.sidebarAccentForeground,
            '--sidebar-border': colors.sidebarBorder,
            '--sidebar-ring': colors.sidebarRing,
        }
    }

    // Assign refs to each section
    const assignSectionRef = (id, element) => {
        if (element) {
            sectionRefs.current[id] = element
        }
    }

    // Handle scroll to section when selected
    useEffect(() => {
        if (!selectedSection) return

        const sectionElement = sectionRefs.current[selectedSection._id]
        if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [selectedSection])

    return (
        <div
            ref={containerRef}
            className={`mt-5 z-10 overflow-y-scroll border-2 border-border bg-background text-foreground
                ${device === "mobile" ? "w-[680px] h-[667px]" : ""}
                ${device === "desktop" ? "min-h-[600px] w-lvw" : ""} 
                rounded-[var(--radius)]`}
            style={getThemeStyles()}
        >
            {sections.map((section) => (
                <div
                    key={section._id}
                    ref={(el) => assignSectionRef(section._id, el)}
                    className="bg-card text-card-foreground"
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