import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavProps from './SectionProperties/NavProps'
import HeroProps from './SectionProperties/HeroProps'
import AboutProps from './SectionProperties/AboutProps'
import SkillsProps from './SectionProperties/SkillsProps'
import ExperienceProps from './SectionProperties/ExperienceProps'
import FooterProps from './SectionProperties/FooterProps'


export default function PropertiesBar() {
  const selectedSection = useSelector((state) => state.portfolio.selectedSection);
  const properties = (section) => {
    if (!section) {
      return <div><h4>No Selected section !</h4></div>
    }
    switch (section.type) {
      case "nav":
        return <NavProps section={section} />;
      case "hero":
        return <HeroProps section={section} />;
      case "about":
        return <AboutProps section={section} />;
      case "skills":
        return <SkillsProps section={section} />;
      case "experience":
        return <ExperienceProps section={section} />;
      case "footer":
        return <FooterProps section={section} />;
    }
  };

  return (
    <div className='flex flex-col bg-background px-3 w-56 border-l-2 border-muted fixed top-14 right-0 h-[calc(100vh-56px)] py-3 overflow-y-auto'>
      <h3 className='text-lg font-bold mb-5'>Properties</h3>
      {!selectedSection ? (
        <div><h4>No Selected section !</h4></div>
      ) : (
        properties(selectedSection)
      )}
    </div>
  );
}

