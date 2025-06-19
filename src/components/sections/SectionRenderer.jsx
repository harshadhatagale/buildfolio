import React from 'react'
import  HeroSection  from './HeroSection';
import Nav from './Nav';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import TestimonialsSections from './TestimonialsSections';
import SimpleSection from './SimpleSection';
import Footer from './Footer';
import ProjectsSection from './ProjectsSection';

export default function SectionRenderer({ type,content }) {
  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection />;
      case 'nav':
        return <Nav content={content}/>;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'testimonials':
        return <TestimonialsSections />;
      case 'footer':
        return <Footer/>;
      case 'projects':
        return <ProjectsSection/>;
      default:
        return <SimpleSection />;
    }
  };

  return (
    <>
      {renderSection()}
    </>
  );
}
