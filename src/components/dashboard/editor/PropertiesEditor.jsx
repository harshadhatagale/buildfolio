import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavProps from './SectionProperties/NavProps'
import HeroProps from './SectionProperties/HeroProps'
import AboutProps from './SectionProperties/AboutProps'
import SkillsProps from './SectionProperties/SkillsProps'
import ExperienceProps from './SectionProperties/ExperienceProps'
import FooterProps from './SectionProperties/FooterProps'
import TestimonialsProps from './SectionProperties/TestimonialsProps'


export default function PropertiesEditor() {
    const selectedSection = useSelector((state) => state.portfolio.selectedSection);
    const properties = (section) => {
        if (!section) {
            return <div><h4>No Selected section !</h4></div>
        }
        switch (section.type) {
            case "nav":
                return <NavProps />;
            case "hero":
                return <HeroProps />;
            case "about":
                return <AboutProps />;
            case "skills":
                return <SkillsProps />;
            case "experience":
                return <ExperienceProps />;
            case "footer":
                return <FooterProps />;
            case "testimonials":
                return <TestimonialsProps />
        }
    };

    return (
        <>
            {!selectedSection ? (
                <div><h4>No Selected section !</h4></div>
            ) : (
                properties(selectedSection)
            )}
        </>
    );
}

