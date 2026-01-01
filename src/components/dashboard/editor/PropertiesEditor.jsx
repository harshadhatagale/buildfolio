import React from "react"
import { useSelector } from "react-redux"
import { MousePointerClick, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import NavProps from "./SectionProperties/NavProps"
import HeroProps from "./SectionProperties/HeroProps"
import AboutProps from "./SectionProperties/AboutProps"
import SkillsProps from "./SectionProperties/SkillsProps"
import ExperienceProps from "./SectionProperties/ExperienceProps"
import FooterProps from "./SectionProperties/FooterProps"
import TestimonialsProps from "./SectionProperties/TestimonialsProps"
import ProjectsProps from "./SectionProperties/ProjectsProps"
import EducationProps from "./SectionProperties/EducationProps"
import CertificationsProps from "./SectionProperties/CertificationsProps"
import FaqsProps from "./SectionProperties/FaqsProps"

export default function PropertiesEditor() {
  const selectedSection = useSelector(
    (state) => state.portfolio.selectedSection
  )

  const renderProperties = (section) => {
    switch (section.type) {
      case "nav":
        return <NavProps />
      case "hero":
        return <HeroProps />
      case "about":
        return <AboutProps />
      case "skills":
        return <SkillsProps />
      case "experience":
        return <ExperienceProps />
      case "education":
        return <EducationProps />
      case "certifications":
        return <CertificationsProps />
      case "faqs":
        return <FaqsProps />
      case "footer":
        return <FooterProps />
      case "testimonials":
        return <TestimonialsProps />
      case "projects":
        return <ProjectsProps />
      default:
        return null
    }
  }

  if (!selectedSection) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MousePointerClick />
          </EmptyMedia>

          <EmptyTitle>No Section Selected</EmptyTitle>

          <EmptyDescription>
            Click on any section in the canvas to edit its content,
            layout, and settings.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <Button variant="outline" disabled>
            Select a Section
          </Button>
        </EmptyContent>

        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground"
          disabled
        >
          How editing works <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </Empty>
    )
  }

  return renderProperties(selectedSection)
}
