import { Card } from '@/components/ui/card'
import { Award, BadgeCheck, Briefcase, FolderKanban, GraduationCap, HelpCircle, Home, Layout, LayoutDashboard, Mountain, Package, Quote, Swords, UserCircle, Zap } from 'lucide-react'
import React from 'react'
import { useAddSection } from '@/lib/handlers/handleAddSection'

const sections = [
  {
    type: "section",
    name: "Section"
  },
  {
    type: "nav",
    name: "Navbar"
  },
  {
    type: "hero",
    name: "Hero Section"
  }
  , {
    type: "about",
    name: "About Section"
  },
  {
    type: "skills",
    name: "Skills Section"
  },
  {
    type: "experience",
    name: "Experience Section"
  },
  {
    type: "testimonials",
    name: "Testimonials Section"
  }
  ,
  {
    type: "projects",
    name: "Projects"
  },
  {
    type: "services",
    name: "Services"
  },
  {
    type: "education",
    name: "Education"
  },
  {
    type: "certifications",
    name: "Certifications"
  },
  {
    type: "achievements",
    name: "Achievements"
  },
  {
    type: "faqs",
    name: "Faqs"
  },
  ,
  {
    type: "footer",
    name: "Footer"
  }
]
// 'nav', 'hero', 'about', 'skils', 'experience', 'section', 'testimonials', 'footer'
export default function SectionList({ projectId }) {
  const { handleAddSection } = useAddSection()
  return (
    <div className='flex flex-col w-full justify-center items-center gap-2 overflow-y-auto'>
      {sections.map((section, index) => (
        <Card key={section.type} onClick={() => handleAddSection({ projectId: projectId, type: section.type })} className={"w-full py-2 hover:border transition hover:border-primary rounded-md cursor-pointer"}>
          <div className='flex items-center w-full h-full px-2 gap-3'>
            <SectionIconRenderer type={section.type} />
            <span>{section.name}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}



export const SectionIconRenderer = ({ type }) => {
  const renderSection = () => {
    switch (type) {
      case "nav":
        return <LayoutDashboard />
        break;

      case "hero":
        return <Mountain />
        break

      case "about":
        return <UserCircle />
        break

      case "skills":
        return <Swords />

      case "experience":
        return <Briefcase />

      case "testimonials":
        return <Quote />
        break

      case 'section':
        return <Layout />
        break

      case "projects":
        return <FolderKanban />

      case "services":
        return <Package/>

      case "education":
        return <GraduationCap />

      case "faqs":
        return <HelpCircle />

      case "certifications":
        return <BadgeCheck />

      case "achievements":
        return <Award />
      default:
        return <Layout />
        break;
    }
  }
  return (
    <>
      {renderSection()}
    </>
  )
}