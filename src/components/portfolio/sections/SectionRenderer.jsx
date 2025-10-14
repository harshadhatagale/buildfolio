import React from 'react'
import  HeroSection  from './HeroSection';
import Nav from './Nav';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import TestimonialsSection from './TestimonialsSection';
import SimpleSection from './SimpleSection';
import Footer from './Footer';
import ProjectsSection from './ProjectsSection';
import ServicesSection from './ServicesSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import FaqsSection from './FaqsSection';
import AchievementsSection from './AchievementsSection';

export default function SectionRenderer({ id, type,content }) {
  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection id={id}  content={content}/>;
      case 'nav':
        return <Nav id={id} content={content}/>;
      case 'about':
        return <AboutSection id={id} content={content}/>;
      case 'skills':
        return <SkillsSection id={id} content={content}/>;
      case 'experience':
        return <ExperienceSection id={id} content={content}/>;
      case 'testimonials':
        return <TestimonialsSection id={id} content={content}/>;
      case 'footer':
        return <Footer id={id} content={content}/>;
      case 'projects':
        return <ProjectsSection id={id} content={content}/>;
      case "services":
        return <ServicesSection id={id} content={content}/>
      case "education":
        return <EducationSection id={id} content={content}/>
      case "certifications":
        return <CertificationsSection id={id} content={content}/>
      case "faqs":
        return <FaqsSection id={id} content={content}/>
      case "achievements":
        return <AchievementsSection id={id} content={content}/>
      default:
        return <SimpleSection id={id} content={content}/>;
    }
  };

  return (
    <>
      {renderSection()}
    </>
  );
}
